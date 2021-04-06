import React from 'react';
import {Space, Typography, Divider, Row, Card} from 'antd';
import {useHistory} from 'react-router-dom';

const {Title} = Typography;

const Home = () => {
  const history = useHistory();

  const goToVideoCompress = () => {
    history.push('/video-compress');
  };

  const goToVideoFormatConverter = () => {
    history.push('/video-format-converter');
  };
  return (
    <div style={{margin: 20, textAlign: 'center'}}>
      <Space direction="vertical" align="center">
        <Title level={1} style={{color: 'red'}}>
          My Easy Converter
        </Title>

        <Title level={4}>Several tools to make your online day easier.</Title>
      </Space>
      <Divider />
      <Row>
        <Card
          hoverable
          style={{width: 240}}
          cover={<img alt="video format convert" src="assets/images/video_convert.svg" />}
          onClick={() => goToVideoFormatConverter()}
        >
          <Card.Meta title="Video Format Converter" description="Convert your video file to another format" />
        </Card>
        <Divider type="vertical" />
        <Card
          hoverable
          style={{width: 240}}
          cover={<img alt="video compress" src="assets/images/video_compress.svg" />}
          onClick={() => goToVideoCompress()}
        >
          <Card.Meta title="Video Compress" description="Reduce the size of your video in a simple way." />
        </Card>
      </Row>
      <Divider />
      <Row direction="vertical" align="center" style={{marginBottom: 20}}>
        <Typography.Title level={3}>About this tools</Typography.Title>
      </Row>
      <Row direction="vertical" align="center">
        <Card
          hoverable
          bordered={false}
          style={{width: 240, backgroundColor: 'rgb(240 242 245)'}}
          cover={<img alt="free and unlimited" src="assets/images/free.svg" height={100} />}
        >
          <Card.Meta
            title="Free and Unlimited"
            description="All our tools are free to use and don't have any limitation. Use as much as you want!"
          />
        </Card>
        <Card
          hoverable
          bordered={false}
          style={{width: 240, backgroundColor: 'rgb(240 242 245)'}}
          cover={<img alt="online tools" src="assets/images/online.svg" height={100} />}
        >
          <Card.Meta
            title="Online tools"
            description="All tools are online, you don't have to download nor install anything, just click and use it."
          />
        </Card>
        <Card
          hoverable
          bordered={false}
          style={{width: 240, backgroundColor: 'rgb(240 242 245)'}}
          cover={<img alt="secure tools" src="assets/images/secure.svg" height={100} />}
        >
          <Card.Meta
            title="Secure and Private"
            description="None of your files are transmitted to any outside server. All proccess is done in your own computer, meaning that there is no information sharing at all."
          />
        </Card>
        <Card
          hoverable
          bordered={false}
          style={{width: 240, backgroundColor: 'rgb(240 242 245)'}}
          cover={<img alt="No file size limitations" src="assets/images/file_size.svg" height={100} />}
        >
          <Card.Meta
            title="No file size limitations"
            description="Despite other tools available online, we don't have any file limitations. You can upload a 4 hours God Father movie if you want."
          />
        </Card>
      </Row>
      <Divider />
      <Row direction="vertical" align="center">
        <Typography.Paragraph>
          We have a complete set of tools to help you with recordings, convertions and compressions for audio and video.
          Do you need to reduce the size of a video to post it or share online? Do you have a software that only accepts
          certain format of files? Well, we are here for you!
        </Typography.Paragraph>
        <Typography.Paragraph>
          This project uses FFMPeg to do all the hard work. FFMPeg is licensed by GNU Lesser Public License (LGPL).
          Notice that every screen shows a log that you can use to follow the proccess. All the processing is done using
          your hardware resources. By doing that, we guarantee the security and privacy of your data.
        </Typography.Paragraph>
        <Typography.Paragraph>
          We are adding more and more resources with time. If you have any suggestions, feel free to{' '}
          <Typography.Link href="https://www.linkedin.com/in/dhiogocorrea/" target="_blank">
            reach me on Linkedin page
          </Typography.Link>.
        </Typography.Paragraph>
      </Row>
    </div>
  );
};

export default Home;
