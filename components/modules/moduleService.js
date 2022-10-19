const Module = require("./moduleDal");

const createModule = async (data) => {
  const module = new Module(data);
  const _module = module.save();
  return _module;
};

const findOneById = async (filter) => {
  const module = await Module.findById(filter);
  return module;
};

const moduleService = {
  createModule,
  findOneById,
};

module.exports = moduleService;
