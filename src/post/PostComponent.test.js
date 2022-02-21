import {cleanup} from '@testing-library/react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure } from 'enzyme'
import axios from "axios";
import PostComponent from "./PostComponent";
import userEvent from '@testing-library/user-event'
import {render, screen} from '@testing-library/react'
import { Header } from '../model/Header';

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
  expect(axios.post).toHaveBeenCalledWith('http://localhost:8181/v1/articles', {
    "header": new Header('EKONOMI', 2022, 'INRIKES', ''),
    "headline": "", 
    "lead": "", 
    "support": ""
  });
})