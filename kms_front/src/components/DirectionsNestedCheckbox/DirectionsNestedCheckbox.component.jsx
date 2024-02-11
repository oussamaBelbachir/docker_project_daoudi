import React, { useState , useEffect} from 'react';

import "./DirectionsNestedCheckbox.styles.scss";
import Label from '../Label/Label.component';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Checkbox = ({ label, checked, onChange }) => (
    <label className='department__item'>
      <input type="checkbox" checked={checked} onChange={onChange} />
      {label}
      <div className='checked__item'>{checked ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}</div>
    </label>
  );
  
  const SelectAllCheckbox = ({ checked, onChange }) => (
    <label className='select__all'>
      <input type="checkbox" checked={checked} onChange={onChange} />
      sélectionner tout
      <div className='checked__item'>{checked ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}</div>

    </label>
  );


  const DirectionsNestedCheckbox = ({ data ,directionDepartments}) => {

    const [selectedItems, setSelectedItems] = useState(() => {
      const initialSelection = {};
      for (const category in data) {
        initialSelection[category] = [];
      }
      return initialSelection;
    });
  
    useEffect(() => {


      const data = {...selectedItems};
      Object.keys(data).forEach(el => {
        if (Array.isArray(data[el]) && data[el].length === 0) {
          delete data[el];
        }
      });

      console.log("data => ",data);
      directionDepartments(data);
    },[selectedItems]);
  
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
        
            
        
      return (
                <div className='items'>
                    {
                    Object.keys(data).map(category => (
                        <div key={category}>
                            <h3 className='direction__name'>{category}</h3>
                            <div className='departments__choices'>
                                <SelectAllCheckbox
                                    checked={selectedItems[category].length === data[category].length}
                                    onChange={e => handleSelectAllChange(e, category)}
                                />
                                {data[category].map(item => (
                                <div key={item} className="departments">
                                    <Checkbox
                                        label={item}
                                        checked={selectedItems[category].includes(item)}
                                        onChange={e => handleCheckboxChange(e, category, item)}
                                    />
                                </div>
                                ))
                                }
                            </div>
                        </div>
                    )
                    )}
                </div>)
    };
  
    return (
      <div className='directions__checkbox'>
        <Label required>Directions</Label>
        {renderCheckboxes(data)}
      </div>
    );
  };










// function DirectionsNestedCheckbox() {
//   return (
//     <div>DirectionsNestedCheckbox</div>
//   )
// }

export default DirectionsNestedCheckbox