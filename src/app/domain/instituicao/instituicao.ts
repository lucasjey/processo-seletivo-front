import { Endereco } from "../endereco/endereco";
import { Mantenedora } from "../mantenedora/mantenedora";

export class Instituicao {
    id: number;
    nome: string;
    codigo: string;
    numeroFiscal: number;
    endereco: Endereco;
    mantenedora: Mantenedora;
}
