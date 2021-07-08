import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from "react";
import Button from "../Button/Button";
import TextBox from "../TextBox/TextBox";
import styles from "./LoginForm.module.css";
import AuthContext from "../../store/auth-context";
import { useDispatch } from "react-redux";
import { headerActions } from "../../store/data-store";

const userNameReducer = (state, action) => {
  // action has the object that is passed in the dispatch method
  // state has the current state object that is passed in use reducer as second arg
  switch (action.type) {
    case "USER_INPUT":
      return { value: action.val, isValid: action.val.trim().length > 3 };
    default:
      return { value: "", isValid: false };
  }
};

const passwordReducer = (state, action) => {
  // action has the object that is passed in the dispatch method
  // state has the object that is passed in use reducer as second arg
  switch (action.type) {
    case "USER_INPUT":
      return { value: action.val, isValid: action.val.trim().length > 3 };
    default:
      return { value: "", isValid: false };
  }
};

const LoginForm = (props) => {
  // const [userName, setUserName] = useState("");
  // const [password, setPassword] = useState("");
  // const [isUserValid, setIsUserValid] = useState(false);
  // const [isPwdValid, setIsPwdValid] = useState(false);

  const useNameRef = useRef();

  const reduxDispatch = useDispatch();
  const authContext = useContext(AuthContext);
  const [isFormValid, setIsFormValid] = useState(false);

  console.log("the login form component");

  const [userNameState, dispatchUsername] = useReducer(userNameReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  //More optimization to the code to just check the validation is changed
  //This optmization is after successful validation, if we add one more character, its still valid and still it checks for use effect
  //The below logic will help in that
  const { isValid: userIsValid } = userNameState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    useNameRef.current.focus();
  }, []);

  // Proper way of working with form and validating the form variables
  useEffect(() => {
    console.log("calling use effect");
    const identifier = setTimeout(() => {
      console.log("calling validation");
      setIsFormValid(userIsValid && passwordIsValid);
    }, 100);

    return () => {
      console.log("clearing the time out");
      clearTimeout(identifier);
    };
  }, [userIsValid, passwordIsValid]);

  const authenticate = () => {
    dispatchUsername({ type: "default" });
    dispatchPassword({ type: "default" });
    reduxDispatch(
      // the value passing heare is ({type: SOME_UNIQUE_IDENTIFIER, payload: value that is passed})
      headerActions.updateHeader({ title: "Welcome to home page" })
    );
    authContext.onLoginHandler(true);
  };
  const onChangeUsername = (userName) => {
    dispatchUsername({ type: "USER_INPUT", val: userName });
  };
  const onChangePassword = (password) => {
    dispatchPassword({ type: "USER_INPUT", val: password }); // the dispatch function will pass the function
  };

  return (
    <div className="row justify-content-center py-5">
      <div className={`col ${styles.content_form}`}>
        <TextBox
          ref={useNameRef}
          labelTxt="<strong>User Name</strong>"
          placeholder="Please enter the User Name"
          onChange={onChangeUsername}
          value={userNameState.value}
          className={
            !userNameState.value
              ? ``
              : userNameState.isValid
              ? `is-valid`
              : `is-invalid`
          }
        />
        <TextBox
          labelTxt="<strong>Password</strong>"
          placeholder="Please enter the Password"
          onChange={onChangePassword}
          value={passwordState.value}
          className={
            !passwordState.value
              ? ``
              : passwordState.isValid
              ? `is-valid`
              : `is-invalid`
          }
        />
        <center>
          <Button
            className="btn btn-primary col-4"
            onClick={authenticate}
            disabled={!isFormValid}
          >
            Submit
          </Button>
        </center>
      </div>
    </div>
  );
};

export default LoginForm;
