"use client";

import { Stack, Card, CardContent, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

type PieDataItem = {
  id: number;
  value: number;
  label: string;
};

type PieChartCardProps = {
  title: string;
  data: PieDataItem[];
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
  showLegend?: boolean;
};

export function PieChartCard({
  title,
  data,
  height = 300,
  innerRadius = 60,
  outerRadius = 100,
  showLegend = true,
}: PieChartCardProps) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight={500} sx={{ mb: 2 }}>
          {title}
        </Typography>
        <PieChart
          series={[
            {
              data,
              innerRadius,
              outerRadius,
              paddingAngle: 2,
              cornerRadius: 5,
            },
          ]}
          height={height}
        />
        {showLegend && (
          <Stack spacing={0.5} sx={{ mt: 2 }}>
            {data.map((item) => (
              <Stack
                key={item.id}
                direction="row"
                justifyContent="space-between"
              >
                <Typography variant="body2">{item.label}</Typography>
                <Typography variant="body2" fontWeight={500}>
                  {item.value}%
                </Typography>
              </Stack>
            ))}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}
