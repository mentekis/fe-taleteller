import { useToast } from "@/hooks/use-toast";
import jsonFetcher from "@/lib/fetch";
import { useMutation } from "@tanstack/react-query";

export const useLogout = () => {
  // Hooks
  const { toast } = useToast();

  const { isPending: logoutPending, mutate: handleLogoutFn } = useMutation({
    mutationKey: ["logout"],
    mutationFn: handleLogout,
    onSuccess: () => {
      window.location.href = "/auth/login";
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      })
    }
  })


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
  }

  return { logoutPending, handleLogoutFn }
}
