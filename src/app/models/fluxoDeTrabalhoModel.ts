import { FluxoTrabalhoStatusEnum } from '../enums/status-fluxo-trabalho.enum';

export interface FluxoDeTrabalhoModel {
  user_creation: string;
  projeto: string;
  cliente: string;
  emailResponsavel: string;
  dataInicioPrevista: Date;
  dataEntregaPrevista: Date;
  dataInicioEfetiva: Date;
  dataEntregaEfetiva: Date;
  moeda: string;
  referencia: string;
  status: FluxoTrabalhoStatusEnum;
  valor: number;
  gastos: number;
  pagamentoRecebido: boolean;
  dataPagamento: Date;
  totalRecebido: number;
  dificuldade: number;
  observacoes: string;
  linkArmazenamentoNuvem: string;


  projetoEntregue: boolean;
  nfeEmitida: boolean;
  tempoGastoEmMinutos: number;
  valorPorHora: number;
}
