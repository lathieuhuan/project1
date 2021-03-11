import "../../assets/css/profile/PersonalInfo.css";

export function ShowPsnI(props) {
  const { info, isOwner, toggleEdit } = props;
  return (
    <div className="flex-col" id="psn-info">
      <img
        className="avatar"
        src={info.avatar}
        // src="https://image.flaticon.com/icons/png/512/61/61205.png"
        // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlNyI5Bbsl1vq1BQjH9XA-Z4j0Kkk0cEpAnA"
        alt=""
      />
      <h1 className="psni_heading"><span>{info.username}</span></h1>
      <p className="psni_line">Gender: <span>{info.gender}</span></p>
      <p className="psni_line">Date of Birth: <span>{info.dob}</span></p>
      <p className="psni_line">Town/City: <span>{info.townOcity}</span></p>
      <p className="psni_line">Email address: <span>{info.email}</span></p>
      <p className="psni_line">About me:</p>
      <p className="psni_line" id="psni_about-showing">
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