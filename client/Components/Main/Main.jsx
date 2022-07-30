import React from "react";
import { useSelector } from "react-redux";
import RegisteredStack from "../../navigations/RegisteredStack";
import NotRegisteredStack from "../../navigations/NotRegisteredStack";
import LoginStack from "../../navigations/LoginStack";
import UserDetail from "../UserDetail/UserDetail";

const Main = () => {
  const user = useSelector((state) => state.user);
  console.log("ESTOY EN MAIN: ", user);
  return (
    <React.Fragment>
      {Object.getOwnPropertyNames(user).length > 0 ? (
        <React.Fragment>
          {!user.isRegistered ? <UserDetail/> : <UserDetail/>}
        </React.Fragment>
      ) : (
        <React.Fragment>
          <LoginStack />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Main;
