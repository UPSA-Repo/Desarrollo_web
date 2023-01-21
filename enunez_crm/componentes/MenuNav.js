import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const MenuNav = () => {
    const router = useRouter();

    return (
        <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sh:min-h-screen p-5">
            <div>
                <p className="text-white text-2xl font-black">ENC - CRM</p>
            </div>

            <nav className="mp-5 list-none">
                <li className={router.pathname ==="/" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/">
                        <a className="text-white block">
                            Clientes
                        </a>
                    </Link>
                </li>
                <li className={router.pathname ==="/banco" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/Banco/banco.main">
                        <a className="text-white block">
                            Bancos
                        </a>
                    </Link>
                </li>
                <li className={router.pathname ==="/cuenta" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/cuenta">
                        <a className="text-white block">
                            Cuentas
                        </a>
                    </Link>
                </li>
                <li className={router.pathname ==="/plazo-fijo" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/plazo-fijo">
                        <a className="text-white block">
                            Deposito a plazo fijo
                        </a>
                    </Link>
                </li>
                <li className={router.pathname ==="/sucursales" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/sucursales">
                        <a className="text-white block">
                            Sucursales
                        </a>
                    </Link>
                </li>
                <li className={router.pathname ==="/transferencias" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/transferencias">
                        <a className="text-white block">
                            Transferencias
                        </a>
                    </Link>
                </li>
                <li className={router.pathname ==="/signin" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/Sesion/signin">
                        <a className="text-white block">
                            Signin
                        </a>
                    </Link>
                </li>
            </nav>
        </aside>
    );
};

export default MenuNav;