"use client";

import ContainerWrapper from "@/components/ContainerWrapper";
import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Edit, EditIcon, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

const links = [
  { href: "/account-settings", label: "Account settings" },
  { href: "/support", label: "Support" },
  { href: "/license", label: "License" },
  { href: "/sign-out", label: "Sign out" },
];

const UserNavigationPanel = () => {
  const { data: session, status } = useSession();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button>
        <div className="relative">
          <button className="w-12 h-12 mt-1 bg-grey relative hover:bg-black/10 flex items-center justify-center rounded-full cursor-pointer">
            <User className="w-5 h-5 text-black" />
          </button>
        </div>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-100"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-left absolute left-[-10rem] md:left-[-10rem] mt-2 w-56 rounded-md bg-white divide-y divide-gray-100 focus:outline-none border border-grey">
          <div className="">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/editor"
                  className={clsx(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "px-4 py-3 text-sm flex items-center justify-start hover:bg-grey cursor-pointer text-dark-grey pl-8"
                  )}
                >
                  <EditIcon className="w-5 h-5 mr-3" />
                  <p>Write</p>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href={`/user/${session?.user?.email}`}
                  className={clsx(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "px-4 py-3 text-sm flex items-center justify-start hover:bg-grey cursor-pointer text-dark-grey pl-8"
                  )}
                >
                  <p>Profile</p>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/dashboard/blogs"
                  className={clsx(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "px-4 py-3 text-sm flex items-center justify-start hover:bg-grey cursor-pointer text-dark-grey pl-8"
                  )}
                >
                  <p>Dashboard</p>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/settings/edit-profile"
                  className={clsx(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "px-4 py-3 text-sm flex items-center justify-start hover:bg-grey cursor-pointer text-dark-grey pl-8"
                  )}
                >
                  <p>Setting</p>
                </Link>
              )}
            </Menu.Item>
            <span className="absolute border-t border-grey w-[100%]"></span>
            <Menu.Item>
              <button
                className="text-left p-4 hover:bg-grey w-full pl-8 py-4"
                onClick={() => signOut()}
              >
                <h1 className="font-bold text-xl">Sign Out</h1>
                <p className="text-dark-grey">{session?.user?.email}</p>
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserNavigationPanel;
