
export function Timer(props) {
  const centis = props.time % 100,
    sec = (props.time - centis) / 100 % 60;
  return (
    <span>
      {(sec < 10 ? "0" + sec : sec) + ":" + 
      (centis < 10 ? "0" + centis : centis)}
    </span>
  );
}