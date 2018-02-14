const parseEnv = require('./index.js')
const assert = require('assert')

it('Parses BASIC=basic', function() {
  assert.deepStrictEqual(parseEnv('BASIC=basic'), ['BASIC', 'basic'])
})
it('Parses UNDEFINED_EXPAND=$TOTALLY_UNDEFINED_ENV_KEY', function() {
  assert.deepStrictEqual(
    parseEnv('UNDEFINED_EXPAND=$TOTALLY_UNDEFINED_ENV_KEY'),
    ['UNDEFINED_EXPAND', '$TOTALLY_UNDEFINED_ENV_KEY'],
  )
})
it(`Parses SINGLE_QUOTES='single_quotes'`, function() {
  assert.deepStrictEqual(parseEnv(`SINGLE_QUOTES='single_quotes'`), [
    'SINGLE_QUOTES',
    'single_quotes',
  ])
})
it(`Parses DOUBLE_QUOTES="double_quotes"`, function() {
  assert.deepStrictEqual(parseEnv(`DOUBLE_QUOTES="double_quotes"`), [
    'DOUBLE_QUOTES',
    'double_quotes',
  ])
})
it(`Parses EQUAL_SIGNS=equals==`, function() {
  assert.deepStrictEqual(parseEnv(`EQUAL_SIGNS=equals==`), [
    'EQUAL_SIGNS',
    'equals==',
  ])
})
it(`Parses RETAIN_INNER_QUOTES={"foo": "bar"}`, function() {
  assert.deepStrictEqual(parseEnv(`RETAIN_INNER_QUOTES={"foo": "bar"}`), [
    'RETAIN_INNER_QUOTES',
    `{"foo": "bar"}`,
  ])
})
it(`Parses RETAIN_INNER_QUOTES_AS_STRING='{"foo": "bar"}'`, function() {
  assert.deepStrictEqual(
    parseEnv(`RETAIN_INNER_QUOTES_AS_STRING='{"foo": "bar"}'`),
    ['RETAIN_INNER_QUOTES_AS_STRING', `{"foo": "bar"}`],
  )
})
it(`Parses INCLUDE_SPACE=some spaced out string`, function() {
  assert.deepStrictEqual(parseEnv(`INCLUDE_SPACE=some spaced out string`), [
    'INCLUDE_SPACE',
    `some spaced out string`,
  ])
})

it('Parses NODE_ENV=production', function() {
  assert.deepStrictEqual(parseEnv('NODE_ENV=production'), [
    'NODE_ENV',
    'production',
  ])
})

it(`Parses newline`, function() {
  assert.deepStrictEqual(parseEnv('key="line1\\nline2"'), [
    'key',
    'line1\nline2',
  ])
})

it('Parses EQUALS==', function() {
  assert.deepStrictEqual(parseEnv('EQUALS=='), ['EQUALS', '='])
})

it('Throws on invalid env', function() {
  assert.throws(
    () => parseEnv(['=', 'API=example.com']),
    err => err instanceof TypeError,
  )
  assert.throws(() => parseEnv('API'), err => err instanceof Error)
  assert.throws(() => parseEnv(''), err => err instanceof Error)
  assert.throws(() => parseEnv('='), err => err instanceof Error)
  assert.throws(() => parseEnv(), err => err instanceof TypeError)
})
