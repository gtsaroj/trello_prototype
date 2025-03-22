import { Login } from "@/auth";
import { Register } from "@/auth/register/register";
import { Dashboard, HomePage, WorkSpace } from "@/pages";

interface Routes {
  [path: string]: {
    requiresAuth?: boolean;
    roles?: Array<"authenticatedUser" | "guest">;
    isAccessibleToPublicOnly?: boolean;
    element: React.ReactNode;
    accessToAnyOne: boolean;
  };
}

export const routers: Routes = {
  "/": {
    accessToAnyOne: true,
    element: <HomePage />,
    isAccessibleToPublicOnly: true,
  },
  "dashboard": {
    element: <Dashboard />,
    requiresAuth: true,
    roles: ["authenticatedUser"],
    accessToAnyOne: false,
  },
  "/workspace/:id": {
    accessToAnyOne: false,
    element: <WorkSpace />,
    roles: ["authenticatedUser"],
    requiresAuth: true,
  },
  "/login": {
    accessToAnyOne: false,
    element: <Login />,
    roles: ["guest"],
    isAccessibleToPublicOnly: true,
  },
  "/register": {
    accessToAnyOne: false,
    element: <Register />,
    isAccessibleToPublicOnly: true,
  },
};
