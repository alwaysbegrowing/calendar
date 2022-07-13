import { useState } from "react";

const useSelectedTimeSlots = () => {
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

  return {
    setSelectedSlots,
    selectedSlots,
  };
};

export default useSelectedTimeSlots;
