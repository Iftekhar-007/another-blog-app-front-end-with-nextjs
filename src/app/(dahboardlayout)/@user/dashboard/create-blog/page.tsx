import CreateBlogFormServer from "@/components/modules/user/CreateBlogFormServer";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";

const CreateBlogPage = async () => {
  // const session = await blogService.getBlogPosts({}, { cache: "no-store" });
  // const { data } = session.data;
  return (
    <div>
      <CreateBlogFormServer />
    </div>
  );
};

export default CreateBlogPage;
