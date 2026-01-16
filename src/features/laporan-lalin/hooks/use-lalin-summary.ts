import { useMemo } from "react";
import type { LalinRow, RuasSummary } from "../types";

type UseLalinSummaryParams = {
  paginatedRows: LalinRow[];
};

export function useLalinSummary({
  paginatedRows,
}: UseLalinSummaryParams) {
  const summaryByRuas = useMemo(() => {
    const summary: Record<string, RuasSummary> = {};

    paginatedRows.forEach((row) => {
      if (!summary[row.ruas]) {
        summary[row.ruas] = {
          golI: 0,
          golII: 0,
          golIII: 0,
          golIV: 0,
          golV: 0,
          totalLalin: 0,
        };
      }

      summary[row.ruas].golI += row.golI;
      summary[row.ruas].golII += row.golII;
      summary[row.ruas].golIII += row.golIII;
      summary[row.ruas].golIV += row.golIV;
      summary[row.ruas].golV += row.golV;
      summary[row.ruas].totalLalin += row.totalLalin;
    });

    return summary;
  }, [paginatedRows]);

  const grandTotal = useMemo(() => {
    return Object.values(summaryByRuas).reduce(
      (acc, curr) => {
        return {
          golI: acc.golI + curr.golI,
          golII: acc.golII + curr.golII,
          golIII: acc.golIII + curr.golIII,
          golIV: acc.golIV + curr.golIV,
          golV: acc.golV + curr.golV,
          totalLalin: acc.totalLalin + curr.totalLalin,
        };
      },
      {
        golI: 0,
        golII: 0,
        golIII: 0,
        golIV: 0,
        golV: 0,
        totalLalin: 0,
      },
    );
  }, [summaryByRuas]);

  return {
    summaryByRuas,
    grandTotal,
  };
}
