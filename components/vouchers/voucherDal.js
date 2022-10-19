const mongoose = require("mongoose");

const voucherSchema = new mongoose.Schema({
  voucherType: { type: Number, default: 1 },
  expiryTerm: { type: Number, default: 1 },
  fees: { type: Number, default: 99.99 },
  voucherFirstName: { type: Boolean, default: false },
  voucherLastName: { type: Boolean, default: false },
  voucherEmail: { type: Boolean, default: false },
  voucherMobileNumber: { type: Boolean, default: false },
  redemptionType: { type: Boolean, default: false },
  redemption: { type: Number, default: 200 },
  voucherTerms: { type: String, default: "https://www.xxx.com" },
});

const Voucher = mongoose.model("Voucher", voucherSchema);
module.exports = Voucher;
