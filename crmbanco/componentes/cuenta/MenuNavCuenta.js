import React from "react";

import Link from "next/link";

// Para detectar páginas
import {useRouter} from "next/router";

const MenuNavCuenta = () => {
    const router = useRouter();
    console.log(router.pathname);
    return (
        <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sh:min-h-screen p-5">
            <div>
                <p className="text-white text-2xl font-black">CRM - Cuentas</p>
            </div>
            <nav className="mp-5 list-none">

                <li className={router.pathname ==="/cuentas/obtenercuentas" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/cuentas/obtenercuentas">
                        <a className="text-white block">
                            Listar Cuentas
                        </a>
                    </Link>
                </li>

                <li className={router.pathname ==="/cuentas/nuevacuenta" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/cuentas/nuevacuenta">
                        <a className="text-white block">
                            Nueva Cuenta
                        </a>
                    </Link>
                </li>

                <li className={router.pathname ==="/cuentas/modificarcuenta" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/cuentas/modificarcuenta">
                        <a className="text-white block">
                            Modificar Cuenta
                        </a>
                    </Link>
                </li>
                <li className={router.pathname ==="/cuentas/eliminarcuenta" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/cuentas/eliminarcuenta">
                        <a className="text-white block">
                            Eliminar Cuenta
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
export default MenuNavCuenta;