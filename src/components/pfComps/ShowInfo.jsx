

export function ShowInfo(props) {
  const { info, isOwner, toggleEdit } = props;
  return (
    <div className="left-col thin-border medium-b-radius flex-col">
      <img
        className="avatar"
        // src="https://image.flaticon.com/icons/png/512/61/61205.png" denied
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlNyI5Bbsl1vq1BQjH9XA-Z4j0Kkk0cEpAnA"
        alt=""
      />
      <h1><span>{info.username}</span></h1>
      <p>Gender: <span>{info.gender}</span></p>
      <p>Date of Birth: <span>{info.dob}</span></p>
      <p>Town/City: <span>{info.townOcity}</span></p>
      <p>Email address: <span>{info.email}</span></p>
      <p>About me:</p>
      <p
        className="thinner-border narrow-padding small-b-radius"
        id="about"
      >
        <span>{info.about}</span>
      </p>
      {isOwner ? (
        <button
          className="edit-btn thinnest-border smaller-b-radius"
          onClick={toggleEdit}
        >
          Edit Profile
        </button>
      ) : null}
    </div>
  );
}