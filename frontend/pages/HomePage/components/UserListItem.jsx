import { Link } from "react-router-dom";

export function UserListItem({ user }) {
  console.log(user);
  return (
    <div className="list-group-item list-group-item-action">
      {user.username}
    </div>
    // <Link
    //   className="list-group-item list-group-item-action"
    //   to={`/user/${user.id}`}
    //   style={{ textDecoration: "none" }}
    // ></Link>
  );
}
