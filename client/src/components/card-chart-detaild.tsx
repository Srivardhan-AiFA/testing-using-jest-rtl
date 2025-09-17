import { ChevronUp, PlusCircle } from "lucide-react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";

export default function CardChartHistory() {
  return (
    <div>
      <Card className="@container/card ">
        <div className="flex">
          <div>
            <CardHeader className="w-fit">
              <CardDescription className="text-gray-700 font-semibold">
                Your Portfolio Balance
              </CardDescription>
              <div className="flex items-center">
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-2xl">
                  $1,250.00
                </CardTitle>
                <div className="text-green-600 ml-2 font-semibold flex text-xs">
                  64%
                  <ChevronUp size={13} />
                </div>
              </div>
              <span className="text-xs text-gray-500">Overall balance</span>
              <div className="flex gap-2">
                <Button
                  variant="default"
                  className="bg-blue-900 rounded-xs text-xs cursor-pointer hover:bg-blue-800"
                >
                  Deposit
                </Button>
                <Button
                  variant="default"
                  className="bg-orange-500 rounded-xs text-xs cursor-pointer hover:bg-orange-400"
                >
                  Withdraw
                </Button>
              </div>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 mt-5 text-sm">
              <div className="line-clamp-1 flex gap-1 font-medium items-center text-blue-900 cursor-pointer">
                <PlusCircle size={15} className="mb-0.5" />{" "}
                <p>Add New Wallet</p>
              </div>
            </CardFooter>
          </div>
          <div className="mt-10 ml-20 max-w-1/2 w-full">
            <CardDescription>Portfolio Distribution</CardDescription>
            <div className="flex flex-col gap-2">
              <div className="text-xs text-gray-600 mt-3">
                <p className="mb-1">BTC | 8.74</p>
                <Progress value={78} />
              </div>
              <div className="text-xs text-gray-600">
                <p className="mb-1">RPL | 1.23</p>
                <Progress value={18} />
              </div>
              <div className="text-xs text-gray-600">
                <p className="mb-1">LTE | 0.71</p>
                <Progress value={4} />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
