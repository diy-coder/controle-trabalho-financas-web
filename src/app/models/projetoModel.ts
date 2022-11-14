export interface ProjetoModel {
  user_creation: string;
  cliente: string;
  nome: string;
  descricao: string;
  observacao: string;
  inicioPrevisto: Date;
  terminoPrevisto: Date;
  dificuldade: number;
  tecnologias: string[];
}
