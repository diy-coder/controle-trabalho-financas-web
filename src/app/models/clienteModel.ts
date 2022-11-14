import { ComoMeEncontrouEnum } from '../enums/como-em-encontrou.enum';
import { StatusClienteEnum } from '../enums/status-cliente.enum';
import { TipoCobrancaEnum } from '../enums/tipo-cobranca.enum';

export interface ClienteModel {
  user_creation: string;
  cliente: string;
  local: string;
  emailResponsavel: string;
  emailFinanceiro: string;
  comoMeEncontrou: ComoMeEncontrouEnum;
  quemIndicou: string;
  status: StatusClienteEnum;
  tipoCobranca: TipoCobrancaEnum;
  ultimoValorCobrado: number;
  totalRecebido: number;
  projetosTotal: number;
  ultimoProjetoInicio: Date;
  ultimoProjetoEntrega: Date;
  dataPrimeiroContato: Date;
}
