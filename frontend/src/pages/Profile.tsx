import { useEffect } from "react";
import { useAppSelector } from "../hooks/redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, isAuth } = useAppSelector((state) => state.authentication);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate("/profile");
    } else {
      navigate("/home");
    }
  }, []);

  return (
    <>
      <div>Profile</div>
      <div>{user?.data?.username}</div>
      <div>{user?.data?.email}</div>
    </>
  );
};

export default Profile;
