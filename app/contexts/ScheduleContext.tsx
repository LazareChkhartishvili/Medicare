import React, { createContext, useContext, useState } from "react";

interface ScheduleContextType {
  schedules: { [key: string]: string[] };
  selectedDates: string[];
  setSchedules: (schedules: { [key: string]: string[] }) => void;
  setSelectedDates: (dates: string[]) => void;
  updateSchedule: (date: string, slots: string[]) => void;
  removeSchedule: (date: string) => void;
}

const ScheduleContext = createContext<ScheduleContextType | undefined>(
  undefined
);

export function ScheduleProvider({ children }: { children: React.ReactNode }) {
  const [schedules, setSchedules] = useState<{ [key: string]: string[] }>({});
  const [selectedDates, setSelectedDates] = useState<string[]>([]);

  const updateSchedule = (date: string, slots: string[]) => {
    setSchedules((prev) => ({
      ...prev,
      [date]: slots,
    }));
  };

  const removeSchedule = (date: string) => {
    setSchedules((prev) => {
      const newSchedules = { ...prev };
      delete newSchedules[date];
      return newSchedules;
    });
    setSelectedDates((prev) => prev.filter((d) => d !== date));
  };

  return (
    <ScheduleContext.Provider
      value={{
        schedules,
        selectedDates,
        setSchedules,
        setSelectedDates,
        updateSchedule,
        removeSchedule,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
}

export function useSchedule() {
  const context = useContext(ScheduleContext);
  if (context === undefined) {
    throw new Error("useSchedule must be used within a ScheduleProvider");
  }
  return context;
}
