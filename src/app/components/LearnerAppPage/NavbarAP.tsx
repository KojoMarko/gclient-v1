import Link from "next/link";

const NavbarAP = () => {
  return (
    <nav className="flex w-full bg-white box-border gap-6 items-center px-4 pt-10">
      <Link href="/LearnerPage" className="text-black text-[16px] font-inter">Applications</Link>
      <Link href="/ProfilePage" className="text-[#808080] text-[16px] font-inter">Profile</Link>
    </nav>
  );
};

export default NavbarAP;
