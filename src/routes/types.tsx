export type RootStackParamList = {
  Inicio: undefined;
  Login: undefined;
  RecuperarSenha: undefined;
  ConfirmarEmail: undefined;
  Cadastro: undefined;
  Home: undefined;
  NovoPaciente: undefined;
  NovaSenha: undefined;
  Historico: undefined;
  Pacientes: undefined;
  Settings: undefined;

  PreOperatorio: {
    pacienteId: string;
  };

  IntraOperatorioG: {
    pacienteId: string;
  };

  PosOperatorio: {
    pacienteId: string;
  };

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

    preOperatorioEditado?: {
      data: string;
      horario: string;
      jejum: string;
      estadoGeral: string;
      viaAerea: string;
      medicacao: string;
      observacoes: string;
    };
  };

  EditarPosOperatorio: {
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

    preOperatorioEditado?: {
      data: string;
      horario: string;
      jejum: string;
      estadoGeral: string;
      viaAerea: string;
      medicacao: string;
      observacoes: string;
    };

    intraOperatorioEditado?: {
      data: string;
      horarioInicio: string;
      anestesia: string;
      viaAerea: string;
      intercorrencias: string;
      observacoes: string;
    };
  };
};