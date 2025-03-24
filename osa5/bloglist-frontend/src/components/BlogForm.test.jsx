import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  render(<BlogForm addBlog={createBlog} />)

  const input = screen.getAllByRole('textbox')

  await user.type(input[0], 'Testtitle')
  await user.type(input[1], 'testuser')
  await user.type(input[2], 'testurl')

  const sendButton = screen.getByText('create')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Testtitle')
  expect(createBlog.mock.calls[0][0].author).toBe('testuser')
  expect(createBlog.mock.calls[0][0].url).toBe('testurl')
})