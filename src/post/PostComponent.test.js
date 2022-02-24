import {cleanup} from '@testing-library/react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure } from 'enzyme'
import axios from "axios";
import PostComponent from "./PostComponent";
import UserEvent from '@testing-library/user-event'
import {render, screen} from '@testing-library/react'
import { Header } from '../model/Header';
import User from '@testing-library/user-event'
import Environment from '../environment/Environment'

jest.mock("axios");
configure({adapter: new Adapter()});

let emit;
//https://github.com/jsdom/jsdom/issues/1937#issuecomment-526162324
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
  axios.post.mockResolvedValueOnce(response);
  render(<PostComponent/>)

  UserEvent.click(screen.getByRole('button', {name: /submit/i}))

  expect(axios.post).toHaveBeenCalledWith(Environment.BASE_URL, {
    "header": new Header('EKONOMI', 2022, 'INRIKES', ''),
    "headline": "",
    "leader": "",
    "support": ""
  });
})

it('accepts an lead and displays to the screen', () => {
  render(<PostComponent />)
  const input = screen.getByRole('textbox', { name: /leader/i })
  const leader = 'Regeringen föreslår att det ska bli tydligare krav och ' +
    'skärpta regler för religiösa inslag i förskolor, skolor och fritidshem. '
    + 'Bland annat handlar det om en noggrannare kontroll av huvudmännen.'

  User.type(input, leader)

  expect(screen.getByDisplayValue(leader)).toBeInTheDocument()
})
