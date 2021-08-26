import Api from '@/services/api'

export default {
  index() { // List all blogs
    return Api().get('/')
  },
  show(blogId) { // Show one blog
    return Api().get(`blog/${blogId}`)
  },
  post(blog) { // Publish blog
    return Api().post('blog/new', blog)
  },
  list(author) { // List all user's blog
    return Api().post('blog', author)
  },
  listCate(category) { // List blogs of a category
    return Api().get(`category/${category}`)
  },
  edit(blog) { // Edit blog
    return Api().put(`blog/${blog.id}`, blog)
  },
  delete(blog) { // Delete blog
    return Api().delete(`blog/${blog.id}`, blog)
  }
}
