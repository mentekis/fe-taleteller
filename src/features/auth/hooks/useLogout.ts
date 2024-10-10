import { useNavigate } from "react-router-dom"
import jsonFetcher from "@/lib/fetch";

export const useLogout = () => {
  const navigate = useNavigate();

  async function handleLogout() {
    await jsonFetcher("/auth/logout", {}, {
      method: "POST",
      credentials: 'include',
    });

    navigate("/auth/login");
  }

  return { handleLogout }
}
