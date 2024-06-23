import React, { useEffect, useState } from "react";
import {
  Col,
  ListGroup,
  Row,
  Container,
  Tab,
  Card,
  Form,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import AddressInfo from "../../components/user/AddressInfo";
import { CiEdit } from "react-icons/ci";
import { ToastContainer } from "react-toastify";
import OrderDetails from "./orderDetails";
function Profile() {
  const [activeKey, setActiveKey] = useState("#link1");
  const user = useSelector((state) => state.user.user);
  const [addresses, setAddresses] = useState([]);

  const location = window.location.hash;
  const handleSelect = (selectedKey) => {
    setActiveKey(selectedKey);
    window.location.hash = selectedKey;
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setActiveKey(hash);
    }
  }, [location]);

  return (
    <Container fluid className="m-1 p-1 ">
      <Tab.Container
        id="list-group-tabs-example"
        activeKey={activeKey}
        onSelect={handleSelect}
      >
        <Row className="h-100">
          <Col sm={4} className=" p-2 ">
            <Col className="text-center">
              <h4>Hi, {user.name}</h4>
            </Col>
            <ListGroup>
              <ListGroup.Item
                eventKey="#link1"
                className={
                  activeKey === "#link1" ? "bg-primary text-white" : ""
                }
              >
              Order Details
              </ListGroup.Item>
              <ListGroup.Item
                eventKey="#link2"
                className={
                  activeKey === "#link2" ? "bg-primary text-white" : ""
                }
              >
                Shipping Address
              </ListGroup.Item>
              <ListGroup.Item
                eventKey="#link3"
                className={
                  activeKey === "#link3" ? "bg-primary text-white" : ""
                }
              >
                Account
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col sm={7} className=" flex-grow-1  ms-1">
            <Tab.Content className="py-3">
              <Tab.Pane eventKey="#link1" id="link1">
              <OrderDetails/>
              </Tab.Pane>
              <Tab.Pane eventKey="#link2" id="link2">
                <AddressInfo
                  addresses={addresses}
                  setAddresses={setAddresses}
                />{" "}
              </Tab.Pane>
              <Tab.Pane eventKey="#link3" id="link3">
                <PersonalInfo user={user} />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}

export default Profile;

function PersonalInfo({ user }) {
  return (
    <>
      <Card className="p-3 ">
        <Form>
          <Row>
            <Form.Group
              as={Col}
              md={6}
              className="mb-3 "
              controlId="formBasicEmail"
            >
              <Form.Label className="d-flex justify-content-between fw-bold">
                Name <CiEdit />
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                defaultValue={user.name}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group
              as={Col}
              md={6}
              className="mb-3"
              controlId="formBasicEmail"
            >
              <Form.Label className="d-flex justify-content-between fw-bold">
                Email <CiEdit />
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                defaultValue={user.email}
              />
            </Form.Group>
          </Row>
        </Form>
      </Card>
    </>
  );
}
