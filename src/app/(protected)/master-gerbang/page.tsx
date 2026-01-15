"use client";

import { useState, useMemo } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import {
  useGetGerbangs,
  useCreateGerbang,
  useUpdateGerbang,
  useDeleteGerbang,
} from "@/services/use-highway-service";
import { useQueryParams } from "@/hooks/use-query-params";
import { useTableSort, type SortDirection } from "@/hooks/use-table-sort";
import { SearchBar } from "@/features/master-gerbang/components/search-bar";
import { GerbangTable } from "@/features/master-gerbang/components/gerbang-table";
import { GerbangFormDialog } from "@/features/master-gerbang/components/gerbang-form-dialog";
import { DeleteConfirmDialog } from "@/features/master-gerbang/components/delete-confirm-dialog";
import type { Gerbang } from "@/services/highway-service.types";
import type { GerbangFormValues } from "@/features/master-gerbang/schemas";

export default function MasterGerbangPage() {
  const { getQueryParam, setQueryParams } = useQueryParams();

  const page = Number(getQueryParam("page")) || 0;
  const rowsPerPage = Number(getQueryParam("limit")) || 10;
  const searchQuery = getQueryParam("search") || "";
  const sortBy = (getQueryParam("sort_by") as keyof Gerbang | null) || null;
  const sortDirection = (getQueryParam("sort_dir") as SortDirection) || null;

  const handleSortChange = (
    key: keyof Gerbang | null,
    direction: SortDirection,
  ) => {
    setQueryParams({
      sort_by: key as string | null,
      sort_dir: direction,
    });
  };

  const { sortConfig, handleSort, sortedData } = useTableSort<Gerbang>({
    sortBy,
    sortDirection,
    onSortChange: handleSortChange,
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [editingGerbang, setEditingGerbang] = useState<Gerbang | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [gerbangToDelete, setGerbangToDelete] = useState<Gerbang | null>(null);

  const { data: gerbangsData, isLoading } = useGetGerbangs({
    page: page + 1,
    limit: rowsPerPage,
    NamaGerbang: searchQuery || undefined,
    NamaCabang: searchQuery || undefined,
  });

  const createMutation = useCreateGerbang();
  const updateMutation = useUpdateGerbang();
  const deleteMutation = useDeleteGerbang();

  const handleChangePage = (_event: unknown, newPage: number) => {
    setQueryParams({
      page: newPage,
    });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setQueryParams({
      limit: parseInt(event.target.value, 10),
      page: 0,
    });
  };

  const handleSearchChange = (value: string) => {
    setQueryParams({
      search: value,
      page: 0,
    });
  };

  const handleOpenDialog = (gerbang?: Gerbang) => {
    if (gerbang) {
      setEditingGerbang(gerbang);
    } else {
      setEditingGerbang(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingGerbang(null);
  };

  const handleOpenDeleteConfirm = (gerbang: Gerbang) => {
    setGerbangToDelete(gerbang);
    setDeleteConfirmOpen(true);
  };

  const handleCloseDeleteConfirm = () => {
    setDeleteConfirmOpen(false);
    setGerbangToDelete(null);
  };

  const handleSubmit = async (data: GerbangFormValues) => {
    try {
      if (editingGerbang) {
        await updateMutation.mutateAsync(data);
      } else {
        await createMutation.mutateAsync(data);
      }
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving gerbang:", error);
    }
  };

  const handleDelete = async () => {
    if (gerbangToDelete) {
      try {
        await deleteMutation.mutateAsync({
          id: gerbangToDelete.id,
          IdCabang: gerbangToDelete.IdCabang,
        });
        handleCloseDeleteConfirm();
      } catch (error) {
        console.error("Error deleting gerbang:", error);
      }
    }
  };

  const sortedRows = useMemo(() => {
    const rows = gerbangsData?.data?.rows?.rows || [];
    return sortedData(rows);
  }, [gerbangsData?.data?.rows?.rows, sortedData]);

  return (
    <Box>
      <Typography variant="h5" fontWeight={500} sx={{ mb: 3 }}>
        Master Gerbang
      </Typography>

      <Card>
        <CardContent>
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onAddClick={() => {
              handleOpenDialog();
            }}
          />

          <GerbangTable
            rows={sortedRows}
            isLoading={isLoading}
            page={page}
            rowsPerPage={rowsPerPage}
            totalCount={gerbangsData?.data?.count || 0}
            sortBy={sortConfig.key}
            sortDirection={sortConfig.direction}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            onSort={handleSort}
            onEdit={handleOpenDialog}
            onDelete={handleOpenDeleteConfirm}
          />
        </CardContent>
      </Card>

      <GerbangFormDialog
        open={openDialog}
        editingGerbang={editingGerbang}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
      />

      <DeleteConfirmDialog
        open={deleteConfirmOpen}
        gerbang={gerbangToDelete}
        isDeleting={deleteMutation.isPending}
        onClose={handleCloseDeleteConfirm}
        onConfirm={handleDelete}
      />
    </Box>
  );
}
