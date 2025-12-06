<!--
SYNC IMPACT REPORT
==================
Version change: N/A → 1.0.0 (initial adoption)
Modified principles: N/A (initial)
Added sections:
  - Core Principles (5 principles)
  - Quality Gates
  - Governance
Removed sections: N/A (initial)
Templates requiring updates:
  - .specify/templates/plan-template.md: ✅ Compatible (Constitution Check section exists)
  - .specify/templates/spec-template.md: ✅ Compatible (requirements align)
  - .specify/templates/tasks-template.md: ✅ Compatible (test phases align with Test Coverage principle)
Follow-up TODOs: None
-->

# My Chatbot Constitution

## Core Principles

### I. Simplicity-First

Every solution MUST follow YAGNI (You Aren't Gonna Need It) and KISS (Keep It Simple, Stupid) principles.

- Code MUST solve the immediate problem without speculative features
- Abstractions MUST NOT be created until a pattern repeats three or more times
- Configuration MUST have sensible defaults; avoid premature configurability
- Dependencies MUST be added only when they provide clear, measurable value over native solutions
- Complexity MUST be justified in writing before implementation

**Rationale**: Simple code is easier to understand, debug, maintain, and extend. Premature optimization and abstraction create technical debt.

### II. TypeScript Strict

All code MUST be written in TypeScript with strict compiler enforcement.

- The `strict` compiler option MUST remain enabled in `tsconfig.json`
- The `any` type MUST NOT be used; prefer `unknown` with type guards when types are uncertain
- All function parameters and return types MUST have explicit type annotations
- Type assertions (`as`) SHOULD be avoided; prefer type guards or proper typing
- Generic types MUST have meaningful constraints where applicable

**Rationale**: Strict typing catches errors at compile time, improves IDE support, and serves as living documentation.

### III. Test Coverage

Critical application paths MUST have test coverage.

- User-facing features MUST have at least one integration or end-to-end test
- Business logic functions MUST have unit tests covering happy path and key edge cases
- Bug fixes SHOULD include a regression test
- Tests MUST be independent and not rely on execution order
- Test files MUST be co-located with source files or in a parallel `__tests__` directory

**Rationale**: Tests provide confidence in refactoring, prevent regressions, and document expected behavior.

### IV. Component Patterns

UI code MUST follow reusable component patterns with composition over inheritance.

- Components MUST have a single, clear responsibility
- Props MUST be typed with explicit interfaces (not inline types)
- Shared UI patterns MUST be extracted into reusable components in `src/components/`
- Components MUST accept `className` for styling flexibility where applicable
- State MUST be lifted to the lowest common ancestor; avoid prop drilling beyond 2 levels

**Rationale**: Reusable, composable components reduce duplication, enable consistent UI, and simplify testing.

### V. Performance

Code MUST be optimized for runtime performance and bundle size.

- Images MUST use Next.js `<Image>` component with appropriate sizing
- Large dependencies MUST be lazy-loaded or code-split
- Components MUST NOT cause unnecessary re-renders; use `memo`, `useMemo`, `useCallback` judiciously
- API calls MUST implement appropriate caching strategies
- Bundle size increases MUST be justified for new dependencies

**Rationale**: Performance directly impacts user experience, SEO, and infrastructure costs.

## Quality Gates

All code changes MUST pass these gates before merge:

- **Biome**: All code MUST pass `bun run lint` and `bun run format` without errors
- **TypeScript**: Build MUST succeed via `bun run build` with zero type errors
- **Code Review**: All changes MUST be reviewed by at least one team member before merge
- **Tests**: All existing tests MUST pass; new features MUST include relevant tests

## Governance

This constitution defines the non-negotiable standards for the My Chatbot project.

- **Authority**: This constitution supersedes conflicting practices in other documentation
- **Amendments**: Changes require documented rationale, team review, and version increment
- **Compliance**: All pull requests MUST be verified against these principles during code review
- **Exceptions**: Principle violations MUST be documented with justification in the Complexity Tracking section of the implementation plan
- **Guidance**: See `CLAUDE.md` for runtime development guidance and commands

**Version**: 1.0.0 | **Ratified**: 2025-12-06 | **Last Amended**: 2025-12-06
