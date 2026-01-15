#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import parse from '../src/parse.js';


const program = new Command();

const getPath = (filepath) => path.resolve(process.cwd(), filepath);
const getFormat = (filepath) => path.extname(filepath).slice(1);
const readFile = filename => fs.readFileSync(getPath(filename), 'utf-8');

const command = (filepath1, filepath2) => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);

  const format1 = getFormat(filepath1);
  const format2 = getFormat(filepath2);

  const parsedData1 = parse(data1, format1);
  const parsedData2 = parse(data2, format2);

  console.log(parsedData1);
  console.log(parsedData2);
};

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .action(command)
  .helpOption('-h, --help', 'output usage information');

program.parse(process.argv);