import { createContext, useState, useContext } from 'react';

export const LocationContext = createContext();
export const useLocation = () => useContext(LocationContext);

const LocationProvider = (props) => {
  const [ location, setLocation ] = useState('');
  const [ enablePrompts, setEnablePrompts] = useState(true);

  return (
    <LocationContext.Provider value={
      {
        location,
        setLocation,
        enablePrompts,
         setEnablePrompts
        }
    }>
      {props.children}
    </LocationContext.Provider>
  )
}

export default LocationProvider;
