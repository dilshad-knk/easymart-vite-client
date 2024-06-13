import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import IndianStates from "../../Utils/IndianStates";
import instance from "../../axios/axios.js";
import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { IoIosRadioButtonOff } from "react-icons/io";
import {
  showFailureAlert,
  showSuccessAlert,
} from "../../Utils/toastifyAlert.js";
import { IoRadioButtonOn } from "react-icons/io5";
const schema = yup.object().shape({
  apartment: yup.string().required("required"),
  street: yup.string().required("required"),
  city: yup.string().required(" required"),
  state: yup.string().required(" required").notOneOf(["Choose..."]),
  pincode: yup.number().positive().required("required").min(10000, "invalid"),
});

function AddressInfo() {
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const userId = useSelector((state) => state.user.user.id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const fetchAddress = async () => {
    try {
      const res = await instance.get(`/user/address/${userId}`);
      if (res.data.success) {
        setAddresses(res.data.addresses);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  const onSubmit = async (data) => {
    handleAddAddressClick();
    reset();
    try {
      const res = await instance.post(`/user/address/${userId}`, { data });

      if (res.data.success) {
        showSuccessAlert("Address added");
        fetchAddress();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetPrimaryAddress = async (addressId) => {
    try {
      const res = await instance.put(`/user/address/primary/${userId}`, { addressId });

      if (res.data.success) {
        fetchAddress();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddAddressClick = () => {
    setShowAddAddress(!showAddAddress);
  };


  return (
    <>
      <Row>
        {addresses && addresses.length > 0 ? (
          addresses.map((item, index) => (
            <Col>
              <Card key={index} className="shadow">
                <Card.Body>
                  <Card.Title className="d-flex justify-content-between align-items-center fw-bold">
                  {!item.isPrimary ? (
                    <span
                      type="radio" name="option"
                      variant="outline-primary"
                      onClick={() => handleSetPrimaryAddress(item._id)}
                    > 
                    <IoIosRadioButtonOff/>
                    </span>):
                            <IoRadioButtonOn />
                           
                    }
                  
                    <span>
                      <DeleteAddress
                        userId={userId}
                        addressId={item._id}
                        fetchAddress={fetchAddress}
                      />
                    </span>
                  </Card.Title>
                  <Card.Text>
                    <strong>Apartment:</strong> {item.apartment}
                    <br />
                    <strong>Street:</strong> {item.street}
                    <br />
                    <strong>City:</strong> {item.city}
                    <br />
                    <strong>State:</strong> {item.state}
                    <br />
                    <strong>Pin:</strong> {item.pincode}
                    <br />
                  </Card.Text>
                 
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No address added</p>
        )}
      </Row>

      <Button className="my-3" onClick={handleAddAddressClick}>
        Add new address
      </Button>
      {showAddAddress && (
        <Card className="p-3 shadow">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Apartment</Form.Label>
              <Form.Control {...register("apartment")} />
              {errors.apartment && (
                <span className="text-danger">{errors.apartment.message}</span>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Street</Form.Label>
              <Form.Control {...register("street")} />
              {errors.street && (
                <span className="text-danger">{errors.street.message}</span>
              )}
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control {...register("city")} />
                {errors.city && (
                  <span className="text-danger">{errors.city.message}</span>
                )}
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Select {...register("state")}>
                  <option>Choose...</option>
                  {IndianStates &&
                    IndianStates.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                </Form.Select>
                {errors.state && <span className="text-danger">required</span>}
              </Form.Group>
            </Row>
            <Form.Group className="w-25 mb-2" as={Col} controlId="formGridZip">
              <Form.Label>Pin</Form.Label>
              <Form.Control type="text" {...register("pincode")} />
              {errors.pincode && (
                <span className="text-danger">invalid pincode</span>
              )}
            </Form.Group>

            <div className="d-flex justify-content-center">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Card>
      )}
    </>
  );
}

export default AddressInfo;

function DeleteAddress({ userId, addressId, fetchAddress }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const handleConfirm = async () => {
    setShow(false);

    try {
      const res = await instance.delete(`/user/address/${userId}`, {
        data: { addressId: addressId },
      });

      if (res.data.success) {
        fetchAddress();
        showSuccessAlert("Deleted successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        onClick={handleShow}
        className="px-2  d-flex justify-content-center align-items-center"
      >
        <RiDeleteBinLine className="ms-1" />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure that you want to delete the Address
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
