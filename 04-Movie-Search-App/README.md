# Reelwatch

TV show finder built with React, Bootstrap, and the TVMaze API.

Run from this folder:

```sh
npm install
npm run dev
```

## 1. Component flow

This shows which components render other components. `Catalog` chooses one result component depending on the current state.

```mermaid
flowchart TD
    Main["main.jsx"] --> App["App()"]
    App --> Header["Header()"]
    App --> Hero["Hero()"]
    App --> Catalog["Catalog()"]
    App --> Footer["Footer()"]
    App --> Modal["ShowModal() - when a show is selected"]

    Catalog --> Genre["GenreFilter()"]
    Catalog --> Loading["LoadingGrid() - loading"]
    Catalog --> Empty["EmptyState() - no results"]
    Catalog --> Grid["ShowGrid() - results"]
    Grid --> Card["ShowCard() - one per show"]
```

## 2. Function flow

This shows the main functions/hooks and what happens after user actions.

```mermaid
flowchart TD
    App["App()"]
    App --> useCatalog["useCatalog()"]
    App --> useLibrary["useLibrary()"]
    App --> useTvMaze["useTvMaze(query, view, retryKey)"]
    App --> useVisible["useVisibleShows(filteredShows, ...)"]
    App --> useDetails["useShowDetails()"]

    Hero["Hero() input"] -->|"onChange"| search["catalog.search(value)"]
    search --> query["query state changes"]
    query --> tvEffect["useTvMaze search effect"]
    tvEffect -->|"350ms debounce"| tvSearch["search(query, controller)"]
    tvSearch --> api["TVMaze search API"]
    api --> results["setSearchResults()"]
    results --> App

    Header["Header() click"] -->|"tab selection"| view["catalog.setView(view)"]
    Genre["GenreFilter() click"] -->|"genre selection"| genre["catalog.setGenre(genre)"]
    view --> App
    genre --> App

    Card["ShowCard() favorite click"] --> toggle["library.toggleFavorite(show)"]
    toggle --> state["setFavorites()"]
    state --> storedHook["useStoredValue() effect"]
    storedHook --> storage["localStorage"]

    Card -->|"details click"| open["details.open(show)"]
    open --> selected["setShow(show)"]
    selected --> Modal["ShowModal()"]
```

## Function guide

| Function / hook | What it does |
| --- | --- |
| `App()` | Calls the hooks, filters/selects shows, and connects components. |
| `useCatalog()` | Stores search text, current tab, genre, and retry action. |
| `useTvMaze()` | Loads shows and searches TVMaze; `search()` makes the search request. |
| `useLibrary()` | Manages favorites, watchlist, and demo user; `toggle()` adds/removes a show. |
| `useStoredValue()` | `readValue()` loads saved state; an effect writes updates to local storage. |
| `useVisibleShows()` | Returns the current page; an observer adds more shows on scroll. |
| `useShowDetails()` | `open()` selects a show and loads details when needed. |
| `Hero()` | Calls `catalog.search()` when the search input changes. |
| `ShowCard()` | Calls favorite, watchlist, or details actions when its buttons are clicked. |
| `Catalog()` | Chooses loading, empty, error, or show-grid UI. |

`useState` keeps values between renders. When a setter updates state, React renders `App()` again with the new values. Props carry data and functions from parent components down to child components.
