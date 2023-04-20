import { Space, Row, Col, Image, Divider, Typography, Card } from "antd";
import allPosts from "../../blogPosts/blogPosts";

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
        {params.body.map((section, indx) => (
          <Row justify='center' key={indx}>
            <Col span={18}>
              <Typography.Title>{section.title}</Typography.Title>
              <Divider />

              {section.body.map((paragraph, indx2) => (
                <Typography.Paragraph key={indx2}>
                  {paragraph}
                </Typography.Paragraph>
              ))}
            </Col>
          </Row>
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
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Row gutter={[8, 8]}>
        {Object.keys(allPosts).map((postName, indx) => (
          <Col xs={24} sm={12} md={8} lg={6} key={indx}>
            <Card
              hoverable
              cover={
                <img
                  alt={allPosts[postName].alt_image}
                  src={allPosts[postName].image}
                  style={{ width: "100%", height: 350, objectFit: "contain" }}
                />
              }
              onClick={() => (window.location = "/blog/" + postName)}
            >
              <Card.Meta
                title={allPosts[postName].title}
                description={allPosts[postName].description}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BlogPost;
