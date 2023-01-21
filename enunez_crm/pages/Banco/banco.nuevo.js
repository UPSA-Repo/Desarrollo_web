import React, { useState } from "react";
import Layout from "../../componentes/Layout";
import { gql, useQuery, useMutation } from "@apollo/client";

const NUEVO_BANCO = gql`
    mutation NuevoBanco($input: BancoInput) {
        nuevoBanco(input: $input) {
            id
            nombre
        }
    }
`;

const BancoNuevo = () => {
    let input;
    const [nuevoBanco, { loading, error } ] = useMutation(NUEVO_BANCO);
    if(loading) return 'Submiting...';
    if(error) return `Submission error: ${ error.message }`;

    function onClickInput() {
        input = document.getElementById('inputName').value;
        window.location.href = document.referrer;
    }

    return (
        <>
            <Layout>
                <h1 className="text-2xl text-gray-800 font-light">Nuevo banco</h1>
                <div className="p-8">
                    <form className="w-full max-w-sm" onSubmit={ event => {
                        event.preventDefault();
                        nuevoBanco({
                            variables: {
                                input: {
                                    nombre: input
                                }
                            }
                        });
                    }}>
                        <div className="flex items-center border-b border-gray-800 py-2">
                            <input
                                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                type="text" placeholder="Nombre del banco" aria-label="Full name" id='inputName'
                            />
                            <button
                                className="flex-shrink-0 bg-gray-500 hover:bg-gray-800 border-gray-500 hover:border-gray-700 text-sm border-4 text-white py-1 px-2 rounded"
                                type="submit" onClick={onClickInput}>
                                Crear
                            </button>
                            <button
                                className="flex-shrink-0 border-transparent border-4 text-gray-500 hover:text-gray-800 text-sm py-1 px-2 rounded"
                                type="button">
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </Layout>
        </>
    );
};

export default BancoNuevo;