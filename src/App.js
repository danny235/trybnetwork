import React, { useState } from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { authRoutes, unAuthRoutes } from "./components/routes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [user, setUser] = useState({});
  const isUser = Object.keys(user).length;

  return (
    <div>
      <Routes>
        {isUser < 1
          ? unAuthRoutes.map(({ pathname, component, exact, id }) => {
              return (
                <Route
                  key={id}
                  path={pathname}
                  element={component}
                  exact={exact}
                />
              );
            })
          : authRoutes.map(({ pathname, component, exact, id }) => {
              return (
                <Route
                  key={id}
                  path={pathname}
                  element={component}
                  exact={exact}
                />
              );
            })}
        {/* {
             unAuthRoutes.map(({ pathname, component, exact, id }) => {
              return (
                <Route
                  key={id}
                  path={pathname}
                  element={component}
                  exact={exact}
                />
              );
            })
           } */}
        {/* {
             authRoutes.map(({ pathname, component, exact, id }) => {
              return (
                <Route
                  key={id}
                  path={pathname}
                  element={component}
                  exact={exact}
                />
              );
            })
           } */}
      </Routes>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
    </div>
  );
}

export default App;
