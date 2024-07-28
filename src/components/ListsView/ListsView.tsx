import { Col, Container, Row } from "react-bootstrap";
import CreateListView from "../CreateListView/CreateListView";
import TodoList from "../../domain/TodoList";
import ListEntry from "../ListEntry/ListEntry";
import { useLists } from "../../hooks/hooks";

export type ListsViewProps = {
  onSelection: (list: TodoList) => void;
};

function ListsView(props: ListsViewProps) {
  const { todoLists } = useLists();
  return (
    <Container className="bg-warning h-100 d-flex flex-column">
      <Row className="bg-success">
        <Col>Lists</Col>
      </Row>
      <Row className="flex-grow-1">
        {todoLists &&
          todoLists.map((list) => (
            <ListEntry
              key={list.id}
              onSelection={props.onSelection}
              todoList={list}
            />
          ))}
      </Row>
      <Row>
        <Col>
          <CreateListView />
        </Col>
      </Row>
    </Container>
  );
}

export default ListsView;
