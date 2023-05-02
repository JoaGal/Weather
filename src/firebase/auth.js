import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes, uploadString } from "firebase/storage";
import { collection, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";

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
const db = getFirestore(app);


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

export const loadedUser = (setUser, setCordSave) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
      loadedCities(user.uid, setCordSave)
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

export const uploadCities = async (user, cords, setCordSave) => {
 try{
   await setDoc(doc(db, "cities", `${user?.uid}`), {
    cords
  });
  setCordSave(cords)
  }catch(error){
    console.log(error)
 }
}

 const loadedCities = async (id, setCordSave)=>{
  const querySnapshot = await getDoc(doc(db, "cities", id));
  if (querySnapshot.exists()) {
    setCordSave(querySnapshot.data().cords)
  } else {
    console.log("No such document!");
  }
}

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
  