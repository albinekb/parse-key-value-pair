# parse-key-value-pair

Parse a string like `KEY=value` into `[key, value]`

## Installation

_npm:_

```sh
npm install --save parse-key-value-pair
```

_yarn:_

```sh
yarn add parse-key-value-pair
```

## Usage

```js
const parseKeyValuePair = require('parse-key-value-pair')

const [key, value] = parseKeyValue('NODE_ENV=production')
```

## API

### `parseKeyValuePair(input) => [key, value]`

Returns the parsed key and value
