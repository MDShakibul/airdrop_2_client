// App.jsx
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import AllUsers from "./pages/AllUsers";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import GeminixOverview from "./pages/GeminixOverview ";


const ProtectedRoute = ({ children, auth = false }) => {
  const location = useLocation();
  const isLoggedIn = Boolean(localStorage.getItem("wallet_address"));

  // If the route is protected and user isn't logged in -> go to login
  if (auth && !isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // If user is logged in and tries to visit /login -> send home
  if (!auth && isLoggedIn && location.pathname === "/login") {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const routes = [
    { path: "/", element: <Home />, auth: false },
    { path: "/login", element: <Login />, auth: false },
    { path: "/geminix-dience", element: <GeminixOverview />, auth: false },
    { path: "/dashboard", element: <Dashboard />, auth: true },
    { path: "/admin/all-users", element: <AllUsers/>, auth: false },
  ];

  return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 overflow-y-auto">
          <Routes>
            {routes.map(({ path, element, auth }, i) => (
              <Route
                key={i}
                path={path}
                element={<ProtectedRoute auth={auth}>{element}</ProtectedRoute>}
              />
            ))}
          </Routes>
        </main>
        <Footer />
		<ToastContainer position="top-right" autoClose={2000} />
      </div>
  );
}

export default App;
