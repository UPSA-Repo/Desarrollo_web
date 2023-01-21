import React from "react";

import Link from "next/link";

// Para detectar páginas
import {useRouter} from "next/router";

const MenuNavTransferencia = () => {
    const router = useRouter();
    console.log(router.pathname);
    return (
        <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sh:min-h-screen p-5">
            <div>
                <p className="text-white text-2xl font-black">CRM - Transferencias</p>
            </div>
            <nav className="mp-5 list-none">

                <li className={router.pathname ==="/transferencias/obtenertransferencias" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/transferencias/obtenertransferencias">
                        <a className="text-white block">
                            Listar Transferencias
                        </a>
                    </Link>
                </li>

                <li className={router.pathname ==="/transferencias/nuevatransferencia" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/transferencias/nuevatransferencia">
                        <a className="text-white block">
                            Transferir
                        </a>
                    </Link>
                </li>

                <li className={router.pathname ==="/transferencias/revertirtransferencia" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/transferencias/revertirtransferencia">
                        <a className="text-white block">
                            Revertir Transferencia
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
export default MenuNavTransferencia;