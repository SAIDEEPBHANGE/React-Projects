# Adding Bootstrap and Bootstrap Icons to a React Project

Follow these steps to add **Bootstrap** and **Bootstrap Icons** to your React project.

## Step 1: Install Bootstrap and Bootstrap Icons

Open your terminal in the React project directory and run:

```bash
npm install bootstrap bootstrap-icons
```

This installs:

- **Bootstrap** — CSS framework and UI components
- **Bootstrap Icons** — Bootstrap's official icon library

---

## Step 2: Import Bootstrap and Bootstrap Icons

Open `src/main.jsx` and add both CSS imports:

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

---

## Step 3: Use Bootstrap Classes

You can now use Bootstrap classes inside your React components.

```jsx
function App() {
  return (
    <div className="container mt-5">
      <h1 className="text-primary">Hello Bootstrap!</h1>

      <button className="btn btn-primary">Click Me</button>
    </div>
  );
}

export default App;
```

---

## Step 4: Use Bootstrap Icons

Bootstrap Icons are used with an `<i>` element and the `bi` class.

For example:

```jsx
function App() {
  return (
    <div className="container mt-5">
      <h1>
        <i className="bi bi-bootstrap"></i> Hello Bootstrap!
      </h1>

      <button className="btn btn-primary">
        <i className="bi bi-check-circle me-2"></i>
        Click Me
      </button>
    </div>
  );
}

export default App;
```

### Common Bootstrap Icons

```jsx
<i className="bi bi-house"></i>
<i className="bi bi-person"></i>
<i className="bi bi-search"></i>
<i className="bi bi-heart"></i>
<i className="bi bi-heart-fill"></i>
<i className="bi bi-trash"></i>
<i className="bi bi-pencil"></i>
<i className="bi bi-check"></i>
<i className="bi bi-check-circle"></i>
<i className="bi bi-x"></i>
<i className="bi bi-x-circle"></i>
<i className="bi bi-plus"></i>
<i className="bi bi-dash"></i>
<i className="bi bi-arrow-right"></i>
<i className="bi bi-arrow-left"></i>
<i className="bi bi-gear"></i>
```

You can also combine Bootstrap utility classes with icons:

```jsx
<i className="bi bi-heart-fill text-danger fs-3"></i>
```

Here:

- `bi bi-heart-fill` → Bootstrap heart icon
- `text-danger` → Makes the icon red
- `fs-3` → Makes the icon larger

---

## Step 5: Add Icons to Buttons

For example, a delete button:

```jsx
<button className="btn btn-danger">
  <i className="bi bi-trash me-2"></i>
  Delete
</button>
```

An edit button:

```jsx
<button className="btn btn-warning">
  <i className="bi bi-pencil me-2"></i>
  Edit
</button>
```

A search button:

```jsx
<button className="btn btn-primary">
  <i className="bi bi-search me-2"></i>
  Search
</button>
```

The `me-2` class adds some margin to the right of the icon.

---

## Step 6: Run the React Project

Start your development server:

```bash
npm run dev
```

Then open the URL shown in your terminal.

---

## Result

Bootstrap and Bootstrap Icons are now installed and ready to use in your React project.

### Useful Bootstrap Classes

| className     | Purpose                        |
| ------------- | ------------------------------ |
| `container`   | Creates a responsive container |
| `row`         | Creates a Bootstrap row        |
| `col-md-6`    | Creates a responsive column    |
| `btn`         | Base button style              |
| `btn-primary` | Primary button                 |
| `text-center` | Centers text                   |
| `text-danger` | Makes text/icon red            |
| `mt-5`        | Adds top margin                |
| `mb-4`        | Adds bottom margin             |
| `me-2`        | Adds right margin              |
| `card`        | Creates a card                 |
| `shadow`      | Adds a shadow                  |
| `fs-3`        | Increases font size            |

### Bootstrap Icons Syntax

The basic syntax is:

```jsx
<i className="bi bi-icon-name"></i>
```

For example:

```jsx
<i className="bi bi-house"></i>
```

or:

```jsx
<i className="bi bi-search fs-4 text-primary"></i>
```

> **Tip:** You don't need to add the Bootstrap Icons CDN manually when using npm. Installing `bootstrap-icons` and importing its CSS is enough.
