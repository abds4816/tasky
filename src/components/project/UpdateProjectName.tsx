"use client";

import { Project } from "@prisma/client";
import { FC, useState } from "react";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface UpdateProjectNameProps {
  project: Project | undefined;
}

const UpdateProjectName: FC<UpdateProjectNameProps> = ({ project }) => {
  const [projectName, setProjectName] = useState(project.name);
  return (
    <>
      <CardContent>
        <Input
          value={projectName}
          className="w-80"
          onChange={(e) => setProjectName(e.target.value)}
        />
      </CardContent>
      <Separator />
      <CardFooter className="flex justify-end py-2">
        <Button>save</Button>
      </CardFooter>
    </>
  );
};

export default UpdateProjectName;
