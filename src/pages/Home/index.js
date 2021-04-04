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

        <Title level={4}>Several tools to make your day easier online.</Title>
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
    </div>
  );
};

export default Home;
