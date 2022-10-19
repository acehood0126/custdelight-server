const settingService = require("./settingService");

const createSetting = async () => {
  const setting = await settingService.createSetting({});
  return setting;
};

const updateSettingById = async (id, data) => {
  const setting = await settingService.updateSettingById(id, data);
  return setting;
};

const findOneById = async (id) => {
  const setting = await settingService.findOneById(id);
  return setting;
};

const findOneByDomain = async (domain) => {
  const setting = await settingService.findOneByDomain({ domain });
  return setting;
};

const settingController = {
  createSetting,
  updateSettingById,
  findOneById,
  findOneByDomain,
};

module.exports = settingController;
