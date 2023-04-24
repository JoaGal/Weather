import Image from "next/image";
import weather from "../assets/weather.png";
import bg from "../assets/bg.jpg";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { setUserPhoto, verifyUser } from "@/firebase/auth";

export default function Loading() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setUserPhoto();
      setTimeout(() => {
      router.asPath === "/loading" && router.push("/");
      }, 1500);
    }, 4000);
      verifyUser(router)
  }, []);

  return (
    <>
      <Image src={bg} alt="bg" className="bg" />
      <div className="loading">
        <Image src={weather} alt="weather" className="weather" />
      </div>
    </>
  );
}
