import mongoose, {Schema}from "mongoose";

const UsuarioSchema = new Schema({
    nome: {type: String, required : true},
    email: {type : String, required : true},
    senha: {type : String, required : true},
    avatar: {type : String, required: false},
    cep: {type : Number, required: true},
    endereco: {type : String, required: true},
    num_endereco: {type : String, required: true},
    
    //validar como deixar complemento opcional
    //complemento_endereco: {type : String, required: false},
    bairro: {type : String, required: true},
    cidade: {type : String, required: true},
    estado: {type : String, required: true},
    cpf: {type : Number, required : true},
    //data_nasc: {type : String, required : true},
    celular: {type : Number, required : true}
});

export const UsuarioModel = (mongoose.models.usuarios ||
    mongoose.model('usuarios', UsuarioSchema));