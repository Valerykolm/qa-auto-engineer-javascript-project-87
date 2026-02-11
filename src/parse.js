const parse = (data, format) => {
  if ((format === 'json') || (format === 'yml') || (format === 'yaml')) {
    return JSON.parse(data)
  }

  throw new Error(`Unknown format: ${format}`)
}

export default parse
