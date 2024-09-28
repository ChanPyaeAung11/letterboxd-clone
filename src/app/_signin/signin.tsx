import { X } from "lucide-react";
import { useFormStatus, useFormState } from "react-dom";
import { SignInAction } from "./actions";

const initialState = {
  success: false,
  errors: {} as Record<string, string[]>,
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="text-sm rounded bg-white text-black hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-5 px-3 py-0.5"
      aria-disabled={pending}
      disabled={pending}
    >
      SIGN IN
    </button>
  );
}

export function SignInForm({ close }: { close: () => void }) {
  const [state, formAction] = useFormState(SignInAction, initialState);
  return (
    <form className="flex justify-center" action={formAction}>
      <button className="hover:text-gray-300 rounded mr-3 mt-5" onClick={close}>
        <X size={24} />
      </button>
      <div className="mr-2 flex flex-col mt-0 ">
        <label className="text-sm mr-3" htmlFor="username">
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          className="text-black hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
        ></input>
      </div>
      <div className="mr-3 flex flex-col mt-0 ">
        <label className="text-sm mr-4" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="text-black hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
        ></input>
      </div>
      {state.errors?.username && (
        <p className="text-red-600" role="status">
          {state.errors?.username}
        </p>
      )}
      {state.errors?.password && (
        <p className="text-red-600" role="status">
          {state.errors?.password}
        </p>
      )}
      {state.message && (
        <p className="text-red-600" role="status">
          {state.message}
        </p>
      )}
      <div>
        <SubmitButton />
      </div>
    </form>
  );
}
