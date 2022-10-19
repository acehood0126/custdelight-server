const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;
const moduleSchema = new mongoose.Schema(
  {
    membershipId: ObjectId,
    voucherId: ObjectId,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true },
  }
);

moduleSchema.virtual("membership", {
  ref: "Memebership",
  localField: "membershipId",
  foreignField: "_id",
});

moduleSchema.virtual("voucher", {
  ref: "Voucher",
  localField: "voucherId",
  foreignField: "_id",
});

const Module = mongoose.model("Module", moduleSchema);
module.exports = Module;
