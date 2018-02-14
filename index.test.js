const parseEnv = require('./index.js')

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
