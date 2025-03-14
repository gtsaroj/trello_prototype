import { Button, Card, Input } from "@/components";
import { Apple, Slack } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FormContainerProp {
  title: string;
  inputs: {
    label: string;
    value: string;
    placeholder: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
  }[];
  footer: {
    path: string, 
    message?: string,
    title: string
  }
}

export const FormContainer: React.FC<FormContainerProp> = ({
  inputs,
  title,
  footer
}) => {
  const router= useNavigate()
  return (
    <Card className="p-8">
      <h1 className="text-center text-xl font-semibold text-[#253858] mb-6">
        {title}
      </h1>

      {/* Login Form */}
      <div className="space-y-4">
        {inputs?.map((input, index) => (
          <Input
            key={index}
            value={input.value}
            onChange={(e) => input.setValue(e.target.value)}
            placeholder={input.placeholder}
          />
        ))}
        <div className="flex items-center cursor-pointer space-x-2">
          <input type="checkbox" id="remember" className="accent-black  " />
          <label
            htmlFor="remember"
            className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Remember me
          </label>
        </div>

        <Button className="w-full bg-[#0052CC] hover:bg-[#0047B3]">
          Continue
        </Button>
      </div>

      {/* Social Login Options */}
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <Button variant="outline" className="w-full">
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Google
          </Button>
          <Button variant="outline" className="w-full">
            <img
              src="https://www.microsoft.com/favicon.ico"
              alt="Microsoft"
              className="w-5 h-5 mr-2"
            />
            Microsoft
          </Button>
          <Button variant="outline" className="w-full">
            <Apple className="w-5 h-5 mr-2" />
            Apple
          </Button>
          <Button variant="outline" className="w-full">
            <Slack className="w-5 h-5 mr-2" />
            Slack
          </Button>
        </div>
      </div>

      {/* Footer Links */}
      <div className="mt-6 text-center text-sm">
        <div className="space-x-2">
          <a href="#" className="text-[#0052CC] hover:underline">
         {footer.message}
          </a>
          <span className="text-gray-500">•</span>
          <span onClick={()=>router(`${footer.path}`)} className="text-[#0052CC] hover:underline">
          {footer.title}
          </span>
        </div>
      </div>
    </Card>
  );
};
