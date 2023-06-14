const environment = process.env.NODE_ENV || "development";
const config = require("../../knexfile")[environment];
const knex = require("knex")(config);

module.exports = knex;


// [Error: ENOENT: no such file or directory, scandir '/opt/render/project/src/migrations'] {
//   errno: -2,
//   code: 'ENOENT',
//   syscall: 'scandir',
//   path: '/opt/render/project/src/migrations'
// }