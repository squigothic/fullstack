import React, { useState } from 'react'
import blogService from '../services/blogs'
import showNotification from '../services/notification'
import PropTypes from 'prop-types'

const NewBlog = (props) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const createNewBlog = async (event) => {
        event.preventDefault()
        props.toggleVisibility()
        const newBlogObject = {
            title,
            author,
            url,
        }
        blogService.setToken(props.user.token)
        const returnedBlog = await blogService.create(newBlogObject)
        showNotification(props.setNotificationMessage, 'created a new blog')
        props.updateBlogs(props.blogs.concat(returnedBlog))
        setTitle('')
        setUrl('')
        setAuthor('')
    }

    return (
        <div>
            <div><h2>Create new blog entry</h2></div>
            <div>
                <form onSubmit={createNewBlog}>
                    <div>
                    title
                    <input
                            type="text"
                            value={title}
                            onChange={({ target }) => setTitle(target.value)}
                        />
                    author
                    <input
                            type="text"
                            value={author}
                            onChange={({ target }) => setAuthor(target.value)}
                        />
                        url
                    <input
                            type="text"
                            value={url}
                            onChange={({ target }) => setUrl(target.value)}
                        />
                        <button type="submit">Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

NewBlog.propTypes = {
    blogs: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    updateBlogs: PropTypes.func.isRequired,
    setNotificationMessage: PropTypes.func.isRequired,
    toggleVisibility: PropTypes.func.isRequired
}

export default NewBlog