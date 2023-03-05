import mongoose, {Schema}from "mongoose";

const PrestadorSchema = new Schema({
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
    cnpj: {type : Number, required : true},
    //data_nasc: {type : String, required : true},
    telefone: {type : Number, required : true}
});

export const prestadorModels = (mongoose.models.prestadores ||
    mongoose.model('prestadores', PrestadorSchema));