import React from "react";
import Link from "next/link";
import {useRouter} from "next/router";

const Sidebar = () => {
    const router = useRouter()
    return (
        <aside className="bg-gray-700 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
            <div>
                <p className="text-white text-2xl font-black text-center"> MANAGE </p>
            </div>

            <nav className="mt-5 list-none text-center">
                <li className={router.pathname === '/' ? "bg-blue-700 p-2" : "p-2"}>
                    <Link href="/">
                        <a className="text-white font-bold mb-1 block">
                            CLIENTS
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === '/transactions' ? "bg-orange-700 p-2" : "p-2"}>
                    <Link href="/transactions">
                        <a className="text-white font-bold mb-1 block">
                            TRANSACTION
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === '/deposit' ? "bg-green-700 p-2" : "p-2"}>
                    <Link href="/deposit">
                        <a className="text-white font-bold mb-1 block">
                            DEPOSIT
                        </a>
                    </Link>
                </li>
            </nav>

        </aside>
    )
}

export default Sidebar