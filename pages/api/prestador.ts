import type { NextApiRequest, NextApiResponse } from "next";
import {validarTokenJWT} from '../../middlewares/validarTokenJwt';

const prestadorEndpoint = (req : NextApiRequest, res : NextApiResponse) =>{

    return res.status(200).json('Prestador autenticado com sucesso');
}
export default validarTokenJWT(prestadorEndpoint);