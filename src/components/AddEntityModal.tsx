import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Entity } from "@/types/intefaces";
import { Plus } from "lucide-react";
import { FC } from "react";

interface AddProjectProps extends Entity {
  ButtonVariant?: "default" | "secondary" | "outline" | "ghost";
}

const AddEntityModal: FC<AddProjectProps> = ({
  entity,
  form,
  ButtonVariant = "outline",
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={ButtonVariant}>
          <Plus className="w-4 h-4" />
          add {entity}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="font-semibold capitalize text-xl">
          add {entity}
        </DialogHeader>
        {form}
      </DialogContent>
    </Dialog>
  );
};

export default AddEntityModal;
