import MenuCryptoNews from "./menu-crypto-news";
import { Search } from "lucide-react";

export default function CryptoNews() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h6 className="font-semibold">Crypto News</h6>
        <MenuCryptoNews />
        <Search size={15} className="cursor-pointer" />
      </div>
      <div className="flex gap-8 mt-10">
        <div className="h-26 min-w-43 rounded-md bg-gray-700"></div>
        <div>
          <h5 className="font-semibold">
            10 Things you must know before trading in crypto currency
          </h5>
          <p className="mt-4 text-sm text-gray-600">
            Before trading cryptocurrency, you must understand its volatility
            and inherent risks, as it's not insured like traditional securities
            and can lead to significant losses. You should develop a solid
            trading strategy, focus on well-researched, reputable
            cryptocurrencies, and secure your digital assets with a reliable
            wallet and strong private key security. Always practice risk
            management by investing only what you can afford to lose and be
            prepared to stay disciplined and patient, avoiding impulsive
            decisions driven by emotions or the fear of missing out (FOMO).
          </p>
        </div>
      </div>
    </div>
  );
}
