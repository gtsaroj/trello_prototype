import { Button, Card, Input } from "@/components";
import { useNavigate } from "react-router-dom";

interface FormContainerProp {
  title: string;
  onSubmit: () => void;
  inputs: {
    label: string;
    value: string;
    placeholder: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
  }[];
  footer: {
    path: string;
    message?: string;
    title: string;
  };
}

export const FormContainer: React.FC<FormContainerProp> = ({
  inputs,
  title,
  footer,
  onSubmit,
}) => {
  const router = useNavigate();

  return (
    <Card className="   p-8">
      <h1 className="text-center text-xl font-semibold text-[#253858] mb-6">
        {title}
      </h1>

      {/* Login Form */}
      <div className="space-y-4 ">
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

        <Button 
          onClick={() => onSubmit()}
          className="w-full cursor-pointer bg-[#0052CC] hover:bg-[#0047B3]"
        >
          Continue
        </Button>
      </div>


      {/* Footer Links */}
      <div className="mt-6 text-center text-sm">
        <div className="space-x-2">
          <a href="#" className="text-[#0052CC] hover:underline">
            {footer.message}
          </a>
          <span className="text-gray-500">•</span>
          <span
            onClick={() => router(`${footer.path}`)}
            className="text-[#0052CC] hover:underline"
          >
            {footer.title}
          </span>
        </div>
      </div>
    </Card>
  );
};
