import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, Pressable, ToastAndroid, Platform } from "react-native";
import { Patient } from "../../routes/patients";
import { Card } from "../../components/PatientForm/Card";
import { InputField } from "../../components/PatientForm/InputField";
import { SwitchField } from "../../components/PatientForm/SwitchField";
import { TimePickerField } from "../../components/PatientForm/TimePickerField";
import { DatePickerField } from "../../components/PatientForm/DatePickerField";import { db } from "../../services/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function EditPatient({ route, navigation }: any) {
  const { id } = route.params;
  const [form, setForm] = useState<Patient>({
    idade: "", peso: "", classificacaoAsa: "", tipoCirurgia: "", comorbidadeResp: "",
    observacoes: "", dataCadastro: new Date(), protocoloJejum: false, tempoJejum: new Date(),
    carboPreOp: false, viaAereaDificil: false, avaliacaoAnsiedade: false, eva: "",
    riscoObstrucao: false, alimentacaoPrecoce: false, criterioAlta: false, tempoAlta: new Date(),
    obsPosOp: "", ventilacaoProtetora: false, analgesicoMultimodal: false, dexametasona: false,
    monitorizacaoCapnografica: false, tempoCirurgia: new Date(), complicacoesIntra: "", observacoesGerais: "",
  });

  useEffect(() => {
    const loadPatient = async () => {
      const docRef = doc(db, "patients", id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) setForm(snapshot.data() as Patient);
    };
    loadPatient();
  }, [id]);

  const handleChange = (key: keyof Patient, value: any) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    const docRef = doc(db, "patients", id);
    await updateDoc(docRef, form);
    if (Platform.OS === "android") ToastAndroid.show("Paciente atualizado!", ToastAndroid.SHORT);
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
      <Card title="Informações Básicas">
        <InputField label="Idade" value={form.idade} onChange={v => handleChange("idade", v)} keyboardType="numeric" />
        <InputField label="Peso" value={form.peso} onChange={v => handleChange("peso", v)} keyboardType="numeric" />
        <InputField label="Tipo Cirurgia" value={form.tipoCirurgia} onChange={v => handleChange("tipoCirurgia", v)} />
      </Card>

      <Card title="Protocolo Intra-Operatório">
        <TimePickerField label="Tempo Jejum" value={form.tempoJejum} onChange={v => handleChange("tempoJejum", v)} />
        <SwitchField label="Jejum Líquidos" value={form.protocoloJejum} onValueChange={v => handleChange("protocoloJejum", v)} />
      </Card>

      <Pressable style={{ backgroundColor: "#1565C0", padding: 16, borderRadius: 12, alignItems: "center", marginTop: 10 }} onPress={handleSave}>
        <Text style={{ color: "#FFF", fontSize: 18, fontWeight: "bold" }}>SALVAR</Text>
      </Pressable>
    </ScrollView>
  );
}