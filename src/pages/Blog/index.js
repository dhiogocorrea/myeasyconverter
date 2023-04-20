import { useParams } from "react-router-dom";
import BlogPost, { RandomPosts } from "../../components/BlogPost";
import { AllTools } from "../../components/Sections";
import allPosts from "../../blogPosts/blogPosts";

const MainBlogPage = () => {
  const { page } = useParams();

  const postExists = page && allPosts[page];

  return (
    <div>
      {postExists && (
        <BlogPost
          img={allPosts[page].image}
          title={allPosts[page].title}
          subtitle={allPosts[page].subtitle}
          body={allPosts[page].paragraphs}
          callToAction={allPosts[page].callToAction}
        />
      )}
      {!postExists && <RandomPosts />}
      <AllTools />
    </div>
  );
};

export default MainBlogPage;
