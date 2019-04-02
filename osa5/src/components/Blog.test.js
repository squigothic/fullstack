import React from 'react'
import { render, fireEvent } from 'react-testing-library'
//import { prettyDOM } from 'dom-testing-library'
import Blog from './Blog'

it('only title and author are visible originally and clicking extends info', () => {
  const blog = {
    author: 'kirjailija',
    title: 'blogin otsikko',
    likes: '2',
    url: 'testisaitti.com',
    user: {
      name: 'pete',
      id: '1'
    }
  }

  const user = {
    id: 1
  }

  const component = render(
    <Blog
      blog={blog}
      user={user}
    />
  )

  expect(component.container).toHaveTextContent(
    'blogin otsikko kirjailija'
  )
})

it('extended blog info is displayed after clicking the div', () => {
  const blog = {
    author: 'kirjailija',
    title: 'blogin otsikko',
    likes: '2',
    url: 'testisaitti.com',
    user: {
      name: 'kirjailija',
      id: '1'
    }
  }

  const user = {
    id: 1
  }

  const updateBlogLikes = jest.fn()
  const deleteBlog = jest.fn()

  const component = render(
    <Blog
      blog={blog}
      updateBlogLikes={updateBlogLikes}
      deleteBlog={deleteBlog}
      user={user}
    />
  )

  const clickableDiv = component.container.querySelector('.clickableDiv')

  fireEvent.click(clickableDiv)

  const extendedDiv = component.container.querySelector('.extendedDiv')

  expect(extendedDiv).toHaveTextContent(
    'testisaitti.com'
  )
})
