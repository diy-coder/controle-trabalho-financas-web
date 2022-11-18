import { TipoOperacaoEnum } from '../enums/tipo-operacao.enum';

export interface FluxoDeCaixaModel {
  user_creation: string;
  data: Date;
  descricao: string;
  tipoOperacao: TipoOperacaoEnum;
  valor: number;
  projeto: string;
}
