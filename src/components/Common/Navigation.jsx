import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { destroyAuth, useAuth } from "../../features/slice/authSlice";
import scss from "../../styles/navigation.module.scss";
import { extractInitials } from "../../utils/helpers";
import { Link, NavLink, useNavigate } from "react-router-dom";
import SelectOptions from "./SelectOptions";
import { useLogOutMutation } from "../../services/user";

const Navigation = () => {
  const [toggle, setToggle] = useState(false);
  const { isAuth, user } = useAuth();
  const [signOut] = useLogOutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { first_name, last_name, username } = user;

  const toggleAction = () => {
    setToggle(!toggle);
  };

  const signInModal = () => {
    navigate("/sign-in");
  };

  const signUpOptions = [
    {
      label: "Quizee",
      onClick: () => {
        navigate({ pathname: "/sign-up/quizee" });
        setToggle(false);
      },
    },
    {
      label: "Quizzer",
      onClick: () => {
        navigate({ pathname: "/sign-up/quizzer" });
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
        navigate("/");
      },
    },
  ];

  const closeToggle = () => {
    setToggle(false);
  };

  return (
    <nav>
      <Link className={scss.title} to="/">
        {"Quizzy".toUpperCase()}
      </Link>
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
