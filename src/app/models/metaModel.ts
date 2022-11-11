import { TipoMetaEnum } from '../enums/tipo-meta.enum.ts';

export interface MetaModel {
  nome: string;
  descricao: number;
  valorTotal: number;
  prazo: Date
  items: MetaItemModel[];
}

export interface MetaItemModel {
  produto: string;
  valorUnitario: number;
  quantidade: number;
  valorTotal: number;
  tipoMeta: TipoMetaEnum;
}
