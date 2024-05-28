import { useParams } from "react-router-dom";
import EditUserForm from "./EditUserForm";
import { useGetUsersQuery } from "./usersApiSlice";
import PulseLoader from "react-spinners/PulseLoader";
import useTitle from "../../hooks/useTitle";

const EditUser = () => {
  useTitle(
    "techNotes: Edit User",
    "https://th.bing.com/th/id/R.ba9bbc88be4c58a273889a17f7a94f00?rik=atehCeB3o639ew&riu=http%3a%2f%2fwww.pngmart.com%2ffiles%2f14%2fGolden-Badge-Transparent-PNG.png&ehk=%2bHYV23vObrT9WFFHg1q4XY0a4uE4hI0OKIIi6sv%2b7L8%3d&risl=&pid=ImgRaw&r=0"
  );

  const { id } = useParams();

  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  });

  if (!user) return <PulseLoader color={"#FFF"} />;

  const content = <EditUserForm user={user} />;

  return content;
};
export default EditUser;
