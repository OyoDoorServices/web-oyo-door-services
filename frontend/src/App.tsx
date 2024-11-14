import { Suspense, lazy, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Loader from "./components/Loader";
import ProtectedRoute from "./components/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { userReducerInitialState } from "./types/reducerTypes";
import { userExist } from "./redux/reducer/userReducer";
import Services from "./pages/services";

//lazy loading
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector(
    (state: { userReducer: userReducerInitialState }) => state.userReducer
  );
  useEffect(() => {
    const checkAuthState = async () => {
      const localUser = localStorage.getItem("user");
      if (localUser) {
        try {
          const user = JSON.parse(localUser);
          dispatch(userExist(user));
        } catch (error) {
          console.error("Error parsing local user:", error);
          localStorage.removeItem("user");
        }
      }
    };

    checkAuthState();
  }, [dispatch]);

  return (
    <>
      <Router>
        <Header />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                <ProtectedRoute isAuthenticated={user ? false : true}>
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route path="/services" element={<Services />} />
          </Routes>
          <Toaster position="top-center" />
        </Suspense>
        <Footer />
      </Router>
    </>
  );
}

export default App;
