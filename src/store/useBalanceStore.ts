import { create } from "zustand";
import supabase from "@/lib/supabase";

interface BalanceState {
  balance: number;
  isLoading: boolean;
  fetchBalance: () => Promise<void>;
  updateBalance: (newBalance: number) => Promise<void>;
}

export const useBalanceStore = create<BalanceState>((set) => ({
  balance: 0,
  isLoading: false,

  fetchBalance: async () => {
    set({ isLoading: true });
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("profiles")
        .select("balance")
        .eq("id", user.id)
        .single();

      if (data) {
        set({ balance: data.balance });
      }
    } catch (error) {
      console.error("Помилка завантаження балансу:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateBalance: async (newBalance: number) => {
    set({ isLoading: true });
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from("profiles")
        .upsert({ id: user.id, balance: newBalance });

      if (error) throw error;

      set({ balance: newBalance });
    } catch (error) {
      console.error("Помилка оновлення балансу:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
