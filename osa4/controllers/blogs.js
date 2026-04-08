const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  content: {
    id: String,
    title: String,
    author: String,
    url: String,
    likes: Number,
  },
  important: Boolean,
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
