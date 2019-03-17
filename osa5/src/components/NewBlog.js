import React, { useState } from 'react'
import blogService from '../services/blogs'
import showNotification from '../services/notification'

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
            url
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
                    </div>
                    <button type="submit">Create</button>
                </form>
            </div>
        </div>
    )
}

export default NewBlog