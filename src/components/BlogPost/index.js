import {Space, Row, Image, Divider, Typography, Card} from 'antd';

const BlogPost = params => {
  const img = params.img;

  return (
    <div style={{marginTop: 20}} align="center">
      <Space direction="vertical" size={12}>
        <Image width="60%" style={{maxHeight: '200px'}} src={img} />
        <Divider />
        <Typography.Title>{params.title}</Typography.Title>
        <Typography.Title level={3}>{params.subtitle}</Typography.Title>
      </Space>
      <Row align="center" style={{marginTop: 20, paddingLeft: 50, paddingRight: 50}}>
        {params.body.map((paragraph, indx) => <Typography.Paragraph key={indx}>{paragraph}</Typography.Paragraph>)}
      </Row>
      {params.callToAction && (
        <Row align="center" style={{marginTop: 20, paddingLeft: 50, paddingRight: 50}}>
          <Typography.Text>
            If you wanna learn more, visit{' '}
            <Typography.Link href={params.callToAction.link} target="_blank">
              {params.callToAction.text ? params.callToAction.text : 'here.'}
            </Typography.Link>
          </Typography.Text>
        </Row>
      )}
    </div>
  );
};

export const RandomPosts = () => {
  const allPosts = [
    {
      alt_image: 'ffmpeg',
      image: 'assets/images/ffmpeg.jpeg',
      location: 'ffmpeg',
      title: 'How FFMPeg Works?',
      description: 'A brief summary of why we use ffmpeg.',
    },
  ];

  return (
    <div>
      {allPosts.map((post, indx) => (
        <Card
          key={indx}
          hoverable
          style={{width: 240}}
          cover={<img alt={post.alt_image} src={post.image} />}
          onClick={() => (window.location = '/blog/' + post.location)}
        >
          <Card.Meta title={post.title} description={post.description} />
        </Card>
      ))}
    </div>
  );
};

export default BlogPost;
