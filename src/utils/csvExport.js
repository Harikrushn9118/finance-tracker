const { Parser } = require('json2csv');
exports.toCsv = (rows) => {
  const parser = new Parser();
  return parser.parse(rows);
};