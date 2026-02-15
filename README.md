# Workshop Gallery (GitHub Pages via `/docs`)

This repository hosts a static gallery of student submissions for the workshop prompt:

> **How will I use Cursor to improve the efficiency of one of my daily workflows?**

The site is served by GitHub Pages from the `main` branch, `/docs` folder.

## Repository structure

```text
docs/
  index.html
  cycle.html
  assets/
    style.css
    script.js
  _template/
    index.html
    style.css
  projects/
    manifest.json
    example/
      index.html
.github/workflows/
  ci.yml
submissions/
  README.md
```

## Student submission path A: GitHub branch + PR

1. Create a branch:
   - `git checkout -b add-<your-name>`
2. Copy the template folder:
   - copy `docs/_template/` into `docs/projects/<your-name>/`
3. Rename folder to your valid `name`:
   - must match regex `^[a-z0-9-]+$`
   - examples: `alex-chen`, `team2`, `sara-1`
4. Edit `docs/projects/<your-name>/index.html` with your content.
5. (Optional) add extra files in your folder if needed.
6. Add a manifest entry in `docs/projects/manifest.json`:

```json
{
  "name": "your-name",
  "title": "Your workflow title",
  "path": "projects/your-name/"
}
```

7. Commit, push, and open a PR to `main`.
8. Wait for CI to pass, then merge.

## Student submission path B: No GitHub account (.zip submission)

Students send a zip containing exactly one folder named with the same rule (`^[a-z0-9-]+$`), with `index.html` inside it.

Host imports it by:
1. Unzipping outside repo.
2. Copying folder to `docs/projects/<name>/`.
3. Adding manifest entry in `docs/projects/manifest.json`.
4. Pushing a PR/commit and confirming CI passes.

Detailed host-safe steps are in `submissions/README.md`.

## How to create your project folder and copy template

From repo root:

1. Copy `docs/_template` to `docs/projects/<your-name>`.
2. Edit `docs/projects/<your-name>/index.html`.
3. Keep required sections:
   - workflow title
   - Before Cursor steps
   - With Cursor steps
   - one prompt (code block)
   - one failure/bug + debugging story
   - one measurable improvement
   - optional next improvement
4. Add your manifest entry.

## Local preview

Because this site uses `fetch()` for `manifest.json`, open it with a local web server (not direct file open).

From repo root:

```bash
python3 -m http.server 8000
```

Then visit:
- `http://localhost:8000/docs/` (gallery)
- `http://localhost:8000/docs/cycle.html` (cycle mode)

## Host zip import steps (exact)

1. Receive `<name>.zip`.
2. Extract to temp directory.
3. Verify folder name matches `^[a-z0-9-]+$`.
4. Verify extracted folder includes `index.html`.
5. Copy extracted folder to `docs/projects/<name>/`.
6. Add manifest entry:
   - `"name": "<name>"`
   - `"title": "<student title>"`
   - `"path": "projects/<name>/"`
7. Run CI (push branch or open PR) and ensure checks pass.
8. Merge to `main`.

## Enable GitHub Pages (main + `/docs`)

1. Open repository on GitHub.
2. Go to **Settings** -> **Pages**.
3. Under **Build and deployment**, set:
   - **Source**: Deploy from a branch
   - **Branch**: `main`
   - **Folder**: `/docs`
4. Save settings.
5. After deployment, your site URL appears on the same page.
