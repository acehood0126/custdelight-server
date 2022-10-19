const userService = require("./userService.js");
const widgetService = require("../widgets/widgetService.js");
const widgetController = require("../widgets/widgetController.js");
const { ERROR } = require("../../enum.js");
const moduleController = require("../modules/moduleController.js");
const membershipController = require("../memberships/membershipController.js");
const voucherController = require("../vouchers/voucherController.js");
const themeController = require("../themes/themeController.js");
const settingController = require("../settings/settingController.js");

const createUser = async (data) => {
  if (!data) {
    console.log(ERROR.NO_DATA);
    return ERROR.NO_DATA;
  }
  const isNew = await userService.isNewUser(data);
  if (!isNew) {
    console.log(ERROR.USER_EXIST);
    return ERROR.USER_EXIST;
  }
  const widget = await widgetController.createWidget({});

  const user = await userService.createUser({
    ...data,
    widgetId1: [widget._id],
  });
  console.log(
    "🚀 ~ file: userController.js ~ line 22 ~ createUser ~ user",
    user
  );
  return user;
};

const findOneByFilter = async (filter) => {
  const data = await userService.findOneByFilter(filter);
  return data;
};

const findOneByWidgetId = async (widgetId) => {
  console.log(
    "🚀 ~ file: userController.js ~ line 40 ~ findOneByWidgetId ~ widgetId",
    widgetId
  );

  const user = userService.findOneByWidgetId(widgetId);
  return user;
};

const findOneBySettingId = async (settingId) => {
  console.log("settingId", settingId);
  const widget = widgetController.findOneBySettingId(settingId);
  console.log(
    "🚀 ~ file: userController.js ~ line 47 ~ findOneBySettingId ~ widget",
    widget
  );
  const { _id, moduleId, themeId } = widget;
  const user = userController.findOneByWidgetId(_id);
  console.log(
    "🚀 ~ file: userController.js ~ line 53 ~ findOneBySettingId ~ user",
    user
  );

  // const module = moduleController.findOneById(moduleId);
  // const { membershipId, voucherId } = module;
  // const membership = membershipController.findOneById(membershipId);
  // const voucher = voucherController.findOneById(voucherId);
  // const theme = themeController.findOneById(themeId);
  // const setting = settingController.findOneById(settingId);
  // const widgetData = {
  //   module: { membership, voucher },
  //   theme: theme,
  //   setting: setting,
  // };
  // const data = { data: widgetData, user: user };
  // return data;
};

const userController = {
  createUser,
  findOneByFilter,
  findOneByWidgetId,
  findOneBySettingId,
};

module.exports = userController;
