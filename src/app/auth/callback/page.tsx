"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import supabase from "@/lib/supabase";
import styles from "./callback.module.scss";

function CallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        const next = searchParams.get("next") ?? "/dashboard";
        router.push(next);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router, searchParams]);

  return (
    <div className={styles.callbackContainer}>
      <p>Завершення авторизації...</p>
    </div>
  );
}

export default function AuthCallback() {
  return (
    <Suspense
      fallback={
        <div className={styles.callbackContainer}>
          <p>Завершення авторизації...</p>
        </div>
      }
    >
      <CallbackHandler />
    </Suspense>
  );
}
