import { Main } from "./Main";

export function MainService(main) {
  console.log(main)
  return new Main(main.headline, main.lead)
}