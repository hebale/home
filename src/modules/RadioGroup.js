import React, { useState, useEffect } from 'react';

export default function CheckboxGroup({ 
  className,
  addIcon,
  dataSet,
  keyName,
  labelName,
  onChange
}) {
  const [checkBoxData, setCheckBoxData] = useState([]);
  
  useEffect(() => {
    if (dataSet) setCheckBoxData(dataSet);
  }, [dataSet])

  const onChangeRadio = event => {
    const { value } = event.target;

    onChange(
      checkBoxData.map(state => {
        const [key] = Object.entries(state)[0];
        state[key] = key === value;
        return state;
      })
    );
  };

  return (
    <div className={`${className ? className : 'radio-group'}`}>
      {checkBoxData.map(repo => {
        const [key, value] = Object.entries(repo)[0];

        return (
          <label className={key} key={key}>
            <input type="radio"
              value={key}
              name={keyName}
              checked={value}
              onChange={event => onChangeRadio(event)}
            />
            <span>{ addIcon }{ labelName ? labelName[key] : key }</span>
          </label>
        )})}
    </div>
  );
}