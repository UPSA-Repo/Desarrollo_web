import React, {useState} from "react"
import { useRouter } from "next/router" //Para redirigir en este cas al Login una vez que se cree correctamente el usuario.
import {useFormik} from "formik"
import * as Yup from 'yup'
import {useMutation, gql} from "@apollo/client"
import LayoutCuenta from "../../componentes/cuenta/LayoutCuenta";
import CustomSelect from "../../componentes/subComponentes/customSelect";

const Modificar_Cuenta = gql `
    mutation ModificarCuenta($id: ID, $input: ClienteBancoSucursalInput) {
      modificarCuenta(id: $id, input: $input) {
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

const options = [
    {value:'CajaAhorro',label:'Caja de Ahorro'},
    {value:'CuentaCorriente',label:'Cuenta Corriente'},
]

const ModificarCuenta = () => {

    const [mensaje, guardarMensaje] = useState(null)

    const [ modificarCuenta ] = useMutation(Modificar_Cuenta)

    const router = useRouter()

    const formik = useFormik({

        initialValues: {
            id:'',
            clienteId: '',
            sucursalId: '',
            numeroCuenta: '',
            saldoCuenta: 0,
            tipoCuenta: ''
        },

        validationSchema: Yup.object ({
            id: Yup.string()
                .required('El Id es requerido.'),
            clienteId: Yup.string()
                .required('El Cliente Id es requerido.'),
            sucursalId: Yup.string()
                .required('La Sucursal Id es requerido.'),
            numeroCuenta: Yup.string()
                .required('El Numero de Cuenta es requerido.')
                .matches(/^[0-9]*$/,'No se aceptan letras'),
            saldoCuenta: Yup.string()
                .required('El Saldo de la Cuenta es requerido.')
                .matches(/^[0-9]+([.][0-9]+)?$/,'No se aceptan letras'),
        }),

        onSubmit: async valores => {

            let { id, clienteId, sucursalId, numeroCuenta, saldoCuenta, tipoCuenta } = valores

            numeroCuenta = parseInt(numeroCuenta)
            saldoCuenta = parseFloat(saldoCuenta)

            try {

                const { data } = await modificarCuenta ({
                    variables: {
                        id,
                        input: {
                            clienteId,
                            sucursalId,
                            numeroCuenta,
                            saldoCuenta,
                            tipoCuenta
                        }
                    }
                })

                guardarMensaje(`La Cuenta fue modificada correctamente.`)

                setTimeout(()=> {
                    guardarMensaje(null)
                    router.push('/cuentas/obtenercuentas')
                }, 1000)


            } catch (error) {

                guardarMensaje(error.message)

                setTimeout( () => {
                    guardarMensaje(null)
                },4000)

            }
        }
    })

    const mostrarMensaje = () => {
        return (
            <div className="bg-white py-2 px-3 w-full rounded my-3 max-w-sm text-center mx-auto">
                <p>{ mensaje }</p>
            </div>
        )
    }

    return (
        <>
            <LayoutCuenta>

                <h1 className="text-2xl text-gray-200 font-light">Modificar Cuenta</h1>

                <div className="flex justify-center mp-5">
                    <div className="w-full max-w-sm">
                        <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-6" onSubmit={formik.handleSubmit}>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id">
                                    Id
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                                                    focus:outline-none focus:shadow-outline" id="id" type="text" placeholder="Id de la Cuenta"
                                       value={formik.values.id}
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                />
                            </div>

                            {formik.touched.id && formik.errors ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p>{formik.errors.id}</p>
                                </div>
                            ) : null }

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
                                    N??mero Cuenta
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                                                    focus:outline-none focus:shadow-outline" id="numeroCuenta" type="text" placeholder="N??mero de Cuenta"
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
                                label={'Tipo de Cuenta'}
                                onChange={value=>formik.setFieldValue('tipoCuenta',value.value)}
                                value={formik.values.tipoCuenta}
                                options={options}
                            />

                            <input
                                type="submit"
                                className="bg-gray-800 w-full mt-5 p-2 text-white hover:bg-gray-900 "
                                value="Modificar Cuenta"
                            />

                            { mensaje && mostrarMensaje() }

                        </form>
                    </div>
                </div>

            </LayoutCuenta>
        </>
    )
}

export default ModificarCuenta;