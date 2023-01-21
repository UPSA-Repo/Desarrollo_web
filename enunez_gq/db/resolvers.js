const Usuario = require('../Models/Usuario');
const Banco = require('../Models/Banco');

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({path:'variables.env'})




const CrearToken = (usuario, firma, expiresIn) => {
    const {id, email, nombre, apellido, creado} = usuario;
    return jwt.sign({ id, email, nombre, apellido, creado }, firma, { expiresIn });
}

const resolvers = {
    Query: {
        obtenerUsuario: (_, { token }) => {
            return jwt.verify(token, process.env.FIRMA_SECRETA);
        },
        obtenerBancos: async () => {
            try {
                //Buscar todas las existencias
                return await Banco.find({});
            } catch (e) {
                console.log(e);
            }
        },
        obtenerBancoId: async (_, { id }) => {
            const esBancoExistente = await Banco.findById(id);
            if (!esBancoExistente) {
                throw new Error(`El Banco con el ID ${id} no existe.`);
            }
            return esBancoExistente;
        }
    },
    Mutation: {
        nuevoUsuario: async (_, { input }) => {
            const {email, password} = input;
            //Verificar si el usuario ya fue registrado
            const existeUsuario = await Usuario.findOne({email});
            if (existeUsuario) {
                throw new Error(`Ese usuario con es mail ${email} ya fue registrado`);
            }
            //Hashear el password
            const salt = await bcryptjs.genSaltSync(10);
            input.password = await bcryptjs.hash(password, salt);

            try {
                const usuario = new Usuario(input);
                await usuario.save();
                return usuario;
            } catch (error) {
                console.log(error);
            }
            return 'Creando Usuario';
        },
        autenticarUsuario: async (_, { input }) => {
            const {email, password} = input;
            //Verificar que el usuario exista
            const existeUsuario = await Usuario.findOne({email});
            if (!existeUsuario) {
                throw new Error(`Ese usuario con ese mail ${email} no existe.`);
            }
            //Verificar si el password es correcto
            const passwordCorrecto = await bcryptjs.compare(password, existeUsuario.password);
            if (!passwordCorrecto) {
                throw new Error(`Ese password  ${password} no existe.`);
            }

            //Crear el Token
            return {
                token: CrearToken(existeUsuario, process.env.FIRMA_SECRETA, 300000)
            }
        },
        nuevoBanco: async (_, { input }) => {
            const banco = new Banco(input);
            return await banco.save();
        },
        actualizarBanco: async (_, {id, input}) => {
            //Verificar si existe el id
            const existeBanco = Banco.findById({_id: id});
            if (!existeBanco) {
                throw new Error(`El Banco con el ID ${id} no existe`);
            }
            //Actualizar
            return Banco.findByIdAndUpdate({_id: id}, input, {new: true});
        },
        eliminarBanco: async (_, {id}) => {
            //Verificar si existe
            const existeBanco = Banco.findById({id});
            if (!existeBanco) {
                throw new Error(`El Banco con el ID ${id} no existe`);
            } else {
                //Eliminar
                await Banco.findByIdAndDelete({_id: id});
                return "Banco eliminado";
            }
        },
    }
}

module.exports = resolvers;