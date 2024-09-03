import { format } from "date-fns";
import { Link } from "react-router-dom";
import axios from "axios"
import { Navigate } from "react-router-dom";
import { useState } from "react";

const Task = ({ _id, title, createdAt, author }) => {
  const [redirect, setRedirect] = useState(false);
  async function deleteTask(id) {
    await axios.delete("http://localhost:5000/api/task/" + id).then((response) => {
      setRedirect(true);
    }).catch(err => console.log(err));
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="task">
      <div className="texts">
        <Link to={`task/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <a href="#" className="author">
            {author?.username}
          </a>
          <time>{format(new Date(createdAt), "MMM d, yyyy HH:mm")}</time>
        </p>
        <button type="button" className="float-right" onClick={() => deleteTask(_id)}>Delete</button>
      </div>
    </div>
  );
};

export default Task;
