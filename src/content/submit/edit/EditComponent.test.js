import {render, screen} from '@testing-library/react'
import EditComponent from "./EditComponent";
import User from '@testing-library/user-event'
import {cleanup} from '@testing-library/react';
import { configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import axios from "axios";
import UserEvent from '@testing-library/user-event'
import Environment from '../environment/Environment'

jest.mock("axios");
configure({adapter: new Adapter()});

let emit; //https://github.com/jsdom/jsdom/issues/1937#issuecomment-526162324
beforeAll(() => {
  ({ emit } = window._virtualConsole);
});
beforeEach(() => {
  window._virtualConsole.emit = jest.fn();
});
afterEach(cleanup)
afterAll(() => {
  window._virtualConsole.emit = emit;
});

it('clicking "submit" submits article', async () => {
  const response = {status: 200, data: {
    "header": {
      "subject": 'EKONOMI',
      "pubYear": 2022,
      "vignette": 'inrikes',
      "articleId": "2906"
    },
    "support": "\n",
    "headline": "\n",
    "leader": "\n"
    }
  }
  axios.put.mockResolvedValueOnce(response);
  render(<EditComponent/>)

  UserEvent.click(screen.getByRole('button', {name: /submit/i}))

  expect(axios.put).toHaveBeenCalledWith(Environment.BASE_URL + Environment.ARTICLE, {
    "headline": "",
    "leader": "",
    "support": ""
  });
})

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
