"use client";

import { getTeamById } from "@/actions/getTeamById";
import ImageUpload from "@/components/ImageUpload";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { MemberRequest, MemberValidator } from "@/lib/validators/member";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { FC } from "react";
import { useForm } from "react-hook-form";

interface MembersFormProps {}

const MembersForm: FC<MembersFormProps> =  ({}) => {
  const params = useParams()
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<MemberRequest>({
    resolver: zodResolver(MemberValidator),
    mode: "onChange",
  });

  const { mutate: addMemeber, isLoading } = useMutation({
    mutationFn: async ({
      name,
      email,
      role,
      imageUrl
    }: MemberRequest) => {
      const payload: MemberRequest = { name, email, role, imageUrl};
      //   if (props.mode === "create") {
      //     const { data } = await axios.post(
      //       `/api/${params.projectId}/tasks`,
      //       payload
      //     );
      //     return data;
      //   } else {
      //     const { data } = await axios.patch(
      //       `/api/${params.projectId}/tasks/${props.task?.id}`,
      //       payload
      //     );
      //     return data;
      //   }
      const {data} = await axios.post(`/api/${params.teamId}/members`, payload)
      return data
    },
    onError: () => {
      return toast({
        title: "Something went wrong",
        description: "Task wasn't created successfully. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    },
    onSuccess: () => {
      router.refresh();
      return toast({
        title: "Task created.",
        description: "Task was created successfully!",
        duration: 5000,
      });
    },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() =>
          addMemeber({
            name: form.getValues("name"),
            email: form.getValues("email"),
            role: form.getValues("role"),
            imageUrl: form.getValues("imageUrl"),
          })
        )}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  disabled={isLoading}
                  placeholder="enter member name..."
                  //   defaultValue={
                  //     props.mode === "update" ? props.task?.title : ""
                  //   }
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  disabled={isLoading}
                  placeholder="enter member email..."
                  //   defaultValue={
                  //     props.mode === "update" ? props.task?.title : ""
                  //   }
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            // <FormItem>
            //   <FormLabel>Priority</FormLabel>
            //   <Select
            //     disabled={isLoading}
            //     onValueChange={field.onChange}
            //     defaultValue={
            //       props.mode === "update" ? props.task?.priority : ""
            //     }
            //     value={field.value}
            //   >
            //     <FormControl>
            //       <SelectTrigger>
            //         <SelectValue placeholder="select task priority" />
            //       </SelectTrigger>
            //     </FormControl>
            //     <SelectContent>
            //       <SelectItem value="low">low</SelectItem>
            //       <SelectItem value="medium">medium</SelectItem>
            //       <SelectItem value="high">high</SelectItem>
            //     </SelectContent>
            //   </Select>

            //   <FormMessage />
            // </FormItem>
            <FormItem>
              <FormLabel>role</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  disabled={isLoading}
                  placeholder="enter member role..."
                  //   defaultValue={
                  //     props.mode === "update" ? props.task?.title : ""
                  //   }
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>member picture</FormLabel>
              <FormControl>
                <ImageUpload
                  disabled={isLoading}
                  onChange={(url) => field.onChange(url)}
                  onRemove={() => field.onChange("")}
                  value={field.value ? [field.value] : []}
                />
              </FormControl>
            </FormItem>
          )}
        /> */}
        {/* <FormField
          control={form.control}
          name="team"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team</FormLabel>
              <Select
                disabled={isLoading}
                onValueChange={field.onChange}
                // defaultValue={
                //   props.mode === "update" ? props.task?.priority : ""
                // }
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="select team" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="low">low</SelectItem>
                  <SelectItem value="medium">medium</SelectItem>
                  <SelectItem value="high">high</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <div className="flex justify-end">
          <Button type="submit" isLoading={isLoading}>
            {/* {props.mode === "update" ? "Update" : "Submit"} */}
            test
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default MembersForm;
