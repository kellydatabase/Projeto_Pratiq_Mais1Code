import type {NextApiRequest, NextApiResponse} from 'next';
import type {respostaPadraoMsg} from '../../types/RespostaPadraoMSG';
import type {cadRequisicaoPrestador} from '../../types/cadRequisicaoPrestador';
import type {cadRespostaPrestador} from '../../types/cadRespostaPrestador';
import {prestadorModels} from '../../models/prestadorModels';
import{conectarMongoDB} from '../../middlewares/conectaMongodb';

import md5 from 'md5';
import prestador from './prestador';


const endpointCadastroPrestador = 
    async(req : NextApiRequest, res: NextApiResponse <respostaPadraoMsg>) =>{

        if(req.method === 'POST'){
            const prestador = req.body as cadRequisicaoPrestador;
            
            if(!prestador.nome || prestador.nome.length < 2){
                return res.status(400).json({erro:'Nome invalido'});
            }
    
            if (!prestador.email || prestador.email.length < 5
                ||!prestador.email.includes('@')
                ||!prestador.email.includes('.')){
                return res.status(400).json({erro: 'Email invalido'});
                }

               if (!prestador.senha || prestador.senha.length < 4){
                return res.status(400).json({erro: 'Senha invalida'});                    
               }     

               if (!prestador.cep || prestador.cep === 8 ){
                return res.status(400).json({erro: 'cep invalido'});
               }

               if (!prestador.endereco || prestador.endereco.length < 5){
                return res.status(400).json({erro: 'endereço invalido'});
               }

               if (!prestador.num_endereco || prestador.num_endereco.length > 2){
                return res.status(400).json({erro: 'Número invalido'});
               }

               // validar complemento opcional
               //if (!prestador.complemento_endereco || prestador.complemento_endereco.length < 2 ){
                //return res.status(400).json({erro: 'complemento invalido'});
               //}

               if (!prestador.bairro || prestador.bairro.length < 2 ){
                return res.status(400).json({erro: 'bairro invalido'});
               }

               if (!prestador.cidade || prestador.cidade.length < 2 ){
                return res.status(400).json({erro: 'Cidade invalido'});
               }

               if (!prestador.estado || prestador.estado.length < 2 ){
                return res.status(400).json({erro: 'Estado invalido'});
               }

               //validar quantidade minima de digitos
               if (!prestador.cnpj || prestador.cnpj === 11 ){
                return res.status(400).json({erro: 'CNPJ invalido'});
               }
               
               //validar tipo de formato de data
              // if (!prestador.data_nasc || prestador.data_nasc ){
               //return res.status(400).json({erro: 'data de nascimento invalido'});
               //}

               if (!prestador.telefone || prestador.telefone === 14 ){
               return res.status(400).json({erro: 'telefone invalido'});
               }
        
// salvar no banco de dados
//validacao se ja existe prestador com o mesmo email
const prestadorComMesmoEmail = await prestadorModels.find({email: prestador.email});
if (prestadorComMesmoEmail && prestadorComMesmoEmail.length >0){
    return res.status(400).json({erro: 'email ja cadastrado'});
}

const prestadorASerSalvo ={
    nome : prestador.nome,
    email : prestador.email,
    senha : md5(prestador.senha),
    cep : prestador.cep,
    endereco : prestador.endereco,
    num_endereco : prestador.num_endereco,
    //complemento_endereco : prestador.complemento_endereco,
    bairro : prestador.bairro,
    cidade : prestador.cidade,
    estado : prestador.estado,
    cnpj : prestador.cnpj,
    //data_nasc: prestador.data_nasc,
    telefone: prestador.telefone
   
}

await prestadorModels.create(prestadorASerSalvo);
return res.status(200).json({msg : 'Prestador criado com sucesso'})
        return res.status(200).json({msg:'Dados corretos'})
    }
        return res.status(405).json({erro : 'Metodo Informado não é válido'});

}
export default conectarMongoDB(endpointCadastroPrestador);