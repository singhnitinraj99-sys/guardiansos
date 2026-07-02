import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "./MobileSidebar";


export default function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <MobileSidebar />

      <div className="ml-auto">
        <UserButton />
      </div>
    </header>
  );
}