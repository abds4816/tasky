"use client";

import React, { FC } from "react";
import { Button } from "@/components/ui/button";

interface DeleteProjectProps {
  projectId: string | undefined;
}

const DeleteProject: FC<DeleteProjectProps> = ({ projectId }) => {
  if (!projectId) {
    return null;
  }

  return <Button variant="destructive">delete</Button>;
};

export default DeleteProject;
