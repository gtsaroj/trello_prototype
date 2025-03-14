import { Trello } from "lucide-react";
import React from "react";
import { FormContainer } from "../formContainer/formContainer";

export const Register = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  return (
    <div className="min-h-screen bg-[#F9FAFC] flex items-center justify-center p-4">
      <div className="w-full max-w-[400px] space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Trello className="h-8 w-8 text-[#0052CC]" />
            <span className="ml-2 text-[#253858] text-3xl font-bold">
              Trello
            </span>
          </div>
        </div>
        <FormContainer
          footer={{
            path: "/login",
            title: "Login here",
            message:"Already Have An Account?"
          }}
          title="Register with trelloh"
          inputs={[
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
          className="fixed bottom-0 left-0 w-64 opacity-50 pointer-events-none"
        />
        <img
          src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=600&h=800&q=80"
          alt="Right illustration"
          className="fixed bottom-0 right-0 w-64 opacity-50 pointer-events-none"
        />
      </div>
    </div>
  );
};
