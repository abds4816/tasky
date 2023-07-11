import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

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
        <DialogHeader>add project</DialogHeader>
        test
      </DialogContent>
    </Dialog>
  );
};

export default AddProject;
