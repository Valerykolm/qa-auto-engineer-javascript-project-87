import fs from 'fs'
import path from 'path'
import parse from './parse.js'
import buildDiff from './buildDiff.js'
import stylish from './formatters/stylish.js'

const getPath = filepath => path.resolve(process.cwd(), filepath)
const getFormat = filepath => path.extname(filepath).slice(1)
const readFile = filename => fs.readFileSync(getPath(filename), 'utf-8')

const genDiff = (filepath1, filepath2) => {
  const data1 = readFile(filepath1)
  const data2 = readFile(filepath2)

  const parsedData1 = parse(data1, getFormat(filepath1))
  const parsedData2 = parse(data2, getFormat(filepath2))

  const diffTree = buildDiff(parsedData1, parsedData2)

  return stylish(diffTree)
}

export default genDiff
