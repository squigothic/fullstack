import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import { prettyDOM } from 'dom-testing-library'
import SimpleBlog from './SimpleBlog'

it('renders blog title and author', () => {
  const blog = {
    author: 'kirjailija',
    title: 'blogin otsikko',
    likes: '2'
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  const authorDiv = component.container.querySelector('.titleAndAuthor')
  console.log(prettyDOM(authorDiv))

  expect(authorDiv).toHaveTextContent(
    'blogin otsikko kirjailija'
  )

  const likesDiv = component.container.querySelector('.likes')
  expect(likesDiv).toHaveTextContent(
    'blog has 2 likes'
  )
})

it('clicking the button twice calls the clickhandler twice', async () => {
  const blog = {
    author: 'kirjailija',
    title: 'blogin otsikko',
    likes: '2'
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})