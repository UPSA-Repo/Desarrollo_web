import React, {useState} from "react"
import { useRouter} from "next/router" //Para redirigir en este cas al Login una vez que se cree correctamente el usuario.
import {useFormik} from "formik"
import * as Yup from 'yup'
import {useMutation, gql} from "@apollo/client"
import LayoutTransferencia from "../../componentes/transferencia/LayoutTransferencia";

const Nueva_Transferencia = gql `
    mutation Transferir($input: TransferenciaInput) {
      transferir(input: $input) {
        id
        cuentaOrigenId
        cuentaDestinoId
        monto
      }
    }
`

const Obtener_Transferencias = gql `
    query ObtenerTransferencias {
      obtenerTransferencias {
        id
        cuentaOrigenId
        cuentaDestinoId
        monto
      }
    }
`

const NuevaTransferencia = () => {

    const [mensaje, guardarMensaje] = useState(null)

    const [ nuevaTransferencia ] = useMutation(Nueva_Transferencia,{
        update(cache,{data:{nuevaTransferencia}}){
            const {obtenerTransferencias} = cache.readQuery({query:Obtener_Transferencias})
            cache.writeQuery({query:Obtener_Transferencias, data:{obtenerTransferencias:[... obtenerTransferencias, nuevaTransferencia]}})
        }
    })

    const router = useRouter()

    const formik = useFormik({

        initialValues: {
            cuentaOrigenId: '',
            cuentaDestinoId: '',
            monto: 0
        },

        validationSchema: Yup.object ({
            cuentaOrigenId: Yup.string()
                .required('El Id Cuenta Origen es requerido.'),
            cuentaDestinoId: Yup.string()
                .required('El Id Cuenta Destino es requerido.'),
            monto: Yup.string()
                .required('El Monto es requerido.')
                .matches(/^[0-9]+([.][0-9]+)?$/,'No se aceptan letras')
        }),

        onSubmit: async valores => {

            let { cuentaOrigenId, cuentaDestinoId, monto } = valores

            monto = parseFloat(monto)

            try {

                const { data } = await nuevaTransferencia({
                    variables: {
                        input: {
                            cuentaOrigenId,
                            cuentaDestinoId,
                            monto
                        }
                    }
                })

                guardarMensaje(`Transferencia exitosa.`)

                setTimeout(()=> {
                    guardarMensaje(null)
                    router.push('/transferencias/obtenertransferencias')
                }, 1000)

            } catch (error){

                guardarMensaje(error.message)

                setTimeout( () => {
                    guardarMensaje(null)
                },4000)
            }
        }
    })

    const mostrarMensaje = () => {
        return (
            <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                <p>{ mensaje }</p>
            </div>
        )
    }

    return (
        <>
            <LayoutTransferencia>

                <h1 className="text-2xl text-gray-200 font-light">Nueva Transferencia</h1>

                <div className="flex justify-center mp-5">
                    <div className="w-full max-w-sm">
                        <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-6" onSubmit={formik.handleSubmit}>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cuentaOrigenId">
                                    Id Cuenta Origen
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                                                    focus:outline-none focus:shadow-outline" id="cuentaOrigenId" type="text" placeholder="Id de la cuenta de origen"
                                       value={formik.values.cuentaOrigenId}
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                />
                            </div>

                            {formik.touched.cuentaOrigenId && formik.errors ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p>{formik.errors.cuentaOrigenId}</p>
                                </div>
                            ) : null }

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cuentaDestinoId">
                                    Id Cuenta Destino
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                                                    focus:outline-none focus:shadow-outline" id="cuentaDestinoId" type="text" placeholder="Id de la cuenta de destino"
                                       value={formik.values.cuentaDestinoId}
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                />
                            </div>

                            {formik.touched.cuentaDestinoId && formik.errors ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p>{formik.errors.cuentaDestinoId}</p>
                                </div>
                            ) : null }

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="monto">
                                    Monto
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                                                    focus:outline-none focus:shadow-outline" id="monto" type="text" placeholder="Monto a transferir"
                                       value={formik.values.monto}
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                />
                            </div>

                            {formik.touched.monto && formik.errors ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p>{formik.errors.monto}</p>
                                </div>
                            ) : null }

                            <input
                                type="submit"
                                className="bg-gray-800 w-full mt-5 p-2 text-white hover:bg-gray-900 "
                                value="Transferir"
                            />

                            { mensaje && mostrarMensaje()}

                        </form>
                    </div>
                </div>

            </LayoutTransferencia>
        </>
    )
}

export default NuevaTransferencia;
