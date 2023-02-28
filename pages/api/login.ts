import type {NextApiRequest, NextApiResponse} from "next";
import {conectarMongoDB} from '../../middlewares/conectaMongodb';
import type {respostaPadraoMsg} from '../../types/respostaPadraoMsg';
import type {loginResposta} from '../../types/loginResposta';
import md5 from "md5";
import { UsuarioModel } from "@/models/UsuarioModels";
import jwt from 'jsonwebtoken';
import { prestadorModels } from "@/models/prestadorModels";

const endpointLogin = async (
    req : NextApiRequest,
    res : NextApiResponse<respostaPadraoMsg | loginResposta>
) => {

    const {MINHA_CHAVE_JWT} = process.env;
    if(!MINHA_CHAVE_JWT){
        return res.status(500).json({erro : 'ENV Jwt não informada'});
    }

    if(req.method === 'POST'){
        const {login, senha} = req.body;

        const usuariosEncontrados = await UsuarioModel.find({email : login, senha : md5(senha)});
        if(usuariosEncontrados && usuariosEncontrados.length > 0){
            const usuarioEncontrado = usuariosEncontrados[0];

            const token = jwt.sign({_id : usuarioEncontrado._id}, MINHA_CHAVE_JWT);

            return res.status(200).json({
                nome : usuarioEncontrado.nome,
                email : usuarioEncontrado.email,
                token               
            });
        }

        const prestadoresEncontrados = await prestadorModels.find({email : login, senha : md5(senha)});
        if(prestadoresEncontrados && prestadoresEncontrados.length > 0){
            const prestadorEncontrado = prestadoresEncontrados[0];

            const token = jwt.sign({_id : prestadorEncontrado._id}, MINHA_CHAVE_JWT);

            return res.status(200).json({
                nome : prestadorEncontrado.nome,
                email : prestadorEncontrado.email,
                token               
            });
        }
        
        return res.status(405).json({ erro : 'Método informado não é válido'});    
    }
    return res.status(400).json({ erro : 'Usuário ou senha não encontrado'});
}

export default conectarMongoDB(endpointLogin);