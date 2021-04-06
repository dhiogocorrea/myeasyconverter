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
          cover={
            <img
              alt="video format convert"
              src="https://cdn2.vectorstock.com/i/1000x1000/40/91/video-conversion-icon-vector-21024091.jpg"
            />
          }
          onClick={() => goToVideoFormatConverter()}
        >
          <Card.Meta title="Video Format Converter" description="Convert your video file to another format" />
        </Card>
        <Divider type="vertical" />
        <Card
          hoverable
          style={{width: 240}}
          cover={
            <img
              alt="video compress"
              src="https://image.shutterstock.com/image-vector/video-compressing-icon-shows-cube-260nw-1017168082.jpg"
            />
          }
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
          cover={
            <img
              alt="free and unlimited"
              src="https://www.flaticon.com/svg/vstatic/svg/726/726459.svg?token=exp=1617660455~hmac=7d73c18d2c9861c91ffd8baa1096de31"
              height={100}
            />
          }
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
          cover={
            <img
              alt="online tools"
              src="https://www.flaticon.com/svg/vstatic/svg/431/431979.svg?token=exp=1617660608~hmac=23270dc1ad69c2f749d378bad81bed34"
              height={100}
            />
          }
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
          cover={
            <img
              alt="secure tools"
              src="https://www.flaticon.com/svg/vstatic/svg/95/95454.svg?token=exp=1617660667~hmac=4012ceed143d556c076a30b2f5eda1b5"
              height={100}
            />
          }
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
          cover={
            <img
              alt="No file size limitations"
              src="https://www.flaticon.com/svg/vstatic/svg/1504/1504941.svg?token=exp=1617660718~hmac=badecddbf32e88629818d063cb674d87"
              height={100}
            />
          }
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
          We are adding more and more resources with time. Be free to reach me on Linkedin if you have any suggestions{' '}
          <Typography.Link href="https://www.linkedin.com/in/dhiogocorrea/" target="_blank">
            here
          </Typography.Link>.
        </Typography.Paragraph>
      </Row>
    </div>
  );
};

export default Home;
