import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { LuFilter } from "react-icons/lu";

const FilterMenu = ({ onFilterChange }) => {
  const [show, setShow] = useState(false);

  return (
    <Dropdown
      show={show}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <Dropdown.Toggle
        as="span"
        style={{
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        <LuFilter style={{ fontSize: "22px", color: "#555" }} />
      </Dropdown.Toggle>

      <Dropdown.Menu align="end" style={{ minWidth: "150px" }}>
        {["All", "Name", "Status", "Role", "Email", "Teams"].map((opt) => (
          <Dropdown.Item
            key={opt}
            onClick={() => onFilterChange(opt)}
            style={{ cursor: "pointer" }}
          >
            {opt}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default FilterMenu;

