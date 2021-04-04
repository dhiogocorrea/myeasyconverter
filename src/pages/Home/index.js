import React from 'react';
import {Space, Typography, Divider, Row, Card} from 'antd';
import {useHistory} from 'react-router-dom';

const {Title} = Typography;

const Home = () => {
  const history = useHistory();

  const goToVideoCompress = () => {
    history.push('/videocompress');
  };
  return (
    <div style={{margin: 20, textAlign: 'center'}}>
      <Space direction="vertical" align="center">
        <Title level={1}>
          Welcome to <b style={{color: 'red'}}>My Ease Converter</b>
        </Title>

        <Title level={4}>Several video tools to make your day easier online.</Title>
      </Space>
      <Divider />
      <Row>
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
          <Card.Meta title="Online Video compress" description="Reduce the size of your video in a simple way." />
        </Card>
      </Row>
    </div>
  );
};

export default Home;
