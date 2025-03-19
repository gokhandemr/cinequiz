import { initializeApp } from 'firebase/app';
// Auth
import { createUserWithEmailAndPassword, deleteUser, getAuth, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
// Database
import { collection, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRE_BASE_API_KEY,
  authDomain: import.meta.env.VITE_FIRE_BASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Kayıt İşlemi
export const firebaseSignUp = async (username, email, password) => {
  let user = null;
  try {
    // Kullanıcı adı kontrolü
    const docRef = doc(db, 'users', username);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) throw new Error('Kullanıcı adı zaten kayıtlı.');

    // Kullanıcıyı oluştur
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    user = userCredential.user;
    if (!user) throw new Error('Kullanıcı oluşturulamadı.');

    // Kullanıcı adını güncelle
    await updateProfile(user, { displayName: username });

    // Kullanıcıyı veritabanına ekle
    const responseDatabase = await addUserToDatabase(user.displayName, user.email, user.uid);
    return responseDatabase;
  } catch (error) {
    let errorMessage = error.message;
    // Hata mesajları
    if (error.code == 'auth/invalid-email') errorMessage = 'Geçersiz e-posta adresi';
    if (error.code == 'auth/email-already-in-use') errorMessage = 'Bu e-posta adresi zaten kayıtlı';
    // Kullanıcıyı sil
    if (user) await deleteUser(user);
    console.warn(error.message);
    return { success: false, error: errorMessage };
  }
};

// Giriş İşlemi
export const firebaseSignIn = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: user.uid };
  } catch (error) {
    let errorMessage = error.message;
    if (error.code == 'auth/weak-password') errorMessage = 'Şifre en az 6 karakter olmalı';
    if (error.code == 'auth/invalid-email') errorMessage = 'Geçersiz e-posta adresi';
    if (error.code == 'auth/user-not-found') errorMessage = 'Kullanıcı bulunamadı';
    if (error.code == 'auth/wrong-password') errorMessage = 'Şifre hatalı';
    console.warn(error.message);
    return { success: false, error: errorMessage };
  }
};

// Çıkış işlemi
export const firebaseSignOut = async () => {
  signOut(auth)
    .then(() => {
      return { success: true };
    })
    .catch((error) => {
      console.warn(error.message);
      return { success: false, error: error.message };
    });
};

// Databas'e kayıt işlemi
export const addUserToDatabase = async (username) => {
  try {
    await setDoc(doc(db, 'users', username), {});
    return { success: true };
  } catch (error) {
    console.warn(error.message);
    return { success: false, error: error.message };
  }
};

// Database'e skor kayıt işlemi
export const saveUserScore = async (username, category, score) => {
  try {
    const docRef = doc(db, 'users', `${username}`);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) throw new Error('Kullanıcı bulunamadı.');

    const currentScore = docSnap.data()?.[category] || 0; // Varsayılan olarak 0
    if (score > currentScore) {
      await updateDoc(docRef, { [category]: score });
    }

    return { success: true };
  } catch (error) {
    console.warn(error.message);
    return { success: false, error: error.message };
  }
};

// Sıralamayı çekme işlemi
export const getRanking = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users'));
    let users = querySnapshot.docs
      .map((doc) => {
        const data = doc.data();
        const name = doc.id;
        return Object.entries(data).map(([category, score]) => ({
          name,
          category,
          score,
        }));
      })
      .flat() // İç içe diziyi düzleştir
      .sort((a, b) => b.score - a.score);
    return users;
  } catch (error) {
    console.warn(`Sıralama verileri alınırken hata oluştu. Sunucu mesajı: ${error.message}`);
    return [];
  }
};

// Kullanıcın kendi skorlarını çekme işlemi
export const getMyScores = async (username) => {
  try {
    const docRef = doc(db, 'users', username);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) throw new Error('Kullanıcı bilgisi alınamadı.');

    const toArray = Object.entries(docSnap.data()).map(([key, value]) => ({
      category: key,
      score: value,
    }));
    return { success: true, scores: toArray };
  } catch (error) {
    let errorMessage = `Puanlar alınırken hata oluştu. Sunucu mesajı: ${error.message}`;
    console.warn(errorMessage);
    return { success: false, error: errorMessage };
  }
};
