import "@/index.css";
import { Dashboard, HomePage, WorkSpace } from "@/pages";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute, routers } from "@/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks";
import { CreateCard } from "./components";
export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { user } = useAppSelector();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    user?.isSuccess ? setIsAuthenticated(true) : setIsAuthenticated(false);
  }, [user]);
  const queryClient = new QueryClient();
  return <CreateCard labels={[{color:"green",id:"flkdj",name:"fldjk"}]} title="fld" />;
}
