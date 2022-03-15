import { PureComponent } from "react";
import './SubmitComponent.css';

class SubmitComponent extends PureComponent {

  render() {
    const {headline, leader, support} = this.props.state
    const {onChange, onSubmit} = this.props
    return (
      <form onSubmit={onSubmit} className="form">
        <div>
          <label>Article Headline </label>
          <input
            className="input"
            type="text"
            name="headline"
            placeholder="Enter headline here"
            onChange= {onChange}
            value={headline}>
          </input>
        </div>
        <div>
          <label>-Lead paragraph </label>
          <input
            className="input"
            type="text"
            name="leader"
            aria-label="leader"
            placeholder="Enter lead here"
            onChange= {onChange}
            value={leader}>
          </input>
        </div>
        <div>
          <label>-Supporting paragraphs </label>
          <textarea
            className="input"
            name="support"
            aria-label="support"
            placeholder="Enter supporting paragraphs here"
            onChange= {onChange}
            value={support}>
          </textarea>
        </div>
        <div>
          <button
            type="submit"
            name="submit"
            className="input button"
          >Submit</button>
        </div>
      </form>
    )
  }
}

export default SubmitComponent