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

interface AddMembersFormProps {}

const AddMembersForm: FC<AddMembersFormProps> = ({}) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<MemberRequest>({
    resolver: zodResolver(MemberValidator),
    mode: "onChange",
  });

  const { mutate: addMemeber, isLoading } = useMutation({
    mutationFn: async ({ name, email, role, imageUrl }: MemberRequest) => {
      const payload: MemberRequest = { name, email, role, imageUrl };
      const { data } = await axios.post(
        `/api/teams/${params.teamId}/members`,
        payload
      );
      return data;
    },
    onError: () => {
      router.refresh();
      return toast({
        title: "Member created.",
        description: "Member was created successfully!",
        duration: 5000,
      });
    },
    onSuccess: () => {
      return toast({
        title: "Something went wrong",
        description: "Member wasn't created successfully. Please try again.",
        variant: "destructive",
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
            <FormItem>
              <FormLabel>role</FormLabel>
              <Select
                disabled={isLoading}
                onValueChange={field.onChange}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="select team" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="team leader">team leader</SelectItem>
                  <SelectItem value="team manager">team manager</SelectItem>
                  <SelectItem value="senior employee">
                    senior employee
                  </SelectItem>
                  <SelectItem value="junior employee">
                    junior employee
                  </SelectItem>
                  <SelectItem value="intern">intern</SelectItem>
                </SelectContent>
              </Select>
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
        <div className="flex justify-end">
          <Button type="submit" isLoading={isLoading}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddMembersForm;
