const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;
const userSchema = new mongoose.Schema(
  {
    email: String,
    firstname: String,
    lastname: String,
    password: String,
    // pricingPlanId: ObjectId,
    widgetId1: ObjectId,
    widgetId2: ObjectId,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true },
  }
);

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// userSchema.virtual("pricingPlan", {
//   ref: "PricePlan",
//   localField: "pricingPlanId",
//   foreignField: "_id",
// });

userSchema.virtual("widget1", {
  ref: "Widget",
  localField: "widgetId1",
  foreignField: "_id",
});

userSchema.virtual("widget2", {
  ref: "Widget",
  localField: "widgetId2",
  foreignField: "_id",
});

const User = mongoose.model("User", userSchema);
module.exports = User;
