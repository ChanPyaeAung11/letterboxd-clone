"use client";

import Link from "next/link";
import { Film, User, X } from "lucide-react";
import { useState } from "react";
import SignUpForm from "./_signup/signup";
import { SignInForm } from "./_signin/signin";

function SignInNavbar({ close }: { close: () => void }) {
  return (
    <nav className="flex p-0 m-0">
      <SignInForm close={close} />
    </nav>
  );
}

function DefaultNavbar({ openSignInNavbar }: { openSignInNavbar: () => void }) {
  const [isSignUpFormOpen, setIsSignUpFormOpen] = useState(false);

  const openSignUpForm = () => setIsSignUpFormOpen(true);
  const closeSignUpForm = () => setIsSignUpFormOpen(false);
  return (
    <>
      <nav>
        <ul className="flex space-x-4">
          <li className="hover:underline" onClick={openSignInNavbar}>
            SIGN IN
          </li>
          <li className="hover:underline" onClick={openSignUpForm}>
            CREATE ACCOUNT
          </li>

          <li>
            <Link href="/films" className="hover:underline">
              FILMS
            </Link>
          </li>
          <li>
            <Link href="/profile" className="hover:underline flex items-center">
              <User className="mr-1" /> Profile
            </Link>
          </li>
        </ul>
      </nav>

      <SignUpForm
        isOpen={isSignUpFormOpen}
        onClose={closeSignUpForm}
      ></SignUpForm>
    </>
  );
}

export default function Navbar() {
  const [userSignedIn, setUserSignedIn] = useState(false);
  const [isSignInNavbar, setIsSignInNavbar] = useState(false);

  const openSignInNavbar = () => {
    setIsSignInNavbar(true);
  };
  const closeSignInNavbar = () => {
    setIsSignInNavbar(false);
  };

  return (
    <>
      <header className="bg-green-600 text-white w-full">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold flex items-center">
            <Film className="mr-2" />
            Letterboxd Clone
          </Link>
          {isSignInNavbar ? (
            <SignInNavbar close={closeSignInNavbar} />
          ) : (
            <DefaultNavbar openSignInNavbar={openSignInNavbar} />
          )}
        </div>
      </header>
    </>
  );
}
