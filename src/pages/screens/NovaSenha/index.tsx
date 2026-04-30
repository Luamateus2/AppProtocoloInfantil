import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './styles';

export default function NovaSenha() {
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');

  const validacoes = {
    tamanho: senha.length >= 8,
    maiuscula: /[A-Z]/.test(senha),
    minuscula: /[a-z]/.test(senha),
    numero: /\d/.test(senha),
    especial: /[@#$%^&*!]/.test(senha),
  };

  const senhaValida =
    Object.values(validacoes).every(Boolean) &&
    senha === confirmar;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4A90E2', '#1E3C72']}
        style={styles.header}
      >
        <View style={styles.logo}>
          <Text>LOGO</Text>
        </View>
      </LinearGradient>
      <View style={styles.content}>
        <Text style={styles.title}>Criar Nova senha</Text>

        <Text style={styles.description}>
          Crie uma senha forte para manter sua conta protegida. Depois é só confirmar e voltar ao aplicativo.
        </Text>

        <TextInput
          placeholder="Senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
          style={styles.input}
        />
        <TextInput
          placeholder="Confirmar senha"
          secureTextEntry
          value={confirmar}
          onChangeText={setConfirmar}
          style={styles.input}
        />
        <View style={styles.rules}>
          <Text style={styles.rule}>✔ Mínimo de 8 caracteres</Text>
          <Text style={styles.rule}>✔ Uma letra maiúscula</Text>
          <Text style={styles.rule}>✔ Uma letra minúscula</Text>
          <Text style={styles.rule}>✔ Um número</Text>
          <Text style={styles.rule}>✔ Um caractere especial (@, #, %, &...)</Text>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity style={styles.cancel}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.save,
              { opacity: senhaValida ? 1 : 0.5 },
            ]}
            disabled={!senhaValida}
          >
            <Text style={styles.saveText}>Salvar</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}