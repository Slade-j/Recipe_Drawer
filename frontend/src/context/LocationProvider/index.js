import { createContext, useState, useContext } from 'react';

export const LocationContext = createContext();
export const useLocation = () => useContext(LocationContext);

const LocationProvider = (props) => {
  const [ location, setLocation ] = useState('');

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {props.children}
    </LocationContext.Provider>
  )
}

export default LocationProvider;
