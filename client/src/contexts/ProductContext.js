import React from 'react';

export const ProductContext = React.createContext({
  products: [],
  addItem: (item) => {}
});