# JavaScript Learning Notes

A small JavaScript learning project built around lesson-based notes, a custom landing page, and a generated HTML notes site.

The source notes live in `notes.md/`, and the rendered lesson site is generated into `notes.live/`.

## Project Snapshot

- 4 lessons
- 25 markdown topics
- Static HTML, CSS, and JavaScript project
- Lesson notes grouped by topic for quick revision
- Generated mobile-friendly lesson pages with a lesson-scoped sidebar

## Lessons Covered

### Lesson 1: Variables and Scope

- Variables
- Reassignment and redeclaration
- Hoisting
- Temporal Dead Zone (TDZ)
- Scope

Files:

- [Variables](notes.md/Lesson1/variable.md)
- [Reassignment and Redeclaration](notes.md/Lesson1/reassign-redeclare.md)
- [Hoisting](notes.md/Lesson1/hosting.md)
- [Temporal Dead Zone](notes.md/Lesson1/tdz.md)
- [Scopes](notes.md/Lesson1/scopes.md)

### Lesson 2: Types and JavaScript Behavior

- Data types
- Dynamic typing
- `typeof` operator
- Truthy and falsy values
- Type coercion
- JavaScript quirks

Files:

- [Data Types](notes.md/Lesson2/datatypes.md)
- [Dynamic Typing](notes.md/Lesson2/dynamic-typing.md)
- [Typeof Operator](notes.md/Lesson2/typeof-operator.md)
- [Truthy and Falsy Values](notes.md/Lesson2/truthy-and-falsy-values.md)
- [Type Coercion](notes.md/Lesson2/type-coercion.md)
- [JavaScript Quirks](notes.md/Lesson2/quirks-in-js.md)

### Lesson 3: Operators

- Operator overview
- Arithmetic operators
- Assignment operators
- Comparison operators
- Logical operators
- Unary operators
- Ternary operator
- `typeof`
- `instanceof`

Files:

- [Operators Overview](notes.md/Lesson3/operators.md)
- [Arithmetic](notes.md/Lesson3/arithmetic.md)
- [Assignment](notes.md/Lesson3/assignment.md)
- [Comparison](notes.md/Lesson3/comparison.md)
- [Logical](notes.md/Lesson3/logical.md)
- [Unary](notes.md/Lesson3/unary.md)
- [Ternary](notes.md/Lesson3/ternary.md)
- [Typeof](notes.md/Lesson3/typeof.md)
- [Instanceof](notes.md/Lesson3/instanceof.md)

### Lesson 4: Logic Patterns and Control Flow

- Logical patterns
- `if...else`
- `else if`
- `switch`
- Return early pattern

Files:

- [Logical Patterns](notes.md/Lesson4/logicpatterns.md)
- [If Else](notes.md/Lesson4/if-else.md)
- [Else If](notes.md/Lesson4/else-if.md)
- [Switch Case](notes.md/Lesson4/switch-case.md)
- [Return Early Pattern](notes.md/Lesson4/return-early-pattern.md)

## How the Repo Is Organized

- `index.html` is the main landing page for the project.
- `notes.md/` contains the source markdown notes. Even though it ends in `.md`, it is a folder, not a single markdown file.
- `scripts/build-notes-live.mjs` converts the markdown notes into HTML pages inside `notes.live/`.
- `notes.live/index.html` is the generated lesson hub.
- `assets/`, `images/`, and `libraries/` contain the styling, scripts, icons, fonts, and shared assets used by the site.

## Local Workflow

There is no `package.json` or install step right now. The current note-generation workflow only needs Node.js because the build script uses built-in Node modules.

### Open the main site

Open `index.html` in your browser.

### Rebuild the generated notes site

1. Edit or add markdown files inside `notes.md/Lesson*/`.
2. Run:

```bash
node scripts/build-notes-live.mjs
```

3. Open `notes.live/index.html` in your browser.

## Project Structure

```text
.
|-- index.html
|-- assets/
|-- images/
|-- libraries/
|-- notes.md/
|   |-- Lesson1/
|   |-- Lesson2/
|   |-- Lesson3/
|   `-- Lesson4/
|-- notes.live/
`-- scripts/
    |-- build-notes-live.mjs
    `-- generate-notes.ps1
```

## Purpose

The goal of this project is to keep JavaScript fundamentals organized into short, lesson-based notes that are easy to read, revise, and turn into a browsable site.
