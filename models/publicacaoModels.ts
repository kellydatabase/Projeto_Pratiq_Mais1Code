import mongoose, { Schema } from "mongoose";

const PublicacaoSchema = new Schema({
    idPrestador :  {type :  String, required : true},
    descricao :  {type :  String, required : true},
    foto :  {type :  String, required : true},
    data :  {type :  Date, required : true},
    comentarios :  {type :  Array, required : true, default : []},
    likes :  {type :  Array, required : true, default : []},

});

export const PublicacaoModel = (mongoose.models.publicacaoes || 
    mongoose.model('publicacoes', PublicacaoSchema));