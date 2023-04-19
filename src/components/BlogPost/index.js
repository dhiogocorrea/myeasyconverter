import { Space, Row, Col, Image, Divider, Typography, Card } from "antd";

const BlogHeader = (params) => {
  return (
    <Space direction='vertical' size={12}>
      <Image width='60%' style={{ maxHeight: "200px" }} src={params.img} />
      <Divider />
      <Typography.Title>{params.title}</Typography.Title>
      <Typography.Title level={3}>{params.subtitle}</Typography.Title>
    </Space>
  );
};

const BlogCTA = (params) => {
  return (
    <Row
      align='center'
      style={{ marginTop: 20, paddingLeft: 50, paddingRight: 50 }}
    >
      <Typography.Text>
        If you wanna learn more, visit{" "}
        <Typography.Link href={params.link} target='_blank'>
          {params.text ? params.text : "here."}
        </Typography.Link>
      </Typography.Text>
    </Row>
  );
};

const BlogPost = (params) => {
  const img = params.img;

  return (
    <div style={{ marginTop: 20 }} align='center'>
      <BlogHeader img={img} title={params.title} subtitle={params.subtitle} />
      <Row
        align='center'
        style={{ marginTop: 20, paddingLeft: 50, paddingRight: 50 }}
      >
        {params.body.map((paragraph, indx) => (
          <Typography.Paragraph key={indx}>{paragraph}</Typography.Paragraph>
        ))}
      </Row>
      {params.callToAction && (
        <BlogCTA
          text={params.callToAction.text}
          link={params.callToAction.link}
        />
      )}
    </div>
  );
};

export const RandomPosts = () => {
  const allPosts = [
    {
      alt_image: "ffmpeg",
      image: "assets/images/ffmpeg.jpeg",
      location: "ffmpeg",
      title: "How FFMPeg Works?",
      description: "A brief summary of why we use ffmpeg",
    },
    {
      alt_image: "video-convert-seo",
      image:
        "assets/images/video-converter-color-icon-vector-illustration.webp",
      location: "video-convert-seo",
      title: "Video Compressing and SEO",
      description: "How Compressed Videos Can Improve Your Website's Ranking",
    },
  ];

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Row gutter={[8, 8]}>
        {allPosts.map((post, indx) => (
          <Col xs={24} sm={12} md={8} lg={6} key={indx}>
            <Card
              hoverable
              cover={
                <img
                  alt={post.alt_image}
                  src={post.image}
                  style={{ width: "100%", height: 350, objectFit: "contain" }}
                />
              }
              onClick={() => (window.location = "/blog/" + post.location)}
            >
              <Card.Meta title={post.title} description={post.description} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BlogPost;
