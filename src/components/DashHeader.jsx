import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileCirclePlus,
  faFilePen,
  faUserGear,
  faUserPlus,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import useAuth from "../hooks/useAuth";
import PulseLoader from "react-spinners/PulseLoader";
import { logOut } from "../features/auth/authSlice";

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

const DashHeader = () => {
  const { isManager, isAdmin } = useAuth();
  const Navigate = useNavigate();
  const { pathname } = useLocation();
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(logOut()); // Assuming you have a logOut action creator
      Navigate("/");
    }
  }, [isSuccess, Navigate]);

  const handleLogout = async () => {
    try {
      await sendLogout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const onNewNoteClicked = () => Navigate("/dash/notes/new");
  const onNewUserClicked = () => Navigate("/dash/users/new");
  const onNotesClicked = () => Navigate("/dash/notes");
  const onUsersClicked = () => Navigate("/dash/users");

  let dashClass =
    !DASH_REGEX.test(pathname) &&
    !NOTES_REGEX.test(pathname) &&
    !USERS_REGEX.test(pathname)
      ? "dash-header__container--small"
      : null;

  let newNoteButton = NOTES_REGEX.test(pathname) ? (
    <button className="icon-button" title="New Note" onClick={onNewNoteClicked}>
      <FontAwesomeIcon icon={faFileCirclePlus} />
    </button>
  ) : null;

  let newUserButton = USERS_REGEX.test(pathname) ? (
    <button className="icon-button" title="New User" onClick={onNewUserClicked}>
      <FontAwesomeIcon icon={faUserPlus} />
    </button>
  ) : null;

  let userButton =
    (isManager || isAdmin) &&
    !USERS_REGEX.test(pathname) &&
    pathname.includes("/dash") ? (
      <button className="icon-button" title="Users" onClick={onUsersClicked}>
        <FontAwesomeIcon icon={faUserGear} />
      </button>
    ) : null;

  let notesButton =
    !NOTES_REGEX.test(pathname) && pathname.includes("/dash") ? (
      <button className="icon-button" title="Notes" onClick={onNotesClicked}>
        <FontAwesomeIcon icon={faFilePen} />
      </button>
    ) : null;

  const logoutButton = (
    <button className="icon-button" title="Logout" onClick={handleLogout}>
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );

  const errClass = isError ? "errmsg" : "offscreen";

  return (
    <>
      <p className={errClass}>{error?.data?.message}</p>
      <header className="dash-header">
        <div className={`dash-header__container ${dashClass}`}>
          <Link to="/dash">
            <h1 className="dash-header__title">techNotes</h1>
          </Link>
          <nav className="dash-header__nav">
            {newNoteButton}
            {newUserButton}
            {notesButton}
            {userButton}
            {logoutButton}
          </nav>
        </div>
      </header>
    </>
  );
};

export default DashHeader;
