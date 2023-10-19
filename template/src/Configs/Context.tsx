import React from 'react';

export const CurrentNavigatorContext = React.createContext({
  currentValue: null,
  setCurrentContext: (value: string) => {},
});
