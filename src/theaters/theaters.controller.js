const theatersService = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


//calls and awaits list in theaters.service.js and returns it
async function list(req,res,next){
  const data = await theatersService.list();
  res.json({data});
}

module.exports = {
  list:asyncErrorBoundary(list),
}