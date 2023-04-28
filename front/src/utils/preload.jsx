import React, { createContext, useContext } from 'react';

const getStoredData = () => JSON.parse(typeof document !== 'undefined' ? document.querySelector('#server-data').value : null);
const ServerContext = createContext({});

export const useServerData = () => useContext(ServerContext) ?? getStoredData();

export const ServerProvider = ({ value, children }) => <>
  <ServerContext.Provider value={value}>
    {children}
  </ServerContext.Provider>
</>;