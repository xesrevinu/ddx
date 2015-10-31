/**
 * Created by kee on 15/9/25.
 */
require('babel/register');
require('./run');
var arg = process.argv.slice(2);
if (arg[0] === 'init'){
  require('./_init');
}
