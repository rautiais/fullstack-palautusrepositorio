const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response, next) => {
  try {
    const user = request.user;
    if (!user) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    const blog = new Blog({ ...request.body, user: user._id });
    const result = await blog.save();

    user.blogs = user.blogs.concat(result._id);
    await user.save();

    await result.populate("user", { username: 1, name: 1 });
    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
  try {
    const updated = await Blog.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true, runValidators: true, context: "query" },
    ).populate("user", { username: 1, name: 1 });
    response.json(updated);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    const user = request.user;
    if (!user) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    const blog = await Blog.findById(request.params.id);
    if (!blog) {
      return response.status(404).json({ error: "blog not found" });
    }

    if (blog.user.toString() !== user._id.toString()) {
      return response
        .status(403)
        .json({ error: "only the creator can delete this blog" });
    }

    await blog.deleteOne();
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
