import { createContext, useState } from 'react';
import AlertDisplay from '../../components/AlertDisplay'; // Adjust the import path as needed

const alertContext = createContext();

const AlertState = (props) => {
  const [alert, setAlert] = useState(null);

  const showAlert = (msg, type) => {
    setAlert({ msg, type });

    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  return (
    <alertContext.Provider value={{ alert, showAlert, setAlert }}>
      {props.children}
      <AlertDisplay />
    </alertContext.Provider>
  );
};

export { alertContext, AlertState };