import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useLists } from "../../hooks/hooks";

function CreateListView() {
  const [show, setShow] = useState(false);
  const [listName, setListName] = useState("");

  const { createList } = useLists();

  const handleHide: () => void = () => {
    setListName("");
    setShow(false);
  };

  const handleSubmit: () => void = () => {
    if (listName.trim().length !== 0) {
      createList({ name: listName }).then(() => {
        setListName("");
        alert(`ADDED ${listName} list`);
        setShow(false);
      }).catch(err => {
        alert('Failed to create list: ' + err);
      });
    }
  };

  return (
    <div>
      <Button onClick={() => setShow(true)} className="w-100">
        Create new List
      </Button>

      <Modal show={show} onHide={handleHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add new list</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Name:
          <Form.Control
            size="sm"
            type="text"
            onChange={(e) => setListName(e.target.value)}
            value={listName}
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

export default CreateListView;
