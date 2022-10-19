const membershipController = require("../memberships/membershipController.js");
const moduleController = require("../modules/moduleController.js");
const settingController = require("../settings/settingController.js");
const Setting = require("../settings/settingDal.js");
const themeController = require("../themes/themeController.js");
const voucherController = require("../vouchers/voucherController.js");
const Widget = require("./widgetDal.js");

const createWidget = async (data) => {
  const widget = new Widget(data);
  const _widget = await widget.save();
  return _widget;
};

const findOneById = async (filter) => {
  const widget = await Widget.findById(filter);
  return widget;
};

const findOneBySettingId = async (settingId) => {
  const widget = await Widget.findOne(settingId);
  return widget;
};

const readWidgetAllData = async (widgetId) => {
  const widget = await Widget.findById(widgetId);
  console.log(
    "🚀 ~ file: widgetService.js ~ line 21 ~ readWidgetAllData ~ widget",
    widget
  );

  const { moduleId, themeId, settingId } = widget;
  const module = await moduleController.findOneById(moduleId);
  console.log(
    "🚀 ~ file: widgetService.js ~ line 25 ~ readWidgetAllData ~ module",
    module
  );
  const { membershipId, voucherId } = module;
  const membership = await membershipController.findOneById(membershipId);
  console.log(
    "🚀 ~ file: widgetService.js ~ line 28 ~ readWidgetAllData ~ membership",
    membership
  );
  const voucher = await voucherController.findOneById(voucherId);
  console.log(
    "🚀 ~ file: widgetService.js ~ line 30 ~ readWidgetAllData ~ voucher",
    voucher
  );
  const theme = await themeController.findOneById(themeId);
  console.log(
    "🚀 ~ file: widgetService.js ~ line 32 ~ readWidgetAllData ~ theme",
    theme
  );
  const setting = await settingController.findOneById(settingId);
  console.log(
    "🚀 ~ file: widgetService.js ~ line 34 ~ readWidgetAllData ~ setting",
    setting
  );
  const data = {
    module: { membership: membership, voucher: voucher },
    theme: theme,
    setting: setting,
  };
  console.log(
    "🚀 ~ file: widgetService.js ~ line 40 ~ readWidgetAllData ~ data",
    data
  );
  return data;
};

const widgetService = {
  createWidget,
  findOneById,
  readWidgetAllData,
  findOneBySettingId,
};

module.exports = widgetService;
