import React from "react";

import Link from "next/link";

// Para detectar páginas
import {useRouter} from "next/router";

const MenuNavSucursal = () => {
    const router = useRouter();
    console.log(router.pathname);
    return (
        <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sh:min-h-screen p-5">
            <div>
                <p className="text-white text-2xl font-black">CRM - Sucursales</p>
            </div>
            <nav className="mp-5 list-none">

                <li className={router.pathname ==="/sucursales/obtenersucursales" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/sucursales/obtenersucursales">
                        <a className="text-white block">
                            Listar Sucursales
                        </a>
                    </Link>
                </li>

                <li className={router.pathname ==="/sucursales/nuevasucursal" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/sucursales/nuevasucursal">
                        <a className="text-white block">
                            Nueva Sucursal
                        </a>
                    </Link>
                </li>

                <li className={router.pathname ==="/sucursales/modificarsucursal" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/sucursales/modificarsucursal">
                        <a className="text-white block">
                            Modificar Sucursal
                        </a>
                    </Link>
                </li>

                <li className={router.pathname ==="/sucursales/eliminarsucursal" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/sucursales/eliminarsucursal">
                        <a className="text-white block">
                            Eliminar Sucursal
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
export default MenuNavSucursal;