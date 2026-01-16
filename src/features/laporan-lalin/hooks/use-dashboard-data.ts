import { useMemo } from "react";
import type { GetLalinsResponse } from "@/services/highway-service.types";

type PieDataItem = {
  id: number;
  value: number;
  label: string;
};

type GerbangDataItem = {
  label: string;
  value: number;
};

type PaymentMethodDataItem = {
  label: string;
  value: number;
};

type UseDashboardDataParams = {
  lalinsData: GetLalinsResponse | undefined;
  searchQuery?: string;
};

type DashboardData = {
  paymentMethodData: PaymentMethodDataItem[];
  gerbangData: GerbangDataItem[];
  shiftData: PieDataItem[];
  ruasData: PieDataItem[];
};

export function useDashboardData({
  lalinsData,
  searchQuery = "",
}: UseDashboardDataParams): DashboardData {
  return useMemo(() => {
    if (
      !lalinsData?.data?.rows?.rows ||
      lalinsData.data.rows.rows.length === 0
    ) {
      return {
        paymentMethodData: [],
        gerbangData: [],
        shiftData: [],
        ruasData: [],
      };
    }

    // Filter lalin data based on search query before aggregation
    const lalins = lalinsData.data.rows.rows.filter((lalin) => {
      if (!searchQuery) return true;

      const query = searchQuery.toLowerCase();
      const ruas = `ruas ${lalin.IdCabang}`.toLowerCase();
      const gerbang = `gerbang ${lalin.IdGerbang}`.toLowerCase();
      const gardu = String(lalin.IdGardu).padStart(2, "0");

      return (
        ruas.includes(query) ||
        gerbang.includes(query) ||
        gardu.includes(query) ||
        String(lalin.IdCabang).includes(query) ||
        String(lalin.IdGerbang).includes(query) ||
        String(lalin.IdGardu).includes(query)
      );
    });

    const paymentMethodMap = new Map<string, number>();
    const gerbangMap = new Map<number, number>();
    const shiftMap = new Map<number, number>();
    const ruasMap = new Map<number, number>();

    lalins.forEach((lalin) => {
      paymentMethodMap.set("BCA", (paymentMethodMap.get("BCA") || 0) + lalin.eBca);
      paymentMethodMap.set("BRI", (paymentMethodMap.get("BRI") || 0) + lalin.eBri);
      paymentMethodMap.set("BNI", (paymentMethodMap.get("BNI") || 0) + lalin.eBni);
      paymentMethodMap.set("DKI", (paymentMethodMap.get("DKI") || 0) + lalin.eDKI);
      paymentMethodMap.set(
        "Mandiri",
        (paymentMethodMap.get("Mandiri") || 0) + lalin.eMandiri,
      );
      paymentMethodMap.set("Mega", (paymentMethodMap.get("Mega") || 0) + lalin.eMega);
      paymentMethodMap.set("Flo", (paymentMethodMap.get("Flo") || 0) + lalin.eFlo);

      const ktpPayment = lalin.DinasOpr + lalin.DinasMitra + lalin.DinasKary
      paymentMethodMap.set("KTP", (paymentMethodMap.get("KTP") || 0) + ktpPayment);

      gerbangMap.set(
        lalin.IdGerbang,
        (gerbangMap.get(lalin.IdGerbang) || 0) + 1,
      );

      shiftMap.set(lalin.Shift, (shiftMap.get(lalin.Shift) || 0) + 1);

      ruasMap.set(lalin.IdCabang, (ruasMap.get(lalin.IdCabang) || 0) + 1);
    });

    const paymentMethodDataArray = Array.from(paymentMethodMap.entries()).map(
      ([label, value]) => ({ label, value }),
    );

    const gerbangDataArray = Array.from(gerbangMap.entries())
      .slice(0, 5)
      .map(([id, value]) => ({ label: `Gerbang ${id}`, value }));

    const shiftTotal = Array.from(shiftMap.values()).reduce(
      (a, b) => a + b,
      0,
    );
    const shiftDataArray = Array.from(shiftMap.entries()).map(
      ([id, value]) => ({
        id,
        value: shiftTotal > 0 ? Math.round((value / shiftTotal) * 100) : 0,
        label: `Shift ${id}`,
      }),
    );

    const ruasTotal = Array.from(ruasMap.values()).reduce((a, b) => a + b, 0);
    const ruasDataArray = Array.from(ruasMap.entries()).map(([id, value]) => ({
      id,
      value: ruasTotal > 0 ? Math.round((value / ruasTotal) * 100) : 0,
      label: `Ruas ${id}`,
    }));

    return {
      paymentMethodData: paymentMethodDataArray,
      gerbangData: gerbangDataArray,
      shiftData: shiftDataArray,
      ruasData: ruasDataArray,
    };
  }, [lalinsData, searchQuery]);
}
