import {cleanup} from '@testing-library/react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure } from 'enzyme'
import axios from "axios";
import PostComponent from "./PostComponent";
import userEvent from '@testing-library/user-event'
import {render, screen} from '@testing-library/react'
import { Header } from '../model/Header';
import user from '@testing-library/user-event'
import url from '../environment/url'

jest.mock("axios");
afterEach(cleanup)
configure({adapter: new Adapter()});


it('clicking "submit" submits article', async () => {
  const response = {status: 200, data: {
    "header": {
      "subject": 'EKONOMI',
      "year": 2022,
      "vignette": 'inrikes',
      "articleId": "2906"
    },
    "support": "\n",
    "headline": "\n",
    "lead": "\n"
    }
  }
  axios.post.mockResolvedValueOnce(response);
  render(<PostComponent/>)

  userEvent.click(screen.getByRole('button', {name: /submit/i}))

  expect(axios.post).toHaveBeenCalledWith(url, {
    "header": new Header('EKONOMI', 2022, 'INRIKES', ''),
    "headline": "",
    "lead": "",
    "support": ""
  });
})

it('accepts an lead and displays to the screen', () => {
  render(<PostComponent />)
  const input = screen.getByRole('textbox', { name: /lead/i })
  const lead = 'Regeringen föreslår att det ska bli tydligare krav och ' +
    'skärpta regler för religiösa inslag i förskolor, skolor och fritidshem. '
    + 'Bland annat handlar det om en noggrannare kontroll av huvudmännen.'

  user.type(input, lead)

  expect(screen.getByDisplayValue(lead)).toBeInTheDocument()
})
