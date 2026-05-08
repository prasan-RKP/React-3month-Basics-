import React, { useState } from "react";

const checkboxesData = [
  {
    id: 1,
    name: "Electronics",
    checked: false,
    children: [
      {
        id: 2,
        name: "Mobile phones",
        checked: false,
        children: [
          {
            id: 3,
            name: "iPhone",
            checked: false,
          },
          {
            id: 4,
            name: "Android",
            checked: false,
          },
        ],
      },
      {
        id: 5,
        name: "Laptops",
        checked: false,
        children: [
          {
            id: 6,
            name: "MacBook",
            checked: false,
          },
          {
            id: 7,
            name: "Surface Pro",
            checked: false,
          },
        ],
      },
    ],
  },
  {
    id: 8,
    name: "Books",
    checked: false,
    children: [
      {
        id: 9,
        name: "Fiction",
        checked: false,
      },
      {
        id: 10,
        name: "Non-fiction",
        checked: false,
      },
    ],
  },
  {
    id: 11,
    name: "Toys",
    checked: false,
  },
];

export default function NestedCheckbox() {
  const [data, setData] = useState(checkboxesData);

  const handleCheck = (id, checked, items) => {
    return items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          checked,
          children: item.children
            ? updateChildren(item.children, checked)
            : undefined,
        };
      }

      if (item.children) {
        return {
          ...item,
          children: handleCheck(id, checked, item.children),
        };
      }

      return item;
    });
  };

  const updateChildren = (children, checked) => {
    return children.map((child) => ({
      ...child,
      checked,
      children: child.children
        ? updateChildren(child.children, checked)
        : undefined,
    }));
  };

  const onCheckboxChange = (id, checked) => {
    const updatedData = handleCheck(id, checked, data);
    setData(updatedData);
  };

  const renderCheckboxes = (items, level = 0) => {
    return items.map((item) => (
      <div key={item.id} style={{ marginLeft: `${level * 20}px` }}>
        <label>
          <input
            type="checkbox"
            checked={item.checked}
            onChange={(e) =>
              onCheckboxChange(item.id, e.target.checked)
            }
          />
          {item.name}
        </label>

        {item.children &&
          renderCheckboxes(item.children, level + 1)}
      </div>
    ));
  };

  return (
    <div className="ml-4 mt-4">
      <h2 className="text-2xl mb-4">Nested Checkboxes</h2>
      {renderCheckboxes(data)}
    </div>
  );
}