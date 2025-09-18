import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";

export default function MenuCryptoNews() {
  return (
    <div>
      <Menubar className="border-0">
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarTrigger>Bitcoin</MenubarTrigger>
          <MenubarTrigger>Ripple</MenubarTrigger>
          <MenubarTrigger>Litecoin</MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}
