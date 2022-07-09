import { useState } from "react";

const useSelectedTimeSlots = () => {
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

  console.log(selectedSlots);

  return {
    setSelectedSlots,
    selectedSlots,
  };
};

export default useSelectedTimeSlots;
