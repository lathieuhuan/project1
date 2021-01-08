import '../assets/css/Emoji.css';

function Emoji(props) {
  const { symbol, title } = props; // obj destructuring
  return <li>{symbol} {title}</li>
}

export { Emoji }