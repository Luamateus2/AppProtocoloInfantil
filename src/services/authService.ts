import { signInWithEmailAndPassword,createUserWithEmailAndPassword,sendPasswordResetEmail} from 'firebase/auth';
import { auth } from './firebaseConfig';


export async function login(email: string, senha: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, senha);
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
export async function register(email: string, senha: string) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    senha
  );
  return userCredential.user;
}
export async function resetPassword(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    throw new Error(error.message);
  }
}