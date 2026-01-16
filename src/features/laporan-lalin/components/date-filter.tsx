"use client";

import { Stack, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";

type DateFilterProps = {
  selectedDate: Dayjs | null;
  onDateChange: (date: Dayjs | null) => void;
  onFilter: () => void;
};

export function DateFilter({
  selectedDate,
  onDateChange,
  onFilter,
}: DateFilterProps) {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <DatePicker
        label="Tanggal"
        value={selectedDate}
        onChange={onDateChange}
        format="DD/MM/YYYY"
        slotProps={{
          textField: {
            size: "small",
            sx: { width: 200 },
          },
        }}
      />
      <Button variant="contained" onClick={onFilter}>
        Filter
      </Button>
    </Stack>
  );
}
