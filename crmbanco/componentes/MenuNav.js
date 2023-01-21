import React from "react";

import Link from "next/link";

// Para detectar páginas
import {useRouter} from "next/router";

const MenuNav = () => {
    const router = useRouter();
    console.log(router.pathname);
    return (
        <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sh:min-h-screen p-5">
            <div>
                <p className="text-white text-2xl font-black">CRM - Proyecto</p>
            </div>
            <nav className="mp-5 list-none">

                <li className={router.pathname ==="/usuarios/obtenerusuarios" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/usuarios/obtenerusuarios">
                        <a className="text-white block">
                            Usuarios
                        </a>
                    </Link>
                </li>

                <li className={router.pathname ==="/clientes/obtenerclientes" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/clientes/obtenerclientes">
                        <a className="text-white block">
                            Clientes
                        </a>
                    </Link>
                </li>

                <li className={router.pathname ==="/bancos/obtenerbancos" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/bancos/obtenerbancos">
                        <a className="text-white block">
                            Bancos
                        </a>
                    </Link>
                </li>

                <li className={router.pathname ==="/sucursales/obtenersucursales" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/sucursales/obtenersucursales">
                        <a className="text-white block">
                            Sucursales
                        </a>
                    </Link>
                </li>

                <li className={router.pathname ==="/cuentas/obtenercuentas" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/cuentas/obtenercuentas">
                        <a className="text-white block">
                            Cuentas
                        </a>
                    </Link>
                </li>

                <li className={router.pathname ==="/transferencias/obtenertransferencias" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/transferencias/obtenertransferencias">
                        <a className="text-white block">
                            Transferencias
                        </a>
                    </Link>
                </li>

                <li className={router.pathname ==="/ahorros/obtenerahorros" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/ahorros/obtenerahorros">
                        <a className="text-white block">
                            Ahorros
                        </a>
                    </Link>
                </li>

            </nav>
        </aside>
    )
}
export default MenuNav;