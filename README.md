# 📐 Layout Engine (Single HTML)

This project is a lightweight layout renderer built with plain HTML, CSS, and JavaScript. It loads dynamic layout templates and article content from remote APIs, caches them locally, and renders them using canvas or DOM.

Everything is bundled into a **single HTML file** using [Vite](https://vitejs.dev) and [`vite-plugin-singlefile`](https://github.com/salttay/vite-plugin-singlefile).

---

## 🚀 Getting Started

### 1. 📦 Install dependencies

```bash
npm install
```

### 2. 🧪 Start development server

```bash
npm run dev
```

Your app will be served at `http://localhost:5173`.

---

### 3. 🏗 Build a single HTML file

```bash
npm run build
```

After building, you'll find the final output in the `dist/` folder:

```
dist/
└── index.html   ← One fully inlined HTML file
```

You can open this file directly or deploy it anywhere (USB, browser, signage player, etc.).

---

## 🔗 URL Parameters

The layout engine behavior is controlled by query parameters in the URL:

| Param  | Description                                           | Example                      |
|--------|-------------------------------------------------------|------------------------------|
| `eid`  | ID of the layout template to fetch                    | `eid=product-layout`         |
| `rid`  | RSS Schema ID used to load article data              | `rid=abcd1234`               |
| `from` | (Optional) Start date for articles (`YYYY-MM-DD`)    | `from=2025-07-01`            |
| `to`   | (Optional) End date for articles                      | `to=2025-07-14`              |
| `count`| (Optional) Number of articles to retrieve             | `count=5`                    |

**Example:**

```
file:///path/to/dist/index.html?eid=news-layout&rid=feed123&count=10
```

---

## 🧠 Caching Behavior

- Data from `rid` and `eid` is cached in `localStorage`.
- Cache expires **after 1 hour** and auto-refreshes on next load.

---

## 📁 Project Structure

```
js/
├── main.js
├── data.js
├── debug.js
├── updateContent.js
├── scale.js
├── utils.js
└── renderers/
    ├── index.js
    ├── renderImage.js
    ├── renderShape.js
    ├── renderText.js
    └── renderTextContainer.js
```

---

## 📄 License

MIT
