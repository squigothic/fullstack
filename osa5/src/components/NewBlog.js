import React from 'react'
import PropTypes from 'prop-types'

const NewBlog = ({ handleSubmit, title, author, url }) => {

  return (
    <div>
      <div><h2>Create new blog entry</h2></div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            title
            <input {...title.input}
            />
            author
            <input {...author.input}
            />
            url
            <input {...url.input}
            />
            <button type="submit">Create</button>
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
  url: PropTypes.object.isRequired
}

export default NewBlog
