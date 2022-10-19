const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;

const widgetSchema = new mongoose.Schema(
  {
    moduleId: ObjectId,
    themeId: ObjectId,
    settingId: ObjectId,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true },
  }
);

widgetSchema.virtual("module", {
  ref: "Module",
  localField: "moduleId",
  foreignField: "_id",
});

widgetSchema.virtual("theme", {
  ref: "Theme",
  localField: "themeId",
  foreignField: "_id",
});

widgetSchema.virtual("setting", {
  ref: "Setting",
  localField: "settingId",
  foreignField: "_id",
});

const Widget = mongoose.model("Widget", widgetSchema);
module.exports = Widget;
