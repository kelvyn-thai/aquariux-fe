## What is this project?

- This project using for Aquariux FE Assgiment.
- Github: https://github.com/kelvyn-thai/aquariux-fe
- Production: https://aquariux-fe.vercel.app/
- Copyright [Kelvyn Thai](thainguyenhoangphatit@gmail.com)
- Make by [Kelvyn Thai](https://github.com/kelvyn-thai)

## How to run this project?

- Run yarn
- cp .env.ci .env
- Run yarn dev to start app on port 3000

## Available scripts

In the project directory, you can run:

| Command           |           Description            | ENV |
| :---------------- | :------------------------------: | :-: |
| yarn              |           Install NPM.           |
| yarn dev          |        Start development         | DEV |
| yarn build        |        Build application         |     |
| yarn jest:test    | Start Unit test on detached mode | DEV |
| yarn cypress:test | Start E2E test on detached mode  | DEV |
| yarn cypress:open |    Start E2E test on browser     | DEV |

## Main Stack

- Structure project followed by: [nextjs](https://nextjs.org/docs/getting-started)
- Manage build, deploy, start,...: [next](https://www.npmjs.com/package/next)
- Cascading Style Sheets: [Tailwindcss](https://tailwindcss.com/)
- UI Core: [core-ui](https://github.com/kelvyn-thai/core-ui)
- Find, fix, format, v...v problems in JavaScript code :
  - Eslint: https://eslint.org/
  - Husky: https://typicode.github.io/husky
  - Lint-staged: https://github.com/okonet/lint-staged
  - Prettier: https://prettier.io/
- Unit test [Jest](https://jestjs.io/)
- E2E test [Cypress](https://docs.cypress.io/guides/overview/why-cypress)

## Developer

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Folder Structure

```
src/
├── app/                      # App router layout & page structure (Next.js)
├── components/               # Reusable UI components (Button, Header, etc.)
├── config/                   # Environment and runtime configurations
├── constants/                # Shared constant values
├── hooks/                    # Shared/global hooks
│   └── weather/              # Feature-scoped hooks
├── lib/                      # Low-level shared helpers
├── models/                   # TypeScript entity typings
│   └── weather/
├── modules/                  # Feature-first architecture
│   └── weather/              # Weather domain features
│       ├── weather-forecast/
│       ├── weather-summary/
│       ├── weather-search-bar/
│       ├── weather-search-history/
│       ├── ...
├── pages/                    # Legacy page routes (using for mock API)
├── schemas/                  # Zod validation schemas
│   └── weather/
│       ├── requests/
│       ├── responses/
├── services/                 # API integration layer
│   └── weather/
├── stores/                   # Zustand state management
│   └── weather/
├── utils/                    # Utility functions
│   └── format-weather.utils.ts
├── stories/                  # Storybook stories (optional)
```

---

## Feature Module Anatomy

Each business module inside `modules/` should follow this convention:

```
weather-summary/
├── weather-summary.tsx        # Main UI
├── index.ts                   # Barrel export
```

---

## Supporting Layers

### `models/`

Contains pure TypeScript types and interfaces shared across modules.

### `schemas/`

Holds Zod schemas for:

- `requests/`: DTO for API calls
- `responses/`: API response validation

### `services/`

Contains all API call logic, e.g.:

### `stores/`

Holds all Zustand-based state logic. Should be organized by feature domain.

### `hooks/`

- Shared reusable hooks
- Feature-specific hooks should live in `hooks/[domain]/`

---

## Conventions

| File                | Purpose                           |
| ------------------- | --------------------------------- |
| `entity.tsx`        | Feature UI component              |
| `entity.hooks.ts`   | Local hook/business logic         |
| `entity.schema.ts`  | Zod validation schema             |
| `entity.service.ts` | API methods                       |
| `entity.store.ts`   | Zustand state                     |
| `entity.models.ts`  | TS interfaces for shared models   |
| `entity.utils.ts`   | Utility functions (formatting...) |

---

## Example: Weather Module

```
modules/weather/weather-summary/
├── weather-summary.tsx
├── index.ts

schemas/weather/
├───resquests
├───responses
├ weather.schema.ts

services/weather/
├── weather.service.ts

stores/weather/
├── weather.store.ts

hooks/weather/
├── weather.hooks.ts

models/weather/
├── weather.models.ts

utils/weather/
├── weather.utils.ts

```

---

## Best Practices

- Use `index.ts` for barrel exports
- Prefix files with the feature name to avoid clashes
- Keep each folder focused on a **single responsibility**
- Use `formatted*` for view-model transformed data

==============================================================================
