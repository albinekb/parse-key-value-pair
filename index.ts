const KEY_VALUE_REGEX = /^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/
const LINEBREAK_REGEX = /\\n/gm
const VALUE_CLEANUP_REGEX = /(^['"]|['"]$)/g

export = function parseEnv(env: String): [string, string] {
  const typeOf = typeof env
  if (typeOf !== 'string') {
    throw new TypeError(`Got ${typeOf}, expected string`)
  }

  const match = env.match(KEY_VALUE_REGEX)

  if (!match) {
    throw new Error(`Unable to parse: ${env}`)
  }

  let [, key, value = ''] = match

  if (key.length === 0) {
    throw new Error(`Env variable with value: ${value} has no key`)
  }

  // expand newlines in quoted values
  const len = value ? value.length : 0
  if (len > 0 && value.charAt(0) === '"' && value.charAt(len - 1) === '"') {
    value = value.replace(LINEBREAK_REGEX, '\n')
  }

  // remove any surrounding quotes and extra spaces
  value = value.replace(VALUE_CLEANUP_REGEX, '').trim()

  return [key, value]
}
