import "../assets/css/Tong.css";

export function Tong(props) {
  return (
    <div id="tong-rack">
      {props.updating ? null : (
        <div id="rack">
          <button id="to-shelf" onClick={props.save}>Save</button>
          <button id="to-trashbin" onClick={() => props.setUI("viewing")}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}