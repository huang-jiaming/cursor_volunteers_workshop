# Smart To-Do List Demo (Single-File App)

This project is a local, zero-dependency to-do list built as a single `index.html` file.

## Location

- `docs/projects/demo/index.html`

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
  - estimated time (hours/minutes)
  - priority (`High`, `Medium`, `Low`)
- Living task list with:
  - add, edit, delete
  - mark complete/incomplete
- Workload allowances:
  - default daily allowance
  - per-day override
- Smart overload suggestions:
  - detects overloaded days
  - suggests moving lowest-priority tasks first
  - warns if suggested move lands after end-date
- Prominent today recap:
  - inline recap banner of today’s top priority tasks
- Local persistence:
  - uses `localStorage`
- Demo data:
  - prepopulated example tasks and allowance rules

## How To Run

1. Open `docs/projects/demo/index.html` directly in your browser.
2. Use **Reset to Demo Data** any time to restore the populated example dataset.
3. Use **Run Tests** to execute unit tests in-app.

## User Stories

1. As a user, I can add a task with title, end-date, estimate, and priority so I can track planned work.
2. As a user, I can edit and delete tasks so my list remains current.
3. As a user, I can mark tasks complete so finished work is clearly separated.
4. As a user, I can set a default daily allowance and per-day overrides so workload matches my availability.
5. As a user, I can see overloaded days and suggestions to move lowest-priority tasks first so I can rebalance my schedule.
6. As a user, I get warnings when a suggestion moves work after its end-date so I can make informed trade-offs.
7. As a user, I can quickly view today’s highest-priority tasks in a prominent recap.

## Unit Tests

The app includes an internal test runner (no external libraries) and executes tests on load and on demand.

### What Is Tested

- Estimate conversion from hours/minutes to total minutes
- Allowance precedence (`single-day override > default`)
- Capacity overload calculations
- Move suggestion priority ordering (lowest priority moved first)
- Today recap task filtering
- Warning behavior for suggestions moved past end-date

### Local Test Execution (Node)

Use this command to run the same unit tests locally without a browser:

```
node -e "const fs=require('fs');const html=fs.readFileSync('docs/projects/demo/index.html','utf8');const m=html.match(/\\/\\* TEST_EXPORT_START \\*\\/[\\s\\S]*?\\/\\* TEST_EXPORT_END \\*\\//);if(!m){throw new Error('Test export block not found');}eval(m[0]);const res=SmartTodoLogic.runUnitTests();console.log('Executed '+res.total+' tests in '+res.elapsedMs+'ms');console.log(res.passed+' passed, '+res.failed+' failed');if(res.failed){process.exit(1);}"
```

### Latest Local Test Run

- Command: `node -e "<see above>"`
- Result: `Executed 6 tests in 5ms`
- Result: `6 passed, 0 failed`

## Notes

- Data is stored in browser `localStorage` under key `demo_smart_todo_v1`.
