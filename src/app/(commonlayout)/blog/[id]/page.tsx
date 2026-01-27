import { blogService } from "@/services/blog.service";
import React from "react";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { data } = await blogService.getSingleBlogPost(id);
  console.log(data);

  return (
    <div className="max-w-7xl mx-auto border-2 border-amber-300 rounded-2xl p-10">
      <h3 className="text-2xl font-bold">{data.title}</h3>
      <p>{data.content}</p>
      <ul>
        {data.tags.map((tag: string) => (
          <li key={tag.indexOf(tag)} className="text-blue-500">
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogPage;
