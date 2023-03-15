import type { NextApiResponse } from "next";
import type {respostaPadraoMsg} from '../../types/respostaPadraoMsg';
import nc from 'next-connect';
import {upload,uploadImagemCosmic} from '../../services/uploadImagemCosmic';
import {conectarMongoDB} from '../../middlewares/conectaMongodb';
import {validarTokenJWT} from '../../middlewares/validarTokenJwt';
import {PublicacaoModel} from '../../models/publicacaoModels';
import {prestadorModels} from '../../models/prestadorModels';

const handler = nc()
    .use(upload.single('file'))
    .post(async (req : any, res : NextApiResponse<respostaPadraoMsg>) => {
        try{
            const {userId} = req.query;
            const prestador = await prestadorModels.findById(userId);
            if(!prestador){
                return res.status(400).json({erro : 'Usuario nao encontrado'});
            }

            if(!req || !req.body){
                return res.status(400).json({erro : 'Parametros de entrada nao informados'});
            }
            const {descricao} = req?.body;

            if(!descricao || descricao.length < 2){
                return res.status(400).json({erro : 'Descricao nao e valida'});
            }
    
            if(!req.file || !req.file.originalname){
                return res.status(400).json({erro : 'Imagem e obrigatoria'});
            }

            const image = await uploadImagemCosmic(req);
            const publicacao = {
                idPrestador : prestador._id,
                descricao,
                foto : image.media.url,
                data : new Date()
            }

            prestador.publicacoes++;
            await prestadorModels.findByIdAndUpdate({_id : prestador._id}, prestador);

            await PublicacaoModel.create(publicacao);
            return res.status(200).json({msg : 'Publicacao criada com sucesso'});
        }catch(e){
            console.log(e);
            return res.status(400).json({erro : 'Erro ao cadastrar publicacao'});
        }
});

export const config = {
    api : {
        bodyParser : false
    }
}

export default validarTokenJWT(conectarMongoDB(handler));