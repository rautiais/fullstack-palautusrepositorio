const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

    const favorite = blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
    return {
      title: favorite.title,
      author: favorite.author,
      likes: favorite.likes
    }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  let authorCounts = {}

  for (let i = 0; i < blogs.length; i++) {
    let author = blogs[i].author
    if (authorCounts[author] === undefined) {
      authorCounts[author] = 0
    }
    authorCounts[author] = authorCounts[author] + 1
  }

  let topAuthor = null
  let topCount = 0

  for (let author in authorCounts) {
    if (authorCounts[author] > topCount) {
      topCount = authorCounts[author]
      topAuthor = author
    }
  }

  return { author: topAuthor, blogs: topCount }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  let authorLikes = {}

  for (let i = 0; i < blogs.length; i++) {
    let author = blogs[i].author
    if (authorLikes[author] === undefined) {
      authorLikes[author] = 0
    }
    authorLikes[author] = authorLikes[author] + blogs[i].likes
  }

  let topAuthor = null
  let topLikes = 0

  for (let author in authorLikes) {
    if (authorLikes[author] > topLikes) {
      topLikes = authorLikes[author]
      topAuthor = author
    }
  }

  return { author: topAuthor, likes: topLikes }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}