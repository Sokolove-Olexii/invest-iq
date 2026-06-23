import supabase from "@/lib/supabase";
import { toast } from "react-toastify";

export const handleGoogleLogin = async () => {
  const basePath = window.location.pathname.startsWith("/invest-iq")
    ? "/invest-iq"
    : "";

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}${basePath}/dashboard`,
      queryParams: {
        prompt: "select_account",
      },
    },
  });
  if (error) {
    console.error("Виникла помилка:", error.message);
    toast.error("Не вдалося відкрити вікно Google");
  }
};
