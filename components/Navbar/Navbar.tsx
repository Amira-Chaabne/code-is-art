import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="text-white h-20 top-0 sticky bg-opacity-60 w-full z-50 flex items-center justify-center backdrop-blur-md text-lg">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link className="text-lg font-bold" href="/">
          Learning Gsap
        </Link>
        <div className="space-x-4 text-base">
          <Link href="/">Text Scroll</Link>
          <Link href="/gallery">Floating Gallery</Link>
        </div>
      </div>
    </nav>
  );
}
