import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark";
type Language = "en" | "ru";

interface SettingsState {
  theme: Theme;
  language: Language;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setLanguage: (lang: Language) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: "light",
      language: "en",

      setTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),

      setLanguage: (language) => set({ language }),
    }),
    {
      name: "settings-store",
    }
  )
);