import { useState } from "react";

export default function useOverallSection({
  selectedDate,
}: {
  selectedDate: Date | null;
}) {
  const [activeTab, setActiveTab] = useState<"expanse" | "income">("expanse");

  const direction = activeTab === "income" ? 1 : -1;

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  return {
    direction,
    slideVariants,
    activeTab,
    setActiveTab,
    selectedDate,
  };
}
