import '../assets/css/InfoCard.css';

function InfoCard(props) {
  let { index, info, descShown, place, toggleDesc } = props;
  return (<div className="info-card">
    <div className="intro">
      <div className="img-area">
        <img src={info.imageLinks?.thumbnail} alt="Not Found" />
      </div>
      <div>
        <h2>{info.title}
          {info.subtitle === undefined ? "" : ": " + info.subtitle}
        </h2>
        <p><strong>{info.authors}</strong>
          {info.publishedDate === undefined ? "" : " - " + info.publishedDate}
        </p>
        <p>Categories: <strong>{info.categories}</strong></p>
        {info.description === undefined ? "" :
          <button className="desc-btn border"
            onClick={() => toggleDesc(place, index)}>
            <strong>{descShown ? "Hide Description" : "See Description"}</strong>
          </button>}
      </div>
    </div>
    {descShown ? <div className="extra">
      <p className="desc">{info.description}</p>
    </div> : null}
  </div>);
}

export { InfoCard }