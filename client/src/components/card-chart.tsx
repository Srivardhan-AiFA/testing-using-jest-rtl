import { ChevronUp } from "lucide-react";
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { ChartAreaDefault } from "./chart-area-default";

export type ChartData = {
  month: string;
  desktop: number;
};

type ChartAreaDefaultProps = {
  chartData: ChartData[];
};
export default function CardChart({ chartData }: ChartAreaDefaultProps) {
  return (
    <div>
      <Card className="@container/card py-0">
        <CardHeader>
          <div className="flex items-center mt-5">
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-2xl">
              $1,250.00
            </CardTitle>
            <div className="text-green-600 ml-2 font-semibold flex text-xs">
              64%
              <ChevronUp size={13} />
            </div>
          </div>
        </CardHeader>
        <CardFooter className="px-0 w-full">
          <ChartAreaDefault chartData={chartData} />
        </CardFooter>
      </Card>
    </div>
  );
}
