import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { Blog } from './Blog'

describe('<Blog />', () => {
  const content = {
    author: 'A. Nonym',
    title: 'Identity Online',
    url: '127.0.0.1',
    likes: 55,
  }

  test('renders title and author when collapsed', () => {
    const container = render(
      <Blog blog={content} ownedByUser={false} />
    ).container

    const description = screen.getByText(`${content.title} ${content.author}`, { exact: false })
    expect(description).toBeDefined()

    const extraContent = container.querySelector('.blog .togglableContent')
    expect(extraContent).toHaveStyle({ display: 'none' })
  })

  test('renders URL and number of likes when expanded', async () => {
    const container = render(
      <Blog blog={content} ownedByUser={false} />
    ).container

    const user = userEvent.setup()
    const expandButton = container.querySelector('.blog #btn-view')
    await user.click(expandButton)

    const urlElement = screen.getByText(`${content.url}`)
    expect(urlElement).toBeDefined()
    const likesElement = container.querySelector('.blog #likes')
    expect(likesElement).toBeDefined()

    const extraContent = container.querySelector('.blog .togglableContent')
    expect(extraContent).not.toHaveStyle({ display: 'none' })
  })

  test('addLike event handler is called when like button is clicked', async () => {
    const mockUpdate = jest.fn()
    const container = render(
      <Blog blog={content} ownedByUser={false} updateBlog={mockUpdate}/>
    ).container

    const user = userEvent.setup()
    const expandButton = container.querySelector('.blog #btn-view')
    await user.click(expandButton)

    const likeButton = container.querySelector('.blog #btn-like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockUpdate.mock.calls).toHaveLength(2)
  })
})