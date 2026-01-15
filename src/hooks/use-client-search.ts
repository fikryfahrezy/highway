"use client";

import { useMemo } from "react";

type UseClientSearchProps<T> = {
  data: T[];
  searchQuery: string;
  searchKeys: (keyof T)[];
};

export function useClientSearch<T extends Record<string, unknown>>({
  data,
  searchQuery,
  searchKeys,
}: UseClientSearchProps<T>): T[] {
  return useMemo(() => {
    if (!searchQuery.trim()) {
      return data;
    }

    const lowerQuery = searchQuery.toLowerCase();

    return data.filter((item) => {
      return searchKeys.some((key) => {
        const value = item[key];

        if (value == null) {
          return false;
        }

        return String(value).toLowerCase().includes(lowerQuery);
      });
    });
  }, [data, searchQuery, searchKeys]);
}
