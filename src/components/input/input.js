import React, { useEffect, useState } from "react";

export default function Input({ name, value, onChange, digits }) {
  const [changedValue, setChangedValue] = useState(value);

  useEffect(() => setChangedValue(value), [value]);

  return (
    <input
      type="text"
      name={name}
      value={changedValue}
      onChange={handleChange}
      onBlur={() => onChange(name, Number(changedValue))}
    />
  );

  function handleChange(e) {
    let value = e.target.value;

    for (let digit of digits) {
      if (value.includes(digit))
        value = value.replace(digit, digits.indexOf(digit));
    }

    if (isNaN(value)) return;

    setChangedValue(value);
  }
}
