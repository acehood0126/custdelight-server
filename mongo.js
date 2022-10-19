const mongoose = require("mongoose");

const url = `mongodb+srv://fullstack:fullstack@cluster0.mtspym3.mongodb.net/custdelight`;

const userShema = new mongoose.Schema({
  email: String,
  firstname: String,
  lastname: String,
  password: String,
  active: Boolean,
});

const User = mongoose.model("User", userShema);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected");
    const user = new User({
      email: "robinhood8865@gmail.com",
      firstname: "robin",
      lastname: "hood",
      password: "robinhood",
      active: true,
    });
    return note.save();
  })
  .then(() => {
    console.log("note saved!");
    return mongoose.connection.close();
  })
  .catch((err) => console.log(err));
