import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserProfilePage = () => {
  const userName = useSelector((state) => state.auth.userName);

  return (
    <div className="container">
      <article>
        <div>
          <p>Profile page of {userName}</p>
        </div>
        <div>
          <ul>
            <li>
              <Link to="reset">Reset your password</Link>
            </li>
          </ul>
        </div>
      </article>
    </div>
  );
};

export default UserProfilePage;
