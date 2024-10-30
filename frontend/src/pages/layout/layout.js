// Layout.js
import React from 'react';
import Header from './header'; // Ajuste o caminho conforme necessário

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;