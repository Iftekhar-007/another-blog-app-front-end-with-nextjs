import BlogCard from "@/components/modules/homePage/BlogCard";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";

export async function generateStaticParams() {
  const { data } = await blogService.getBlogPosts();

  return data?.data?.map((blog: BlogPost) => ({ id: blog.id }));
}

const BlogPage = async () => {
  const { data } = await blogService.getBlogPosts(
    {},
    {
      revalidate: 10,
    },
  );
  console.log(data);
  return (
    <div className="max-w-9/12 mx-auto grid grid-cols-3 gap-5 mt-20">
      {data?.data?.map((post: BlogPost) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default BlogPage;
