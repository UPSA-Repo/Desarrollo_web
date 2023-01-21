import React from "react";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";

const DESENCRIPTAR_TOKEN = gql`
    query DesencriptarTokenOficial($token: String) {
        desencriptarTokenOficial(token: $token) {
            id
            nombre
            email
            creado
            bancoId
        }
    }
`;

const Header = () => {
    const router = useRouter();
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    const { data, loading, error } = useQuery(DESENCRIPTAR_TOKEN, {
        variables: {
            token: token
        }
    });

    if(loading) return null;
    if(!data) {
        router.push('/Sesion/login');
        return null;
    }

    console.log(data);
    const { desencriptarTokenOficial } = data;
    const { nombre, bancoId } = desencriptarTokenOficial;

    const CerrarSesion = () => {
        localStorage.removeItem('token');
        router.push('/Sesion/login');
    }

    return (
        <div className="sm:flex sm:justify-between mb-6">
            <h1 className="text-2xl text-gray-800 font-light">ID Banco: { bancoId }</h1>
            <h2 className="text-2xl text-gray-800 font-light">Bienvenido { nombre }!</h2>
            <button type="button" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-4 rounded"
            onClick={ CerrarSesion }
            >Cerrar sesion</button>
        </div>
    );
};

export default Header;