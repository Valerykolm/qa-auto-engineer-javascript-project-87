import path from 'path'
import genDiff from '../src/index.js'

const getFixturePath = filename =>
  path.resolve(process.cwd(), '__tests__/__fixtures__', filename)

test('genDiff compares flat json files', () => {
  const result = genDiff(
    getFixturePath('file1.json'),
    getFixturePath('file2.json'),
  )

  const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`

  expect(result).toBe(expected)
})
