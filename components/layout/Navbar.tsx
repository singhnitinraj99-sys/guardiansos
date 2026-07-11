import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "./MobileSidebar";

interface NavbarProps {
  isAdmin: boolean;
}

export default function Navbar({
  isAdmin,
}: NavbarProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <MobileSidebar isAdmin={isAdmin} />

      <div className="ml-auto">
        <UserButton />
      </div>
    </header>
  );
}