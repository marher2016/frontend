import UploadComponent from "./UploadComponent"
import { Header } from "../../model/Header";
import Environment from '../../environment/Environment'
import { render, screen } from '@testing-library/react'

it('is not seen if no article hasn\'t been added yet.', () => {
  const { header } = new Header('ekonomi', 2022, 'inrikes', '') 
  render(<UploadComponent header={header} baseUrl={Environment.IMAGES}/>);
  const heading = screen.getByRole('heading', { name: "Article not yet saved"})
  expect(heading).toBeInTheDocument();
})