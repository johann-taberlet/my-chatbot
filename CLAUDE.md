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
