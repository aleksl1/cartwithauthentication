import { useNavigate } from "react-router-dom";
import classes from "./Logo.module.css";
const Logo = () => {
  const navigate = useNavigate();
  return (
    <div className={classes["store-logo"]} onClick={() => navigate("/")}>
      Super Store
    </div>
  );
};

export default Logo;
