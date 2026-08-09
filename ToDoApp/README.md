# ToDoApp — Roadmap to Industry Standard

This is a prioritized action plan, not a wishlist. Tiers are ordered by
impact-to-effort ratio. Do Tier 1 before anything else — it fixes actual
bugs. Tiers 2–4 are what separates a portfolio project from a
production-grade one.

---

## Tier 1 — Correctness fixes (do these first, ~1–2 hrs)

These are bugs, not style preferences. Fix before adding any new feature.

- [ ] **Replace the `keyId` counter with `crypto.randomUUID()`**
      Manual incrementing breaks the moment you add persistence or any
      concurrent write path (multi-tab, undo, sync).

  ```js
  const taskEle = {
    id: crypto.randomUUID(),
    taskText: trimmedTask,
    isMarkdone: false,
    isEditing: false,
  };
  ```

- [ ] **Stop storing `taskCount` as derived state**
      Delete the `useEffect` + `setTaskCount` entirely. Compute inline during
      render — no extra state, no double re-render:

  ```js
  const taskCount = {
    total: tasksList.length,
    completed: tasksList.filter((t) => t.isMarkdone).length,
    pending: tasksList.filter((t) => !t.isMarkdone).length,
  };
  ```

- [ ] **Guard every mutation against `isEditing`, not just `MarkAllComplete`**
      `DeleteTask`, `MarkDownTask`, and `AddTaskinList`'s duplicate-check should
      all respect a task currently being edited, or explicitly decide (and
      comment) that deleting mid-edit is intentional.

- [ ] **Remove `console.log` from `TaskList.jsx` and `TaskView.jsx`**
      The `TaskView` one fires once per row per render — pure log spam at scale.

- [ ] **Replace `alert()` with inline validation UI**
      Blocking native dialogs aren't acceptable in any real product. Add an
      `error` state and render a Bootstrap `alert-danger` div under the input,
      or a toast.

- [ ] **Extract the duplicate-check into one shared helper**
      Both `AddTaskinList` and `SaveTask` reimplement the same
      case-insensitive scan. Pull it into `src/utils/taskHelpers.js`:
  ```js
  export const isDuplicateTask = (list, text, excludeId = null) =>
    list.some(
      (t) =>
        t.id !== excludeId && t.taskText.toUpperCase() === text.toUpperCase(),
    );
  ```

---

## Tier 2 — Make it a real app (persistence + robustness, ~half a day)

- [ ] **Persist to `localStorage`**
      Load on mount, save on every `tasksList` change. Wrap in try/catch
      (private browsing / quota errors happen).

  ```js
  const [tasksList, setTasksList] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("tasks")) ?? [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasksList));
  }, [tasksList]);
  ```

- [ ] **Extract todo state logic into a custom hook**
      `src/hooks/useTasks.js` — move all the handlers (`AddTaskinList`,
      `SaveTask`, `DeleteTask`, etc.) out of `App.jsx`. `App.jsx` should just
      call `const { tasksList, addTask, deleteTask, ... } = useTasks();` and
      wire up layout. This is the single biggest step toward "reviewable by a
      senior engineer" — it separates business logic from presentation.

- [ ] **Rename functions to camelCase**
      `AddTaskinList` → `addTask`, `MarkDownTask` → `markTaskDone`,
      `ClearInputTask` → `clearInput`. React convention reserves PascalCase for
      components only. Also fix the "Markdown" typo (should read "mark done").

- [ ] **Add basic filtering (All / Active / Completed)**
      Nearly every reference todo app implementation includes this — it's the
      feature that most exercises derived state / memoization done correctly.

- [ ] **Add editing keyboard support**
      Enter to save, Escape to cancel, in `TaskInput.jsx`.

---

## Tier 3 — Code quality & tooling (½–1 day)

- [ ] **Add PropTypes or migrate to TypeScript**
      For a project this size, TypeScript is the better long-term investment —
      it documents the `Task` shape once (`{id, taskText, isMarkdone, isEditing}`)
      and the compiler catches prop-shape bugs your tests won't.

- [ ] **Add Prettier + a pre-commit hook (`husky` + `lint-staged`)**
      You already have ESLint configured — pair it with formatting enforcement
      so style is never a PR discussion.

- [ ] **Add a `CHANGELOG.md` and commit convention**
      Even `feat:`, `fix:`, `chore:` prefixes (Conventional Commits) — cheap to
      adopt, signals process discipline to anyone reviewing your repo.

- [ ] **Environment-gate debug logging**
      If you keep any logs, wrap them: `if (import.meta.env.DEV) console.log(...)`.

---

## Tier 4 — Testing & CI (1–2 days, biggest resume signal)

- [ ] **Unit test the extracted `useTasks` hook** with
      `@testing-library/react-hooks` or `renderHook` from RTL — add, delete,
      edit, duplicate-rejection, mark-complete-while-editing.

- [ ] **Component tests with React Testing Library**
      At minimum: `AddTask` rejects empty/duplicate input, `TaskView` renders
      strikethrough on completed, `TaskInput` calls `SaveTask` with trimmed text.

- [ ] **GitHub Actions CI**
      `.github/workflows/ci.yml` running `npm run lint` and `npm test` on every
      PR. This — more than any single code change — is what makes a repo read
      as "maintained," and it's ~15 lines of YAML.

  ```yaml
  name: CI
  on: [push, pull_request]
  jobs:
    build:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - uses: actions/setup-node@v4
          with: { node-version: 20 }
        - run: npm ci
        - run: npm run lint
        - run: npm test
  ```

- [ ] **Deploy + link it**
      Vercel/Netlify free tier, add the live link and a screenshot/GIF to the
      README. An unreviewable-in-browser project is a weaker portfolio piece
      regardless of code quality.

---

## What "industry standard" actually buys you here

Tier 1 fixes bugs a reviewer would block a PR on. Tier 2 is the difference
between a tutorial exercise and something a user could actually keep using.
Tier 3 is what makes the codebase pleasant to extend. Tier 4 is what a
hiring manager or teammate actually checks before trusting the repo — tests
and CI say more about engineering maturity than any individual clever line
of code.

If you only have time for one tier, do **Tier 1 + the `useTasks` hook
extraction from Tier 2** — that's ~3 hours of work and it moves this from
a 6/10 to a solid 8/10 on its own.
