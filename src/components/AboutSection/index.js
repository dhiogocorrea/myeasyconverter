import React from 'react';
import {Card, Typography, Row} from 'antd';

const AboutSection = params => {
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
    </div>
  );
};

export default AboutSection;
