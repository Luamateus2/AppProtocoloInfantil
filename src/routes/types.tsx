import Pacientes from "../screens/Patient/Paciente";

export type RootStackParamList = {
  Inicio: undefined;
  Login: undefined;
  RecuperarSenha:undefined;
  ConfirmarEmail:undefined;
  Cadastro:undefined;
  Home:undefined;
  NovoPaciente: undefined;
  NovaSenha: undefined;
  Historico: undefined;
  Pacientes:undefined;
  Settings:undefined;

EditarPaciente: {
  pacienteId: string;
};

EditarPreOperatorio: {
  pacienteId: string;
  pacienteEditado?: {
    nomeCompleto: string;
    dataNascimento: string;
    idade: string;
    asa: string;
    peso: string;
    procedimento: string;
    comorbidade: string;
    observacoes: string;
  };
};
 EditarIntraOperatorio: {
  pacienteId: string;
};
EditarPosOperatorio: {
  pacienteId: string;
};
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