# Zip Submission Import Guide (Host)

Use this process when students submit work as a `.zip` instead of opening a GitHub PR.

## 1) Receive and inspect the zip

1. Save the student's zip file locally.
2. Unzip to a temporary location outside this repo.
3. Confirm the extracted folder name matches the naming rule:
   - lowercase letters, numbers, hyphens only
   - regex: `^[a-z0-9-]+$`
4. Confirm it contains `index.html` at the folder root.

Expected extracted structure:

```text
<student-name>/
  index.html
  (optional assets/files)
```

## 2) Copy folder into the repo

From repo root:

1. Copy the student folder into `docs/projects/<student-name>/`.
2. Verify file exists at `docs/projects/<student-name>/index.html`.

## 3) Update manifest

Edit `docs/projects/manifest.json` and add:

```json
{
  "name": "<student-name>",
  "title": "<student project title>",
  "path": "projects/<student-name>/"
}
```

Rules:
- `name` must be unique.
- `path` must exactly match `projects/<name>/`.
- Keep JSON valid (comma placement, quotes, etc.).

## 4) Validate and merge

1. Open a branch (or commit directly to main if this is your process).
2. Push changes and open a PR.
3. Ensure GitHub Action CI passes.
4. Merge to `main`.

After merge, GitHub Pages serves the new submission from `/docs`.
