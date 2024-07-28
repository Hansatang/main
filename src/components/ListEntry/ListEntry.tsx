import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import TodoList from "../../domain/TodoList";
import { useLists } from "../../hooks/hooks";

export type ListEntryProps = {
  onSelection: (list: TodoList) => void;
  todoList: TodoList;
};

function ListEntry(props: ListEntryProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [updatedName, setUpdatedName] = useState<string>(props.todoList.name);

  const { deleteList, updateList } = useLists();

  const handleKeyPress: React.KeyboardEventHandler = (e) => {
    console.log(e.key);
    if (isLoading) {
      return;
    }

    if (e.key === "Enter") {
      setIsLoading(true);
      updateList({ ...props.todoList, name: updatedName }).finally(() =>
        setIsLoading(false)
      );
    }
  };

  return (
    <Container
      onClick={() => props.onSelection(props.todoList)}
      className="bg-secondary"
    >
      <Row className="align-items-center">
        <Col className="text-failure text-center" sm={2}>
          {props.todoList.id}
        </Col>
        <Col className="text-primary" sm={8}>
          <Form.Control
            onKeyDown={handleKeyPress}
            onChange={(e) => setUpdatedName(e.target.value)}
            value={updatedName}
            disabled={isLoading}
          />
        </Col>
        <Col sm={2}>
          <Button onClick={() => deleteList(props.todoList.id)}>X</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ListEntry;
