import parseJson from './json.js'
import parseYaml from './yaml.js'

const parsers = {
  json: parseJson,
  yml: parseYaml,
  yaml: parseYaml,
}

const parse = (data, format) => {
  const parser = parsers[format]

  if (!parser) {
    throw new Error(`Unknown file format: ${format}`)
  }

  return parser(data)
}

export default parse
