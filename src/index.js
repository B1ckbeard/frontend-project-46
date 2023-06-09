import * as fs from 'node:fs';
import * as process from 'process';
import path from 'node:path';
import parse from './parsers.js';

import buildDiff from './buildDiff.js';
import formatDiff from './formatters/stylish.js';

const buildPath = (filePath) => path.resolve(process.cwd(), filePath);
const getFileFormat = (filePath) => path.extname(filePath).replace('.', '');
const getData = (filePath) => parse(fs.readFileSync(filePath, 'utf-8'), getFileFormat(filePath));
//const getData = (filePath) => parse(fs.readFileSync(path.resolve(process.cwd(),'../frontend-project-46','__fixtures__',filePath), 'utf-8'), getFileFormat(filePath));

const genDiff = (filepath1, filepath2) => {
  const data1 = getData(buildPath(filepath1));
  const data2 = getData(buildPath(filepath2));
  
  const diff = buildDiff(data1, data2);
  const formattedDiff = `{\n${formatDiff(diff)}\n}`;
  return formattedDiff;
}

export default genDiff;
