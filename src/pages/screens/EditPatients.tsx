import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StatusBar,
  Pressable,
  Text,
  Alert,
  ToastAndroid,
  Platform,
  KeyboardAvoidingView,
  ViewStyle,
} from "react-native";
import { Card } from "../../components/PatientForm/Card";
import { InputField } from "../../components/PatientForm/InputField";
import { SwitchField } from "../../components/PatientForm/SwitchField";
import { TimePickerField } from "../../components/PatientForm/TimePickerField";
import { DatePickerField } from "../../components/PatientForm/DatePickerField";

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

interface PatientFormPageProps {
  patientData?: Patient; // Se tiver, é edição
}

export const PatientFormPage = ({ patientData }: PatientFormPageProps) => {
  const [form, setForm] = useState<Patient>({
    idade: "",
    peso: "",
    classificacaoAsa: "",
    tipoCirurgia: "",
    comorbidadeResp: "",
    observacoes: "",
    dataCadastro: new Date(),
    protocoloJejum: false,
    tempoJejum: new Date(),
    carboPreOp: false,
    viaAereaDificil: false,
    avaliacaoAnsiedade: false,
    eva: "",
    riscoObstrucao: false,
    alimentacaoPrecoce: false,
    criterioAlta: false,
    tempoAlta: new Date(),
    obsPosOp: "",
    ventilacaoProtetora: false,
    analgesicoMultimodal: false,
    dexametasona: false,
    monitorizacaoCapnografica: false,
    tempoCirurgia: new Date(),
    complicacoesIntra: "",
    observacoesGerais: "",
  });

  // Se houver patientData, carrega os dados para edição
  useEffect(() => {
    if (patientData) {
      setForm(patientData);
    }
  }, [patientData]);

  const handleChange = (key: keyof Patient, value: any) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const validateForm = () => {
    if (!form.idade.trim()) return Alert.alert("Campos obrigatórios", "Informe a idade.");
    if (!form.peso.trim()) return Alert.alert("Campos obrigatórios", "Informe o peso.");
    if (!form.classificacaoAsa) return Alert.alert("Campos obrigatórios", "Selecione ASA.");
    const evaNum = parseInt(form.eva);
    if (form.eva && (isNaN(evaNum) || evaNum < 0 || evaNum > 10))
      return Alert.alert("Valor inválido", "EVA deve ser 0-10.");
    return true;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    // Aqui você pode chamar API para salvar ou atualizar
    if (Platform.OS === "android") {
      ToastAndroid.show("Dados salvos!", ToastAndroid.SHORT);
    }
    console.log("Dados do paciente:", form);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#E3F2FD" }}>
      <StatusBar backgroundColor="#1565C0" barStyle="light-content" translucent />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
          
          {/* Informações Básicas */}
          <Card title="Informações Básicas">
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <InputField
                label="Idade"
                value={form.idade}
                onChange={(v) => handleChange("idade", v)}
                keyboardType="numeric"
                width={160}
              />
              <InputField
                label="Peso"
                value={form.peso}
                onChange={(v) => handleChange("peso", v)}
                keyboardType="numeric"
                width={160}
              />
            </View>
            <InputField label="Tipo de Cirurgia" value={form.tipoCirurgia} onChange={(v) => handleChange("tipoCirurgia", v)} />
            <InputField
              label="Comorbidade Respiratória"
              value={form.comorbidadeResp}
              onChange={(v) => handleChange("comorbidadeResp", v)}
            />
          </Card>

          {/* Protocolo Intra-Operatório */}
          <Card title="Protocolo Intra-Operatório">
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <TimePickerField
                label="Tempo de Jejum"
                value={form.tempoJejum}
                onChange={(v) => handleChange("tempoJejum", v)}
                width={160}
              />
              <TimePickerField
                label="Tempo de Cirurgia"
                value={form.tempoCirurgia}
                onChange={(v) => handleChange("tempoCirurgia", v)}
                width={160}
              />
            </View>
            <SwitchField
              label="Jejum Líquidos"
              value={form.protocoloJejum}
              onValueChange={(v) => handleChange("protocoloJejum", v)}
            />
            <SwitchField
              label="Carbo Pré-Operatório"
              value={form.carboPreOp}
              onValueChange={(v) => handleChange("carboPreOp", v)}
            />
          </Card>

          {/* Protocolo Pós-Operatório */}
          <Card title="Protocolo Pós-Operatório">
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <InputField
                label="EVA"
                value={form.eva}
                onChange={(v) => handleChange("eva", v)}
                keyboardType="numeric"
                width={160}
              />
              <TimePickerField
                label="Tempo para Alta"
                value={form.tempoAlta}
                onChange={(v) => handleChange("tempoAlta", v)}
                width={160}
              />
            </View>
            <SwitchField
              label="Risco de Obstrução"
              value={form.riscoObstrucao}
              onValueChange={(v) => handleChange("riscoObstrucao", v)}
            />
          </Card>

          <Pressable
            style={{
              backgroundColor: "#1565C0",
              padding: 16,
              borderRadius: 12,
              alignItems: "center",
              marginTop: 16,
            }}
            onPress={handleSave}
          >
            <Text style={{ color: "#FFF", fontSize: 18, fontWeight: "bold" }}>
              SALVAR REGISTRO
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};