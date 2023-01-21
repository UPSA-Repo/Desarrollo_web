const mongoose = require('mongoose');

const CBSSchema = mongoose.Schema({
    tipoCuenta: {
        type: String,
        trim: true,
    },
    numeroCuenta: {
        type: Number,
        trim: true,
        unique: true,
        default: 0,
    },
    clienteId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Cliente',
    },
    bancoId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Banco',
    },
    sucursalId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Sucursal',
    },
    saldoCuenta: {
        type: mongoose.Schema.Types.Number,
        required: true,
        ref: 'Cliente'
    }
});

module.exports = mongoose.model('CBS', CBSSchema);