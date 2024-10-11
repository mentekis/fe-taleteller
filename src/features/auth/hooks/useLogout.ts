import jsonFetcher from "@/lib/fetch";

export const useLogout = () => {
  function deleteCookie(name: string) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  async function handleLogout() {
    await jsonFetcher("/auth/logout", {}, {
      method: "POST",
      credentials: 'include',
    });

    // Clear all localstorage
    localStorage.clear();

    // Clear all cookies
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [cookieName] = cookie.split("=");
      deleteCookie(cookieName);
    }

    window.location.href = "/auth/login";
  }

  return { handleLogout }
}
