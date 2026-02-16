# Networked Hiking Poll (Single-File App)

A minimal app to make group hike planning more efficient: create a poll with hike options, vote, and see mock weather plus sunrise/sunset for the most-selected hike.

## Location

- `docs/projects/oguzhan/index.html`

## Constraints

- Single-file app: one `index.html` with inline CSS and inline JavaScript only
- No frameworks, build tools, external libraries, or network calls
- Works by opening the HTML file directly in a browser (`file://.../index.html`)
- Minimal UI, no animations
- Readable, organized code with small helper functions

## Features

- **Poll:** Set a poll title and add hike options (name, date, latitude, longitude).
- **Voting:** Each option has a "Vote" button; vote counts are shown.
- **Winner:** The option with the most votes is shown as "Most selected hike."
- **Weather:** Mock weather (condition, temp, wind) for the winning hike’s location (from a small static map; no API).
- **Sunrise / sunset:** Computed from the winning hike’s date and lat/lon using a standard algorithm (no API).
- **Persistence:** Poll and votes are stored in `localStorage` so they survive refresh.

## How to run

1. Open `docs/projects/oguzhan/index.html` directly in your browser.
2. Optionally use the "Back to Gallery" link if you opened the app from the repo gallery (with a local server).

## User stories

1. As a user, I can create a poll with a title and add hike options (name, date, location with lat/lon) so we can choose a group hike.
2. As a user, I can vote for one hike option so my preference is counted.
3. As a user, I can see which option has the most votes so we know the winning hike.
4. As a user, I see mock weather (condition, temp, wind) for the winning hike’s location so I have an idea of conditions.
5. As a user, I see sunrise and sunset times for the winning hike’s date and location so I can plan timing.
6. As a user, my poll and votes persist after refresh (via `localStorage`).

## Unit tests

The app includes an in-app test runner (no external libraries). Tests run on load and when you click **Run Tests**.

### What is tested

- **getWinningOption:** Returns `null` when there are no options; returns `null` when all options have zero votes; returns the option with the most votes when there is at least one vote.
- **getMockWeather:** Returns the expected object for known location names (e.g. "Blue Trail", "Red Trail"); returns a default "—" object for unknown locations.
- **computeSunriseSunset:** Returns times in `HH:MM` format; sunrise is before sunset for a summer mid-latitude date; invalid date string returns "—" for both sunrise and sunset.

### How to run tests in the app

1. Open `index.html` in a browser.
2. Click the **Run Tests** button in the "Unit tests" section.
3. Read the result line (e.g. "8 passed, 0 failed") and any failure messages below.

### How to run tests locally

**Option A – In the app:** Open `index.html` in a browser and click **Run Tests**. The result appears in the Unit tests section.

**Option B – Browser console:** Open `index.html`, open the developer console (F12), and run:
```js
window.hikingAppTestApi.runUnitTests()
```
The return value is `{ total, passed, failed, failures, elapsedMs }`; the same summary is shown in the page.

**Option C – Node (same test logic, no DOM):** From the repository root, run:
```bash
node docs/projects/oguzhan/run-tests.js
```
This uses the script `docs/projects/oguzhan/run-tests.js`, which contains the same pure logic and assertions as the in-app tests. Expected output: `Executed 8 tests in &lt;n&gt;ms.` and `8 passed, 0 failed.`

### Latest test run (documented results)

- **In-app:** Open the file, click **Run Tests**. Expected: **8 passed, 0 failed** (8 tests in a few ms).
- **Console:** `window.hikingAppTestApi.runUnitTests()` → `{ total: 8, passed: 8, failed: 0, failures: [], elapsedMs: &lt;small number&gt; }`.
- **Node:** `node docs/projects/oguzhan/run-tests.js` → exit code 0, output: `8 passed, 0 failed`.

If any test fails, the UI or script output will show the failing test name and error message.

## Notes

- Data is stored in `localStorage` under the key `oguzhan_hiking_poll_v1`. Clear site data for this origin to reset.
- Mock weather is defined for: "Blue Trail", "Red Trail", "Summit Loop", "Lake Path", "Forest Loop". Any other location name shows "—" for weather.
- Sunrise/sunset times are in local mean time (approximation from longitude). No timezone or network is used.
