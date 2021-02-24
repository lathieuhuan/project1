import "../../assets/css/cmg/Card.css";

export function Card(props) {
    const { index, size, imageFrt, imageBck, front, back, animated, done } = props;
    return (
      <div className={done ? size + " invis" : size}
      onClick={() => {
        props.setAnimation(index, "true");
      }}>
        <img className={front} src={imageFrt} animated={animated} alt="" />
        <img className={back} src={imageBck} animated={animated}
          onAnimationEnd={() => {
            props.flip(index);
            props.setAnimation(index, "false");
            props.process(index);
        }} alt="" />
      </div>
    );
}