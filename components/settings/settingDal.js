const mongoose = require("mongoose");
const settingSchema = new mongoose.Schema({
  subDomain: { type: String, default: "https://custdelight.com/xxxx" },
  customerPortal: {
    type: String,
    default: "https://appname.custdelight.com/portal",
  },
  logoUrl: { type: String, default: "" },
  branding: { type: Boolean, default: false },
  senderName: { type: String, default: "Name" },
  senderEmail: { type: String, default: "Email" },
});

const Setting = mongoose.model("Setting", settingSchema);
module.exports = Setting;
