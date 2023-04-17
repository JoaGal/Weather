import Image from "next/image";
import weather from "../assets/weather.png";
import bg from "../assets/bg.jpg";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { setUserPhoto } from "@/firebase/auth";

export default function Loading() {

  const route = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setUserPhoto();
      console.log("set photo");
      setTimeout(() => {
        route.push("/");
        console.log("redirect");
      }, 1000);
    }, 5000);
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
