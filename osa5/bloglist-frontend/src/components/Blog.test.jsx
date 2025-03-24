import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library'
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('Component testing is done with react-testing-library')
  expect(element).toBeDefined()
})

test('renders also url, likes, user', () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      url: 'testurl',
      likes: 0,
      user: 'testuser',
    }

    render(<Blog blog={blog} />)

    const titleElement = screen.getByText('Component testing is done with react-testing-library')
    expect(titleElement).toBeDefined()

    const urlElement = screen.findByText('testurl')
    expect(urlElement).toBeDefined()

    const likesElement = screen.findByText('likes 2')
    expect(likesElement).toBeDefined()

    const userElement = screen.findByText('testuser')
    expect(userElement).toBeDefined()
  })