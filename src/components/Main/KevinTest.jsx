import { UsersContext } from "../MainPage";
import { useContext } from "react";

const KevinTest = () => {
  const { users, setUsers } = useContext(UsersContext);

  console.log(users);
  return (
    <div className="flex flex-auto flex-col">
      {users
        ? users.map((user) => (
            <div className="border">
              {user._id}
              <br />
              {user.displayname}
              <br />
              {user.email}
              <br />
              {user.password}
            </div>
          ))
        : null}
    </div>
  );
};

export default KevinTest;
