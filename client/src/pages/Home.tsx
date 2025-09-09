import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <Link to="/signup">
        <Button className="cursor-pointer">signup</Button>
      </Link>
      <Link to="/signin">
        <Button className="cursor-pointer">signin</Button>
      </Link>
    </div>
  );
}
