import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const CreateTask = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/api/task/" + id).then((response) => {
      setName(response.data.name);
      setDescription(response.data.description);
    }).catch(err => console.log(err));
  }, []);

  async function updateTask(e) {
    e.preventDefault();
    await axios.put("http://localhost:5000/api/task/" + id, { name, description }, {
      credentials: "include",
      headers: { "Description-Type": "application/json" },
    }).then((response) => {
      setRedirect(true);
    }).catch(err => console.log(err));
  }

  return (
    <Container className="p-4">
      <Row>
        <Col sm={8} className="mx-auto">
          <Row className="mb-4">
            <Col sm={8}>
              <h1>Edit task</h1>
            </Col>
            <Col sm={4} className="text-end">
              <Link to={"/"}>
                <Button variant="primary">Back</Button>
              </Link>
            </Col>
          </Row>
          <Card className="bg-white shadow">
            <Card.Body>
              <Form onSubmit={updateTask}>
                <Form.Group className="mb-3">
                  <Form.Label>Task name</Form.Label>
                  <Form.Control type="text" onChange={(e) => setName(e.target.value)} value={name} required />
                  <Form.Control.Feedback type="invalid">
                    Task name is required.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Task description</Form.Label>
                  <Form.Control value={description} onChange={(e) => setDescription(e.target.value)} as="textarea" rows={5} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Button type="submit">Submit form</Button>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateTask;
