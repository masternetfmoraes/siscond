import React from 'react';

const Select = ({ options, value,className, onChange }:any) => {
  return (
    <select value={value} onChange={onChange} className={`block font-medium text-sm text-gray-700 ` + className}>
      {options.map((option: { value: string | number | readonly string[] | undefined; label: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
