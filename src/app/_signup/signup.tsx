"use client";

import { X } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";
import { createUser } from "./actions";

const initialState = {
  success: false,
  errors: {} as Record<string, string[]>,
  message: "",
};

export type signUpFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="bg-green-600 mx-0 mt-3 p-3 rounded hover:bg-lime-500 disabled:opacity-50"
      aria-disabled={pending}
      disabled={pending}
    >
      SIGN UP
    </button>
  );
}

function SignUpForm({ isOpen, onClose }: signUpFormProps) {
  const [state, formAction] = useFormState(createUser, initialState);
  if (!isOpen) return null;
  if (state.success) {
    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center">
        <article className="m-auto max-w-lg rounded bg-gray-700 px-16 py-6">
          <div className="flex justify-between mb-6 text-xl text-gray-400">
            <p>WELCOME TO LETTERBOXD</p>
            <button onClick={onClose} className="hover:bg-white rounded">
              <X size={30} />
            </button>
          </div>
          <div className="text-center">
            <p className="text-2xl text-green-500 mb-4">Sign Up Successful!</p>
            <p className="text-lg text-gray-300 mb-6">
              Thank you for joining Letterboxd. You can now start tracking and
              reviewing your favorite films.
            </p>
            <button
              onClick={onClose}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Close and Start Exploring
            </button>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center">
      <article className="m-auto max-w-lg rounded bg-gray-700 px-16 py-6">
        <div className="flex justify-between mb-6 text-xl text-gray-400">
          <p> JOIN LETTERBOXD</p>
          <button onClick={onClose} className="hover:bg-white rounded">
            <X size={30} />
          </button>
        </div>
        <form className="flex flex-col" action={formAction}>
          <label className="text-lg" htmlFor="email">
            Email Address
          </label>
          <input
            className="text-black py-2 px-2 focus:outline-none focus:ring-2
        focus:ring-blue-500 hover:bg-gray-300 rounded"
            type="email"
            id="email"
            name="email"
            placeholder="example@next.com"
            required
          ></input>
          {state.errors?.email && (
            <p className="text-red-500 text-sm mt-1">{state.errors.email[0]}</p>
          )}
          <br />

          <label className="text-lg" htmlFor="username">
            Username
          </label>
          <input
            className="text-black py-2 px-2 focus:outline-none focus:ring-2
        focus:ring-blue-500 hover:bg-gray-300 rounded"
            type="text"
            id="username"
            name="username"
            placeholder="ChanAG"
            required
          ></input>
          {state.errors?.username && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.username[0]}
            </p>
          )}
          <br />

          <label className="text-lg" htmlFor="password">
            Password
          </label>
          <input
            className="text-black py-2 px-2 focus:outline-none focus:ring-2
        focus:ring-blue-500 hover:bg-gray-300 rounded"
            type="password"
            id="password"
            name="password"
            required
          ></input>
          {state.errors?.passwordHash && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.passwordHash[0]}
            </p>
          )}
          <br />
          {state?.message && (
            <p role="status" className="font-bold text-red-600 text-lg  p-0">
              {state.message}
            </p>
          )}
          <br />
          <div className="flex justify-between items-center">
            <input
              className="mr-2 w-6 h-10 accent-blue-500 focus:outline-none focus:ring-2
        focus:ring-blue-500 rounded "
              type="checkbox"
              id="age-consent"
              required
            ></input>
            <label htmlFor="age-consent">
              I'm at least 16 years old and accept the
              <a
                className="ml-1 font-bold text-blue-500 focus:outline-none focus:ring-2
        focus:ring-blue-500 rounded"
                href="https://letterboxd.com/legal/terms-of-use/"
              >
                Terms of Use.
              </a>
            </label>
          </div>
          <br />
          <div className="flex justify-between items-center">
            <input
              className="mr-2 w-12 h-10 accent-blue-500 focus:outline-none focus:ring-2
        focus:ring-blue-500 hover:bg-red-800 rounded"
              type="checkbox"
              id="privacy-consent"
              required
            ></input>
            <label htmlFor="privacy-consent">
              I accept the
              <a
                className="mx-1 font-bold text-blue-500 focus:outline-none focus:ring-2
        focus:ring-blue-500 rounded"
                href="https://letterboxd.com/legal/privacy-policy/"
              >
                Privacy Policy
              </a>
              and consent to the processing of my personal information in
              accordance with it.
            </label>
          </div>
          <div>
            <SubmitButton />
          </div>
        </form>
      </article>
    </div>
  );
}
export default SignUpForm;
