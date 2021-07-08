import React, { useContext } from "react";
import styles from "./Header.module.css";
import Button from "../Button/Button";
import cx from "classnames";
import AuthContext from "../../store/auth-context";
import { useSelector } from "react-redux";

const Header = (props) => {
  const headerText = useSelector((state) => {
    return state.headerText;
  });

  const authContext = useContext(AuthContext);
  const onLogout = (event) => {
    authContext.onLoginHandler(false);
  };

  return (
    <div className={`row ${cx(styles.header, styles.background)}`}>
      <div className="col-11 text-center">
        <h1>{authContext.isLoggedIn && headerText}</h1>
      </div>
      <div className="col-1 d-flex align-items-center">
        <Button onClick={onLogout}>
          {authContext.isLoggedIn && `Logout`}
          {!authContext.isLoggedIn && `Login`}
        </Button>
      </div>
    </div>
  );
};

export default Header;
