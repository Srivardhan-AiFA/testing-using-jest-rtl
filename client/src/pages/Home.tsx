import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <header className="flex justify-around py-5 items-center">
        <div>
          <h2 className="outfit flex items-center">
            NoTELY
            {/* <StickyNote size={15} className="ml-1" /> */}
          </h2>
        </div>
        <div>
          <Link
            to="http://localhost:3000/auth/google/"
            className="flex items-center rounded-sm px-5 py-2 text-gray-100 font-semibold text-xs bg-[#ea4335] cursor-pointer hover:bg-[#f05b4d]"
          >
            Signin <ArrowRight size={15} className="ml-2" />
          </Link>
        </div>
      </header>
      <main>
        <div>
          <h1 className="outfit text-9xl text-center mt-20 font-semibold">
            Notely
          </h1>
          <p className="text-center w-1/3 mx-auto mt-10 text-sm inter">
            Notely is your go-to minimal note-taking app designed for seamless
            productivity. With a clean interface and intuitive features, jot
            down your ideas and organize your notes like never before.
          </p>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}
