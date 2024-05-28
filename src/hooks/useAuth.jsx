import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import * as jwt_decode from "jwt-decode";
const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isManager = false;
  let isAdmin = false;
  let status = "Employee";

  if (token) {
    const decoded = jwt_decode(token);
    const { username, roles } = decoded.UserInfo;
    console.log(username);

    isManager = roles.includes("Manager");
    isAdmin = roles.includes("Admin");

    if (isManager) status = "Manager";
    if (isAdmin) status = "Admin";

    return { username, roles, status, isManager, isAdmin };
  }

  return { username: "", roles: [], isManager, isAdmin, status };
};
export default useAuth;
