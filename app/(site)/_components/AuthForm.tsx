"use client";

import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { toast } from "react-hot-toast";
import InputBox from "@/components/InputBox";
import { Key, Mail, User } from "lucide-react";
import ContainerWrapper from "@/components/ContainerWrapper";
import Button from "@/app/_components/Button";
import { FcGoogle } from "react-icons/fc";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users");
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() =>
          signIn("credentials", {
            ...data,
            redirect: false,
          })
        )
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials!");
          }

          if (callback?.ok) {
            router.push("/users");
          }
        })
        .catch(() => toast.error("Something went wrong!"))
        .finally(() => setIsLoading(false));
    }

    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials!");
          }

          if (callback?.ok) {
            router.push("/users");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid credentials!");
        }

        if (callback?.ok) {
          router.push("/users");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <ContainerWrapper keyValue="signUp">
      <section className="h-cover flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[80%] max-w-[400px]"
        >
          <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
            {variant === "LOGIN" ? "Welcome back" : "Join us today"}
          </h1>

          {variant !== "LOGIN" && (
            <InputBox
              id="name"
              disabled={isLoading}
              register={register}
              errors={errors}
              name="name"
              type="text"
              placeholder="Full Name"
              icon={User}
            />
          )}

          <InputBox
            id="email"
            disabled={isLoading}
            register={register}
            errors={errors}
            name="email"
            type="email"
            placeholder="Email"
            icon={Mail}
          />

          <InputBox
            id="password"
            disabled={isLoading}
            register={register}
            errors={errors}
            name="password"
            type="password"
            placeholder="Password"
            icon={Key}
          />

          <button className="btn-dark center mt-14" type="submit">
            {variant === "LOGIN" ? "Sign-In" : "Sign-Up"}
          </button>

          <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
            <hr className="w-1/2 border-black" />
            <p>Or</p>
            <hr className="w-1/2 border-black" />
          </div>

          <button
            className="btn-dark flex items-center justify-center gap-4 w-[90%] center"
            onClick={() => socialAction("google")}
          >
            <FcGoogle className="w-6 h-6" />
            continue with google
          </button>

          {variant === "LOGIN" ? (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Don't have an account ?
              <span
                onClick={() => setVariant("REGISTER")}
                className=" underline text-black text-xl ml-1"
              >
                Join us today
              </span>
            </p>
          ) : (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Already a member?
              <span
                onClick={toggleVariant}
                className=" underline text-black text-xl ml-1"
              >
                Sign in here.
              </span>
            </p>
          )}
        </form>
      </section>
    </ContainerWrapper>
  );
};

export default AuthForm;
