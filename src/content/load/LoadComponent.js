import { PureComponent } from "react";

class LoadComponent extends PureComponent {

  render() {
    const {category, pubYear, vignette, articleId, onChange, onLoad} = this.props
    return (
      <form onSubmit={onLoad} className="form">
        <div>
          <label>Kategori </label>
          <select
            className="input"
            name="category"
            onChange={onChange}
            value={category}>
              <option defaultValue="INRIKES">Inrikes</option>
          </select>
        </div>
        <div>
          <label>År </label>
          <input
            className="input"
            type="text"
            name="pubYear"
            placeholder="Skriv år här"
            onChange={onChange}
            value={pubYear}>
          </input>
        </div>
        <div>
          <label>Vignette </label>
          <input
            className="input"
            name="vignette"
            placeholder="Skriv vignette här"
            onChange={onChange}
            value={vignette}>
          </input>
        </div>
        <div>
          <label>ArtikelId </label>
          <input
            className="input"
            name="articleId"
            placeholder="Skriv artikelns id här"
            onChange={onChange}
            value={articleId}>
          </input>
        </div>
        <button
          type="submit"
          name="submit"
          className="input button"
        >Byt artikel</button>
      </form>
    )
  }
}

export default LoadComponent