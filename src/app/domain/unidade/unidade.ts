import { Endereco } from "../endereco/endereco";
import { Instituicao } from "../instituicao/instituicao";

export class Unidade {
    id: number;
    nome: string;
    codigo: string;
    numeroFiscal: number;
    endereco: Endereco;
    instituicao: Instituicao;
}
