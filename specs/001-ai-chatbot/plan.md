# Implementation Plan: AI Chatbot Page

**Branch**: `001-ai-chatbot` | **Date**: 2025-12-06 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-ai-chatbot/spec.md`

## Summary

Implement a simple chatbot page using the Vercel AI SDK with AI Elements components (built on shadcn UI) for the frontend, and the ai-sdk-provider-claude-code community package to connect to Claude via the Claude Code CLI. Authentication uses an OAuth token stored in `.env.local`. The chat supports text messages only with real-time streaming responses.

## Technical Context

**Language/Version**: TypeScript 5.x with strict mode enabled
**Primary Dependencies**:
- Next.js 16.0.7 (App Router)
- React 19.2.0 with React Compiler
- Vercel AI SDK (`ai`, `@ai-sdk/react`)
- ai-sdk-provider-claude-code (community Claude Code provider)
- AI Elements (shadcn.io components for chat UI)
- Tailwind CSS 4

**Storage**: N/A (session-based, no persistence)
**Testing**: Manual testing initially; Biome for linting
**Target Platform**: Web browser (Next.js application)
**Project Type**: Web application (Next.js App Router)
**Performance Goals**: Real-time streaming responses; responsive UI
**Constraints**: Requires Claude Code CLI authenticated locally
**Scale/Scope**: Single chatbot page; session-based conversations

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Simplicity-First | PASS | Simple chat page with minimal features; no premature abstractions |
| II. TypeScript Strict | PASS | Project already uses `strict: true` in tsconfig.json |
| III. Test Coverage | PASS | Manual testing for MVP; can add integration tests later |
| IV. Component Patterns | PASS | Using AI Elements (shadcn-based) with clear component responsibilities |
| V. Performance | PASS | Streaming responses; no unnecessary dependencies |

**Quality Gates**:
- Biome: Will verify with `bun run lint` and `bun run format`
- TypeScript: Will verify with `bun run build`
- Code Review: N/A for initial implementation
- Tests: Manual verification of acceptance scenarios

## Project Structure

### Documentation (this feature)

```text
specs/001-ai-chatbot/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output (created by /speckit.tasks)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts        # API route for chat streaming
│   ├── page.tsx                # Chat page (main entry)
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles (includes streamdown)
└── components/
    └── ai-elements/            # AI Elements components (installed via CLI)
        ├── conversation.tsx
        ├── message.tsx
        └── prompt-input.tsx
```

**Structure Decision**: Using Next.js App Router structure with API route for chat endpoint. AI Elements components will be installed to `src/components/ai-elements/` following the shadcn pattern.

## Complexity Tracking

> No Constitution violations. All principles are met with the current design.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | - | - |
