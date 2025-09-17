// CardChartDetaild.tsx
import { Card } from "./ui/card";
import { ChartAreaLinear } from "./chart-area-linear";

export default function CardChartDetaild() {
  return (
    <Card className="@container/card h-[215px]">
      {" "}
      {/* FIXED HEIGHT for both cards */}
      <ChartAreaLinear />
    </Card>
  );
}
