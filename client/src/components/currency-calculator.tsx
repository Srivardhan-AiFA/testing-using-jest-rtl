import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CurrencyCalculator() {
  return (
    <div className="h-full">
      <div>
        <div className="p-4">
          <h6 className="text-sm font-semibold mb-2">Currency Calculator</h6>
          <span className="text-xs text-gray-500 font-semibold">
            1,87 BTC equals
          </span>
          <p className="text-blue-800 font-bold text-2xl mt-1">11466.78 USD</p>
          <p className="text-xs text-gray-500">@ 1 BTC - 6718.72 USD</p>
        </div>
        <div className="flex gap-2 justify-around mt-5">
          <Input
            type="text"
            className="max-w-26 outline-0"
            placeholder="From"
          />
          <Input type="text" className="max-w-26 outline-0" placeholder="To" />
          <Input
            type="text"
            className="max-w-26 outline-0"
            placeholder="Amount"
          />
        </div>
        <Button
          variant="default"
          className="bg-blue-900 rounded-sm mt-3 ml-2 text-xs cursor-pointer hover:bg-blue-800"
        >
          Calculate
        </Button>
      </div>
    </div>
  );
}
