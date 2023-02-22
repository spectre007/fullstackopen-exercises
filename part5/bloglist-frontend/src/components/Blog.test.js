import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Blog } from './Blog'

describe('<Blog />', () => {
  test('renders title and author when collapsed', () => {
    const content = {
      author: 'A. Nonym',
      title: 'Identity Online',
      url: '127.0.0.1',
      likes: 55,
    }

    const updateBlog = jest.fn()
    const deleteBlog = jest.fn()

    const container = render(
      <Blog blog={content} ownedByUser={false} updateBlog={updateBlog} deleteBlog={deleteBlog} />
    ).container

    const description = screen.getByText(`${content.title} ${content.author}`, { exact: false })
    expect(description).toBeDefined()

    const hiddenContent = container.querySelector('.blog .togglableContent')
    expect(hiddenContent).toHaveStyle({ display: 'none' })
  })
})