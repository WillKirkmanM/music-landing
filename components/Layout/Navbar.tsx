import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed w-full top-0 z-50">
      <div className="backdrop-blur-lg bg-white/70 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            <div className="flex-shrink-0">
              <span className="text-black text-xl font-semibold">
                ParsonLabs Music
              </span>
            </div>

            <div>
                <Link href={"https://github.com/WillKirkmanM/music"}>
                    <button className="bg-purple-600 text-white px-6  rounded-full font-semibold text-xs py-1 hover:bg-purple-700 transition-all duration-200 transform hover:scale-105">
                        Get ParsonLabs Music
                    </button>
                </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;