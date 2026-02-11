import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { env } from "@/env";
import { cacheTag, revalidateTag, updateTag } from "next/cache";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export default function CreateBlogFormServer() {
  const createBlog = async (formData: FormData) => {
    "use server";
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const tags = formData.get("tags") as string;

    const blogData = {
      title,
      content,
      tags: tags
        ?.split(",")
        .map((item) => item.trim())
        .filter((item) => item !== ""),
    };
    const cookiesStore = await cookies();

    const res = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookiesStore.toString(),
      },
      body: JSON.stringify(blogData),
    });

    if (res.ok) {
      revalidateTag("blogPosts", "max");
      // updateTag("blogPosts");
    }
  };
  return (
    <div>
      <Card className="max-w-3xl mx-auto ">
        <CardHeader>
          <CardTitle>Create Post</CardTitle>
          <CardDescription>You can create your blog here</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="blog-form" action={createBlog}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="title">Title</FieldLabel>
                <Input
                  id="title"
                  type="text"
                  name="title"
                  required
                  className=""
                ></Input>
              </Field>

              <Field>
                <FieldLabel htmlFor="content">Content</FieldLabel>
                <Textarea
                  id="content"
                  placeholder="Write your blog"
                  name="content"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="tags">Tags</FieldLabel>
                <Input
                  id="tags"
                  type="text"
                  name="tags"
                  required
                  placeholder="exc: nextjs,html,js,ts"
                ></Input>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter>
          <Button form="blog-form" type="submit" className="w-full">
            Create Post
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
