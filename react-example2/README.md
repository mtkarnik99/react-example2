# React Fundamentals

A teaching project that walks through core React concepts through small, focused examples. Each route demonstrates a specific set of hooks and patterns, with inline comments explaining *why* each technique is used. Built with **React 19**, **Vite**, and **React Router 7**.

## What this project demonstrates

The app is organized as a multi-page site. Each page isolates a concept so you can study it on its own:

| Route | Page | Concepts demonstrated |
| --- | --- | --- |
| `/` | **Counter** | `useState`, `useEffect` (with cleanup), `useMemo` (caching an expensive calculation), `useCallback` (stable function references), controlled inputs, and the confirm/cancel form pattern |
| `/shopping` | **Shopping List** | `useReducer`, `useRef`, immutability vs. direct mutation (the "wrong add" button shows why mutating state fails to re-render), and a working-copy/confirm pattern |
| `/students` | **Student Directory** | `useReducer` + `useCallback`, `React.memo`, the `children` prop, event bubbling/`stopPropagation`, and linking into dynamic routes |
| `/students/:id` | **Student Profile** | Dynamic routing with `useParams`, reading URL parameters, and handling missing records |
| `/pokemon` | **Pokémon** | Real API fetching from [PokeAPI](https://pokeapi.co), `useEffect` + `useCallback` to avoid infinite fetch loops, pagination, and loading/error states |
| `*` | **Not Found** | Catch-all `404` route |

Cross-cutting patterns used throughout:

- **`ThemeContext`** — light/dark theme via the Context API, consumed with a custom `useTheme()` hook. This eliminates prop drilling; every component reads the theme directly.
- **Custom hooks** — `useFormDirty` encapsulates the shared "is the form dirty?" logic used by multiple forms.
- **Reducers as plain JS** — `studentReducer` and `shoppingListReducer` live outside components and can be tested independently.
- **Reusable presentational components** — `StatusBadge` and `Dialog` are driven entirely by props.

## Project structure

```
react-example2/
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
└── src/
    ├── main.jsx                  # entry point — wraps App in BrowserRouter
    ├── App.jsx                   # route definitions + ThemeProvider
    ├── context/
    │   └── ThemeContext.jsx      # theme provider + useTheme hook
    ├── hooks/
    │   └── useFormDirty.js       # shared dirty-form custom hook
    ├── reducers/
    │   ├── shoppingListReducer.js
    │   └── studentReducer.js
    ├── utils/
    │   └── counterUtils.js       # pure helpers (incl. the expensive stats fn)
    ├── pages/
    │   ├── Home.jsx              # /
    │   ├── ShoppingListPage.jsx  # /shopping
    │   ├── StudentDirectory.jsx  # /students
    │   ├── StudentProfile.jsx    # /students/:id
    │   ├── PokemonPage.jsx       # /pokemon
    │   └── NotFound.jsx          # *
    └── components/
        ├── features/             # Counter, ShoppingList, PaginatedList
        ├── roster/               # StudentList, StudentCard
        └── shared/               # NavBar, StatusBadge, Dialog
```

## Prerequisites

- **Node.js 18+** (Vite 8 requires a modern Node version)
- **npm** (ships with Node)

## Setup

All commands run from the `react-example2` directory:

```bash
cd react-example2
npm install
```

## Running the app

Start the Vite dev server (with hot module replacement):

```bash
npm run dev
```

Vite prints a local URL (typically `http://localhost:5173`). Open it in your browser.

> **Tip:** Several examples log to the browser console to illustrate when hooks run — open your dev tools console while exploring the Counter and Student Directory pages.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server with HMR |
| `npm run build` | Build a production bundle into `dist/` |
| `npm run preview` | Serve the production build locally to preview it |
| `npm run lint` | Run ESLint over the project |

## Notes

- The Pokémon page fetches live data from the public PokeAPI, so an internet connection is required for that route.
- This is a learning project — components use inline styles and in-file data on purpose to keep each example self-contained and easy to read.
