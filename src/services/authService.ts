import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import {
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { auth, db } from './firebaseConfig';


function mapAuthError(error: any) {
  const code = error?.code;

  console.log('Firebase full error:', error);

  switch (code) {
    case 'auth/invalid-email':
      return 'Email inválido';

    case 'auth/user-not-found':
      return 'Usuário não encontrado';

    case 'auth/wrong-password':
      return 'Senha incorreta';

    case 'auth/invalid-credential':
      return 'Email ou senha inválidos';

    case 'auth/email-already-in-use':
      return 'Este email já está em uso';

    case 'auth/weak-password':
      return 'Senha muito fraca (mínimo 6 caracteres)';

    case 'auth/too-many-requests':
      return 'Muitas tentativas. Tente mais tarde';

    case 'auth/network-request-failed':
      return 'Sem conexão com a internet';

    default:
      return error?.message || 'Erro inesperado';
  }
}
/* ---------------- LOGIN ---------------- */
export async function login(email: string, senha: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      senha
    );

    return userCredential.user;
  } catch (error: any) {
    console.log('Firebase error:', error); // 👈 IMPORTANTE DEBUG
    throw new Error(mapAuthError(error));
}
}

/* ---------------- REGISTER ---------------- */
export async function register(
  email: string,
  senha: string,
  crm: string
) {
  try {
    // 🔍 VALIDAR CRM ANTES DE CRIAR USUÁRIO
    const q = query(
      collection(db, 'users'),
      where('crm', '==', crm)
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      throw new Error('CRM já cadastrado');
    }

    // 🔥 SE PASSOU, CRIA NO AUTH
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      senha
    );

    return userCredential.user;

  } catch (error: any) {
    throw new Error(mapAuthError(error));
  }
}
/* ---------------- RESET PASSWORD ---------------- */
export async function resetPassword(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    throw new Error(mapAuthError(error.code));
  }
}
