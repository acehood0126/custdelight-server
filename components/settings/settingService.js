const Setting = require("./settingDal");

const createSetting = async (data) => {
  const setting = new Setting(data);
  const _setting = await setting.save();
  return _setting;
};

const findOneById = async (id) => {
  const setting = await Setting.findById(id);
  return setting;
};

const updateSettingById = async (id, data) => {
  const setting = await Setting.updateOne({ _id: id }, data);
  return setting;
};

const findOneByDomain = (domain) => {
  console.log("domain", domain);
  const setting = Setting.findOne(domain);
  return setting;
};

const settingService = {
  createSetting,
  findOneById,
  updateSettingById,
  findOneByDomain,
};

module.exports = settingService;
