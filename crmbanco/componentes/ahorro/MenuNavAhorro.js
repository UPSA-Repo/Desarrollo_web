import React from "react";

import Link from "next/link";

// Para detectar páginas
import {useRouter} from "next/router";

const MenuNavAhorro = () => {
    const router = useRouter();
    console.log(router.pathname);
    return (
        <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sh:min-h-screen p-5">
            <div>
                <p className="text-white text-2xl font-black">CRM - Ahorros</p>
            </div>
            <nav className="mp-5 list-none">

                <li className={router.pathname ==="/ahorros/obtenerahorros" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/ahorros/obtenerahorros">
                        <a className="text-white block">
                            Listar Ahorros
                        </a>
                    </Link>
                </li>

                <li className={router.pathname ==="/ahorros/nuevoahorro" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/ahorros/nuevoahorro">
                        <a className="text-white block">
                            Nuevo Ahorro
                        </a>
                    </Link>
                </li>

                <li className={router.pathname ==="/ahorros/modificarahorro" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/ahorros/modificarahorro">
                        <a className="text-white block">
                            Modificar Ahorro
                        </a>
                    </Link>
                </li>

                <li className={router.pathname ==="/ahorros/eliminarahorro" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/ahorros/eliminarahorro">
                        <a className="text-white block">
                            Eliminar Ahorro
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
export default MenuNavAhorro