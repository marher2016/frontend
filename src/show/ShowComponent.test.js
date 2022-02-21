import React from 'react';
import ShowComponent from "./ShowComponent";
import {cleanup} from '@testing-library/react';
import {shallow, configure} from 'enzyme';
import axios from "axios";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import "../setupTests"
import URL from '../environment/url'
import ARTICLE from '../environment/article'

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
    "support": "   I samband med januariavtalet\n2019 kom Socialdemokraterna\n"
      + "överens med Miljöpartiet,\nCenterpartiet och Liberalerna om\n"
      + "att utreda skärpta regler för så\nkallade konfessionella friskolor\n"
      + "och ett stopp för nya religiösa\nfriskolor.\n"
      + "  - Vi har sett exempel på att\naktörer inom offentlig sektor\n"
      + "har använt statliga och kommunala\nmedel till antidemokratisk\n"
      + "verksamhet. Av Säkerhetspolisens\narbete och rapporter från bland\n"
      + "annat Försvarshögskolan framgår\ndet att det exempelvis har\n"
      + "förekommit kopplingar mellan\nskolverksamhet och den\n"
      + "våldsbejakande miljön. Så här kan\nvi inte ha det, säger\n"
      + "skolminister Lina Axelsson\nKihlblom (S) på en pressträff den\n"
      + "4 februari.\n  Lämplighetsprövningen av\n"
      + "enskilda som ansöker om att bli\nhuvudmän inom skolväsendet\n"
      + "föreslås utökas med\ndemokrativillkor. Regeringen vill\n"
      + "också att utrymmet som finns för\nreligiösa inslag i skolan\n"
      + "förtydligas. Detta så att elever\nkan välja om de vill delta eller\n"
      + "ej.\n  - Det behövs skarpare och\neffektivare verktyg för tillstånd\n"
      + "och tillsyn så att oseriösa och\nolämpliga aktörer förhindras och\n"
      + "stoppas. Verksamheter som inte\nföljer reglerna kan stängas genom\n"
      + "att deras godkännande återkallas,\nsäger Lina Axelsson Kihlblom.\n"
      + "  S gick till val 2018 på att\nförbjuda religiösa friskolor. Men\n"
      + "ett förbud finns det i dag inte\nen majoritet för i riksdagen.\n"
      + "Skolministern säger emellertid\natt ett etableringsstopp bereds\n"
      + "just nu i regeringskansliet. Ett\netableringsstopp har dock fått\n"
      + "kritik då det riskerar att bryta\nmot religionsfriheten såväl som\n"
      + "Europakonventionen.\n  Lagändringarna vad gäller\n"
      + "skärpta regler för religiösa\ninslag i skolor föreslås träda\n"
      + "i kraft den 1 januari 2023.\n",
    "headline": "Skärpta\nregler för\nreligiösa\ninslag i\nfriskolor\n",
    "lead": "Regeringen föreslår att det\nska bli tydligare krav och\n"
      + "skärpta regler för religiösa\ninslag i förskolor, skolor\n"
      + "och fritidshem. Bland annat\nhandlar det om en noggrannare\n"
      + "kontroll av huvudmännen.\n",
    }
  }
  axios.get.mockResolvedValueOnce(response);
  const wrapper = shallow(<ShowComponent/>)
  wrapper.instance().componentDidMount()
  expect(axios.get).toHaveBeenCalledWith(URL + ARTICLE);
})

it('user did a bad request', async () => {
  const response = {
    status: 400
  }
  axios.get.mockImplementation(() => Promise.reject(response))
  const wrapper = shallow(<ShowComponent/>)
  wrapper.instance().componentDidMount()
  expect(axios.get).toHaveBeenCalledWith(URL + ARTICLE);
})
