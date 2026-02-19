import { Form } from "@/components/form";
import { ThemeToggle } from "@/components/theme-toggle";

const Page = () => {
  return (
    <div className="relative min-h-screen">
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>
      <Form />
    </div>
  );
};

export default Page;
