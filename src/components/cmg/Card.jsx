import "../../assets/css/cmg/Card.css";

export function Card(props) {
    const { index, size, animated, done } = props;
    return (
      <div
        className={"card " + size + (done ? " invis" : "")}
        onClick={() => {
          props.setAnimation(index, "true");
        }}
      >
        <img
          className={"card-img " + props.front}
          animated={animated}
          src={props.imageFrt}
          alt="front"
        />
        <img
          className={"card-img " + props.back}
          animated={animated}
          onAnimationEnd={() => {
            props.flip(index);
            props.setAnimation(index, "false");
            props.process(index);
          }}
          src={props.imageBck}
          alt="back"
        />
      </div>
    );
}