import React from 'react';
import {Card, Typography, Row, Space, Divider} from 'antd';

export const TitleSection = params => {
  return (
    <Space direction="vertical" align="center">
      <img width="150px" alt="video compress" src={params.img} />
      <Typography.Title level={1}>{params.title}</Typography.Title>
      <Typography.Title level={2}>{params.subtitle}</Typography.Title>
    </Space>
  );
};
export const AboutSection = params => {
  return (
    <div>
      <Row direction="vertical" align="center" style={{marginBottom: 20}}>
        <Typography.Title level={3}>About {params.title}</Typography.Title>
      </Row>
      <Row direction="vertical" align="center">
        <Typography.Paragraph>{params.description}</Typography.Paragraph>
      </Row>
      <Row direction="vertical" align="center" style={{marginTop: 30, marginBottom: 20}}>
        <Typography.Title level={3}>How do I use {params.title}?</Typography.Title>
      </Row>
      <Row direction="vertical" align="center">
        {params.steps.map(step => (
          <Card hoverable bordered={false} style={{width: 240, backgroundColor: 'rgb(240 242 245)'}}>
            <Card.Meta title={step.title} description={step.description} />
          </Card>
        ))}
      </Row>
      <Divider />
      <Row direction="vertical" align="center" style={{marginBottom: 20}}>
        <Typography.Title level={4}>Check out all our available tools</Typography.Title>
      </Row>
      <Row direction="horizontal" align="center" style={{marginBottom: 20}}>
        <Typography.Link href="/video-format-converter">Video Format Converter</Typography.Link>
        <Typography.Text>&nbsp;/&nbsp;</Typography.Text>
        <Typography.Link href="/video-compress">Video Compress</Typography.Link>
        <Typography.Text>&nbsp;/&nbsp;</Typography.Text>
        <Typography.Link href="/video-trimmer">Video Trimmer</Typography.Link>
      </Row>
    </div>
  );
};
