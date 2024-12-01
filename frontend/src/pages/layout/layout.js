import React from "react";
import Header from "./header";
import Footer from "./footer";

const Layout = ({ children }) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }} //ajuste para o footer continuar no fim de uma pagina inicial, sem subir
    >
      <Header />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
