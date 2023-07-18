"use client";

import { FC, useState } from "react";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Clipboard, CopyCheck } from "lucide-react";

interface CopyProjectIdProps {
  id: string | undefined;
}

const CopyProjectId: FC<CopyProjectIdProps> = ({ id }) => {
  const [isClicked, setIsClicked] = useState<Boolean>(false);
  function copyProjectId() {
    setIsClicked(true);
    navigator.clipboard.writeText(id!);
    setTimeout(() => {
      setIsClicked(false);
    }, 1500);
  }

  return (
    <>
      <CardContent>
        <Input value={id} className="w-80" />
      </CardContent>
      <Separator />
      <CardFooter className="flex justify-end py-2">
        <Button onClick={copyProjectId}>
          {isClicked ? (
            <CopyCheck className="w-4 h-4" />
          ) : (
            <Clipboard className="w-4 h-4" />
          )}
          {isClicked ? "copied" : "copy ID"}
        </Button>
      </CardFooter>
    </>
  );
};

export default CopyProjectId;
