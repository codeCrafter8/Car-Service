import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import PATH from "../../paths";
import Cookies from "js-cookie";

const TableAddVehicle = () => {
  const [newVehicle, setnewVehicle] = useState({
    brand: "",
    model: "",
    vin: "",
    licensePlate: "",
    year: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setnewVehicle({
      ...newVehicle,
      [name]: value
    });
  };

  const handleAddVehicle = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/v1/vehicles", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${Cookies.get("jwt")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          brand: newVehicle.brand,
          model: newVehicle.model,
          vin: newVehicle.vin,
          registrationNumber: newVehicle.licensePlate,
          registrationDate: newVehicle.year
        })
      });
  
      if (response.ok) {
        setnewVehicle({
          brand: "",
          model: "",
          vin: "",
          licensePlate: "",
          year: ""
        });
      } else {
        console.error("Failed to add vehicle");
      }
    } catch (error) {
      console.error("Error adding vehicle:", error);
    }
  };

  return (
    <div>
      <Form>
        <Form.Group controlId="formBrand">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter brand"
            name="brand"
            value={newVehicle.brand}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formaModel">
            <Form.Label>Model</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter model"
                name="model"
                value={newVehicle.model}
                onChange={handleInputChange}
            />
            </Form.Group>

            <Form.Group controlId="formVin">
            <Form.Label>VIN</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter VIN number"
                name="vin"
                value={newVehicle.vin}
                onChange={handleInputChange}
            />
            </Form.Group>

            <Form.Group controlId="formLicensePlate">
            <Form.Label>license plate</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter license plate"
                name="licensePlate"
                value={newVehicle.registrationNumber}
                onChange={handleInputChange}
            />
            </Form.Group>

            <Form.Group controlId="formYear">
            <Form.Label>year</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter year"
                name="year"
                value={newVehicle.registrationDate}
                onChange={handleInputChange}
            />
            </Form.Group>

        <Link to={PATH.VEHICLE}>
        <Button variant="primary" onClick={handleAddVehicle} style={{ marginTop: "10px", fontSize: "16px" }}>
          Add vehicle
        </Button>

        </Link>
      </Form>
    </div>
  );
};

export default TableAddVehicle;
