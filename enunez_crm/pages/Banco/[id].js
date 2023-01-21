import React, {useEffect, useState} from "react";
import {gql, useMutation, useQuery} from "@apollo/client";
import Router, {useRouter} from "next/router";
import Layout from "../../componentes/Layout";

const OBTENER_BANCO_ID = gql`
    query ObtenerBancoId($obtenerBancoIdId: ID!) {
        obtenerBancoId(id: $obtenerBancoIdId) {
            id
            nombre
        }
    }
`;

const ACTUALIZAR_BANCO = gql`
    mutation ActualizarBanco($actualizarBancoId: ID!, $input: BancoInput) {
        actualizarBanco(id: $actualizarBancoId, input: $input) {
            id
            nombre
        }
    }
`;

const EditarBanco = () => {
    let input;
    const router = useRouter();
    const { query: { id } } = router;
    const { data, loading } = useQuery(OBTENER_BANCO_ID, {
        variables: {
            obtenerBancoIdId: id
        }
    });
    const [ actualizarBanco, {} ] = useMutation(ACTUALIZAR_BANCO);

    function onClickUpdate() {
        input = document.getElementById("updateName").value;
        history.back();
    }

    if(loading) return 'Loading...';
    else return (
        <>
            <Layout>
                <h1 className="text-2xl text-gray-800 font-light">ID_Banco: { id } Nombre anterior: { data.obtenerBancoId.nombre }</h1>

                <form className="w-full max-w-sm" onSubmit={ event => {
                    event.preventDefault();
                    actualizarBanco({
                        variables: {
                            actualizarBancoId: id,
                            input: {
                                nombre: input
                            }
                        }
                    });
                }}>
                    <div className="flex items-center border-b border-gray-800 py-2">
                        <input
                            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                            type="text" placeholder="Nombre del banco" aria-label="Full name" id="updateName"
                        />
                        <button
                            className="flex-shrink-0 bg-gray-500 hover:bg-gray-800 border-gray-500 hover:border-gray-700 text-sm border-4 text-white py-1 px-2 rounded"
                            type="submit" onClick={onClickUpdate}>
                            Actualizar
                        </button>
                        <button
                            className="flex-shrink-0 border-transparent border-4 text-gray-500 hover:text-gray-800 text-sm py-1 px-2 rounded"
                            type="button">
                            Cancelar
                        </button>
                    </div>
                </form>
            </Layout>
        </>
    )
};

export default EditarBanco;