# Smart To-Do List (Single-File App)

This project is a local, zero-dependency to-do list built as a single `index.html` file.

## Location

- `docs/projects/jia/index.html`

## Constraints Covered

- Single-file app (`index.html`) with inline CSS and inline JavaScript only
- No frameworks, build tools, external libraries, or network calls
- Works by opening the HTML directly in a browser (`file://.../index.html`)
- Minimal UI, no animations
- Organized code with small helper functions and clear sections

## Features

- Create tasks with:
  - task title
  - end-date
  - estimated time in hours and/or minutes
  - priority (`High`, `Medium`, `Low`)
- Living task list with:
  - add, edit, delete
  - mark complete/incomplete
- Workload allowances:
  - default daily allowance
  - single-day override
  - weekly recurring day override (e.g., every Monday)
- Smart overload suggestions:
  - detects overloaded days
  - suggests moving lowest-priority tasks first
  - warns if suggested move lands after end-date
- Prominent today recap:
  - inline recap banner
  - dedicated modal for today's top-priority tasks
- Local persistence:
  - uses `localStorage`
- Demo data:
  - prepopulated example tasks and allowance rules

## How To Run

1. Open `docs/projects/jia/index.html` directly in your browser.
2. Use **Reset to Demo Data** any time to restore the populated example dataset.
3. Use **Run Tests** to execute unit tests in-app.

## User Stories

1. As a user, I can add a task with title, end-date, estimate, and priority so I can track planned work.
2. As a user, I can edit and delete tasks so my list remains current.
3. As a user, I can mark tasks complete so finished work is clearly separated.
4. As a user, I can set a default daily allowance and per-day overrides so workload matches my availability.
5. As a user, I can set recurring weekly overrides for specific weekdays so routine availability is reflected automatically.
6. As a user, I can see overloaded days and suggestions to move lowest-priority tasks first so I can rebalance my schedule.
7. As a user, I get warnings when a suggestion moves work after its end-date so I can make informed trade-offs.
8. As a user, I can quickly view today's highest-priority tasks in a prominent recap modal.

## Unit Tests

The app includes an internal test runner (no external libraries) and executes tests on load and on demand.

### What Is Tested

- Estimate conversion from hours/minutes to total minutes
- Allowance precedence (`single-day override > weekly override > default`)
- Capacity overload calculations
- Move suggestion priority ordering (lowest priority moved first)
- Today's recap task filtering
- Warning behavior for suggestions moved past end-date

### Latest Local Test Run

- Executed locally via Node (same unit test logic as app test runner):
  - Command: `node -e "<test harness>"`
  - Result: `Executed 7 tests in 4ms`
  - Result: `7 passed, 0 failed`
- The same tests also run automatically inside the app under **Unit Tests**.

## Notes

- Data is stored in browser `localStorage` under key `jia_smart_todo_v1`.
- Use **Clear App Storage** to reset local state.
