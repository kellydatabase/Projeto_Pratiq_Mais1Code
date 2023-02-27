import type { NextApiRequest, NextApiResponse } from "next";
import {validarTokenJWT} from '../../middlewares/validarTokenJwt';

const usuarioEndpoint = (req : NextApiRequest, res : NextApiResponse) =>{

    return res.status(200).json('usuário autenticado com sucesso');
}
export default validarTokenJWT(usuarioEndpoint);