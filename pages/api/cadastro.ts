import type {NextApiRequest, NextApiResponse} from 'next';
import type {RespostaPadraoMsg} from '../../types/RespostaPadraoMSG';
import type {CadastroRequisicao} from '../../types/CadastroRequisicao';
import {UsuarioModel} from '../../models/UsuarioModels';
import{conectarMongoDB} from '../../middlewares/conectaMongodb';

import md5 from 'md5';
import usuario from './usuario';

const endpointCadastro = 
    async(req : NextApiRequest, res: NextApiResponse <RespostaPadraoMsg>) =>{

        if(req.method === 'POST'){
            const usuario = req.body as CadastroRequisicao;
            
            if(!usuario.nome || usuario.nome.length < 2){
                return res.status(400).json({erro:'Nome invalido'});
            }
    
            if (!usuario.email || usuario.email.length < 5
                ||!usuario.email.includes('@')
                ||!usuario.email.includes('.')){
                return res.status(400).json({erro: 'Email invalido'});
                }

               if (!usuario.senha || usuario.senha.length < 4){
                return res.status(400).json({erro: 'Senha invalida'});                    
               }     

               if (!usuario.cep || usuario.cep === 8 ){
                return res.status(400).json({erro: 'cep invalido'});
               }

               if (!usuario.endereco || usuario.endereco.length < 5){
                return res.status(400).json({erro: 'endereço invalido'});
               }

               if (!usuario.num_endereco || usuario.num_endereco.length > 2){
                return res.status(400).json({erro: 'Número invalido'});
               }

               // validar complemento opcional
               //if (!usuario.complemento_endereco || usuario.complemento_endereco.length < 2 ){
                //return res.status(400).json({erro: 'complemento invalido'});
               //}

               if (!usuario.bairro || usuario.bairro.length < 2 ){
                return res.status(400).json({erro: 'bairro invalido'});
               }

               if (!usuario.cidade || usuario.cidade.length < 2 ){
                return res.status(400).json({erro: 'Cidade invalido'});
               }

               if (!usuario.estado || usuario.estado.length < 2 ){
                return res.status(400).json({erro: 'Estado invalido'});
               }

               //validar quantidade minima de digitos
               if (!usuario.cpf || usuario.cpf === 11 ){
                return res.status(400).json({erro: 'CPF invalido'});
               }
               
               //validar tipo de formato de data
               if (!usuario.data_nasc || usuario.data_nasc ){
                return res.status(400).json({erro: 'data de nascimento invalido'});
               }

               if (!usuario.celular || usuario.celular === 11 ){
                return res.status(400).json({erro: 'celular invalido'});
               }
        
// salvar no banco de dados
//validacao se ja existe usuario com o mesmo email
const usuariosComMesmoEmail = await UsuarioModel.find({email: usuario.email});
if (usuariosComMesmoEmail && usuariosComMesmoEmail.length >0){
    return res.status(400).json({erro: 'email ja cadastrado'});
}

const usuarioASerSalvo ={
    nome : usuario.nome,
    email : usuario.email,
    senha : md5(usuario.senha),
    cep : usuario.cep,
    endereco : usuario.endereco,
    num_endereco : usuario.num_endereco,
    //complemento_endereco : usuario.complemento_endereco,
    bairro : usuario.bairro,
    cidade : usuario.cidade,
    estado : usuario.estado,
    cpf : usuario.cpf,
    data_nasc: usuario.data_nasc,
    celular: usuario.celular
   
}

await UsuarioModel.create(usuarioASerSalvo);
return res.status(200).json({msg : 'usuario criado com sucesso'})
        return res.status(200).json({msg:'Dados corretos'})
    }
        return res.status(405).json({erro : 'Metodo Informado não é válido'});

}
export default conectarMongoDB(endpointCadastro);