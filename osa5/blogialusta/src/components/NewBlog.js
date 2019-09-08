import React from 'react'
import PropTypes from 'prop-types'

const NewBlog = ({ handleSubmit, title, author, url }) => {
  return (
    <div>
      <div>
        <h2>Create new blog entry</h2>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            title
            <input data-cy="blog-title" {...title.input} />
            author
            <input data-cy="blog-author" {...author.input} />
            url
            <input data-cy="blog-url" {...url.input} />
            <button data-cy="submit-blog" type="submit">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

NewBlog.propTypes = {
  title: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  author: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired,
}

export default NewBlog
