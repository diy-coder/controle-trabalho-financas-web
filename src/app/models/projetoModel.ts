export interface ProjetoModel {
  cliente: string;
  nome: string;
  descricao: string;
  observacao: string;
  inicioPrevisto: Date;
  terminoPrevisto: Date;
  dificuldade: number;
  tecnologias: string[];
}
