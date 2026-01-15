import * as z from "zod";

export const gerbangSchema = z.object({
  id: z.number().min(1, "ID is required"),
  IdCabang: z.number().min(1, "ID Cabang is required"),
  NamaGerbang: z.string().min(1, "Nama Gerbang is required"),
  NamaCabang: z.string().min(1, "Nama Cabang is required"),
});

export type GerbangFormValues = z.infer<typeof gerbangSchema>;
