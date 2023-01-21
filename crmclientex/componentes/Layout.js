import React from "react";

//Para modificar el Head de la página en Nextjs se usa lo siguiente
import Head from "next/head";
//e importar Head nos permite agregar cosas en a cabecera. Como por ejemplo: Title, etiquetas META,
//javascript, css, etc.

import MenuNav from "./MenuNav";

//En este componente se van a colocar probablemente casi todos los archivos del directorio "pages",
//se debe agregar lo siguiente en el argumento de manera obligatoria(coloque children - nombre obligatorio).

import {useRouter} from "next/router";

const Layout = ({children}) => {
    const router = useRouter();
    return (
        <>
            <Head>
                <title>CRM - Clientes</title>
                {/*Agregando normalize desde: https://cdnjs.com/libraries/normalize*/}
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
                      integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
                      crossOrigin="anonymous" referrerPolicy="no-referrer"/>
                {/*Agregando Tailwind via CDN desde: https://www.codegrepper.com/code-examples/css/Using+Tailwind+via+CDN*/}
                <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet"/>
            </Head>
            { router.pathname === '/login'  || router.pathname === '/nuevacuenta' ? (
                <div className= 'bg-gray-800 min-h-screen flex flex-col justify-center'>
                    <div>
                        {children}
                    </div>
                </div>
            ) : (
                <div className="bg-gray-200 min-h-screen">
                    <div className="flex min-h-screen">
                        <MenuNav/>
                        <main className="sm:w-2/3 xl:w-4/5 sh:min-h-screen p-5">

                            {children}
                        </main>

                    </div>
                </div>
            ) };

        </>
    );
}
export default Layout;