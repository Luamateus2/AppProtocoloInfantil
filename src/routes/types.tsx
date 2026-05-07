export type RootStackParamList = {
  Inicio: undefined;
  Login: undefined;
  RecuperarSenha:undefined;
  Cadastro:undefined;
  Home:undefined;
  NovoPaciente: undefined;
  NovaSenha: undefined;
  Historico: undefined;
  Pacientes:undefined;
  
  PreOperatorio: {
    pacienteId: string;
  };

  IntraOperatorio: {
    pacienteId: string;
  };

  PosOperatorio: {
    pacienteId: string;
  };
};