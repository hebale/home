import React, { useState, useEffect } from 'react';

export default function CheckboxGroup({ 
  className,
  addIcon,
  dataSet,
  labelName,
  onChange
}) {
  const [checkBoxData, setCheckBoxData] = useState([]);
  
  useEffect(() => {
    if (dataSet) setCheckBoxData(dataSet);
  }, [dataSet])

  const onChangeCheckbox = event => {
    const { checked, value } = event.target;

    onChange(
      checkBoxData.map(state => {
        if(state.hasOwnProperty(value)) state[value] = checked;
        return state;
      })
    );
  };

  return (
    <div className={`${className ? className : 'checkbox-group'}`}>
      {checkBoxData.map(repo => {
        const [key, value] = Object.entries(repo)[0];

        return (
          <label className={key} key={key}>
            <input type="checkbox"
              value={key}
              checked={value}
              onChange={event => onChangeCheckbox(event)}
            />
            <span>{ addIcon }{ labelName ? labelName[key] : key }</span>
          </label>
        )})}
    </div>
  );
}