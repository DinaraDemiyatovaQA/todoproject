import React from 'react';

import './Dropdown.css';

const Dropdown = (props) => {

  const dropdownChangeHandler = (event) => {
    props.onChangeFilter(event.target.value);
  };

  const options = props.options.map(item => {
    return (
      <option key={item} value={item}>{item}</option>
    );
  })

  return (
    <div className='dropdown-filter'>
      <div className='dropdown-filter__control'>
        <label>{props.label}</label>
        <select value={props.value} onChange={dropdownChangeHandler}>
          {options}
        </select>
      </div>
    </div>
  );
};

export default Dropdown;
