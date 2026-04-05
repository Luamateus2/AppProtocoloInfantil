export interface Patient {
  idade: string;
  peso: string;
  classificacaoAsa: string;
  tipoCirurgia: string;
  comorbidadeResp: string;
  observacoes: string;
  dataCadastro: Date;
  protocoloJejum: boolean;
  tempoJejum: Date;
  carboPreOp: boolean;
  viaAereaDificil: boolean;
  avaliacaoAnsiedade: boolean;
  eva: string;
  riscoObstrucao: boolean;
  alimentacaoPrecoce: boolean;
  criterioAlta: boolean;
  tempoAlta: Date;
  obsPosOp: string;
  ventilacaoProtetora: boolean;
  analgesicoMultimodal: boolean;
  dexametasona: boolean;
  monitorizacaoCapnografica: boolean;
  tempoCirurgia: Date;
  complicacoesIntra: string;
  observacoesGerais: string;
}