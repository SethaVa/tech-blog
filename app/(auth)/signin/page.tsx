"use client";

import ContainerWrapper from "@/components/ContainerWrapper";
import InputBox from "@/components/InputBox";
import { Key, Mail, User } from "lucide-react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
  return (
    <ContainerWrapper keyValue="signIn">
      <section className="h-cover flex items-center justify-center">
        <form className="w-[80%] max-w-[400px]">
          <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
            Welcome back
          </h1>

          <InputBox name="email" type="email" placeholder="Email" icon={Mail} />

          <InputBox
            name="password"
            type="password"
            placeholder="Password"
            icon={Key}
          />

          <button className="btn-dark center mt-14" type="submit">
            Sign-In
          </button>

          <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
            <hr className="w-1/2 border-black" />
            <p>Or</p>
            <hr className="w-1/2 border-black" />
          </div>

          <button className="btn-dark flex items-center justify-center gap-4 w-[90%] center">
            <FcGoogle className="w-6 h-6" />
            continue with google
          </button>

          <p className="mt-6 text-dark-grey text-xl text-center">
            Don't have an account ?
            <Link href="/signup" className=" underline text-black text-xl ml-1">
              Join us today
            </Link>
          </p>
        </form>
      </section>
    </ContainerWrapper>
  );
};

export default SignIn;
