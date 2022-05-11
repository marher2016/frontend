import { PureComponent } from "react";
import './SubmitComponent.css';

class SubmitComponent extends PureComponent {

  render() {
    const {headline, leader, support, onChange, onSubmit} = this.props
    return (
      <form onSubmit={onSubmit} className="form">
        <div>
          <label>Rubrik </label>
          <input
            className="input"
            type="text"
            name="headline"
            placeholder="Skriv rubrik här"
            onChange={onChange}
            value={headline}>
          </input>
        </div>
        <div>
          <label>Ingress </label>
          <input
            className="input"
            type="text"
            name="leader"
            aria-label="leader"
            placeholder="Skriv ingress här"
            onChange={onChange}
            value={leader}>
          </input>
        </div>
        <div>
          <label>Brödtext </label>
          <textarea
            className="input"
            name="support"
            aria-label="support"
            placeholder="Lägg in brödtext här"
            onChange={onChange}
            value={support}>
          </textarea>
        </div>
        <button
          type="submit"
          name="submit"
          className="input button"
        >Förhandsgranska</button>
      </form>
    )
  }
}

export default SubmitComponent