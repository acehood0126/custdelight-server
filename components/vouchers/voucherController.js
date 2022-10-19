const voucherServcie = require("./voucherService");

const defaultVoucher = {
  voucherType: 1,
  expiryTerm: 1,
  fees: 99,
  voucherFirstname: false,
  voucherLastname: false,
  voucherEmail: false,
  voucherMobileNumber: false,
  redemptionType: false,
  redemption: 200,
  voucherTerms: "https://www.xxx.com",
};

const createVoucher = async () => {
  const voucher = await voucherServcie.createVoucher({});
  return voucher;
};

const updateVoucherById = async (id, data) => {
  const voucher = await voucherServcie.updateVoucherById(id, data);
  return voucher;
};

const findOneById = async (id) => {
  const voucher = await voucherServcie.findOneById(id);
  return voucher;
};
const voucherController = {
  createVoucher,
  updateVoucherById,
  findOneById,
};

module.exports = voucherController;
