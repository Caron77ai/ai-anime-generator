import { Button } from "@/components/ui/button";
import { RocketIcon } from "lucide-react";
import Link from "next/link";

const CTAButton = ({ locale }: { locale: any }) => {
  return (
<<<<<<< HEAD
    <Link href="/animegenerator" passHref>
=======
    <Link
      href="https://www.aianimegenerators.com/"
      target="_blank"
      rel="noopener noreferrer nofollow"
    >
>>>>>>> dev
      <Button
        variant="default"
        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white"
        aria-label="Get Boilerplate"
      >
        <RocketIcon />
        {locale.title}
      </Button>
    </Link>
  );
};

export default CTAButton;
