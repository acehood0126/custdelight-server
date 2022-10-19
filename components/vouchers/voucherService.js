const Voucher = require("./VoucherDal.js");

const createVoucher = async (data) => {
  const voucher = new Voucher(data);
  const _voucher = await voucher.save();
  return _voucher;
};

const findOneById = async (id) => {
  const voucher = await Voucher.findById(id);
  return voucher;
};

const updateVoucherById = async (id, data) => {
  const voucher = await Voucher.updateOne({ _id: id }, data);
  return voucher;
};

const voucherServcie = {
  createVoucher,
  findOneById,
  updateVoucherById,
};

module.exports = voucherServcie;
