
import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;
  return (
    <div role="alert">
      <p className="font-semibold">Error</p>
      <p className="text-sm">{message}</p>
    </div>
  );
};
