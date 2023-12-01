"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { LuFileEdit } from "react-icons/lu";

export const Navbar = () => {
  const [isShowSearchBox, setIsShowSearchBox] = useState<Boolean>(false);
  return (
    <div className="navbar">
      <Link href="/" className="flex-none w-10">
        <Image alt="logo" src="/next.svg" width={50} height={50} />
      </Link>

      <div
        className={clsx(
          " absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show",
          isShowSearchBox ? "show" : "hide"
        )}
      >
        <input
          type="text"
          placeholder="Search"
          className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
        ></input>
        <IoSearchOutline className="absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-dark-grey w-6 h-6" />
      </div>

      <div className="flex items-center gap-3 md:gap-6 ml-auto">
        <button
          onClick={() => setIsShowSearchBox((current) => !current)}
          className="md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center"
        >
          <IoSearchOutline className="w-6 h-6" />
        </button>

        <Link
          href="/editor"
          className="hidden md:flex gap-2 link items-center justify-center"
        >
          <LuFileEdit className="w-4 h-4" />
          <p>Write</p>
        </Link>

        <Link href="/signin" className="btn-dark py-2">
          Sign In
        </Link>
        <Link href="/signin" className="btn-light py-2 hidden md:block">
          Sign Up
        </Link>
      </div>
    </div>
  );
};
