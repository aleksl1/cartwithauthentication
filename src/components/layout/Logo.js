import "./Logo.css";
import { useNavigate } from "react-router-dom";
const Logo = () => {
  const navigate = useNavigate();
  return (
    <div className="store-logo" onClick={() => navigate("/")}>
      Super Store
    </div>
  );
};

export default Logo;
