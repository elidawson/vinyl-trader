import { useState, useEffect, createContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import Notfound from "./Notfound";
import RecordForm from "./RecordForm";
import Signup from "./Signup";
import UserDetail from "./UserDetail";

export const UserContext = createContext();

export default function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    fetch("/api/check_session")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        console.log("no user logged in");
      });
  }, []);

  const handleLogout = () => {
    fetch("/api/logout", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    }).then(() => {
      setUser(null);
      if (location.pathname === "/") {
        window.location.reload();
      }
    });
  };

  return (
    <UserContext.Provider value={user}>
      <Routes>
        <Route
          path="/"
          element={<Header />}
        >
          <Route index element={<Home />} />
          <Route
            path="/login"
            element={<Login user={user} setUser={setUser} />}
          />
          <Route path="/signup" element={<Signup setUser={setUser} />} />
          <Route path="/records/new" element={<RecordForm user={user} />} />
          <Route path="/user" element={<UserDetail handleLogout={handleLogout} />} />
          <Route path="*" element={<Notfound />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
}
