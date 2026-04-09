const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const Blog = require("./models/blog");
const User = require("./models/user");
const middleware = require("./utils/middleware");
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')

const app = express();

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connection to MongoDB:", error.message);
  });

app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)

app.get("/api/blogs", async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

app.get("/api/users", async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 });
  response.json(users);
});

app.put("/api/blogs/:id", async (request, response, next) => {
  try {
    const updated = await Blog.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true, runValidators: true, context: 'query' }
    );
    response.json(updated);
  } catch (error) {
    next(error);
  }
});

app.delete("/api/blogs/:id", async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

app.post("/api/blogs", async (request, response, next) => {
  try {
    const user = await User.findOne({});
    const blog = new Blog({ ...request.body, user: user._id });
    const result = await blog.save();

    user.blogs = user.blogs.concat(result._id);
    await user.save();

    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

app.use(middleware.errorHandler);

module.exports = app;
