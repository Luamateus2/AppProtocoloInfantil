import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  StyleSheet,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { auth, db } from "../../services/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

export default function CadastroPaciente({ navigation }: any) {
  // Dados básicos
  const [idade, setIdade] = useState("");
  const [peso, setPeso] = useState("");
  const [classificacaoAsa, setClassificacaoAsa] = useState("");
  const [tipoCirurgia, setTipoCirurgia] = useState("");
  const [comorbidadeResp, setComorbidadeResp] = useState("");
  const [observacoes, setObservacoes] = useState("");

  // Pré-operatório
  const [jejumLiquidos, setJejumLiquidos] = useState(false);
  const [tempoJejum, setTempoJejum] = useState<Date | null>(null);
  const [showTempoJejum, setShowTempoJejum] = useState(false);
  const [carboPreOp, setCarboPreOp] = useState(false);
  const [viaAereaDificil, setViaAereaDificil] = useState(false);
  const [avaliacaoAnsiedade, setAvaliacaoAnsiedade] = useState(false);

  // Intra-operatório
  const [ventilacaoProtetora, setVentilacaoProtetora] = useState(false);
  const [analgesiaMultimodal, setAnalgesiaMultimodal] = useState(false);
  const [dexametasona, setDexametasona] = useState(false);
  const [capnografia, setCapnografia] = useState(false);
  const [tempoCirurgia, setTempoCirurgia] = useState<Date | null>(null);
  const [showTempoCirurgia, setShowTempoCirurgia] = useState(false);
  const [complicacoesIntra, setComplicacoesIntra] = useState("");
  const [observacoesIntra, setObservacoesIntra] = useState("");

  // Pós-operatório
  const [eva, setEva] = useState("");
  const [riscoObstrucao, setRiscoObstrucao] = useState(false);
  const [alimentacaoPrecoce, setAlimentacaoPrecoce] = useState(false);
  const [criterioAlta, setCriterioAlta] = useState(false);
  const [tempoAlta, setTempoAlta] = useState<Date | null>(null);
  const [showTempoAlta, setShowTempoAlta] = useState(false);
  const [obsPosOp, setObsPosOp] = useState("");

  const formatTime = (date: Date | null) => {
    if (!date) return "";
    return `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  const salvarPaciente = async () => {
    if (!idade || !peso || !classificacaoAsa) {
      Alert.alert("Erro", "Idade, peso e classificação ASA são obrigatórios");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Erro", "Usuário não autenticado");
      return;
    }

    const data = {
      idade: Number(idade),
      peso: parseFloat(peso),
      classificacaoAsa,
      tipoCirurgia,
      comorbidadeResp,
      observacoes,
      jejumLiquidos,
      tempoJejum: tempoJejum ? formatTime(tempoJejum) : null,
      carboPreOp,
      viaAereaDificil,
      avaliacaoAnsiedade,
      ventilacaoProtetora,
      analgesiaMultimodal,
      dexametasona,
      capnografia,
      tempoCirurgia: tempoCirurgia ? formatTime(tempoCirurgia) : null,
      complicacoesIntra,
      observacoesIntra,
      eva: eva ? Number(eva) : null,
      riscoObstrucao,
      alimentacaoPrecoce,
      criterioAlta,
      tempoAlta: tempoAlta ? formatTime(tempoAlta) : null,
      obsPosOp,
      dataCadastro: new Date().toISOString(),
      uid: user.uid,
    };

    try {
      await addDoc(collection(db, "pacientes"), data);
      Alert.alert("Sucesso", "Paciente cadastrado com sucesso");
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível salvar os dados");
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Cadastro de Paciente</Text>

        {/* Dados Básicos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dados Básicos</Text>

          <Text style={styles.label}>Idade (anos) *</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={idade}
            onChangeText={setIdade}
          />

          <Text style={styles.label}>Peso (kg) *</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={peso}
            onChangeText={setPeso}
          />

          <Text style={styles.label}>Classificação ASA *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={classificacaoAsa}
              onValueChange={(itemValue) => setClassificacaoAsa(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Selecione..." value="" />
              <Picker.Item label="ASA I" value="I" />
              <Picker.Item label="ASA II" value="II" />
              <Picker.Item label="ASA III" value="III" />
              <Picker.Item label="ASA IV" value="IV" />
            </Picker>
          </View>

          <Text style={styles.label}>Tipo de cirurgia</Text>
          <TextInput
            style={styles.input}
            value={tipoCirurgia}
            onChangeText={setTipoCirurgia}
          />

          <Text style={styles.label}>Comorbidade respiratória</Text>
          <TextInput
            style={styles.input}
            value={comorbidadeResp}
            onChangeText={setComorbidadeResp}
          />

          <Text style={styles.label}>Observações</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            multiline
            value={observacoes}
            onChangeText={setObservacoes}
          />
        </View>

        {/* Pré-operatório */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pré-operatório</Text>

          <View style={styles.row}>
            <Text>Jejum de líquidos</Text>
            <Switch value={jejumLiquidos} onValueChange={setJejumLiquidos} />
          </View>

          <Text style={styles.label}>Tempo de jejum (horas:minutos)</Text>
          <TouchableOpacity
            style={styles.timeButton}
            onPress={() => setShowTempoJejum(true)}
          >
            <Text>{tempoJejum ? formatTime(tempoJejum) : "Selecionar horário"}</Text>
          </TouchableOpacity>
          {showTempoJejum && (
            <DateTimePicker
              value={tempoJejum || new Date()}
              mode="time"
              is24Hour={true}
              onChange={(event, selectedDate) => {
                setShowTempoJejum(false);
                if (selectedDate) setTempoJejum(selectedDate);
              }}
            />
          )}

          <View style={styles.row}>
            <Text>Carboidrato pré-operatório</Text>
            <Switch value={carboPreOp} onValueChange={setCarboPreOp} />
          </View>

          <View style={styles.row}>
            <Text>Avaliação via aérea difícil</Text>
            <Switch value={viaAereaDificil} onValueChange={setViaAereaDificil} />
          </View>

          <View style={styles.row}>
            <Text>Avaliação de ansiedade</Text>
            <Switch value={avaliacaoAnsiedade} onValueChange={setAvaliacaoAnsiedade} />
          </View>
        </View>

        {/* Intra-operatório */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Intra-operatório</Text>

          <View style={styles.row}>
            <Text>Ventilação protetora</Text>
            <Switch value={ventilacaoProtetora} onValueChange={setVentilacaoProtetora} />
          </View>

          <View style={styles.row}>
            <Text>Analgesia multimodal</Text>
            <Switch value={analgesiaMultimodal} onValueChange={setAnalgesiaMultimodal} />
          </View>

          <View style={styles.row}>
            <Text>Dexametasona</Text>
            <Switch value={dexametasona} onValueChange={setDexametasona} />
          </View>

          <View style={styles.row}>
            <Text>Capnografia</Text>
            <Switch value={capnografia} onValueChange={setCapnografia} />
          </View>

          <Text style={styles.label}>Tempo de cirurgia (horas:minutos)</Text>
          <TouchableOpacity
            style={styles.timeButton}
            onPress={() => setShowTempoCirurgia(true)}
          >
            <Text>{tempoCirurgia ? formatTime(tempoCirurgia) : "Selecionar horário"}</Text>
          </TouchableOpacity>
          {showTempoCirurgia && (
            <DateTimePicker
              value={tempoCirurgia || new Date()}
              mode="time"
              is24Hour={true}
              onChange={(event, selectedDate) => {
                setShowTempoCirurgia(false);
                if (selectedDate) setTempoCirurgia(selectedDate);
              }}
            />
          )}

          <Text style={styles.label}>Complicações intra-operatórias</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            multiline
            value={complicacoesIntra}
            onChangeText={setComplicacoesIntra}
          />

          <Text style={styles.label}>Observações intra-operatórias</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            multiline
            value={observacoesIntra}
            onChangeText={setObservacoesIntra}
          />
        </View>

        {/* Pós-operatório */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pós-operatório</Text>

          <Text style={styles.label}>Escala de dor (EVA 0-10)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={eva}
            onChangeText={setEva}
          />

          <View style={styles.row}>
            <Text>Risco de obstrução vias aéreas</Text>
            <Switch value={riscoObstrucao} onValueChange={setRiscoObstrucao} />
          </View>

          <View style={styles.row}>
            <Text>Alimentação precoce</Text>
            <Switch value={alimentacaoPrecoce} onValueChange={setAlimentacaoPrecoce} />
          </View>

          <View style={styles.row}>
            <Text>Critério de alta</Text>
            <Switch value={criterioAlta} onValueChange={setCriterioAlta} />
          </View>

          <Text style={styles.label}>Tempo até alta (horas:minutos)</Text>
          <TouchableOpacity
            style={styles.timeButton}
            onPress={() => setShowTempoAlta(true)}
          >
            <Text>{tempoAlta ? formatTime(tempoAlta) : "Selecionar horário"}</Text>
          </TouchableOpacity>
          {showTempoAlta && (
            <DateTimePicker
              value={tempoAlta || new Date()}
              mode="time"
              is24Hour={true}
              onChange={(event, selectedDate) => {
                setShowTempoAlta(false);
                if (selectedDate) setTempoAlta(selectedDate);
              }}
            />
          )}

          <Text style={styles.label}>Observações pós-operatórias</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            multiline
            value={obsPosOp}
            onChangeText={setObsPosOp}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={salvarPaciente}>
          <Text style={styles.buttonText}>Salvar Paciente</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F4F8FB" },
  container: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 28, fontWeight: "bold", color: "#1F4E8C", marginBottom: 20 },
  section: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 12, color: "#333" },
  label: { fontSize: 14, fontWeight: "500", marginBottom: 4, color: "#555" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  textArea: { height: 80, textAlignVertical: "top" },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  picker: { height: 50, width: "100%" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  timeButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#1F4E8C",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});