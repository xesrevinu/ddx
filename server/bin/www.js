/**
 * Created by kee on 15/9/25.
 */
var arg = process.argv.slice(2);
require('babel-core/register');
require('./run');

if (arg[0] === 'init'){
  require('./_init');
}
