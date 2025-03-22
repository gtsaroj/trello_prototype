import "@/index.css";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute, routers } from "@/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks";
export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { user } = useAppSelector();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    user?.isSuccess ? setIsAuthenticated(true) : setIsAuthenticated(false);
  }, [user.isSuccess]);

  console.log(user);

  const queryClient = new QueryClient();
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          {Object.entries(routers).map(([pathName, config]) =>
            config.isAccessibleToPublicOnly ? (
              <Route
                key={pathName}
                path={pathName}
                element={
                  isAuthenticated ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    config.element
                  )
                }
              />
            ) : (
              ""
            )
          )}

          {Object.entries(routers).map(([pathName, config]) => {
            return config.requiresAuth ? (
              <Route
                key={pathName}
                element={
                  <PrivateRoute userRole={[user?.data.role as Auth.UserType]} />
                }
              >
                <Route path={pathName} element={config.element} />
              </Route>
            ) : config.accessToAnyOne ? (
              <Route
                key={pathName}
                index
                path={pathName === "/" ? undefined : pathName}
                element={config.element}
              />
            ) : (
              <Route key={pathName} path={pathName} element={config.element} />
            );
          })}
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
