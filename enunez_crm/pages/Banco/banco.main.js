import React, { useState } from "react";
import Layout from "../../componentes/Layout";
import { useRouter } from "next/router";
import Router from "next/router";
import {gql, useMutation, useQuery} from "@apollo/client";
import Link from "next/link";
import Banco from "../../componentes/Banco";

const OBTENER_BANCOS = gql`
    query ObtenerBancos {
        obtenerBancos {
            id
            nombre
        }
    }
`;

const ELIMINAR_BANCO = gql`
    mutation EliminarBanco($eliminarBancoId: ID!) {
        eliminarBanco(id: $eliminarBancoId)
    }
`;

const BancoMain = () => {
    const { data, loading } = useQuery(OBTENER_BANCOS);
    const [ eliminarBanco ] = useMutation(ELIMINAR_BANCO);

    if(loading) {
        return (
            <p>Obteniendo datos</p>
        );
    }

    function eliminarBancoId(id) {
        eliminarBanco({
            variables: {
                eliminarBancoId: id
            }
        }).then(() => {
            document.location.reload();
        });
    }

    return (
        <>
            <Layout>
                <h1 className="text-2xl text-gray-800 font-light">Bancos</h1>
                <div className="p-8">
                    <table className="table-auto border">
                        <thead>
                        <tr>
                            <th className="font-bold p-2 border-b border-l text-left">Nombre</th>
                            <th className="font-bold p-2 border-b border-l text-left">Opciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            data.obtenerBancos.map( banco => (
                                <tr key={banco.id}>
                                    <td className="p-2 border-b border-l text-left">{banco.nombre}</td>
                                    <td className="p-2 border-b border-l text-left">
                                        <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 rounded"
                                        onClick={ () => {
                                            let id = banco.id;
                                            Router.push({
                                                pathname: '/Banco/[id]',
                                                query: {id}
                                            })
                                        }
                                        }>Editar</button>
                                        <button type="button" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-4 rounded"
                                        onClick={()=>{ eliminarBancoId(banco.id) }}>Eliminar</button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                    <Link href='./banco.nuevo'>
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 m-4 rounded" type="button">
                            Nuevo banco
                        </button>
                    </Link>
                </div>
            </Layout>
        </>
    );
};

export default BancoMain;