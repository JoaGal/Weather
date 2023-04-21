import { FormInput } from "@/components/FormInput";
import Link from "next/link";
import { TiArrowBack } from "react-icons/ti";
import { AiFillCamera } from "react-icons/ai";
import bg from "../assets/bg.jpg";
import Image from "next/image";
import { signup } from "../firebase/auth";
import "firebase/auth";
import { useRouter } from "next/router";
import { useUserContext } from "@/context/context";
import { DataInputs } from "@/components/DataInputs";

export default function Register() {
  const router = useRouter();
  const { loggedIn, setLoggedIn, dataUser, setDataUser } = useUserContext();
  const { inputsRegister } = DataInputs();

  const onChange = (e) => {
    setDataUser({ ...dataUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      dataUser.password === dataUser.confirmPassword &&
      dataUser.username !== "" &&
      dataUser.image !== "" &&
      dataUser.email !== "" &&
      dataUser.password !== ""
    ) {
      signup(
        dataUser.email,
        dataUser.password,
        setLoggedIn,
        dataUser.username,
        dataUser.image
      );
    }
  };
  if (loggedIn) {
    router.push("/loading");
  }

  const saveImage = (e) => {
    if (e.target.files[0]?.type.includes("image/")) {
      setDataUser({
        ...dataUser,
        image: e.target.files[0],
      });
    }
  };

  return (
    <div className="form">
      <Link href="./" className="back register">
        <TiArrowBack />
      </Link>
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <label className="register-image">
          {!dataUser.image ? (
            <AiFillCamera size="50" />
          ) : (
            <Image
              className="personalInf-img"
              alt="Profile picture"
              src={URL.createObjectURL(dataUser.image)}
              width="100"
              height="100"
            />
          )}
          <input
            name="image"
            type="file"
            accept="image/png, image/jpeg"
            onChange={saveImage}
          />
        </label>
        {inputsRegister.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={dataUser[input.name]}
            onChange={onChange}
          />
        ))}
        <button>Submit</button>
      </form>
    </div>
  );
}
