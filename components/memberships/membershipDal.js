const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema({
  membershipType: { type: Number, default: 1 },
  paymentTerm: { type: Number, default: 1 },
  fees: { type: Number, default: 99.99 },
  useFirstName: { type: Boolean, default: false },
  useLastName: { type: Boolean, default: false },
  useEmail: { type: Boolean, default: false },
  useMobileNumber: { type: Boolean, default: false },
  cancellation: { type: Number, default: 1 },
  membershipTerms: { type: String, default: "https://www.xxx.com" },
});

const Membership = mongoose.model("Membership", membershipSchema);
module.exports = Membership;
