import React from "react";
import Link from "next/link";
import {useRouter} from "next/router";

const MenuNav = () => {
    const router = useRouter();
    console.log(router.pathname);
    return (
        <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sh:min-h-screen p-5">
            <div>
                <p className="text-white text-2xl font-black">CRM - Clientes</p>
            </div>
            <nav className="mp-5 list-none">
                <li className={router.pathname ==="/" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/">
                        <a className="text-white block">
                            Clientes
                        </a>
                    </Link>
                </li>
                <li className={router.pathname ==="/login" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/login">
                        <a className="text-white block">
                            Logout
                        </a>
                    </Link>
                </li>

                <li className={router.pathname ==="/plazos-fijos" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/plazo_fijo">
                        <a className="text-white block">
                            Plazos fijos
                        </a>
                    </Link>
                </li>
                {/*<li className={router.pathname ==="/pedidos" ? "bg-blue-800 p-2" : "p-2"}>*/}
                {/*    <Link href="/pedidos">*/}
                {/*        <a className="text-white block">*/}
                {/*            Pedidos*/}
                {/*        </a>*/}
                {/*    </Link>*/}
                {/*</li>*/}
            </nav>
        </aside>
    )
}
export default MenuNav;