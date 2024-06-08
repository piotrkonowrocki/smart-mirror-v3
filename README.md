# Next Starter Template
A personal [Next.js](https://nextjs.org/) preconfigured starter template that could be used with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Table of contents
1. [System Requirements](#system-requirements)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage & philosophy](#usage--philosophy)
    * [Code style](#code-style)
    * [File structure and naming conventions](#file-structure-and-naming-conventions)
    * [Masterpages](#masterpages)

## System Requirements
* Node.js 18.17.0 or later

## Features
This starter template comes with preinstalled and ready to use features:
* [TypeScript](https://github.com/microsoft/TypeScript),
* [Emotion](https://github.com/emotion-js/emotion) as default method of styling,
* [sanitize.css](https://github.com/csstools/sanitize.css) for basic styles normalization,
* [facepaint](https://github.com/emotion-js/facepaint) for handling media queries,
* Both [eslint](https://github.com/eslint/eslint) and [prettier](https://github.com/prettier/prettier) for code quality.

## Installation
To get started, use the following command:
```bash
yarn create next-app --example https://github.com/piotrkonowrocki/next-starter-template
# or
npx create-next-app --example https://github.com/piotrkonowrocki/next-starter-template
```

Inside your newly created app, you can run several commands.

To start development server use
```bash
yarn dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying [`pages/index.tsx`](/pages/index.tsx). The page auto-updates as you edit the file.

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

To build app and run it production mode use
```bash
yarn build
yarn start
# or
npm run build
npm run start
```

## Usage & philosophy

### Code style
This template uses both [eslint](https://github.com/eslint/eslint) and [prettier](https://github.com/prettier/prettier) for subjective configuration code style validation.
* [eslint](https://github.com/eslint/eslint) configuration is using `react`, `prettier` and `simple-import-sort` plugins,
* [eslint](https://github.com/eslint/eslint) configuration is extending `eslint:recommended`, `plugin:react/recommended`, `plugin:@typescript-eslint/recommended`, `next/core-web-vitals`,
* [eslint](https://github.com/eslint/eslint) is using [eslint-plugin-simple-import-sort](https://github.com/lydell/eslint-plugin-simple-import-sort) plugin for auto sort imports,
* all deviations from [prettier](https://github.com/prettier/prettier) are displayed as errors in [eslint](https://github.com/eslint/eslint).

### Styling
This template uses [Emotion](https://github.com/emotion-js/emotion) as styling library. All global styles are stored in [`styles`](app/styles/) directory and can be included in application via [`_app.tsx`](pages/_app.tsx) file.

### File structure and naming conventions
This template comes with basic folders structure and naming intention that can be changed and adjusted to your needs.

Starting structure includes:
```
┌── app
│   ├── assets
│   ├── components
│   │   ├── layout
│   │   ├── masterpage
│   │   └── ui
│   ├── dictionaries
│   ├── styles
│   ├── types
│   └── utils
├── pages
└── public
```
This is just a base structure, during your development you will need to add more top level directories like `api`, `contexts` or `hooks`.

Top level directories should be used only to store files used in between more than one component. Any `types`, `utils` files etc., that belongs only to only one component should be placed in the same directory, as this component.

All files names except `components` should be suffixed with file purpose before file extension.

E.g.: see [`dictionaries/site.dictionary.ts`](app/dictionaries/site.dictionary.ts)
### Masterpages
This template uses extended [Layout](https://nextjs.org/docs/basic-features/layouts) feature from [Next.js](https://nextjs.org/).

To create new layout, create new directory inside [`/app/components/masterpages/`](/app/components/masterpages/) with new masterpage and include it into [`/app/components/masterpages/masterpage.tsx`](/app/components/masterpages/masterpage.tsx) as new type of template.
