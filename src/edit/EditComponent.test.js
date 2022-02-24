import {render, screen} from '@testing-library/react'
import EditComponent from "./EditComponent";
import User from '@testing-library/user-event'
import {cleanup} from '@testing-library/react';
import { configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

jest.mock("axios");
afterEach(cleanup)
configure({adapter: new Adapter()});

it('accepts a body and displays to the screen', () => {
  render(<EditComponent />)
  const input = screen.getByRole('textbox', { name: /support/i })
  const support = "I slutet av 2021 fanns drygt " +
  "391 000 personer registrerade hos Kronofogden. Det rör sig om en " +
  "minskning med lite över 11 000 personer jämfört med året innan. " +
  "Kronofogdens analytiker Davor Vuleta säger i ett uttalande att en av " +
  "orsakerna till att antalet blivit färre har att göra med att " +
  "skulderna till staten minskar."

  User.type(input, support)

  expect(screen.getByDisplayValue(support)).toBeInTheDocument()
})
