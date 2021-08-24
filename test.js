import assert from 'node:assert'
import parseKeyValuePair from './index.js'

it('Parses BASIC=basic', function() {
  assert.deepStrictEqual(parseKeyValuePair('BASIC=basic'), ['BASIC', 'basic'])
})
it('Parses UNDEFINED_EXPAND=$TOTALLY_UNDEFINED_ENV_KEY', function() {
  assert.deepStrictEqual(
    parseKeyValuePair('UNDEFINED_EXPAND=$TOTALLY_UNDEFINED_ENV_KEY'),
    ['UNDEFINED_EXPAND', '$TOTALLY_UNDEFINED_ENV_KEY']
  )
})
it(`Parses SINGLE_QUOTES='single_quotes'`, function() {
  assert.deepStrictEqual(parseKeyValuePair(`SINGLE_QUOTES='single_quotes'`), [
    'SINGLE_QUOTES',
    'single_quotes',
  ])
})
it(`Parses DOUBLE_QUOTES="double_quotes"`, function() {
  assert.deepStrictEqual(parseKeyValuePair(`DOUBLE_QUOTES="double_quotes"`), [
    'DOUBLE_QUOTES',
    'double_quotes',
  ])
})
it(`Parses EQUAL_SIGNS=equals==`, function() {
  assert.deepStrictEqual(parseKeyValuePair(`EQUAL_SIGNS=equals==`), [
    'EQUAL_SIGNS',
    'equals==',
  ])
})
it(`Parses RETAIN_INNER_QUOTES={"foo": "bar"}`, function() {
  assert.deepStrictEqual(parseKeyValuePair(`RETAIN_INNER_QUOTES={"foo": "bar"}`), [
    'RETAIN_INNER_QUOTES',
    `{"foo": "bar"}`,
  ])
})
it(`Parses RETAIN_INNER_QUOTES_AS_STRING='{"foo": "bar"}'`, function() {
  assert.deepStrictEqual(
    parseKeyValuePair(`RETAIN_INNER_QUOTES_AS_STRING='{"foo": "bar"}'`),
    ['RETAIN_INNER_QUOTES_AS_STRING', `{"foo": "bar"}`]
  )
})
it(`Parses INCLUDE_SPACE=some spaced out string`, function() {
  assert.deepStrictEqual(parseKeyValuePair(`INCLUDE_SPACE=some spaced out string`), [
    'INCLUDE_SPACE',
    `some spaced out string`,
  ])
})

it('Parses NODE_ENV=production', function() {
  assert.deepStrictEqual(parseKeyValuePair('NODE_ENV=production'), [
    'NODE_ENV',
    'production',
  ])
})

it(`Parses newline`, function() {
  assert.deepStrictEqual(parseKeyValuePair('key="line1\\nline2"'), [
    'key',
    'line1\nline2',
  ])
})

it('Parses EQUALS==', function() {
  assert.deepStrictEqual(parseKeyValuePair('EQUALS=='), ['EQUALS', '='])
})

it('Throws on invalid env', function() {
  assert.throws(
    () => parseKeyValuePair(['=', 'API=example.com']),
    err => err instanceof TypeError
  )
  assert.throws(() => parseKeyValuePair('API'), err => err instanceof Error)
  assert.throws(() => parseKeyValuePair(''), err => err instanceof Error)
  assert.throws(() => parseKeyValuePair('='), err => err instanceof Error)
  assert.throws(() => parseKeyValuePair(), err => err instanceof TypeError)
  assert.throws(() => parseKeyValuePair(undefined), err => err instanceof TypeError)
})

it('Does not throw with ignoreMalformed: true', function() {
  assert.equal(parseKeyValuePair('', {ignoreMalformed: true}), null)
})
