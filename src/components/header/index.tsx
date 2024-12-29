import Link from "next/link";
import { FiUser, FiLogOut } from "react-icons/fi";

export const Header = () => {
    return (
        <header className="w-full flex items-center px-2 py-4 bg-white h-20 shadow-md">
            <div className="w-full flex items-center justify-between max-w-7xl mx-auto">
                <Link href="/">
                    <h1 className="text-blue-500 font-bold text-2xl pl-1 hover:tracking-widest duration-300">CONTROLE</h1>
                </Link>

                <div className="flex items-center gap-4">
                    <Link href='/dashboard'>
                        <FiUser size={26} color="#4b5563" />
                    </Link>
                    <button>
                        <FiLogOut size={26} color="#4b5563" />
                    </button>
                </div>
            </div>
        </header>
    );
}
