import BlogCard from "@/components/modules/homePage/BlogCard";
import { Button } from "@/components/ui/button";
import { blogService } from "@/services/blog.service";
import { userService } from "@/services/user.service";
import { BlogPost } from "@/types";

export default async function Home() {
  const session = await userService.getSession();

  console.log(session);

  const { data } = await blogService.getBlogPosts();
  console.log(data);
  return (
    <div>
      <Button>Click Me</Button>
      {/* {data?.data?.map((post: BlogPost) => (
        <BlogCard key={post.id} post={post} />
      ))} */}

      <div className="max-w-9/12 mx-auto grid grid-cols-3 gap-5">
        {data?.data?.map((post: BlogPost) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
