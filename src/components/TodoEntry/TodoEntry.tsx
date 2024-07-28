import React from "react";
import Todo from "../../domain/Todo";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

export type TodoEntryProps = {
  todo: Todo;
  onDelete: (id: string) => void;
  onUpdate: (updated: Todo) => void;
};

function TodoEntry(props: TodoEntryProps) {
  const handleIsDoneChange: React.ChangeEventHandler<HTMLInputElement> = () => {
    props.onUpdate({
      ...props.todo,
      isDone: !props.todo.isDone,
    });
  };

  const handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    props.onUpdate({
      ...props.todo,
      title: e.target.value,
    });
  };

  const handleDelete: (id: string | undefined) => void = (id) => {
    if (!id) {
      return;
    }

    props.onDelete(id);
  };

  return (
    <Container className="bg-secondary">
      <Row>
        <Col className="text-primary" sm={3}>
          {props.todo.id}
        </Col>
        <Col className="text-primary" sm={3}>
          <Form.Control onChange={handleTitleChange} value={props.todo.title} />
        </Col>
        <Col sm={3}>
          <Form.Check
            checked={props.todo.isDone}
            onChange={handleIsDoneChange}
            type="checkbox"
            label="Is Done?"
            className="text-primary"
          />
          {props.todo.isDone}
        </Col>
        <Col sm={3}>
          <Button onClick={() => handleDelete(props.todo.id)}>DELETE</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default TodoEntry;
