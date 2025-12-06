# Tasks: AI Chatbot Page

**Input**: Design documents from `/specs/001-ai-chatbot/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Manual testing only (no automated tests requested)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Project type**: Next.js App Router (single web app)
- **Source**: `src/app/` for pages and API routes
- **Components**: `src/components/ai-elements/` for AI Elements

---

## Phase 1: Setup (Dependencies & Configuration)

**Purpose**: Install dependencies and configure project for AI chatbot development

- [x] T001 Install AI SDK core packages: `bun add ai @ai-sdk/react`
- [x] T002 Install Claude Code provider: `bun add ai-sdk-provider-claude-code`
- [x] T003 Initialize shadcn if not already configured: `npx shadcn@latest init`
- [x] T004 Install AI Elements components: `npx ai-elements@latest` (select conversation, message, prompt-input)
- [x] T005 Install additional dependencies: `bun add use-stick-to-bottom lucide-react`
- [x] T006 Add streamdown CSS import to src/app/globals.css

---

## Phase 2: Foundational (API Route)

**Purpose**: Core backend infrastructure that MUST be complete before ANY user story UI can work

**CRITICAL**: No frontend chat features will function until this phase is complete

- [x] T007 Create directory structure: `src/app/api/chat/`
- [x] T008 Implement chat API route in src/app/api/chat/route.ts with streamText and claudeCode provider

**Checkpoint**: API route ready - can test with curl/Postman before building UI

---

## Phase 3: User Story 1 - Send Message and Receive AI Response (Priority: P1) MVP

**Goal**: Users can type a message, submit it, and see an AI response streamed in real-time

**Independent Test**: Type "Hello" in input, press submit, verify message appears and AI responds with streamed text

### Implementation for User Story 1

- [x] T009 [US1] Create chat page layout in src/app/page.tsx with useChat hook integration
- [x] T010 [US1] Add PromptInputTextarea component for message input in src/app/page.tsx
- [x] T011 [US1] Add PromptInputSubmit button with status handling in src/app/page.tsx
- [x] T012 [US1] Implement handleSubmit function with empty input validation in src/app/page.tsx
- [x] T013 [US1] Add basic Message rendering with MessageContent and MessageResponse in src/app/page.tsx
- [x] T014 [US1] Verify streaming works: AI response text appears progressively

**Checkpoint**: User Story 1 complete - can send messages and receive streamed AI responses

---

## Phase 4: User Story 2 - View Conversation History (Priority: P2)

**Goal**: Users see all messages in chronological order with visual distinction between user/AI messages

**Independent Test**: Send 3+ messages, verify all appear in order, user messages visually distinct from AI messages

### Implementation for User Story 2

- [x] T015 [US2] Wrap messages in Conversation and ConversationContent components in src/app/page.tsx
- [x] T016 [US2] Add Message component with role-based styling (from={message.role}) in src/app/page.tsx
- [x] T017 [US2] Add ConversationScrollButton for auto-scroll in src/app/page.tsx
- [x] T018 [US2] Verify auto-scroll behavior: new messages scroll into view

**Checkpoint**: User Story 2 complete - full conversation history visible with role distinction and auto-scroll

---

## Phase 5: User Story 3 - Empty State Display (Priority: P3)

**Goal**: Users see a helpful empty state when first opening the chatbot

**Independent Test**: Load page fresh, verify empty state with icon, title, and description appears

### Implementation for User Story 3

- [x] T019 [US3] Add conditional rendering for empty state (messages.length === 0) in src/app/page.tsx
- [x] T020 [US3] Add ConversationEmptyState with MessageSquare icon, title, and description in src/app/page.tsx
- [x] T021 [US3] Verify empty state disappears after first message is sent

**Checkpoint**: User Story 3 complete - empty state shows on fresh load, disappears when conversation starts

---

## Phase 6: Polish & Validation

**Purpose**: Final verification and quality checks

- [x] T022 Run linting: `bun run lint`
- [x] T023 Run formatting: `bun run format`
- [x] T024 Run build to verify TypeScript: `bun run build`
- [x] T025 Manual verification: Test all acceptance scenarios from spec.md
- [x] T026 Verify quickstart.md checklist items pass

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 completion - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Phase 2 - core MVP functionality
- **User Story 2 (Phase 4)**: Depends on Phase 2 - can run in parallel with US1 or after
- **User Story 3 (Phase 5)**: Depends on Phase 2 - can run in parallel with US1/US2 or after
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Core chat functionality - no dependencies on other stories
- **User Story 2 (P2)**: Conversation display - independent, adds to US1
- **User Story 3 (P3)**: Empty state - independent, conditional UI

### Within Each User Story

- All US1 tasks modify same file (src/app/page.tsx) - execute sequentially
- All US2 tasks modify same file - execute sequentially
- All US3 tasks modify same file - execute sequentially

### Parallel Opportunities

- Phase 1 tasks T001-T005 can run in parallel (different package installations)
- US2 and US3 could be developed in parallel by different developers after US1 base is in place
- Polish tasks T022-T024 can run in parallel (different commands)

---

## Parallel Example: Setup Phase

```bash
# Launch all package installations together:
bun add ai @ai-sdk/react &
bun add ai-sdk-provider-claude-code &
bun add use-stick-to-bottom lucide-react &
wait
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T006)
2. Complete Phase 2: Foundational (T007-T008)
3. Complete Phase 3: User Story 1 (T009-T014)
4. **STOP and VALIDATE**: Test sending a message and receiving streamed response
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → API ready
2. Add User Story 1 → Can chat with AI (MVP!)
3. Add User Story 2 → Full conversation history visible
4. Add User Story 3 → Polished empty state experience
5. Each story adds value without breaking previous stories

### Single Developer Strategy

Execute phases in order:
1. Setup → Foundational → US1 → US2 → US3 → Polish

---

## Notes

- All frontend tasks modify src/app/page.tsx - commit frequently between tasks
- AI Elements components are installed to src/components/ai-elements/ by the CLI
- No useMemo/useCallback needed - React Compiler handles optimization
- Verify Claude Code CLI is authenticated before testing (`claude --version`)
- Each checkpoint allows independent validation before proceeding
