import { useParams } from "react-router-dom";
import BlogFfmpeg from "./ffmpeg";
import BlogVideoCompressing from "./video-compress-seo";

const MainBlogPage = (props) => {
  const { page } = useParams();

  return (
    <>
      {page === "ffmpeg" && <BlogFfmpeg />}
      {page === "video-convert-seo" && <BlogVideoCompressing />}
    </>
  );
};

export default MainBlogPage;
