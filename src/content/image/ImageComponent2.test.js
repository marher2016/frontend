import {setupServer} from 'msw/node'
import {rest} from 'msw'
import {render, fireEvent, screen} from '@testing-library/react'
import ImageComponent from './ImageComponent'

const server = setupServer(
  rest.post('', (req, res, ctx) => {
    return res(ctx.json({status: 200}))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('handles server error', async () => {
  server.use(
    rest.post('', (req, res, ctx) => {
      return res(ctx.status(409))
    }),
  )

  render(<ImageComponent/>)

  const dropzone = screen.getByRole('region', {name: /dropbox/i})
  fireEvent.drop(dropzone)

  const alert = screen.getByRole('alert')

  expect(alert).toHaveTextContent('Bad file: ')
})
