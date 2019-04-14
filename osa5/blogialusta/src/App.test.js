import React from 'react'
import {
  render, waitForElement
} from 'react-testing-library'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  it('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('Log in to application')
    )

    expect(component.container).toHaveTextContent('username')
    expect(component.container).toHaveTextContent('password')
    expect(component.container).not.toHaveTextContent('maken uusi kotskasivu')

  })

  it('when user logged in, blogs are rendered', async () => {

    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Teuvo Testaaja'
    }

    localStorage.setItem('loggedBlogUser', JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('Blogs')
    )

    //component.debug()
    const div = component.container.querySelectorAll('.clickableDiv')

    expect(div.length).toBe(3)
    expect(component.container).toHaveTextContent('maken uusi kotskasivu')

  })
})

