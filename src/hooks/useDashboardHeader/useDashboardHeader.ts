import { useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import supabase from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function useDashboardHeader() {
  const router = useRouter();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isQuitModalOpen, setIsQuitModalOpen] = useState(false);

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 50) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await supabase.auth.signOut();
      router.push("/");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return {
    hidden,
    isQuitModalOpen,
    isLoggingOut,
    setIsQuitModalOpen,
    handleLogout,
  };
}
