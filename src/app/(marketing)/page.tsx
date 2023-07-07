import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <section className="flex flex-col items-center gap-6">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Lorem ipsum dolor sit amet.
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        The king, seeing how much happier his subjects were, realized the error
        of his ways and repealed the joke tax.
      </p>
      <Button size="lg">get started</Button>
    </section>
  );
}
