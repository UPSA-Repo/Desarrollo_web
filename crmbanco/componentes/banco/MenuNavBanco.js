import React from "react";

import Link from "next/link";

// Para detectar páginas
import {useRouter} from "next/router";

const MenuNavBanco = () => {
    const router = useRouter();
    console.log(router.pathname);
    return (
        <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sh:min-h-screen p-5">
            <div>
                <p className="text-white text-2xl font-black">CRM - Bancos</p>
            </div>
            <nav className="mp-5 list-none">

                <li className={router.pathname ==="/bancos/obtenerbancos" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/bancos/obtenerbancos">
                        <a className="text-white block">
                            Listar Bancos
                        </a>
                    </Link>
                </li>

                <li className={router.pathname ==="/bancos/nuevobanco" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/bancos/nuevobanco">
                        <a className="text-white block">
                            Nuevo Banco
                        </a>
                    </Link>
                </li>

                <li className={router.pathname ==="/bancos/modificarbanco" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/bancos/modificarbanco">
                        <a className="text-white block">
                            Modificar Banco
                        </a>
                    </Link>
                </li>
                <li className={router.pathname ==="/bancos/eliminarbanco" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/bancos/eliminarbanco">
                        <a className="text-white block">
                            Eliminar Banco
                        </a>
                    </Link>
                </li>
                <li className={router.pathname ==="/" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/">
                        <a className="text-white block">
                            Volver
                        </a>
                    </Link>
                </li>

            </nav>
        </aside>
    )
}
export default MenuNavBanco;