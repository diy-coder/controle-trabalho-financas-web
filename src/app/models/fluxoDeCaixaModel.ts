import { TipoOperacaoEnum } from "../enums/tipo-operacao.enum";

export interface FluxoDeCaixaModel {
  data: Date;
  descricao: string;
  tipoOperacao: TipoOperacaoEnum;
  valor: number;
}
