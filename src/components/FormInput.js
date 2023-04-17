import React, { useState } from 'react'

export const FormInput = (props) => {
    const [focused, setFocused] = useState(false);
    const { label, errorMessage, onChange, id, className, ...inputProps } = props;
  
    const handleFocus = () => {
      setFocused(true);
    };
  return (
    <div className="formInput">
      <input
        {...inputProps}
        placeholder=" "
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        focused={focused.toString()}
      />
      <label>{label}</label>
      <span>{errorMessage}</span>
    </div>
  )
}
