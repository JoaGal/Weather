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
  apiKey: "AIzaSyAObuYHNF9jL1S9NygPTzww9d-WOQSTmqY",
  authDomain: "weatherapp-8760e.firebaseapp.com",
  projectId: "weatherapp-8760e",
  storageBucket: "weatherapp-8760e.appspot.com",
  messagingSenderId: "574630408499",
  appId: "1:574630408499:web:29181fe9e2ed046de0ce46",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);


export const signup = async (email, password, setLoggedIn, userName, image) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    uploadImage(user.user, image);
    setLoggedIn(true);
    await updateProfile(user.user, {
      displayName: userName,
    });
  } catch (error) {
    alert("Complete all fields or email already exists")
  }
};

export const signin = async (email, password, setLoggedIn) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    setLoggedIn(true);
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
  