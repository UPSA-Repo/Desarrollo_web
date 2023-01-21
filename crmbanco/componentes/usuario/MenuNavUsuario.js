import React from "react";

import Link from "next/link";

// Para detectar páginas
import {useRouter} from "next/router";

const MenuNavUsuario = () => {
    const router = useRouter();
    console.log(router.pathname);
    return (
        <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sh:min-h-screen p-5">
            <div>
                <p className="text-white text-2xl font-black">CRM - Usuarios</p>
            </div>
            <nav className="mp-5 list-none">

                <li className={router.pathname ==="/usuarios/obtenerusuarios" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/usuarios/obtenerusuarios">
                        <a className="text-white block">
                            Listar Usuarios
                        </a>
                    </Link>
                </li>

                <li className={router.pathname ==="/usuarios/nuevousuario" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/usuarios/nuevousuario">
                        <a className="text-white block">
                            Nuevo Usuario
                        </a>
                    </Link>
                </li>

                <li className={router.pathname ==="/usuarios/authusuario" ? "bg-blue-800 p-2" : "p-2"}>
                    <Link href="/usuarios/authusuario">
                        <a className="text-white block">
                            Iniciar Sesión
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
export default MenuNavUsuario;