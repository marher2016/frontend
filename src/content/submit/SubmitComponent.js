import { PureComponent } from "react";
import './SubmitComponent.css';

class SubmitComponent extends PureComponent {

  render() {
    const {article, onChange, onSubmit} = this.props
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
            value={article.headline}>
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
            value={article.leader}>
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
            value={article.support}>
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