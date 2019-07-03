var shell = require('shelljs');


shell.rm('-rf', 'public/lib/');
shell.mkdir('-p', 'public/lib')
shell.cp('-R', 'node_modules/vue', 'public/lib/vue');
shell.cp('-R', 'node_modules/vuex', 'public/lib/vuex');
shell.cp('-R', 'node_modules/element-ui', 'public/lib/element-ui');
shell.cp('-R', 'node_modules/vue-router', 'public/lib/vue-router');
shell.cp('-R', 'node_modules/axios', 'public/lib/axios');
shell.cp('-R', 'node_modules/lodash', 'public/lib/lodash');