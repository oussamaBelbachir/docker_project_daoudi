import React, { useState } from 'react';

const Checkbox = ({ label, checked, onChange }) => (
  <label>
    <input type="checkbox" checked={checked} onChange={onChange} />
    {label}
  </label>
);

const SelectAllCheckbox = ({ checked, onChange }) => (
  <label>
    <input type="checkbox" checked={checked} onChange={onChange} />
    Select All
  </label>
);

const NestedCheckbox = ({ data }) => {
  const [selectedItems, setSelectedItems] = useState(() => {
    const initialSelection = {};
    for (const category in data) {
      initialSelection[category] = [];
    }
    return initialSelection;
  });

  const handleCheckboxChange = (event, category, item) => {
    setSelectedItems(prevSelection => {
      const updatedSelection = { ...prevSelection };
      if (event.target.checked) {
        updatedSelection[category] = [...updatedSelection[category], item];
      } else {
        updatedSelection[category] = updatedSelection[category].filter(
          selectedItem => selectedItem !== item
        );
      }
      return updatedSelection;
    });
  };

  const handleSelectAllChange = (event, category) => {
    setSelectedItems(prevSelection => {
      const updatedSelection = { ...prevSelection };
      if (event.target.checked) {
        updatedSelection[category] = data[category];
      } else {
        updatedSelection[category] = [];
      }
      return updatedSelection;
    });
  };

  const renderCheckboxes = data => {
    return Object.keys(data).map(category => (
      <div key={category}>
        <h3>{category}</h3>
        <SelectAllCheckbox
          checked={selectedItems[category].length === data[category].length}
          onChange={e => handleSelectAllChange(e, category)}
        />
        {data[category].map(item => (
          <div key={item}>
            <Checkbox
              label={item}
              checked={selectedItems[category].includes(item)}
              onChange={e => handleCheckboxChange(e, category, item)}
            />
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div>
      <h2>Select Departments:</h2>
      {renderCheckboxes(data)}
      <h2>Selected Items:</h2>
      {JSON.stringify(selectedItems, null, 2)}
    </div>
  );
};

const App = () => {
  const data = {
    tmpa: ["marketing", "it", "finance", "production"],
    cires: ["marketing", "it", "finance", "production", "logistique"],
    tme: ["marketing", "it", "finance", "production"],
    tmu: ["marketing", "it", "finance", "production"]
  };
  
  return (
    <div>
      <NestedCheckbox data={data} />
    </div>
  );
};

export default App;
