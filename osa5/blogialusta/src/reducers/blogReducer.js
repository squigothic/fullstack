import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'INIT_BLOGS':
      console.log('initialisoidaan blogeja...')
      return action.data
    case 'UPDATE_VOTES':
      const votedBlog = action.data
      return state.map(blog => (blog.id === votedBlog.id ? votedBlog : blog))
    case 'DELETE_BLOG':
      return state.filter(blog => blog.id !== action.data)
    case 'ADD_COMMENT':
      const blogToChange = action.data
      return state.map(blog =>
        blog.id === blogToChange.id ? blogToChange : blog
      )
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const newBlog = (blog, user) => {
  return async dispatch => {
    blogService.setToken(user.token)
    const returnedBlog = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: returnedBlog,
    })
  }
}

export const updateBlogLikes = id => {
  return async dispatch => {
    const response = await blogService.update(id)
    console.log('response: ', response)
    dispatch({
      type: 'UPDATE_VOTES',
      data: response,
    })
  }
}

export const deleteBlog = id => {
  return async (dispatch, getState) => {
    const user = getState().user
    blogService.setToken(user.token)
    await blogService.deleteBlog(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: id,
    })
  }
}

export const addComment = (id, newComment) => {
  return async dispatch => {
    const response = await blogService.postComment(id, newComment)
    dispatch({
      type: 'ADD_COMMENT',
      data: response,
    })
  }
}

export default blogReducer
