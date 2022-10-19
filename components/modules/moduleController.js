const moduleService = require("./moduleService");
const membershipController = require("../memberships/membershipController");
const voucherController = require("../vouchers/voucherController");

const createModule = async () => {
  const memebership = await membershipController.createMembership();
  const voucher = await voucherController.createVoucher();
  const module = await moduleService.createModule({
    membershipId: memebership._id,
    voucherId: voucher._id,
  });
  return module;
};

const findOneById = async (filter) => {
  const module = await moduleService.findOneById(filter);
  return module;
};

const moduleController = {
  createModule,
  findOneById,
};

module.exports = moduleController;
