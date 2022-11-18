import { FluxoTrabalhoStatusEnum } from '../enums/status-fluxo-trabalho.enum';

export interface FluxoDeTrabalhoModel {
  user_creation: string;
  dataInicioEfetiva: Date;
  cliente: string;
  emailResponsavel: string;
  referencia: string;
  projeto: string;
  status: FluxoTrabalhoStatusEnum;
  dataEntregaEfetiva: Date;
  projetoEntregue: boolean;
  valor: number;
  moeda: string;
  gastos: number;
  dataPagamento: Date;
  pagamentoRecebido: boolean;
  nfeEmitida: boolean;
  totalRecebido: number;
  observacoes: string;
  tempoGastoEmMinutos: number;
  valorPorHora: number;
  dificuldade: number;
}
