import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import TodoList from "../../domain/TodoList";

export type CreateTodoViewProps = {
  onCreate: (title: string) => Promise<TodoList>;
};

function CreateTodoView(props: CreateTodoViewProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [todoTitle, setTodoTitle] = useState("");

  const handleSubmit: () => void = () => {
    if (todoTitle.trim().length !== 0) {
      props
        .onCreate(todoTitle)
        .then(() => setShowCreateModal(false))
        .catch((err) => alert("Error catched : " + err));
    }
  };

  const handleHide: () => void = () => {
    setTodoTitle("");
    setShowCreateModal(false);
  };

  return (
    <div>
      <Button onClick={() => setShowCreateModal(true)} className="w-100">
        Create new Todo
      </Button>

      <Modal show={showCreateModal} onHide={handleHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add new Todo</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Title:
          <Form.Control
            size="sm"
            type="text"
            onChange={(e) => setTodoTitle(e.target.value)}
            value={todoTitle}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={handleHide} variant="secondary">
            Close
          </Button>
          <Button onClick={handleSubmit} variant="primary">
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateTodoView;
