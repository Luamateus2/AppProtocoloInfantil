import React, { useState } from "react";
import { View, ScrollView, StatusBar, Pressable, Text, Alert, ToastAndroid, Platform, KeyboardAvoidingView } from "react-native";
import { Card } from "../../components/PatientForm/Card";
import { InputField } from "../../components/PatientForm/InputField";
import { SwitchField } from "../../components/PatientForm/SwitchField";
import { TimePickerField } from "../../components/PatientForm/TimePickerField";
import { DatePickerField } from "../../components/PatientForm/DatePickerField";

import { Patient } from "../../routes/patients";
export default function PatientFormPage() {
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

  const handleChange = (key: keyof Patient, value: any) => setForm(prev => ({ ...prev, [key]: value }));

  const validateForm = () => {
    if (!form.idade.trim()) return Alert.alert("Campos obrigatórios", "Informe a idade.");
    if (!form.peso.trim()) return Alert.alert("Campos obrigatórios", "Informe o peso.");
    if (!form.classificacaoAsa) return Alert.alert("Campos obrigatórios", "Selecione ASA.");
    const evaNum = parseInt(form.eva);
    if (form.eva && (isNaN(evaNum) || evaNum < 0 || evaNum > 10)) return Alert.alert("Valor inválido", "EVA deve ser 0-10.");
    return true;
  };

  const handleSave = () => {
    if (validateForm()) {
      if (Platform.OS === "android") ToastAndroid.show("Dados salvos!", ToastAndroid.SHORT);
      console.log("Submit:", form);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#E3F2FD" }}>
      <StatusBar backgroundColor="#1565C0" barStyle="light-content" translucent />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
          {/* Informações básicas */}
          <Card title="Informações Básicas">
            <InputField label="Idade" value={form.idade} onChange={v => handleChange("idade", v)} keyboardType="numeric" width="48%" />
            <InputField label="Peso" value={form.peso} onChange={v => handleChange("peso", v)} keyboardType="numeric" width="48%" />
            <InputField label="Tipo de Cirurgia" value={form.tipoCirurgia} onChange={v => handleChange("tipoCirurgia", v)} />
            <InputField label="Comorbidade Respiratória" value={form.comorbidadeResp} onChange={v => handleChange("comorbidadeResp", v)} />
          </Card>

          {/* Protocolo Intra-Operatório */}
          <Card title="Protocolo Intra-Operatório">
            <TimePickerField label="Tempo de Jejum" value={form.tempoJejum} onChange={v => handleChange("tempoJejum", v)} width="48%" />
            <TimePickerField label="Tempo de Cirurgia" value={form.tempoCirurgia} onChange={v => handleChange("tempoCirurgia", v)} width="48%" />
            <SwitchField label="Jejum Líquidos" value={form.protocoloJejum} onValueChange={v => handleChange("protocoloJejum", v)} />
            <SwitchField label="Carbo Pré-Operatório" value={form.carboPreOp} onValueChange={v => handleChange("carboPreOp", v)} />
          </Card>

          {/* Protocolo Pós-Operatório */}
          <Card title="Protocolo Pós-Operatório">
            <InputField label="EVA" value={form.eva} onChange={v => handleChange("eva", v)} keyboardType="numeric" width="48%" />
            <TimePickerField label="Tempo para Alta" value={form.tempoAlta} onChange={v => handleChange("tempoAlta", v)} width="48%" />
            <SwitchField label="Risco de Obstrução" value={form.riscoObstrucao} onValueChange={v => handleChange("riscoObstrucao", v)} />
          </Card>

          <Pressable style={{ backgroundColor: "#1565C0", padding: 16, borderRadius: 12, alignItems: "center", marginTop: 10 }} onPress={handleSave}>
            <Text style={{ color: "#FFF", fontSize: 18, fontWeight: "bold" }}>SALVAR REGISTRO</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}