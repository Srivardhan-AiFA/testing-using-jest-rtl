import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PlusCircle } from "lucide-react";
import SearchUser from "./search-user";
export default function AddNewTranasction() {
  return (
    <div>
      <Sheet>
        <SheetTrigger className="cursor-pointer flex items-center gap-0.5 text-blue-600">
          <PlusCircle size={15} />{" "}
          <p className="text-xs">Create a new tranasction</p>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Create tranasction</SheetTitle>
            <SheetDescription>
              This will create a new tranasction
            </SheetDescription>
          </SheetHeader>
          <div>
            <SearchUser />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
