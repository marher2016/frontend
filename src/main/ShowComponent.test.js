import React from 'react';
import ShowComponent from "./ShowComponent";
import {cleanup} from '@testing-library/react';
import {shallow} from 'enzyme';
import axios from "axios";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import "../setupTests"
import { configure } from 'enzyme'

jest.mock("axios");
afterEach(cleanup)
configure({adapter: new Adapter()});

it('will give a good response', async () => {
  const response = {
    status: 200, data: { "header": {
      "subject": "EKONOMI",
      "year": 2022,
      "vignette": "inrikes",
      "articleId": "5122"
    },
    "support": "   I samband med januariavtalet\n2019 kom Socialdemokraterna\növerens med Miljöpartiet,\nCenterpartiet och Liberalerna om\natt utreda skärpta regler för så\nkallade konfessionella friskolor\noch ett stopp för nya religiösa\nfriskolor.\n  - Vi har sett exempel på att\naktörer inom offentlig sektor\nhar använt statliga och kommunala\nmedel till antidemokratisk\nverksamhet. Av Säkerhetspolisens\narbete och rapporter från bland\nannat Försvarshögskolan framgår\ndet att det exempelvis har\nförekommit kopplingar mellan\nskolverksamhet och den\nvåldsbejakande miljön. Så här kan\nvi inte ha det, säger\nskolminister Lina Axelsson\nKihlblom (S) på en pressträff den\n4 februari.\n  Lämplighetsprövningen av\nenskilda som ansöker om att bli\nhuvudmän inom skolväsendet\nföreslås utökas med\ndemokrativillkor. Regeringen vill\nockså att utrymmet som finns för\nreligiösa inslag i skolan\nförtydligas. Detta så att elever\nkan välja om de vill delta eller\nej.\n  - Det behövs skarpare och\neffektivare verktyg för tillstånd\noch tillsyn så att oseriösa och\nolämpliga aktörer förhindras och\nstoppas. Verksamheter som inte\nföljer reglerna kan stängas genom\natt deras godkännande återkallas,\nsäger Lina Axelsson Kihlblom.\n  S gick till val 2018 på att\nförbjuda religiösa friskolor. Men\nett förbud finns det i dag inte\nen majoritet för i riksdagen.\nSkolministern säger emellertid\natt ett etableringsstopp bereds\njust nu i regeringskansliet. Ett\netableringsstopp har dock fått\nkritik då det riskerar att bryta\nmot religionsfriheten såväl som\nEuropakonventionen.\n  Lagändringarna vad gäller\nskärpta regler för religiösa\ninslag i skolor föreslås träda\ni kraft den 1 januari 2023.\n",
    "headline": "Skärpta\nregler för\nreligiösa\ninslag i\nfriskolor\n",
    "lead": "Regeringen föreslår att det\nska bli tydligare krav och\nskärpta regler för religiösa\ninslag i förskolor, skolor\noch fritidshem. Bland annat\nhandlar det om en noggrannare\nkontroll av huvudmännen.\n",
    }
  }
  axios.get.mockImplementation(() => Promise.resolve(response))
  const wrapper = shallow(<ShowComponent/>)
  wrapper.instance().componentDidMount()
  expect(axios.get).toHaveBeenCalledWith('http://localhost:8181/v1/articles/inrikes/2022/ekonomi/5122');
})

it('user did a bad request', async () => {
  const response = {
    status: 400
  }
  axios.get.mockImplementation(() => Promise.reject(response))
  const wrapper = shallow(<ShowComponent/>)
  wrapper.instance().componentDidMount()
  expect(axios.get).toHaveBeenCalledWith('http://localhost:8181/v1/articles/inrikes/2022/ekonomi/5122');
})
