import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { BlogForm } from './BlogForm'

describe('<BlogForm />', () => {
  test('passes correct data to create blog event handler', async () => {
    const blogData = {
      author: 'T. Esting',
      title: 'Testing the BlogForm Component',
      url: 'https://example.io',
    }
    const onSubmitHandler = jest.fn()
    render(<BlogForm onSubmit={onSubmitHandler}/>)

    const user = userEvent.setup()
    const authorInput = screen.getByPlaceholderText('add author...')
    const titleInput = screen.getByPlaceholderText('add title...')
    const urlInput = screen.getByPlaceholderText('add url...')
    const submitButton = screen.getByText('create')

    await user.type(authorInput, blogData.author)
    await user.type(titleInput, blogData.title)
    await user.type(urlInput, blogData.url)
    await user.click(submitButton)

    expect(onSubmitHandler.mock.calls[0][0]).toMatchObject(blogData)
  })
})