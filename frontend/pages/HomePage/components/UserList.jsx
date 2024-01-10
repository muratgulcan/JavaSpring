import React, { useEffect, useState } from "react";
import { getUsers } from "../api";

const UserList = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    async function getAllUsers() {
      try {
        const response = await getUsers();
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      } finally {
      }
    }

    getAllUsers();
  }, []);
  return (
    <>
      <div>User List</div>
      {users &&
        users.map((user) => {
          return <div key={user.id}>{user.username}</div>;
        })}
    </>
  );
};

export default UserList;
