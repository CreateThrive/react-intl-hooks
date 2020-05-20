# React-intl hooks ⚛️ 🌍

![build](https://github.com/CreateThrive/react-intl-hooks/workflows/build/badge.svg?branch=master)
[![codecov](https://codecov.io/gh/CreateThrive/react-intl-hooks/branch/master/graph/badge.svg)](https://codecov.io/gh/CreateThrive/react-intl-hooks)
[![Known Vulnerabilities](https://snyk.io/test/github/CreateThrive/react-intl-hooks/badge.svg?targetFile=package.json)](https://snyk.io/test/github/CreateThrive/react-intl-hooks?targetFile=package.json)
![npm bundle size](https://img.shields.io/bundlephobia/min/react-intl-hooks)
![npm type definitions](https://img.shields.io/npm/types/react-intl-hooks)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
![NPM](https://img.shields.io/npm/l/react-intl-hooks)

## What is this?

React-intl-hooks is a small and fast library that you can use to replace [Format.js](https://formatjs.io/) components. This allows for a consistent codebase if you're using the latest [React.js](https://reactjs.org/) features!.

## Motivation

Format.js with [react-intl](https://www.npmjs.com/package/react-intl) is an awesome library, but for the people like us who love React new features like hooks, it can still be bit daunting to use libraries that have components. So we decided to combine the great things about react-intl along with React hooks.

## Installation

**Yarn**

```
yarn add react-intl-hooks
```

**NPM**

```
npm install react-intl-hooks
```

## Links

- [Quickstart](#quickstart)
- [Hooks](#hooks)
  - [useFormatMessage](#useformatmessage)
  - [useFormatDate](#useformatdate)
  - [useFormatTime](#useformattime)
  - [useFormatNumber](#useformatnumber)
  - [useFormatRelativeTime](#useformatrelativeTime)
  - [useFormatList](#useformatlist)
  - [useFormatPlural](#useformatplural)
- [Contributors](#contributors)
- [License](#license)

## Quickstart

First we need to enable internationalization in our app. We need to import the `IntlProvider` component, then use it to wrap our React app.

Your `src/index.js` should look like this:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { IntlProvider } from 'react-intl-hooks';
import locale_en from './translations/en.json';
import locale_es from './translations/es.json';

const data = {
  es: locale_es,
  en: locale_en,
};

const language = navigator.language.split(/[-_]/)[0];

ReactDOM.render(
  <React.StrictMode>
    <IntlProvider
      locale={language}
      messages={data[language]}
      defaultLocale="en"
    >
      <App />
    </IntlProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
```

We import our translation files and we get the locale from the user's browser. If the locale is not available we can default to **en** as our locale.

### Translation files

Create `src/translations` folder in your project and create files for the locales you want to support in you React app.

In this example we're going to create translation files for **English** and **Spanish**.

Here's some content for our files:

#### `src/translations/en.json`:

```json
{
  "app.learn": "Learn React"
}
```

#### `src/translations/es.json`:

```json
{
  "app.learn": "Aprende React"
}
```

### Translating your app

Translating your components is just as easy as importing the hook you need.

`src/app.js`:

```jsx
import React from 'react';
import logo from './logo.svg';
import './App.css';

import { useFormatMessage } from 'react-intl-hooks';

function App() {
  const t = useFormatMessage();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t({ id: 'app.learn', defaultMessage: 'Learn React' })}
        </a>
      </header>
    </div>
  );
}

export default App;
```

In the last example we simply translated the default app you get when you use `create-react-app` to boostrap your project.

Your have a wide variety of hooks to choose depending on the things you want to translate.

```jsx
import {
  useFormatMessage,
  useFormatDate,
  useFormatList,
  useFormatNumber,
  useFormatPlural,
  useFormatRelativeTime,
  useFormatTime,
} from 'react-intl-hooks';
```

We'll have a detailed look of each one in the next section.

## Hooks

Here you'll get a detailed explanation of every hook `react-intl-hooks` has to offer.

### `useFormatMessage`

Hook used to translate text in your application.

#### How to use it

Import the hook:

```jsx
import { useFormatMessage } from 'react-intl-hooks';
```

Then use it like this:

```jsx
const t = useFormatMessage();
```

The hook returns a translation function that can be used inside the JSX code of your components.

#### Parameters

```jsx
t(message: MessageDescriptor, values?: MessageFormatValues);
```

##### Message

```typescript
{
  id: string,
  description?: string,
  defaultMessage?: string
}
```

- **id**: id corresponding to the text translated in your translation files.
- **description (optional)**: description of the translated text, this might be useful for bigger and complex apps.
- **defaultMessage (optional)**: optional default message in case the id of the translated text is not found.

##### Values (optional)

Object used to pass variables or React elements to our translated text. In the following example you can see a use case for this.

#### Example:

```jsx
import React from 'react';
import { useFormatMessage } from 'react-intl-hooks';

const MyComponent = () => {
  const t = useFormatMessage();

  return (
    <div>
      <h1>
        {t(
          {
            id: 'mycomponent.title',
            description: 'Title for my component!',
            defaultMessage: 'Hello {user}!',
          },
          { user: 'Mateo' },
        )}
      </h1>
    </div>
  );
};

export default MyComponent;
```

#### Result:

```html
<div>
  <h1>Hello Mateo!</h1>
</div>
```

---

### `useFormatDate`

This hook is used to translate a date to the users locale.

#### How to use it

Import the hook:

```jsx
import { useFormatDate } from 'react-intl-hooks';
```

Then use it like this:

```jsx
const t = useFormatDate();
```

The hook returns a translation function that can be used inside the JSX code of your components.

#### Parameters

```typescript
t(value: DateFormatPrimitiveValue, options?: FormatDateOptions);
```

##### Value

The date to be translated, it can have the following types: `Date`, `number` or `string`.

##### Options (optional)

Object containing formating options of the time to be translated. Each property is **optional** and can recieve the following values: `short` or `numeric`.

```typescript
{
  year?: string,
  month?: string,
  day?: string,
  hour?: string,
  minute?: string,
  second?: string,
  weekday?: string,
  era?: string
}
```

In the following example you see how to use the formatting options.

#### Example:

```jsx
import React from 'react';
import { useFormatDate } from 'react-intl-hooks';

const MyComponent = () => {
  const t = useFormatDate();

  const todayDate = new Date('3/4/2016');

  return (
    <div>
      <h1>
        {t(todayDate, {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </h1>
    </div>
  );
};

export default MyComponent;
```

#### Result:

```html
<div>
  <h1>Fri, Mar 4, 2016</h1>
</div>
```

---

### `useFormatTime`

This hook is used to format a time to the user locale.

#### How to use it

Import the hook:

```jsx
import { useFormatTime } from 'react-intl-hooks';
```

Then use it like this:

```jsx
const t = useFormatTime();
```

The hook returns a translation function that can be used inside the JSX code of your components.

#### Parameters

```jsx
t(value: TimeFormatPrimitiveValue, options?: FormatDateOptions);
```

##### Value

The time to be translated, it can have the following types: `Date` or `number`.

##### Options (optional)

Object containing formatting options of the time to be translated. Each property is **optional** and can recieve the following values: `short` or `numeric`.

```typescript
{
  year?: string,
  month?: string,
  day?: string,
  hour?: string,
  minute?: string,
  second?: string,
  weekday?: string,
  era?: string
}
```

In the following example you see how to use the formatting options.

#### Example:

```jsx
import React from 'react';
import { useFormatTime } from 'react-intl-hooks';

const MyComponent = () => {
  const t = useFormatTime();

  const todayDate = new Date('3/4/2016');

  return (
    <div>
      <h1>{t(todayDate)}</h1>
    </div>
  );
};

export default MyComponent;
```

#### Result:

```html
<div>
  <h1>12:00 AM</h1>
</div>
```

---

### `useFormatNumber`

This hook is used to format numbers to the user locale.

#### How to use it

Import the hook:

```jsx
import { useFormatNumber } from 'react-intl-hooks';
```

Then use it like this:

```jsx
const t = useFormatNumber();
```

The hook returns a translation function that can be used inside the JSX code of your components.

#### Parameters

```jsx
t(value: number, options?: FormatNumberOptions);
```

##### Value

The number to be formatted to the user locale.

##### Options (optional)

Object containing formatting options of the number to be translated. Each property is **optional**.

```typescript
{
  style?: string,
  unit?: string,
  unitDisplay?: string,
  currency?: string
}
```

- **style**: the format of the output message. Possible values are:
  - "percent" (e.g., 50%).
  - "decimal" (e.g., 0.5).
  - "currency" can be used in conjuntion with the property `currency` (e.g., \$1,000).
  - "unit" can be used in conjuntion with the properties `unit` and `unitDisplay` (e.g., 1,000kB).
- **unit**: can be used when `style` property is set to "unit". Possible values are almost 27 units, we'll show some of the possible values:
  - "kilobyte" (e.g., kB).
  - "fahrenheit" (e.g., °F).
- **unitDisplay**: used to change the formatting style of a unit. Possible values are:
  - "narrow" (e.g., 1,000kB).
  - "long" (e.g., 1,000 degrees Fahrenheit).
  - "short" (e.g., 1,000kB), the narrow style could be similar to the short style for some locales.
- **currency**: used to change the formatting style of a currency, should be used when the property `style` is set to "currency". Possible values are the ISO 4217 abbreviations of the currencies:
  - "USD" (e.g., \$1,000.00).
  - "EUR" (e.g., €1.000,00).

In the following example you see how to use the formatting options.

#### Example:

```jsx
import React from 'react';
import { useFormatNumber } from 'react-intl-hooks';

const MyComponent = () => {
  const t = useFormatNumber();

  return (
    <div>
      <h1>{t(1000, { style: 'currency', currency: 'USD' })}</h1>
    </div>
  );
};

export default MyComponent;
```

#### Result:

```html
<div>
  <h1>$1,000.00</h1>
</div>
```

---

### `useFormatRelativeTime`

This hook recieves a number and formats it to a relative time.

#### How to use it

Import the hook:

```jsx
import { useFormatRelativeTime } from 'react-intl-hooks';
```

Then use it like this:

```jsx
const t = useFormatRelativeTime();
```

The hook returns a translation function that can be used inside the JSX code of your components.

#### Parameters

```jsx
t(value: number, unit?: Unit, options?: FormatNumberOptions);
```

##### Value

The number to be formatted into a relative time matching the use locale.

##### Unit (optional)

The unit of the number to be formatted. It can have the following values: `second`, `minute`, `hour`, `day`, `week`, `month`, `quarter` or `year.`

##### Options (optional)

Object containing formatting options of the time to be transformed into a relative time. Each property is **optional**.

```typescript
{
  numeric?: string,
  style?: string
}
```

- **numeric**: the format of the output message. Possible values are:
  - "always" (default, e.g., 1 day ago).
  - "auto" (e.g., yesterday).
- **style**: The length of the internationalized message. Possible values are:
  - "long" (default, e.g., in 1 month).
  - "short" (e.g., in 1 mo.).
  - "narrow" (e.g., in 1 mo.), the narrow style could be similar to the short style for some locales.

#### Example:

```jsx
import React from 'react';
import { useFormatRelativeTime } from 'react-intl-hooks';

const MyComponent = () => {
  const t = useFormatRelative();

  return (
    <div>
      <h1>{t(1, 'hour')}</h1>
    </div>
  );
};

export default MyComponent;
```

#### Result:

```html
<div>
  <h1>in 1 hour</h1>
</div>
```

---

### `useFormatList`

This hook allows you to join list of things together in an i18n-safe way.

#### How to use it

Import the hook:

```jsx
import { useFormatList } from 'react-intl-hooks';
```

Then use it like this:

```jsx
const t = useFormatList();
```

The hook returns a translation function that can be used inside the JSX code of your components.

#### Parameters

```jsx
t(value: string[], options?: FormatListOptions);
```

##### Value

Array of strings to be joined together.

##### Options (optional)

Object containing formatting options for the list to be formatted. Each property is **optional**.

```typescript
{
  type?: string,
  style?: string
}
```

- **numeric**: the format of the output message. Possible values are:
  - "always" (default, e.g., 1 day ago).
  - "auto" (e.g., yesterday), the "auto" value allows to not always have to
    use numeric values in the output.
- **style**: the length of the internationalized message. Possible values are:
  - "long" (default, e.g., in 1 month).
  - "short" (e.g., in 1 mo.).
  - "narrow" (e.g., in 1 mo.), the narrow style could be similar to the short style for some locales.

#### Example:

```jsx
import React from 'react';
import { useFormatList } from 'react-intl-hooks';

const MyComponent = () => {
  const t = useFormatList();

  return (
    <div>
      <h1>{t(['5 hours', '3 minutes'], { type: 'unit' })}</h1>
    </div>
  );
};

export default MyComponent;
```

#### Result:

```html
<div>
  <h1>5 hours, 3 minutes</h1>
</div>
```

---

### `useFormatPlural`

This hook will return a plural category string: "zero", "one", "two", "few", "many", or "other".

**Note**: This hook should only be used in apps that need to support one language. If your app supports multiple languages use `useFormatMessage` instead.

#### How to use it

Import the hook:

```jsx
import { useFormatPlural } from 'react-intl-hooks';
```

Then use it like this:

```jsx
const t = useFormatPlural();
```

The hook returns a translation function that can be used inside the JSX code of your components.

#### Parameters

```jsx
t(value: number, options?: FormatPluralOptions);
```

##### Value

Number to be pluralized.

#### Options (optional)

Object containing formatting options for the number to be formatted. The property is **optional**.

```typescript
{
  type?: string,
}
```

- **type**: the type of the output message. Possible values are:

  - "cardinal" (default, e.g., two).
  - "ordinal" (e.g., two).

#### Example:

```jsx
import React from 'react';
import { useFormatPlural } from 'react-intl-hooks';

const MyComponent = () => {
  const t = useFormatPlural();

  return (
    <div>
      <h1>{t(2, { style: 'ordinal' })}</h1>
    </div>
  );
};

export default MyComponent;
```

#### Result:

```html
<div>
  <h1>two</h1>
</div>
```

## Contributors

We'd like to thank these awesome people who made this whole thing happen. [[Become a contributor](CONTRIBUTING.md)]

<ul>
    <li><a href="https://github.com/MateoKruk">Mateo Kruk</a></li>
    <li><a href="https://github.com/tpiaggio">Tomas Piaggio</a></li>
</ul>

## License

This project is licensed under the MIT license, Copyright (c) 2020 <a href="https://createthrive.com">CreateThrive</a>. [[License](LICENSE)]
