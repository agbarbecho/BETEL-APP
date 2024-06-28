import React, { forwardRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const SuccessMessage = forwardRef(({ message, isVisible, type }, ref) => {
  const bgColor = type === 'success' ? 'bg-green-100' : 'bg-red-100';
  const textColor = type === 'success' ? 'text-green-700' : 'text-red-700';
  const Icon = type === 'success' ? FaCheckCircle : FaTimesCircle;

  return (
    <CSSTransition
      in={isVisible}
      timeout={300}
      classNames="fade"
      unmountOnExit
      nodeRef={ref}
    >
      <div ref={ref} className={`fixed bottom-0 right-0 mb-4 mr-4 p-4 rounded shadow-lg flex items-center ${bgColor} ${textColor}`}>
        <Icon className="mr-2" /> {message}
      </div>
    </CSSTransition>
  );
});

export default SuccessMessage;
