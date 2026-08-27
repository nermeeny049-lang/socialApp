import { createContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
export const userContext = createContext("");

export default function UserProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo")),
  );
  async function getUserInfo() {
    try {
      const options = {
        url: "https://route-posts.routemisr.com/users/profile-data",
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.request(options);
      setUserInfo(data.data.user);
      localStorage.setItem("userInfo", JSON.stringify(data.data.user));
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (token) {
      getUserInfo();
    }
  }, [token]);

  return (
    <userContext.Provider value={{ token, setToken, userInfo, setUserInfo }}>
      {children}
    </userContext.Provider>
  );
}
