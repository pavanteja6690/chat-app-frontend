import { Dispatch, useState, SetStateAction } from "react";
import {
  Container,
  Row,
  Col,
  Dropdown,
  Modal,
  ModalTitle,
  ModalBody,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
} from "react-bootstrap";
import { useHistory } from "react-router";
import { addChat, resetState } from "../redux/actions";
import { useSelector, useDispatch } from "../redux/hooks";
import { createGroup, logout } from "../utils/api";
import { User } from "../utils/types";
import IncomingReq from "./IncomingReq";

const Options = ({
  setModal,
}: {
  setModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const toggleModal = () => setOpen(!open);
  const handleCreate = async (e: any) => {
    e.preventDefault();
    toggleModal();
    if (value !== "") {
      const group = await createGroup(value);
      if (group.success) dispatch(addChat(group.group));
    }
  };

  return (
    <Col className="d-flex  justify-content-around align-items-center">
      <i onClick={() => setModal(true)} className="fas fa-user-friends"></i>
      <Dropdown>
        <Dropdown.Toggle aria-label="option-dropdown">
          <i className="fas fa-ellipsis-v"></i>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={toggleModal}>
            <i className="fas fa-users"></i> New Group
          </Dropdown.Item>
          <Dropdown.Item>
            <i className="fas fa-cog mr-1"></i> Settings
          </Dropdown.Item>
          <Dropdown.Item
            onClick={(e) => {
              logout();
              dispatch(resetState());
              history.push("/");
            }}
          >
            <i className="fas fa-sign-out-alt mr-1"></i> Sign out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Modal show={open} onHide={toggleModal}>
        <ModalTitle>Create a new group</ModalTitle>
        <ModalBody>
          <Form onSubmit={handleCreate}>
            <FormGroup>
              <FormLabel>Group Name</FormLabel>
              <FormControl
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Button type="submit">Create</Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </Col>
  );
};

function UserInfo() {
  const user: User = useSelector((state) => state.user);
  const [modal, setModal] = useState(false);
  return (
    <Container>
      <Row>
        <Col sm={3}>img</Col>
        <Col sm={5}>{user.username}</Col>
        <Options setModal={setModal} />
      </Row>
      <Modal onHide={() => setModal(!modal)} show={modal}>
        <ModalBody>
          <IncomingReq />
        </ModalBody>
      </Modal>
    </Container>
  );
}

export default UserInfo;