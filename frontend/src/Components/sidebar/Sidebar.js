import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../Context/darkModeContext";
import { useContext } from "react";
import logo from '../../images/logo.png'
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../Redux/Actions/authActions";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const dispatchLogout = useDispatch()
  const auth = useSelector(state => state.auth)

  const LogoutHandler = () => {
    dispatchLogout(Logout())
  }
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="mx-2">
          <img className='mb-2 mx-2' style={{width:'45%'}} src={logo} alt='logo' />
          </span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul style={{marginTop:'20px'}}>
        
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/categories" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Categories</span>
            </li>
          </Link>
       
       
          <p className="title_sidebar">USER</p>
          
          <Link to={`/users/${auth.user.id}`} style={{ textDecoration: "none" }}>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          </Link>
          <li onClick={LogoutHandler}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
