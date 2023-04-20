import { useParams } from "react-router-dom";
import BlogPost from "../../components/BlogPost";
import { AllTools } from "../../components/Sections";
import allPosts from "../../blogPosts/blogPosts";

const MainBlogPage = () => {
  const { page } = useParams();

  return (
    <div>
      {page && allPosts[page] && (
        <BlogPost
          img={"/" + allPosts[page].image}
          title={allPosts[page].title}
          subtitle={allPosts[page].subtitle}
          body={allPosts[page].paragraphs}
          callToAction={allPosts[page].callToAction}
        />
      )}
      <AllTools />
    </div>
  );
};

export default MainBlogPage;
