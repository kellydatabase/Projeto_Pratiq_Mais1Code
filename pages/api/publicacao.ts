import type { NextApiResponse } from "next";
import type {respostaPadraoMsg} from '../../types/respostaPadraoMsg';
import nc from 'next-connect';
import {updload,uploadImagemCosmic} from '../../services/uploadImagemCosmic';
import {conectarMongoDB} from '../../middlewares/conectaMongodb';
import {validarTokenJWT} from '../../middlewares/validarTokenJwt';
import {PublicacaoModel} from '../../models/publicacaoModels';
import {prestadorModels} from '../../models/prestadorModels';


const handler = nc()
    .use(updload.single('file'))
    .post(async (req: any, res : NextApiResponse<respostaPadraoMsg>) => {
        try {
            const {userId} = req.query;
            const prestador = await prestadorModels.findById(userId);
            if(!prestador){
                return res.status(400).json({erro: 'Prestador não encontrado'})
            }

        if(!req || !req.body){
            return res.status(400).json({erro: 'Parametros de entrada não informados'})
        }
        const {descricao} = req?.body;
    
        if(!descricao || descricao.length < 2){
            return res.status(400).json({erro: 'Descrição não é válida'})                                                                
        }
    
        if(!req.file || !req.file.originalname){
            return res.status(400).json({erro: 'Imagem é obrigatória'})                                                                       
        }

        const image = await uploadImagemCosmic(req);
        const publicacao = {
            idPrestador : userId._id,
            descricao,
            foto : image.media.url,
            data : new Date()
        }

        await PublicacaoModel.create(publicacao)
        return res.status(200).json({msg: 'Publicação criada com sucesso'});
    } catch (e) {
        console.log(e);
        return res.status(400).json({erro: 'Erro ao cadastrar publicação'})
    }   

});

export const config = {
    api : {
        bodyParser : false
    }
}

export default validarTokenJWT(conectarMongoDB(handler));