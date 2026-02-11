"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useForm } from "@tanstack/react-form";

import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import * as z from "zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(1, "Name is required!"),
  email: z.email(),
  password: z.string().min(6, "Password is required!"),
});

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const form = useForm({
    defaultValues: { name: "", email: "", password: "" },
    validators: { onSubmit: formSchema },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("User creating");
      try {
        const { data, error } = await authClient.signUp.email(value);
        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }
        toast.success("user ccreated successfully", { id: toastId });
        console.log(data, value);
      } catch (err: any) {
        toast.error(err.message);
      }
    },
  });

  const signInWithGoogle = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000",
    });
    console.log(data);
  };

  const { data: session } = authClient.useSession();
  console.log(session);

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      onBlur={field.handleBlur}
                      type="text"
                      value={field.state.value}
                      onChange={(e) => {
                        field.handleChange(e.target.value);
                      }}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      onBlur={field.handleBlur}
                      type="email"
                      value={field.state.value}
                      onChange={(e) => {
                        field.handleChange(e.target.value);
                      }}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      onBlur={field.handleBlur}
                      type="password"
                      value={field.state.value}
                      onChange={(e) => {
                        field.handleChange(e.target.value);
                      }}
                    />

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <Button className="w-full" form="login-form" type="submit">
          Sign Up
        </Button>

        <Button
          className="w-full"
          onClick={() => signInWithGoogle()}
          variant="outline"
          type="button"
        >
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  );
}
