const widgetService = require("./widgetService.js");
const moduleController = require("../modules/moduleController.js");
const membershipController = require("../memberships/membershipController.js");
const voucherController = require("../vouchers/voucherController.js");
const settingController = require("../settings/settingController.js");
const themeController = require("../themes/themeController.js");
const userService = require("../users/userService.js");

const createWidget = async () => {
  const module = await moduleController.createModule({});
  console.log(
    "🚀 ~ file: widgetController.js ~ line 10 ~ createWidget ~ module",
    module
  );
  const setting = await settingController.createSetting({});
  console.log(
    "🚀 ~ file: widgetController.js ~ line 12 ~ createWidget ~ setting",
    setting
  );
  const theme = await themeController.createTheme({});
  console.log(
    "🚀 ~ file: widgetController.js ~ line 14 ~ createWidget ~ theme",
    theme
  );

  const widget = await widgetService.createWidget({
    moduleId: module._id,
    themeId: theme._id,
    settingId: setting._id,
  });
  console.log(
    "🚀 ~ file: widgetController.js ~ line 18 ~ createWidget ~ widget",
    widget
  );

  return widget;
};

const updateWidget = async (req, res) => {
  console.log(
    "🚀 ~ file: widgetController.js ~ line 11 ~ updateWidget ~ req",
    req.body
  );
  const widgetId = req.body.widgetId;
  const widget = req.body.widget;
  const { module, theme, setting } = widget;
  const { membership, voucher } = module;
  const widgetdata = await findOneById(widgetId);
  console.log(
    "🚀 ~ file: widgetController.js ~ line 30 ~ updateWidget ~ widgetdata",
    widgetdata
  );
  const { moduleId, themeId, settingId } = widgetdata;
  const moduledata = await moduleController.findOneById(moduleId);
  // const themedata = await themeController.findOneById(themeId);
  // const settingdata = await settingController.findOneById(settingId);
  const { membershipId, voucherId } = moduledata;

  const updatedMembership = await membershipController.updateMembershipById(
    membershipId,
    membership
  );
  const updatedVoucher = await voucherController.updateVoucherById(
    voucherId,
    voucher
  );

  const updatedTheme = await themeController.updateThemeById(themeId, theme);
  const updatedSetting = await settingController.updateSettingById(
    settingId,
    setting
  );

  const updatedwidget = {
    module: { membership: updatedMembership, voucher: updatedVoucher },
    theme: updatedTheme,
    setting: updatedSetting,
  };
  console.log(
    "🚀 ~ file: widgetController.js ~ line 78 ~ updateWidget ~ updatedwidget",
    updatedwidget
  );

  // return updatedwidget;
  res.json(updatedwidget);
};

const findOneById = async (filter) => {
  const widget = await widgetService.findOneById(filter);
  return widget;
};

const findOneByDomain = async (req, res) => {
  if (!req.body.domain) res.send("error");
  const setting = await settingController.findOneByDomain(req.body.domain);
  console.log(
    "🚀 ~ file: widgetController.js ~ line 98 ~ findOneByDomain ~ setting",
    setting
  );
  const settingId = setting._id;
  const widget = await widgetService.findOneBySettingId(settingId);
  console.log(
    "🚀 ~ file: widgetController.js ~ line 104 ~ findOneByDomain ~ widget",
    widget
  );
  const widgetId = widget._id;
  const widgetData = widgetService.readWidgetAllData(widgetId);
  const user = await userService.findOneByWidgetId(widgetId);
  console.log(
    "🚀 ~ file: widgetController.js ~ line 107 ~ findOneByDomain ~ user",
    user
  );
  const data = { user: user, widget: widgetData };

  res.send(data);
};

const findOneBySettingId = async (settingId) => {
  const widget = await widgetService.findOneBySettingId({ settingId });
  return widget;
};

const readWidget = async (widgetId) => {
  console.log("widgetController widgetId", widgetId);
  const widget = widgetService.readWidgetAllData(widgetId);
  console.log(
    "🚀 ~ file: widgetController.js ~ line 95 ~ readWidget ~ widget",
    widget
  );
  // const widgetData = await findOneById(widgetId);
  // const { moduleId, themeId, settingId } = widgetData;
  // const moduleData = await moduleController.findOneById(moduleId);
  // const membershipData = await membershipController.findOneById(
  //   moduleData.membershipId
  // );
  // const voucherData = await voucherController.findOneById(moduleData.voucherId);
  // const themeData = await themeController.findOneById(themeId);
  // const settingData = await settingController.findOneById(setting);

  // const widget = {
  //   module: { membershipData, voucherData },
  //   themeData,
  //   settingData,
  // };
  return widget;
};

const widgetController = {
  createWidget,
  updateWidget,
  findOneById,
  readWidget,
  findOneByDomain,
  findOneBySettingId,
};

module.exports = widgetController;
