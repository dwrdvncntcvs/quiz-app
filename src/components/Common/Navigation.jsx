import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { destroyAuth, useAuth } from "../../features/slice/authSlice";
import { setModal } from "../../features/slice/modalSlice";
import scss from "../../styles/navigation.module.scss";
import { extractInitials } from "../../utils/helpers";
import { NavLink } from "react-router-dom";
import SelectOptions from "./SelectOptions";
import { useLogOutMutation } from "../../services/user";

const Navigation = () => {
  const [toggle, setToggle] = useState(false);
  const { isAuth, user } = useAuth();
  const [signOut] = useLogOutMutation();
  const dispatch = useDispatch();

  const { first_name, last_name, username } = user;

  const toggleAction = () => {
    setToggle(!toggle);
  };

  const signInModal = () => {
    dispatch(setModal({ id: "signInModal" }));
  };

  const signUpOptions = [
    {
      label: "Quizee",
      onClick: () => {
        dispatch(setModal({ id: "signUpModal", props: { role: "quizee" } }));
        setToggle(false);
      },
    },
    {
      label: "Quizzer",
      onClick: () => {
        dispatch(setModal({ id: "signUpModal", props: { role: "quizzer" } }));
        setToggle(false);
      },
    },
  ];

  const userOptions = [
    {
      label: "Profile",
      onClick: () => {
        console.log("View Profile");
      },
    },
    {
      label: "Sign Out",
      onClick: () => {
        console.log("Sign Out");
        signOut();
        dispatch(destroyAuth());
        setToggle(false);
      },
    },
  ];

  const closeToggle = () => {
    setToggle(false);
  };

  return (
    <nav>
      <p className={scss.title}>{"Quizzy".toUpperCase()}</p>
      {!isAuth ? (
        <div className={scss["btn-group"]}>
          <button onClick={signInModal}>Sign In</button>
          <SelectOptions
            toggle={toggle}
            options={signUpOptions}
            onClose={closeToggle}
          >
            <button onClick={toggleAction}>Sign Up</button>
          </SelectOptions>
        </div>
      ) : (
        <ul className={scss.links}>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? scss.active : "")}
              to={"/"}
            >
              Quizzes
            </NavLink>
          </li>
          <li>
            <SelectOptions
              toggle={toggle}
              options={userOptions}
              onClose={closeToggle}
            >
              <button onClick={toggleAction}>
                <div className={scss.icon}>
                  {extractInitials(first_name, last_name)}
                </div>{" "}
                {username}
              </button>
            </SelectOptions>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navigation;
