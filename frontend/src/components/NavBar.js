/******************************* BARRE DE NAVIGATION **********************************/
/*---------IMPORT----------*/
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import LogOut from "./Log/LogOut";

/*---------FUNCTION NAVBAR----------*/
const NavBar = () => {
  const uid = useContext(UidContext); /* on verifie si luser a ses données */
  const userData = useSelector((state) => state.userReducer) /* Pr recupé la data de l'user pr pouvoir la réutiliser */
  
  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <NavLink exact="true" to="/feed">
            <div className="logo">
              <img
                src="./img/icon-left-font-monochrome-black.svg"
                alt="Logo Groupomania"
              />
            </div>
          </NavLink>
        </div>
        {uid ? (
          <ul>
            <li>
            <NavLink to="/profil" exact activeclassname="active-left-nav">
            <img src="./img/icons/user.svg" alt="Page profil" />
          </NavLink>
            </li>
            <li className="welcome">
              <NavLink exact to="/profil">
                 <h5>Bienvenue {userData.pseudo}</h5> {/* récup le pseudo grace a redux */}
              </NavLink>
            </li>
            <LogOut />
          </ul>
        ) : (
          <ul>
            <li></li>
            <li>
              <NavLink exact="true" to="/profil">
                <img src="./img/icons/login.svg" alt="Login" />
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

/*---------EXPORT----------*/
export default NavBar;
