import { createContext, useState } from "react";

const Auth = createContext(null);
function AuthProvider({children}) {
  const [user, setUser] = useState(null);
  const login = (data) => setUser(data);
  const logout = () => setUser(null);
  return (
    <Auth.Provider value={{ user, login, logout }}>{children}</Auth.Provider>
  );
}
export { AuthProvider, Auth };
