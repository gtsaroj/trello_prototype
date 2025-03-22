import { Trello } from "lucide-react";
import React from "react";
import { FormContainer } from "../formContainer/formContainer";
import { ApiError } from "@/helpers";
import { userRegister_action } from "@/action";
import { nanoid } from "@reduxjs/toolkit";
import { useMutation } from "@tanstack/react-query";
import { useAppDispatch } from "@/hooks";

export const Register = () => {
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");

  const dispatch = useAppDispatch();

  async function handleForm() {
    // if (!email || !password || !name) {
    //   return toaster({
    //     className: "bg-red-50 ",
    //     icon: "error",
    //     message: "All fields are required",
    //     title: "Error",
    //   });
    // }
    try {
      await dispatch(
        userRegister_action({
          email: email,
          displayName: name,
          role: "authenticatedUser",
          password: password,
          uid: nanoid(),
        })
      );
    } catch (error) {
      if (error instanceof ApiError) {
        console.log(error);
      }
    }
  }

  const { mutate } = useMutation({
    mutationFn: handleForm,
  });

  return (
    <div className="min-h-screen bg-[#F9FAFC] flex items-center justify-center p-4">
      <div className="w-full max-w-[400px] space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Trello className="h-8 w-8 text-[#0052CC]" />
            <span className="ml-2 text-[#253858] text-3xl font-bold">
              Trelyoh
            </span>
          </div>
        </div>
        <FormContainer
          onSubmit={() => mutate()}
          footer={{
            path: "/login",
            title: "Login here",
            message: "Already Have An Account?",
          }}
          title="Register with trellyoh"
          inputs={[
            {
              setValue: setName,
              label: "Name",
              value: name,
              placeholder: "Enter your name",
            },
            {
              setValue: setEmail,
              label: "Email",
              value: email,
              placeholder: "Enter your email",
            },
            {
              label: "Password",
              placeholder: "Enter your password",
              value: password,
              setValue: setPassword,
            },
            {
              label: "Confirm Password",
              placeholder: "Enter your confirm password",
              setValue: setConfirmPassword,
              value: confirmPassword,
            },
          ]}
        />

        {/* Background Illustrations */}
        <img
          src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=600&h=800&q=80"
          alt="Left illustration"
          className="fixed bottom-0  md:flex hidden left-0 w-64 opacity-50 pointer-events-none"
        />
        <img
          src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=600&h=800&q=80"
          alt="Right illustration"
          className="fixed bottom-0  md:flex hidden right-0 w-64 opacity-50 pointer-events-none"
        />
      </div>
    </div>
  );
};
