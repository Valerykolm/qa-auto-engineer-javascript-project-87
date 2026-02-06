import fs from 'fs'
import path from 'path'
import parse from './parse.js'

const getPath = filepath => path.resolve(process.cwd(), filepath)
const getFormat = filepath => path.extname(filepath).slice(1)
const readFile = filename => fs.readFileSync(getPath(filename), 'utf-8')

const genDiff = (filepath1, filepath2) => {
  const data1 = readFile(filepath1)
  const data2 = readFile(filepath2)

  const parsedData1 = parse(data1, getFormat(filepath1));
  const parsedData2 = parse(data2, getFormat(filepath2));

  const keys = Object.keys({ ...parsedData1, ...parsedData2 }).sort()

  const lines = keys.flatMap((key) => {
    if (!Object.hasOwn(parsedData2, key)) {
      return `  - ${key}: ${parsedData1[key]}`
    }

    if (!Object.hasOwn(parsedData1, key)) {
      return `  + ${key}: ${parsedData2[key]}`
    }

    if (parsedData1[key] !== parsedData2[key]) {
      return [
        `  - ${key}: ${parsedData1[key]}`,
        `  + ${key}: ${parsedData2[key]}`,
      ]
    }

    return `    ${key}: ${parsedData1[key]}`
  })

  return `{\n${lines.join('\n')}\n}`
}

export default genDiff
