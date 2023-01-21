import React, {useState} from "react"
import { useRouter } from "next/router"
import {useFormik} from "formik"
import * as Yup from 'yup'
import {useMutation, gql} from "@apollo/client"
import LayoutCuenta from "../../componentes/cuenta/LayoutCuenta";
import CustomSelect from "../../componentes/subComponentes/customSelect";

const Nueva_Cuenta = gql `
    mutation NuevaCuenta($input: ClienteBancoSucursalInput) {
      nuevaCuenta(input: $input) {
        id
        clienteId
        bancoId
        sucursalId
        numeroCuenta
        saldoCuenta
        tipoCuenta
      }
    }
`

const Obtener_Cuentas = gql `
    query ObtenerCuentas {
      obtenerCuentas {
        id
        clienteId
        bancoId
        sucursalId
        numeroCuenta
        saldoCuenta
        tipoCuenta
      }
    }
`

const optionsTipoCuenta = [
    {value:'CajaAhorro',label:'Caja de Ahorro'},
    {value:'CuentaCorriente',label:'Cuenta Corriente'}
]

const NuevaCuenta = () => {

    const [mensaje, guardarMensaje] = useState(null)

    const [ nuevaCuenta ] = useMutation(Nueva_Cuenta,{
        update(cache,{data:{nuevaCuenta}}){
            const {obtenerCuentas} = cache.readQuery({query:Nueva_Cuenta})
            cache.writeQuery({query:Nueva_Cuenta, data:{obtenerCuentas:[... obtenerCuentas, nuevaCuenta]}})
        }
    })

    const router = useRouter()

    const formik = useFormik({

        initialValues: {
            clienteId: '',
            sucursalId: '',
            numeroCuenta: '',
            saldoCuenta: 0,
            tipoCuenta: ''
        },

        validationSchema: Yup.object ({
            clienteId: Yup.string()
                .required('El Cliente Id es requerido.'),
            sucursalId: Yup.string()
                .required('La Sucursal Id es requerida.'),
            numeroCuenta: Yup.string()
                .required('El Número de Cuenta es requerido.')
                .matches(/^[0-9]*$/,'No se aceptan letras'),
            saldoCuenta: Yup.string()
                .required('El Saldo de la Cuenta es requerido.')
                .matches(/^[0-9]+([.][0-9]+)?$/,'No se aceptan letras')
        }),

        onSubmit: async valores => {

            let { clienteId, sucursalId, numeroCuenta, saldoCuenta, tipoCuenta } = valores

            numeroCuenta = parseInt(numeroCuenta)
            saldoCuenta = parseFloat(saldoCuenta)

            try {

                const { data } = await nuevaCuenta ({
                    variables: {
                        input: {
                            clienteId,
                            sucursalId,
                            numeroCuenta,
                            saldoCuenta,
                            tipoCuenta
                        }
                    }
                })

                guardarMensaje(`La Cuenta fue creada correctamente.`)

                setTimeout(()=> {
                    guardarMensaje(null)
                    router.push('/cuentas/obtenercuentas')
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
            <LayoutCuenta>

                <h1 className="text-2xl text-gray-200 font-light">Nueva Cuenta</h1>

                <div className="flex justify-center mp-5">
                    <div className="w-full max-w-sm">
                        <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-6" onSubmit={formik.handleSubmit}>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clienteId">
                                    Cliente Id
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                                                    focus:outline-none focus:shadow-outline" id="clienteId" type="text" placeholder="Id del Cliente"
                                       value={formik.values.clienteId}
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                />
                            </div>

                            {formik.touched.clienteId && formik.errors ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p>{formik.errors.clienteId}</p>
                                </div>
                            ) : null }

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sucursalId">
                                    Sucursal Id
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                                                    focus:outline-none focus:shadow-outline" id="sucursalId" type="text" placeholder="Id de la Sucursal"
                                       value={formik.values.sucursalId}
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                />
                            </div>

                            {formik.touched.sucursalId && formik.errors ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p>{formik.errors.sucursalId}</p>
                                </div>
                            ) : null }

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numeroCuenta">
                                    Número Cuenta
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                                                    focus:outline-none focus:shadow-outline" id="numeroCuenta" type="text" placeholder="Número de la Cuenta"
                                       value={formik.values.numeroCuenta}
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                />
                            </div>

                            {formik.touched.numeroCuenta && formik.errors ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p>{formik.errors.numeroCuenta}</p>
                                </div>
                            ) : null }

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="saldoCuenta">
                                    Saldo Cuenta
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                                                    focus:outline-none focus:shadow-outline" id="saldoCuenta" type="text" placeholder="Saldo de la Cuenta"
                                       value={formik.values.saldoCuenta}
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                />
                            </div>

                            {formik.touched.saldoCuenta && formik.errors ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p>{formik.errors.saldoCuenta}</p>
                                </div>
                            ) : null }

                            <CustomSelect
                                className='input'
                                label={'Tipo'}
                                onChange={value=>formik.setFieldValue('tipoCuenta',value.value)}
                                value={formik.values.tipoCuenta}
                                options={optionsTipoCuenta}
                            />

                            <input
                                type="submit"
                                className="bg-gray-800 w-full mt-5 p-2 text-white hover:bg-gray-900 "
                                value="Crear Cuenta"
                            />

                            { mensaje && mostrarMensaje()}

                        </form>
                    </div>
                </div>

            </LayoutCuenta>
        </>
    )

}

export default NuevaCuenta;