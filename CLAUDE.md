# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `bun dev` - Start development server
- `bun run build` - Build for production
- `bun run lint` - Check code with Biome
- `bun run format` - Format code with Biome

## Stack

- Next.js 16 with App Router (src/app/)
- React 19 with React Compiler enabled
- TypeScript (strict mode)
- Tailwind CSS 4
- Biome for linting/formatting

## Path Alias

Use `@/*` to import from `src/*`.


- We are using React Compiler in this project, so we must never use useMemo, useCallback at any time in this project.
- Regarding internet searches and page crawling, always prioritize Exa tools.
- Regarding documentation search, always prioritize Context7 tools.
- During implementation, if a bug is persistent, you should never try things that seem hacky or out of the ordinary to work around the problem. In such cases, always conduct intensive internet research to find solutions. If no solution is found, then the problem must be presented to the user before attempting non-standard solutions.

## Active Technologies
- TypeScript 5.x with strict mode enabled (001-ai-chatbot)
- N/A (session-based, no persistence) (001-ai-chatbot)

## Recent Changes
- 001-ai-chatbot: Added TypeScript 5.x with strict mode enabled
