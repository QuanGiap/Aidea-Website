import { createContext, useState } from "react";

const Auth = createContext(null);
function AuthProvider({children}) {
  const [user, setUser] = useState(localStorage.getItem('token')? true : false);
  const login = (data) => setUser(data);
  const logout = () => {setUser(false);localStorage.clear()};
  return (
    <Auth.Provider value={{ user, login, logout }}>{children}</Auth.Provider>
  );
}
export { AuthProvider, Auth };
