import { Loader2 } from "lucide-react";
import React from "react";

const Loader = () => {
  return (
    <div className="fixed w-full h-full top-0 left-0 flex items-center justify-center">
      <Loader2 className="w-12 h-12 animate-spin" />
    </div>
  );
};

export default Loader;
