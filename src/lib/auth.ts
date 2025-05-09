import { GoogleAuthProvider, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import api from './kyInstance';

export const signInWithFirebase = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error logging in:', error);
    throw new Error(error instanceof Error ? error.message : 'Erro desconhecido');
  }
};


export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error('Erro ao logar com Google:', error);
    throw new Error(error instanceof Error ? error.message : 'Erro desconhecido');
  }
};

export async function setToken(token: string) {
  const response = await api.post('auth/set-token', {
    json: { token },
  }).json();

  return response;
}

export const signOutFirebase = async () => {
  try {
    await signOut(auth);
    await removeToken();
  } catch (error) {
    console.error('Error logging out:', error);
    throw new Error(error instanceof Error ? error.message : 'Erro desconhecido');
  }
};

export async function removeToken() {
  const response = await api.post('auth/remove-token').json();

  return response;
}


export const signUpWithEmail = async (email: string, password: string, name: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, { displayName: name });

    return user;
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    throw new Error(error instanceof Error ? error.message : 'Erro desconhecido');
  }
};

export const recoverPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error('Erro ao resetar senha:', error);
    throw new Error(error instanceof Error ? error.message : 'Erro desconhecido');
  }
};