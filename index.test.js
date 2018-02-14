const parseEnv = require('./index.js')

test('Parses BASIC=basic', () => {
  expect(parseEnv('BASIC=basic')).toEqual(['BASIC', 'basic'])
})
test('Parses UNDEFINED_EXPAND=$TOTALLY_UNDEFINED_ENV_KEY', () => {
  expect(parseEnv('UNDEFINED_EXPAND=$TOTALLY_UNDEFINED_ENV_KEY')).toEqual([
    'UNDEFINED_EXPAND',
    '$TOTALLY_UNDEFINED_ENV_KEY',
  ])
})
test(`Parses SINGLE_QUOTES='single_quotes'`, () => {
  expect(parseEnv(`SINGLE_QUOTES='single_quotes'`)).toEqual([
    'SINGLE_QUOTES',
    'single_quotes',
  ])
})
test(`Parses DOUBLE_QUOTES="double_quotes"`, () => {
  expect(parseEnv(`DOUBLE_QUOTES="double_quotes"`)).toEqual([
    'DOUBLE_QUOTES',
    'double_quotes',
  ])
})
test(`Parses EQUAL_SIGNS=equals==`, () => {
  expect(parseEnv(`EQUAL_SIGNS=equals==`)).toEqual(['EQUAL_SIGNS', 'equals=='])
})
test(`Parses RETAIN_INNER_QUOTES={"foo": "bar"}`, () => {
  expect(parseEnv(`RETAIN_INNER_QUOTES={"foo": "bar"}`)).toEqual([
    'RETAIN_INNER_QUOTES',
    `{"foo": "bar"}`,
  ])
})
test(`Parses RETAIN_INNER_QUOTES_AS_STRING='{"foo": "bar"}'`, () => {
  expect(parseEnv(`RETAIN_INNER_QUOTES_AS_STRING='{"foo": "bar"}'`)).toEqual([
    'RETAIN_INNER_QUOTES_AS_STRING',
    `{"foo": "bar"}`,
  ])
})
test(`Parses INCLUDE_SPACE=some spaced out string`, () => {
  expect(parseEnv(`INCLUDE_SPACE=some spaced out string`)).toEqual([
    'INCLUDE_SPACE',
    `some spaced out string`,
  ])
})

test('Parses NODE_ENV=production', () => {
  expect(parseEnv('NODE_ENV=production')).toEqual(['NODE_ENV', 'production'])
})

test('Parses EQUALS==', () => {
  expect(parseEnv('EQUALS==')).toEqual(['EQUALS', '='])
})

test('Throws on invalid env', () => {
  expect(() => parseEnv(['=', 'API=example.com'])).toThrow()
  expect(() => parseEnv(['=aaa', 'API=example.com'])).toThrow()
  expect(() => parseEnv('')).toThrow()
  expect(() => parseEnv('API')).toThrow()
})
