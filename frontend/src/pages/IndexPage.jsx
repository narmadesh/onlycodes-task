import { useEffect, useState } from "react";
import Task from "../components/Task";
import axios from "axios"
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, useLocation  } from "react-router-dom";

const IndexPage = () => {
  const query = useLocation ();
  const [tasks, setTasks] = useState([]);
  function getTasks(query) {
    axios.get("http://localhost:5000/api/task"+query.search).then((response) => {
      setTasks(response.data);
    }).catch(err => console.log(err));
  }
  useEffect(() => {
    getTasks(query)
  }, [query]);

  async function deleteTask(id) {
    await axios.delete("http://localhost:5000/api/task/" + id).then((response) => {
      getTasks(query)
    }).catch(err => console.log(err));
  }

  async function updateStatus(id, status) {
    await axios.put("http://localhost:5000/api/task/" + id, { status }).then((response) => {
      getTasks(query)
    }).catch(err => console.log(err));
  }

  return (
    <Container className="p-4">
      <Row>
        <Col sm={8}>
          <h1>Tasks</h1>
        </Col>
        <Col sm={4} className="text-end">
          <Dropdown className="d-inline-block me-2">
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
              All tasks
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Link to="/" className="dropdown-item">All tasks</Link>
              <Link to="/?status=true" className="dropdown-item">Completed tasks</Link>
              <Link to="/?status=false" className="dropdown-item">Incomplete tasks</Link>
            </Dropdown.Menu>
          </Dropdown>
          <Link to={"/create"}>
            <Button variant="primary">Add new task</Button>
          </Link>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Task name</th>
            <th>Task description</th>
            <th>Status</th>
            <th colSpan={3} className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            tasks.length > 0 && tasks.map((task, key) => {
              return (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{task.name}</td>
                  <td>{task?.description}</td>
                  <td>{task?.status ? <del>Completed</del> : 'Pending'}</td>
                  <td className="text-center">
                    <Link to={"/edit/" + task._id}>
                      <Button variant="info">Edit</Button>
                    </Link>
                  </td>
                  <td className="text-center">
                    <Button variant="danger" onClick={() => deleteTask(task._id)}>Delete</Button>
                  </td>
                  <td className="text-center">
                    {
                      task.status ? <Button variant="warning" onClick={() => updateStatus(task._id, false)}>Mark as incomplete</Button> :
                        <Button variant="success" onClick={() => updateStatus(task._id, true)}>Mark as completed</Button>

                    }
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </Container>
  );
};

export default IndexPage;
