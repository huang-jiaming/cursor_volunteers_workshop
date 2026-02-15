async function loadManifest() {
  const candidates = ["/docs/projects/manifest.json", "projects/manifest.json"];
  let lastError;

  for (const url of candidates) {
    try {
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: HTTP ${response.status}`);
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error(`Manifest from ${url} is not an array`);
      }
      return data;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error("Unable to load manifest.json");
}

function renderError(target, message) {
  if (!target) return;
  target.innerHTML = `<div class="error-box">${message}</div>`;
}

function toProjectUrl(path) {
  if (typeof path !== "string") return "#";
  return path.startsWith("/") ? path : path;
}

async function initGalleryPage() {
  const grid = document.getElementById("gallery-grid");
  if (!grid) return;
  const count = document.getElementById("entry-count");

  try {
    const entries = await loadManifest();
    count.textContent = `${entries.length} project${entries.length === 1 ? "" : "s"}`;

    if (entries.length === 0) {
      grid.innerHTML = `<div class="project-card"><p>No entries yet.</p></div>`;
      return;
    }

    grid.innerHTML = entries
      .map((entry) => {
        const name = entry.name || "unknown";
        const title = entry.title || "Untitled Project";
        const href = toProjectUrl(entry.path || "#");
        return `
          <article class="project-card">
            <h3>${title}</h3>
            <p class="muted">@${name}</p>
            <a href="${href}">Open project</a>
          </article>
        `;
      })
      .join("");
  } catch (error) {
    count.textContent = "Failed to load entries";
    renderError(grid, `Could not load manifest.json: ${error.message}`);
  }
}

async function initCyclePage() {
  const frame = document.getElementById("cycle-frame");
  if (!frame) return;

  const status = document.getElementById("cycle-current");
  const nextBtn = document.getElementById("next-btn");
  const prevBtn = document.getElementById("prev-btn");
  const controlsWrap = nextBtn?.parentElement;

  let entries = [];
  let index = 0;

  function updateFrame() {
    if (entries.length === 0) {
      frame.src = "about:blank";
      status.textContent = "No entries found in manifest.";
      return;
    }

    const current = entries[index];
    const title = current.title || current.name || "Untitled";
    const path = toProjectUrl(current.path || "about:blank");
    frame.src = path;
    status.textContent = `Showing ${index + 1} of ${entries.length}: ${title} (${path})`;
  }

  nextBtn?.addEventListener("click", () => {
    if (entries.length === 0) return;
    index = (index + 1) % entries.length;
    updateFrame();
  });

  prevBtn?.addEventListener("click", () => {
    if (entries.length === 0) return;
    index = (index - 1 + entries.length) % entries.length;
    updateFrame();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      nextBtn?.click();
    } else if (event.key === "ArrowLeft") {
      prevBtn?.click();
    }
  });

  try {
    entries = await loadManifest();
    updateFrame();
  } catch (error) {
    status.textContent = "Failed to load entries";
    renderError(controlsWrap, `Could not load manifest.json: ${error.message}`);
  }
}

initGalleryPage();
initCyclePage();
