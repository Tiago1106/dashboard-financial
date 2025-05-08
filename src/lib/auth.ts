import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

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

export const signOutFirebase = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error logging out:', error);
    throw new Error(error instanceof Error ? error.message : 'Erro desconhecido');
  }
};