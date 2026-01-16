"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import type { Gerbang } from "@/services/highway-service.types";
import { gerbangSchema, type GerbangFormValues } from "../schemas";

type GerbangFormDialogProps = {
  open: boolean;
  editingGerbang: Gerbang | null;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (data: GerbangFormValues) => Promise<void>;
};

export function GerbangFormDialog({
  open,
  editingGerbang,
  isSubmitting,
  onClose,
  onSubmit,
}: GerbangFormDialogProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GerbangFormValues>({
    resolver: zodResolver(gerbangSchema),
    defaultValues: {
      id: 0,
      IdCabang: 0,
      NamaGerbang: "",
      NamaCabang: "",
    },
  });

  useEffect(() => {
    if (open) {
      if (editingGerbang) {
        reset({
          id: editingGerbang.id,
          IdCabang: editingGerbang.IdCabang,
          NamaGerbang: editingGerbang.NamaGerbang,
          NamaCabang: editingGerbang.NamaCabang,
        });
      } else {
        reset({
          id: 0,
          IdCabang: 0,
          NamaGerbang: "",
          NamaCabang: "",
        });
      }
    }
  }, [open, editingGerbang, reset]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {editingGerbang ? "Edit Gerbang" : "Add New Gerbang"}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid size={6}>
              <Controller
                name="id"
                control={control}
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      label="ID"
                      type="number"
                      fullWidth
                      error={!!errors.id}
                      helperText={errors.id?.message}
                      disabled={!!editingGerbang}
                      onChange={(event) => {
                        field.onChange(parseInt(event.target.value) || 0);
                      }}
                    />
                  );
                }}
              />
            </Grid>
            <Grid size={6}>
              <Controller
                name="IdCabang"
                control={control}
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      label="ID Cabang"
                      type="number"
                      fullWidth
                      error={!!errors.IdCabang}
                      helperText={errors.IdCabang?.message}
                      disabled={!!editingGerbang}
                      onChange={(event) => {
                        field.onChange(parseInt(event.target.value) || 0);
                      }}
                    />
                  );
                }}
              />
            </Grid>
            <Grid size={6}>
              <Controller
                name="NamaGerbang"
                control={control}
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      label="Nama Gerbang"
                      fullWidth
                      error={!!errors.NamaGerbang}
                      helperText={errors.NamaGerbang?.message}
                    />
                  );
                }}
              />
            </Grid>
            <Grid size={6}>
              <Controller
                name="NamaCabang"
                control={control}
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      label="Nama Cabang"
                      fullWidth
                      error={!!errors.NamaCabang}
                      helperText={errors.NamaCabang?.message}
                    />
                  );
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {editingGerbang ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
