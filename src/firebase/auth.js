import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY_FIREBASE,
  authDomain: process.env.NEXT_PUBLIC_AUTH,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);


export const signup = async (email, password, userName, image, redirec) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    uploadImage(user.user, image);
    await updateProfile(user.user, {
      displayName: userName,
    });
    redirec
  } catch (error) {
    alert("Complete all fields or email already exists")
  }
};

export const signin = async (email, password, redirec) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    redirec
  } catch (error) {
    alert("Email or password incorrect")
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    return error;
  }
};

export const loadedUser = (setUser) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    }
  });
};

export const verifyUser = (router) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/")
      }
    });
};

// Storage

// export const uploadCities = async (user, cities) => {
//   const storageRef = ref(storage, `cities/${user?.uid}`);
//   uploadBytes(storageRef, cities);
// };

const uploadImage = async (user, image) => {
  const storageRef = ref(storage, `images/${user?.uid}`);
  uploadBytes(storageRef, image);
};

export const setUserPhoto = () => {
  onAuthStateChanged(auth, async (user) => {
    const storageRef = ref(storage, `images/${user?.uid}`);
    const url = await getDownloadURL(storageRef);
    await updateProfile(user, {
      photoURL: url,
    });
  });
}
  