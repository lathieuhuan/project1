

export function ShowInfo(props) {
  const { info, isOwner, toggleEdit } = props;
  return (
    <div className="border-3 radius-10 flex-col" id="psn-info">
      <img
        className="avatar"
        // src="https://image.flaticon.com/icons/png/512/61/61205.png" denied
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlNyI5Bbsl1vq1BQjH9XA-Z4j0Kkk0cEpAnA"
        alt=""
      />
      <h1 className="center-text"><span>{info.username}</span></h1>
      <p className="psn_line">Gender: <span>{info.gender}</span></p>
      <p className="psn_line">Date of Birth: <span>{info.dob}</span></p>
      <p className="psn_line">Town/City: <span>{info.townOcity}</span></p>
      <p className="psn_line">Email address: <span>{info.email}</span></p>
      <p className="psn_line">About me:</p>
      <p className="psn_line" id="about">
        <span>{info.about}</span>
      </p>
      {isOwner ? (
        <button
          className="last-btn"
          onClick={toggleEdit}
        >
          Edit Profile
        </button>
      ) : null}
    </div>
  );
}