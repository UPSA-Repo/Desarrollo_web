import React, {useState} from "react"
import { useRouter } from "next/router" //Para redirigir en este cas al Login una vez que se cree correctamente el usuario.
import {useFormik} from "formik"
import * as Yup from 'yup'
import {useMutation, gql} from "@apollo/client"
import LayoutCliente from "../../componentes/cliente/LayoutCliente";
import CustomSelect from "../../componentes/subComponentes/customSelect";

const Nuevo_Cliente = gql `
    mutation NuevoCliente($input: ClienteInput) {
      nuevoCliente(input: $input) {
        id
        nombre
        direccion
        telefono
        saldoActual
        tipo
        usuarioId
      }
    }
`

const Obtener_Clientes = gql `
    query ObtenerClientes {
      obtenerClientes {
        id
        nombre
        direccion
        telefono
        saldoActual
        tipo
        usuarioId
      }
    }
`

const options = [
    {value:'Categoria_A',label:'Categoría A'},
    {value:'Categoria_B',label:'Categoría B'},
    {value:'Categoria_C',label:'Categoría C'},
]

const NuevoCliente = () => {

    const [mensaje, guardarMensaje] = useState(null)

    const [ nuevoCliente ] = useMutation(Nuevo_Cliente,{
        update(cache,{data:{nuevoCliente}}){
            const {obtenerClientes} = cache.readQuery({query:Obtener_Clientes})
            cache.writeQuery({query:Obtener_Clientes, data:{obtenerClientes:[... obtenerClientes, nuevoCliente]}})
        }
    })

    const router = useRouter()

    const formik = useFormik({

        initialValues: {
            nombre: '',
            direccion:'',
            telefono:'',
            tipo:''
        },

        validationSchema: Yup.object ({
            nombre: Yup.string()
                .required('El nombre es requerido.')
                .matches(/^[A-Za-z ]+$/,'No se aceptan números'),
            direccion: Yup.string()
                .required('La dirección es requerida.'),
            telefono: Yup.string()
                .required('El telefono es requerido.')
                .matches(/^[0-9]*$/,'No se aceptan letras')
                .min(8,'No puede tener menos de 8 números')
                .max(8,'No puede tener mas de 8 números'),
        }),

        onSubmit: async valores => {

            const { nombre, direccion, telefono, tipo } = valores

            try {

                const { data } = await nuevoCliente ({
                    variables: {
                        input: {
                            nombre,
                            direccion,
                            telefono,
                            tipo
                        }
                    }
                })

                guardarMensaje(`El cliente fue creado correctamente.`)

                setTimeout(()=> {
                    guardarMensaje(null)
                    router.push('/clientes/obtenerclientes')
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
            <LayoutCliente>

                <h1 className="text-2xl text-gray-200 font-light">Nuevo Cliente</h1>

                <div className="flex justify-center mp-5">
                    <div className="w-full max-w-sm">
                        <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-6" onSubmit={formik.handleSubmit}>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                    Nombre
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                                                    focus:outline-none focus:shadow-outline" id="nombre" type="text" placeholder="Nombre del Cliente"
                                       value={formik.values.nombre}
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                />
                            </div>

                            {formik.touched.nombre && formik.errors ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p>{formik.errors.nombre}</p>
                                </div>
                            ) : null }

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="direccion">
                                    Dirección
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                                                    focus:outline-none focus:shadow-outline" id="direccion" type="text" placeholder="Dirección del Cliente"
                                       value={formik.values.direccion}
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                />
                            </div>

                            {formik.touched.direccion && formik.errors ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p>{formik.errors.direccion}</p>
                                </div>
                            ) : null }

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefono">
                                    Telefono
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                                                    focus:outline-none focus:shadow-outline" id="telefono" type="text" placeholder="Telefono del Cliente"
                                       value={formik.values.telefono}
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                />
                            </div>

                            {formik.touched.telefono && formik.errors ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p>{formik.errors.telefono}</p>
                                </div>
                            ) : null }

                            <CustomSelect
                                className='input'
                                label={'Tipo'}
                                onChange={value=>formik.setFieldValue('tipo',value.value)}
                                value={formik.values.tipo}
                                options={options}
                            />

                            <input
                                type="submit"
                                className="bg-gray-800 w-full mt-5 p-2 text-white hover:bg-gray-900 "
                                value="Crear Cliente"
                            />

                            { mensaje && mostrarMensaje() }

                        </form>
                    </div>
                </div>

            </LayoutCliente>
        </>
    )
}

export default NuevoCliente;