/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/no-node-access */
import React from 'react'
import Dropzone from 'react-dropzone'
import {act, fireEvent, render, waitFor} from '@testing-library/react'
import {shallow, configure} from 'enzyme';
import ImageComponent from "./ImageComponent";
import {cleanup} from '@testing-library/react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import axios from "axios";

jest.mock("axios");
afterEach(cleanup)
configure({adapter: new Adapter()});
it('was an file already uploaded', async () => {
  const response = {
      data: {
        error: "AlreadyAdded",
        message: "Image with path inrikes/2022/ekonomi/1617/swaggerimage.png has already been added",
        status: 409
      }, 
      status: 409, 
      statusText: "", 
      headers: {
        "access-control-allow-credentials": "true",
        "access-control-allow-origin": "http://localhost:3000",
        "content-type": "application/json"
      }, 
      config: {
        //content removed for abbrivety
        url: "http://localhost:8282/v1/images/inrikes/2022/ekonomi/1617"
        //content removed for abbrivety
      },
      request: {
        //content removed for abbrivety
        responseURL: "http://localhost:8282/v1/images/inrikes/2022/ekonomi/1617"
        //content removed for abbrivety
    }
  }

  axios.post = jest.fn().mockRejectedValueOnce(response)
  jest.spyOn(window, 'alert').mockImplementation(() => {});
  const file = new File([
    JSON.stringify({ping: true})
  ], 'ping.json', { type: 'application/json' })
  const wrapper = shallow(<ImageComponent/>)
  wrapper.instance().onDrop(mockData([file]))
  expect(axios.post).toHaveBeenCalledWith("http://localhost:8282/v1/images/inrikes/2022/ekonomi/1617", expect.anything(), {"headers": {"Content-Type": "multipart/form-data"}});
})

it('will invoke onDragEnter when dragenter event occurs', async () => {
  const file = new File([
    JSON.stringify({ping: true})
  ], 'ping.json', { type: 'application/json' })
  const data = mockData([file])
  const onDragEnter = jest.fn()

  const ui = (
    <Dropzone onDragEnter={onDragEnter}>
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
        </div>
      )}
    </Dropzone>
  )
  const { container, rerender } = render(ui)
  // eslint-disable-next-line testing-library/no-container
  const dropzone = container.querySelector('div')

  dispatchEvt(dropzone, 'dragenter', data)
  await flushPromises(rerender, ui)

  expect(onDragEnter).toHaveBeenCalled()
})

async function flushPromises(rerender, ui) {
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(() => waitFor(() => rerender(ui)))
}

function dispatchEvt(node, type, data) {
  const event = new Event(type, { bubbles: true })
  Object.assign(event, data)
  fireEvent(node, event)
}

function mockData(files) {
  return {
    dataTransfer: {
      files,
      items: files.map(file => ({
        kind: 'file',
        type: file.type,
        getAsFile: () => file
      })),
      types: ['Files']
    }
  }
}