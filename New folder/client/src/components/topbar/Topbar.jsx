import { Link } from "react-router-dom";
import './topbar.css'

/**
 * This function returns the top bar component for the website.
 * @return {JSX.Element} The top bar component
 */
export default function Topbar() {
  const user = true; // variable to check if a user is logged in

  return (
    <div className="top">
      {/* Left section of the top bar */}
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
      </div>

      {/* Center section of the top bar */}
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">ABOUT</li>
          <li className="topListItem">CONTACT</li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          {/* Show logout button if user is logged in */}
          {user && <li className="topListItem">LOGOUT</li>}
        </ul>
      </div>

      {/* Right section of the top bar */}
      <div className="topRight">
        {/* Show user avatar if user is logged in */}
        {user ? (
          <Link className="link" to="/settings">
            <img
              className="topImg"
              src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
            />
          </Link>
        ) : (
          // Show login and register links if user is not logged in
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}
