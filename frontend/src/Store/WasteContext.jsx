import { useState, createContext } from "react";
import PropTypes from "prop-types";
export const WasteContext = createContext();

export function WasteProvider(props) {

  const [user, setUser] = useState();
  const [modal, setModal] = useState();
  
  return (
    <div>
      <WasteContext.Provider
        value={{
          modal,
          setModal,
          user,
          setUser,
        }}
      >
        {props.children}
      </WasteContext.Provider>
    </div>
  );
}
WasteProvider.propTypes = {
  children: PropTypes.node.isRequired, // Add prop type validation for 'children'
};
