import { Form } from "@/components/form";
import { ThemeToggle } from "@/components/theme-toggle";

const Page = () => {
  return (
    <div className="relative min-h-screen flex justify-center items-center">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="">
        <h1 className="text-3xl font-bold">Upload</h1>
        <Form />
      </div>
    </div>
  );
};

export default Page;
