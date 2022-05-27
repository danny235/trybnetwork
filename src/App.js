import React, { useState } from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { authRoutes, unAuthRoutes } from "./components/routes";

function App() {
  const [user, setUser] = useState({ id: 2 });
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
      </Routes>
    </div>
  );
}

export default App;
