var fs = require('fs');

var babelrc = fs.readFileSync('./.babelrc', 'utf-8');
var config;

try {
  config = JSON.parse(babelrc);
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}
require('babel-core/register')(config);
