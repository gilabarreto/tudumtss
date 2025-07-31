import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Search from "../pages/Search";
import MovieDetails from "../pages/MovieDetails";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/search", element: <Search /> },
  { path: "/movie/:id", element: <MovieDetails /> },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
