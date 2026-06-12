import { create } from "zustand";
import supabase from "@/lib/supabase";

export interface Transaction {
  id: string;
  description: string;
  category: string;
  created_at: string;
  amount: number;
  type: "expanse" | "income";
}

interface TransactionsState {
  isLoading: boolean;
  transactions: Transaction[];
  fetchTransactions: () => Promise<void>;
  addTransaction: (
    Transaction: Omit<Transaction, "id" | "created_at"> & {
      created_at?: string;
    },
  ) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  getTotalIncome: () => number;
  getTotalExpanse: () => number;
}

export const useTransactionsStore = create<TransactionsState>((set, get) => ({
  transactions: [],
  isLoading: false,

  getTotalIncome: () => {
    return get()
      .transactions.filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
  },

  getTotalExpanse: () => {
    return get()
      .transactions.filter((t) => t.type === "expanse")
      .reduce((sum, t) => sum + t.amount, 0);
  },

  fetchTransactions: async () => {
    set({ isLoading: true });
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (data) {
        set({ transactions: data });
      }
    } catch (error) {
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  addTransaction: async (newText) => {
    set({ isLoading: true });
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("transactions")
        .insert([{ ...newText, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;

      set((state) => ({
        transactions: [data, ...state.transactions],
      }));
    } catch (error) {
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  deleteTransaction: async (id) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { error } = await supabase
        .from("transactions")
        .delete()
        .eq("id", id);

      if (error) throw error;

      set((state) => ({
        transactions: state.transactions.filter((t) => t.id !== id),
      }));
    } catch (error) {
      console.error(error);
    }
  },
}));
