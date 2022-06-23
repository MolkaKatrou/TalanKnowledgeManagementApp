import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../Context/darkModeContext";
import { useContext } from "react";
import { Avatar, ChakraProvider } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const auth = useSelector(state => state.auth)


  return (
    <div className="navbar_admin">
      <div className="wrapper_admin">
        <div className="search">
          
        </div>
        <div className="items">
          <div className="item mx-2">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
          <div className="item mx-4">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <div className="item mx-4">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
      
     
          <div className="item mx-4">
          <ChakraProvider>
            <Avatar name={auth.user.fullname} src={auth.user.pic} size='sm'></Avatar>
          </ChakraProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
