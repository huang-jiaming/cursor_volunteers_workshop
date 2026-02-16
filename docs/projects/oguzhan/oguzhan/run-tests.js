/**
 * Local test runner for Networked Hiking Poll (same test logic as in-app).
 * Run: node docs/projects/oguzhan/run-tests.js
 * No DOM required; uses pure logic only.
 */

var MOCK_WEATHER = {
  "Blue Trail": { condition: "Sunny", temp: "18°C", wind: "Light" },
  "Red Trail": { condition: "Partly cloudy", temp: "16°C", wind: "Moderate" },
  "Summit Loop": { condition: "Clear", temp: "12°C", wind: "Strong" },
  "Lake Path": { condition: "Cloudy", temp: "14°C", wind: "Light" },
  "Forest Loop": { condition: "Sunny", temp: "20°C", wind: "Calm" }
};
var DEFAULT_WEATHER = { condition: "—", temp: "—", wind: "—" };

function getWinningOption(options) {
  if (!options || options.length === 0) return null;
  var max = options[0];
  for (var i = 1; i < options.length; i++) {
    if (options[i].votes > max.votes) max = options[i];
  }
  return max.votes > 0 ? max : null;
}

function getMockWeather(locationIdOrName) {
  var key = String(locationIdOrName || "").trim();
  if (MOCK_WEATHER[key]) return MOCK_WEATHER[key];
  return DEFAULT_WEATHER;
}

function computeSunriseSunset(dateStr, lat, lon) {
  var parts = String(dateStr).split("-");
  if (parts.length !== 3) return { sunrise: "—", sunset: "—" };
  var year = parseInt(parts[0], 10);
  var month = parseInt(parts[1], 10);
  var day = parseInt(parts[2], 10);
  if (isNaN(year) || isNaN(month) || isNaN(day)) return { sunrise: "—", sunset: "—" };
  lat = Number(lat);
  lon = Number(lon);
  var D2R = Math.PI / 180;
  var R2D = 180 / Math.PI;
  var zenith = 90 + 50 / 60;
  function dayOfYear(y, m, d) {
    var n1 = Math.floor(275 * m / 9);
    var n2 = Math.floor((m + 9) / 12);
    var n3 = (1 + Math.floor((y - 4 * Math.floor(y / 4) + 2) / 3));
    return n1 - n2 * n3 + d - 30;
  }
  function calc(sunrise) {
    var N = dayOfYear(year, month, day);
    var lnHour = lon / 15;
    var t = sunrise ? N + (6 - lnHour) / 24 : N + (18 - lnHour) / 24;
    var M = (0.9856 * t) - 3.289;
    var L = M + (1.916 * Math.sin(M * D2R)) + (0.020 * Math.sin(2 * M * D2R)) + 282.634;
    L = L % 360;
    if (L < 0) L += 360;
    var RA = R2D * Math.atan(0.91764 * Math.tan(L * D2R));
    RA = RA % 360;
    if (RA < 0) RA += 360;
    var Lquadrant = Math.floor(L / 90) * 90;
    var RAquadrant = Math.floor(RA / 90) * 90;
    RA = RA + (Lquadrant - RAquadrant);
    RA = RA / 15;
    var sinDec = 0.39782 * Math.sin(L * D2R);
    var cosDec = Math.cos(Math.asin(sinDec));
    var cosH = (Math.cos(zenith * D2R) - sinDec * Math.sin(lat * D2R)) / (cosDec * Math.cos(lat * D2R));
    if (cosH > 1 || cosH < -1) return null;
    var H = sunrise ? (360 - R2D * Math.acos(cosH)) : (R2D * Math.acos(cosH));
    H = H / 15;
    var T = H + RA - (0.06571 * t) - 6.622;
    var UT = T - lnHour;
    while (UT < 0) UT += 24;
    while (UT >= 24) UT -= 24;
    var localT = UT + lon / 15;
    while (localT < 0) localT += 24;
    while (localT >= 24) localT -= 24;
    var hours = Math.floor(localT);
    var mins = Math.round((localT - hours) * 60);
    if (mins >= 60) { mins = 0; hours++; }
    if (hours >= 24) hours -= 24;
    return (hours < 10 ? "0" : "") + hours + ":" + (mins < 10 ? "0" : "") + mins;
  }
  var sunrise = calc(true);
  var sunset = calc(false);
  return { sunrise: sunrise != null ? sunrise : "—", sunset: sunset != null ? sunset : "—" };
}

function expect(condition, message) {
  if (!condition) throw new Error(message);
}

var tests = [
  {
    name: "getWinningOption returns null when no options",
    fn: function () {
      expect(getWinningOption([]) === null, "Expected null");
    }
  },
  {
    name: "getWinningOption returns option with most votes",
    fn: function () {
      var opts = [
        { id: 1, name: "A", date: "2026-06-15", lat: 52, lon: 13, votes: 2 },
        { id: 2, name: "B", date: "2026-06-16", lat: 48, lon: 2, votes: 3 }
      ];
      var win = getWinningOption(opts);
      expect(win && win.name === "B" && win.votes === 3, "Expected B with 3 votes");
    }
  },
  {
    name: "getWinningOption returns null when all votes zero",
    fn: function () {
      var opts = [
        { id: 1, name: "A", votes: 0 },
        { id: 2, name: "B", votes: 0 }
      ];
      expect(getWinningOption(opts) === null, "Expected null when all zero");
    }
  },
  {
    name: "getMockWeather returns data for known location",
    fn: function () {
      var w = getMockWeather("Blue Trail");
      expect(w.condition === "Sunny" && w.temp === "18°C", "Expected Blue Trail weather");
    }
  },
  {
    name: "getMockWeather returns default for unknown location",
    fn: function () {
      var w = getMockWeather("Unknown Peak");
      expect(w.condition === "—" && w.temp === "—", "Expected default weather");
    }
  },
  {
    name: "computeSunriseSunset returns valid HH:MM format",
    fn: function () {
      var out = computeSunriseSunset("2026-06-21", 52.52, 13.40);
      expect(/^\d{1,2}:\d{2}$/.test(out.sunrise), "Sunrise should be HH:MM");
      expect(/^\d{1,2}:\d{2}$/.test(out.sunset), "Sunset should be HH:MM");
    }
  },
  {
    name: "computeSunriseSunset sunrise before sunset in summer mid-lat",
    fn: function () {
      var out = computeSunriseSunset("2026-06-21", 52.52, 13.40);
      var sr = out.sunrise.split(":").map(Number);
      var ss = out.sunset.split(":").map(Number);
      var sunriseMin = sr[0] * 60 + sr[1];
      var sunsetMin = ss[0] * 60 + ss[1];
      expect(sunriseMin < sunsetMin, "Sunrise should be before sunset");
    }
  },
  {
    name: "computeSunriseSunset invalid date returns dashes",
    fn: function () {
      var out = computeSunriseSunset("invalid", 52, 13);
      expect(out.sunrise === "—" && out.sunset === "—", "Invalid date should return —");
    }
  }
];

var started = Date.now();
var failures = [];
tests.forEach(function (test) {
  try {
    test.fn();
  } catch (err) {
    failures.push({ name: test.name, error: err.message });
  }
});
var elapsed = Date.now() - started;
var passed = tests.length - failures.length;

console.log("Executed " + tests.length + " tests in " + elapsed + "ms.");
console.log(passed + " passed, " + failures.length + " failed.");
failures.forEach(function (f) {
  console.log("FAIL: " + f.name + " - " + f.error);
});
process.exit(failures.length > 0 ? 1 : 0);
