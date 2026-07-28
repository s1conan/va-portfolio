# AGENTS.md

## Coding Preferences

### Styling
- **Avoid inline Tailwind flooding** — create reusable classes in `globals.css` using `@apply` for highly repetitive patterns (e.g., custom buttons, cards) and use shared CSS classes ensure consistent styling across components and easy future updates
- Use Tailwind for one-off utilities and structural layouts, not deeply repeated UI patterns.
- Ensure Tailwind utility classes cover small (`sm:`), medium (`md:`), and large (`lg:`, `xl:`) breakpoints to guarantee flawless responsive design.
- For component variants, prefer using **Class Variance Authority (`cva`)** matching shadcn patterns rather than raw string concatenation.

### Code Surgery
- **Always use surgical edits** — never overwrite existing code with full file rewrites
- **Read before editing** — never guess what exists in a file
- Prefer minimal, targeted changes over complete rewrites
- Preserve user's custom code, comments, and existing modifications
- If editing a large file, use comments like `// ... existing code ...` strictly to skip unchanged sections, but ensure the modified section has full context.
- When editing code is risky, create a backup file before overwriting the old code

### TypeScript
- Strict mode enabled
- Prefer `interface` for object shapes, `type` for unions
- **NEVER use `any`** — use `unknown` with proper type guards, or define proper types
- If TypeScript complains about `any`, fix the root cause, don't silence it
- Enable strict ESLint rules to catch `any` usage at lint time

### Naming Conventions
- **camelCase** for all identifiers (variables, functions, methods)

### Error Handling
- **No silent failures** — always handle or propagate errors explicitly
- Use typed error classes or discriminated unions for error states
- Implement error boundaries for React component trees
- Return error states from functions, don't throw unless exceptional
- Log errors with context for debugging (user ID, action, stack trace)

### Import Organization
- **Sort imports by category** — components with components, utils with utils, types with types
- Follow this order: 1) React/next imports, 2) external libraries, 3) internal components, 4) internal utils/types, 5) styles

## Tech Stack
- Next.js (latest)
- TypeScript (strict mode)
- shadcn components
- Tailwind CSS (latest)
- Vitest + React Testing Library (unit)
- Playwright (E2E)

## Quality Gates
- Run lint and typecheck commands before marking tasks complete
- Follow existing naming conventions in the codebase
- TDD for business logic — test first, then implement
- **Proactive Verification**: Do not just assume the code works. If a task involves complex logic, explicitly state the terminal output or test results of your verification run in your response.

## Git Workflow

### Branch Naming
```
feature/<TICKET>-short-description
fix/<TICKET>-short-description
hotfix/<TICKET>-short-description
refactor/<TICKET>-short-description
docs/<TICKET>-short-description

Examples:
- feature/AUTH-123-user-login
- fix/UI-456-sidebar-z-index
```

### Commit Messages (Conventional Commits)
```
<type>(<scope>): <description>

Types:
- feat:     New feature
- fix:      Bug fix
- docs:     Documentation changes
- style:    Formatting, missing semicolons, etc.
- refactor: Code change that neither fixes a bug nor adds a feature
- test:     Adding or updating tests
- chore:    Maintenance tasks

Examples:
- feat(auth): add login form validation
- fix(cart): correct price calculation edge case
- docs(readme): update installation steps
```
## Next.js / React Patterns
- Server components by default — add `'use client'` only when interactivity or browser hooks (`useState`, `useEffect`) are required.
- **Async Request APIs**: Remember that `params`, `searchParams`, `cookies()`, and `headers()` are asynchronous. Always `await` them before accessing properties.
- **Form Mutations**: Use Server Actions coupled with React's native `useActionState` and `useTransition` hooks for handling form submission loading and error states.
- Keep route handlers minimal; delegate business logic to the `services/` layer.

## Performance
- **Lazy load heavy components** — use `dynamic()` or `lazy()` for modals, charts, large libraries
- **No unnecessary client components** — only add `'use client'` when needed (interactivity, hooks, browser APIs)
- **Lazy load routes** — don't import entire feature modules upfront
- **Memoize sparingly** — use `useMemo`/`useCallback` only for expensive computations, not every prop
- **Optimize images** — use `next/image` for automatic optimization
- **Prefetch links** — use `<Link>` instead of `<a>` for automatic prefetching
- **Debounce/throttle** — expensive operations (search, scroll handlers) should be debounced
- **Avoid prop drilling** — pass data through composition or context, not deep prop chains
- **Suspense boundaries** — wrap async components with Suspense for better loading UX

## State Management
- Prefer React Server Components / URL state over heavy client state
- Lift state only as high as necessary
- Use React Context sparingly — consider composability first
- Keep client state minimal and focused

## When to Ask
- **Always ask** when in doubt instead of making assumptions
- **Ask and clarify** if you don't understand the task
- **Admit it** if something is beyond your capability — don't fake it
- Ask before major refactors or architectural changes
- Ask when requirements are ambiguous

## Testing Approach
- **Unit tests**: Vitest + React Testing Library for components and hooks
- **E2E tests**: Playwright for critical user flows
- Test business logic first (TDD)
- Snapshot tests for stable UI components
- Coverage focus: critical paths and edge cases

## General Principles
- Explain *why* a change is needed, not just *what*
- Preserve user's existing work and customizations
- Incremental progress over big-bang rewrites

## Security
- Never commit secrets, API keys, or credentials to version control
- Use `.env.example` to document required environment variables
- Prefer server-side secrets management over client-side storage

## Accessibility (WCAG 2.1 AA)
- Use semantic HTML elements (`<button>`, `<nav>`, `<main>`, etc.)
- Provide alt text for all meaningful images
- Ensure keyboard navigation works for all interactive elements
- Maintain color contrast ratios (4.5:1 for normal text, 3:1 for large text)
- Add aria-labels for icon-only buttons
- Test with screen readers when adding complex components

## PR Checklist
- [ ] Code follows naming conventions and style guidelines
- [ ] No `any` types — all types properly defined
- [ ] No ESLint or TypeScript errors
- [ ] New features have tests (unit and/or E2E)
- [ ] Error states handled for all user interactions
- [ ] Accessibility tested (keyboard nav, screen reader)
- [ ] Mobile responsiveness verified
- [ ] Self-reviewed the diff — no debug code or console.logs left behind

## Recommended Folder Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Route groups
│   ├── (dashboard)/
│   └── api/               # API routes
├── components/
│   ├── ui/                # shadcn/base components
│   ├── features/          # Feature-specific components
│   └── layout/            # Layout components (Header, Sidebar)
├── lib/                   # Utilities, helpers, constants
├── hooks/                 # Custom React hooks
├── services/              # API clients, external services
├── stores/                # Client state (if needed)
├── types/                 # Shared TypeScript types/interfaces
└── styles/
    └── globals.css        # Shared styles, CSS variables
```
