import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import AddProjectForm from "./AddProjectForm";

const AddProject = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="w-4 h-4" />
          add project
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="font-semibold capitalize text-xl">
          add project
        </DialogHeader>
        <AddProjectForm />
      </DialogContent>
    </Dialog>
  );
};

export default AddProject;
