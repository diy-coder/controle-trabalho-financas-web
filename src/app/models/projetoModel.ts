export interface ProjetoModel {
  user_creation: string;
  nome: string;
  descricao: string;
  observacao: string;
  inicioPrevisto: Date;
  terminoPrevisto: Date;
  dificuldade: number;
  tecnologias: string[];
  moeda: string;
  valorEstimado: number;
}
