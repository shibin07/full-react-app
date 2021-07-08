import "bootstrap/dist/css/bootstrap.min.css";

import React, { useContext } from "react";
import Header from "./components/Header/Header";
import LoginForm from "./components/LoginForm/LoginForm";
import Home from "./components/Home/Home";
import AuthContext from "./store/auth-context";
import { Provider } from "react-redux";
import store from "./store/data-store";

const App = () => {
  const ctx = useContext(AuthContext);

  // moved the code to auth-context
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   setIsLoggedIn(JSON.parse(localStorage.getItem("isloggedIn")));
  // }, []);

  // const onLoginHandler = (value) => {
  //   localStorage.setItem("isloggedIn", value);
  //   setIsLoggedIn(value);
  // };

  return (
    <Provider store={store}>
      <div className="container-fluid">
        <Header />
        {!ctx.isLoggedIn && <LoginForm />}
        {ctx.isLoggedIn && <Home />}
      </div>
    </Provider>
  );
};

export default App;
