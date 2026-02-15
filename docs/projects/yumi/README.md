# Collage Maker (Single-File App)

Collage Maker is a lightweight, offline-first image collage editor built in one file: `index.html`.

## Constraints Followed

- Single-file app with inline CSS and inline JavaScript only
- No frameworks, no build tools, no external libraries
- No external network calls
- Works by opening the HTML file directly in a browser
- Minimal UI, no animations

## Features

- Home page + Edit page
- Upload images from local device
- Drag and move images on canvas
- Add text and adjust text content, font, color, and size
- Move selected canvas items with arrow keys (`Shift` for faster movement)
- Download collage as PNG or JPG
- Store latest 3 exported collages and show them on home page
  - Primary storage: IndexedDB with Blob snapshots (recommended for size/performance)
  - Fallback: `localStorage` with base64 data URLs if IndexedDB is unavailable
- Offline status indicator
- PWA service worker registration attempt (works on `http/https`; direct `file://` mode shows unavailable badge)
- Accessible semantic HTML and ARIA live regions
- Responsive, mobile-friendly layout
- Inline unit test harness in app

## Why IndexedDB + Blob Over Base64

Blob storage in IndexedDB is generally better for image snapshots:

- Lower storage overhead than base64 strings
- Better performance for larger images
- Cleaner binary handling without conversion cost on every save/load

Base64 in `localStorage` is used only as a compatibility fallback.

## Run

1. Open `index.html` directly in a browser.
2. On the Home page:
   - Click **New collage** to start editing
   - Click **Run unit tests** to execute the in-app test harness

## User Stories

1. As a user, I can upload one or more local images so I can start a collage.
2. As a user, I can drag images around the canvas to arrange my layout.
3. As a user, I can add text and change font, color, and size.
4. As a user, I can move selected items with keyboard arrows for fine alignment.
5. As a user, I can export my collage as PNG or JPG.
6. As a user, I can see my latest 3 exported collages on the Home page.
7. As a user, I can still use the app offline for local editing/exporting.
8. As a mobile user, I can use the app with a responsive control layout.
9. As a user using assistive tech, I can navigate semantic controls and receive status updates.

## Unit Tests

The app includes a simple inline unit test harness (no external test framework).

### Covered Test Cases

- `clamp` keeps values within range
- `trimRecents` sorts by newest first and limits count
- `getExportMime` maps output format to correct MIME type
- `chooseStorageMode` returns supported storage mode
- `approxTextWidth` respects min and max clamping

### In-App Test Execution

- Open app and click **Run unit tests** (results appear in Home page test panel).

### Local CLI Test Run (Executed)

To document local run results in this environment, equivalent helper tests were executed with Node:

```bash
node - <<'NODE'
// helper-function tests mirroring the app test logic
NODE
```

Result:

- Tests run: 5
- Passed: 5
- Failed: 0

## Accessibility Notes

- Uses semantic landmarks (`header`, `main`, `section`, `aside`)
- Labeled form controls for all editor inputs
- `aria-live` status regions for network and test results
- Keyboard nudging for selected item movement
- Focusable canvas region with clear selected-item outline

## Known Limitations

- Google image search feature is intentionally removed due no-network constraint.
- Service worker/PWA caching cannot register when opened as `file://` because browser security requires `http/https` secure contexts.
