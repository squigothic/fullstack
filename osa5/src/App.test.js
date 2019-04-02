import React from 'react'
import { render, waitForElement } from 'react-testing-library'
jest.mock('./services/blogs')
import App from './App'


describe('<App />', () => {
  it('does not render any blogs if not logged in', async () => {
    const component = render(
      <App />
    )

    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('Log in to application')
    )
    const blogs = component.container.querySelectorAll('.clickableDiv')

    expect(blogs).toBe(undefined)
    expect(component.container).toHaveTextContent('username')
    expect(component.container).toHaveTextContent('password')

  })
})
