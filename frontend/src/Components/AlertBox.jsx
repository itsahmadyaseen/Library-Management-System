import React, { useEffect, useState } from 'react';

const AlertBox = ({ message, showAlert }) => {
  const [show, setShow] = useState(showAlert);

  useEffect(() => {
    if (showAlert) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 3000); 
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <div className={`fixed bottom-8 left-8 bg-green-500 text-white p-3 rounded-lg shadow-lg transition-transform ${show ? 'translate-y-0' : 'translate-y-20'} duration-300 ease-in-out`}>
      {message}
    </div>
  );
};

export default AlertBox;
