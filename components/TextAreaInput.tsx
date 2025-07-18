
import React from 'react';

interface TextAreaInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
}

export const TextAreaInput: React.FC<TextAreaInputProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  rows = 10,
  className = '',
}) => {
  return (
    <div className="w-full">
      {label && (
         <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-1">
           {label}
         </label>
      )}
      <textarea
        id={id}
        name={id}
        rows={rows}
        className={`w-full p-3 border rounded-lg shadow-sm transition-colors duration-200 resize-y text-sm ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
