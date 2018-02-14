const KEY_VALUE_REGEX = /^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/
const LINEBREAK_REGEX = /\\n/gm
const VALUE_CLEANUP_REGEX = /(^['"]|['"]$)/g

declare function parseKeyValuePair(env: string): [string, string]
declare function parseKeyValuePair(env: string, options: { ignoreMalformed?: false }): [string, string]
declare function parseKeyValuePair(env: string, options: { ignoreMalformed: true }): [string, string] | null

export = function parseKeyValuePair(env: String, { ignoreMalformed = false } = {}): [string, string]  | null {
  const typeOf = typeof env
  if (typeOf !== 'string') {
    throw new TypeError(`Got ${typeOf}, expected string`)
  }

  const match = env.match(KEY_VALUE_REGEX)

  if (!match) {
    if (ignoreMalformed) return null
    throw new Error(`Unable to parse: ${env}`)
  }

  let [, key, value = ''] = match

  // expand newlines in quoted values
  const len = value ? value.length : 0
  if (len > 0 && value.charAt(0) === '"' && value.charAt(len - 1) === '"') {
    value = value.replace(LINEBREAK_REGEX, '\n')
  }

  // remove any surrounding quotes and extra spaces
  value = value.replace(VALUE_CLEANUP_REGEX, '').trim()

  return [key, value]
}
