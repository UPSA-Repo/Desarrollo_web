import React, {useState} from "react"
import { useRouter } from "next/router" //Para redirigir en este cas al Login una vez que se cree correctamente el usuario.
import {useFormik} from "formik"
import * as Yup from 'yup'
import {useMutation, gql} from "@apollo/client"
import LayoutAhorro from "../../componentes/ahorro/LayoutAhorro";
import CustomSelect from "../../componentes/subComponentes/customSelect";

const Nuevo_Ahorro = gql `
    mutation NuevoAhorro($input: AhorroInput) {
      nuevoAhorro(input: $input) {
        id
        usuarioId
        clienteId
        sucursalId
        fecha
        plazo
        moneda
        monto
      }
    }
`

const Obtener_Ahorros = gql `
    query ObtenerAhorros {
      obtenerAhorros {
        id
        usuarioId
        clienteId
        sucursalId
        fecha
        plazo
        moneda
        monto
      }
    }
`

const optionsMoneda = [
    {value:'USD',label:'Dólares'},
    {value:'BOL',label:'Bolivianos'},
]

const optionsPlazo = [
    {value:'SeisMeses',label:'6 Meses'},
    {value:'DoceMeses',label:'12 Meses'},
    {value:'VeintiCuatroMeses',label:'24 Meses'}
]

const NuevoAhorro = () => {

    const [mensaje, guardarMensaje] = useState(null)

    const [ nuevoAhorro ] = useMutation(Nuevo_Ahorro,{
        update(cache,{data:{nuevoAhorro}}){
            const {obtenerAhorros} = cache.readQuery({query:Obtener_Ahorros})
            cache.writeQuery({query:Obtener_Ahorros, data:{obtenerAhorros:[... obtenerAhorros, nuevoAhorro]}})
        }
    })

    const router = useRouter()

    const formik = useFormik({

        initialValues: {
            clienteId: '',
            sucursalId: '',
            plazo: '',
            moneda: '',
            monto: 0
        },

        validationSchema: Yup.object ({
            clienteId: Yup.string()
                .required('El Cliente Id es requerido.'),
            sucursalId: Yup.string()
                .required('La Sucursal Id es requerida.'),
            monto: Yup.string()
                .required('El monto es requerido.')
                .matches(/^[0-9]+([.][0-9]+)?$/,'No se aceptan letras'),
        }),

        onSubmit: async valores => {

            let { clienteId, sucursalId, monto, plazo, moneda } = valores

            monto = parseFloat(monto)

            try {

                const { data } = await nuevoAhorro ({
                    variables: {
                        input: {
                            clienteId,
                            sucursalId,
                            monto,
                            plazo,
                            moneda
                        }
                    }
                })

                guardarMensaje(`El ahorro fue creado correctamente.`)

                setTimeout(()=> {
                    guardarMensaje(null)
                    router.push('/ahorros/obtenerahorros')
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
            <LayoutAhorro>

                <h1 className="text-2xl text-gray-200 font-light">Nuevo Ahorro</h1>

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
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="monto">
                                    Monto
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                                                    focus:outline-none focus:shadow-outline" id="monto" type="text" placeholder="Monto del Ahorro"
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

                            <CustomSelect
                                className='input'
                                label={'Moneda'}
                                onChange={value=>formik.setFieldValue('moneda',value.value)}
                                value={formik.values.moneda}
                                options={optionsMoneda}
                            />

                            <CustomSelect
                                className='input'
                                label={'Plazo'}
                                onChange={value=>formik.setFieldValue('plazo',value.value)}
                                value={formik.values.plazo}
                                options={optionsPlazo}
                            />

                            <input
                                type="submit"
                                className="bg-gray-800 w-full mt-5 p-2 text-white hover:bg-gray-900 "
                                value="Crear Ahorro"
                            />

                            { mensaje && mostrarMensaje() }

                        </form>
                    </div>
                </div>

            </LayoutAhorro>
        </>
    )
}

export default NuevoAhorro;