import { FormInput } from "@/components/FormInput";
import Link from "next/link";
import { TiArrowBack } from "react-icons/ti";
import bg from "../assets/bg.jpg";
import Image from "next/image";
import { useUserContext } from "@/context/context";
import { DataInputs } from "@/components/DataInputs";
import { signin, verifyUser } from "@/firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Login() {
  const { setDataUser, dataUser} = useUserContext();
  const { inputslogin } = DataInputs();
  const router = useRouter();

  const onChange = (e) => {
    setDataUser({ ...dataUser, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    verifyUser(router)
  }, [])
  

  const handleSubmit = (e) => {
    e.preventDefault();
    signin(dataUser.email, dataUser.password, router.push("/"));
  };

  return (
    <div className="form">
      <Image src={bg} alt="bg" className="bg" />
      <Link href="./" className="back login">
        <TiArrowBack />
      </Link>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        {inputslogin.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={dataUser[input.name]}
            onChange={onChange}
          />
        ))}
        <button>Submit</button>
        <Link href="./register">Need register?</Link>
      </form>
    </div>
  );
}
