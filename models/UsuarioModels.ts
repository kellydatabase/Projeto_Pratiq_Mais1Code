import mongoose, {Schema}from "mongoose";

const UsuarioShema = new Schema({
    nome: {type: String, required : true},
    email: {type : String, required : true},
    senha: {type : String, required : true},
    avatar: {type : String, required: false},
    cep: {type : Number, required: true},
    endereço: {type : String, required: true},
    num_endereço: {type : String, required: true},
    complemento_endereço: {type : String, required: true},
    bairro: {type : String, required: true},
    cidade: {type : String, required: true},
    estado: {type : String, required: true},
});

export const UsuarioModel = (mongoose.models.usuarios ||
    mongoose.model('usuarios', UsuarioShema));
