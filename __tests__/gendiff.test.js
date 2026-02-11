import path from 'path'
import fs from 'fs'
import genDiff from '../src/index.js'

const getFixturePath = filename =>
  path.resolve(process.cwd(), '__tests__/__fixtures__', filename)

const readFile = filename =>
  fs.readFileSync(getFixturePath(filename), 'utf-8')

describe('genDiff flat files comparison', () => {
  test.each([
    ['file1.json', 'file2.json'],
    ['file1.yml', 'file2.yml'],
    ['file1.yaml', 'file2.yaml'],
  ])('compare %s and %s', (file1, file2) => {
    const expected = readFile('expected.txt')

    const filePath1 = getFixturePath(file1)
    const filePath2 = getFixturePath(file2)

    expect(genDiff(filePath1, filePath2)).toBe(expected)
  })
})
