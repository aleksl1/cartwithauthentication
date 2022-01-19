import { useSelector } from "react-redux";

const UserProfilePage = () => {
  const userName = useSelector((state) => state.auth.userName);
  return (
    <div className="container">
      <article>
        <div>
          <p>Profile page of {userName}</p>
        </div>
      </article>
    </div>
  );
};

export default UserProfilePage;
