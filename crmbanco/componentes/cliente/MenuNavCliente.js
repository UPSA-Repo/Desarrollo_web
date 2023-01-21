import React from "react";

import Link from "next/link";

// Para detectar páginas
import {useRouter} from "next/router";

const MenuNavCliente = () => {
    const router = useRouter();
    console.log(router.pathname);
    return (
        <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sh:min-h-screen p-5">
            <div>
                <p className="text-white text-2xl font-black">CRM - Clientes</p>
            </div>
            <nav className="mp-5 list-none">

                <li className={router.pathname ==="/clientes/obtenerclientes" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/clientes/obtenerclientes">
                        <a className="text-white block">
                            Listar Clientes
                        </a>
                    </Link>
                </li>

                <li className={router.pathname ==="/clientes/nuevocliente" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/clientes/nuevocliente">
                        <a className="text-white block">
                            Nuevo Cliente
                        </a>
                    </Link>
                </li>

                <li className={router.pathname ==="/clientes/modificarcliente" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/clientes/modificarcliente">
                        <a className="text-white block">
                            Modificar Cliente
                        </a>
                    </Link>
                </li>

                <li className={router.pathname ==="/clientes/eliminarcliente" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/clientes/eliminarcliente">
                        <a className="text-white block">
                            Eliminar Cliente
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
export default MenuNavCliente