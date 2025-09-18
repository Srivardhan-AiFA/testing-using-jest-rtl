import { CreditCard } from "lucide-react";
import { Button } from "./ui/button";

export default function RefferToFriends() {
  return (
    <div>
      <div className="flex justify-center">
        <CreditCard size={60} className="text-gray-200 mb-3" />
      </div>
      <div className="flex items-center flex-col">
        <h6 className="mb-5 text-lg font-semibold text-gray-200">
          Refer and Get Reward
        </h6>
        <p className="mb-5 text-center text-xs max-w-3/5 font-semibold text-gray-200">
          Refer us to your friends and earn bonus when they join.
        </p>
        <Button
          variant="default"
          className="bg-orange-400 rounded-xs mt-3 text-xs cursor-pointer hover:bg-orange-400"
        >
          Invite Friends
        </Button>
      </div>
    </div>
  );
}
