import React, {useState, useEffect} from 'react';
import {Divider, Space, Typography, Upload, message, Spin, Button} from 'antd';
import {InboxOutlined, DownloadOutlined} from '@ant-design/icons';
import {createFFmpeg, fetchFile} from '@ffmpeg/ffmpeg';

const {Title} = Typography;
const {Dragger} = Upload;

const VideoCompress = () => {
  const [ffmpegLoaded, setFfmpegLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [videoSrc, setVideoSrc] = useState(null);
  const [spinMessage, setSpinMessage] = useState('');

  useEffect(
    () => {
      if (videoSrc !== null) {
        const video = document.getElementById('player');
        video.src = videoSrc;
      }
    },
    [videoSrc],
  );
  const ffmpeg = createFFmpeg({
    log: true,
  });

  const props = {
    name: 'file',
    multiple: false,
    accept: 'video/*',
    onChange(info) {
      const {status} = info.file;
      if (status === 'done') {
        processFFMPEG(info.file.originFileObj);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const dummyRequest = ({file, onSuccess}) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 1000);
  };

  const processFFMPEG = async file => {
    try {
      setIsProcessing(true);
      setVideoSrc(null);

      setSpinMessage('Preparing to compress....');

      if (ffmpegLoaded === false) {
        await ffmpeg.load();
        setFfmpegLoaded(true);
      }
      setSpinMessage('Compressing... Wait, it can take a while... (generally the length of your video)');

      const name = file.name;
      const extension = name.split('.').pop();

      ffmpeg.FS('writeFile', name, await fetchFile(file));
      await ffmpeg.run('-i', name, '-vf', 'scale=iw/2:ih/2', 'output.' + extension);
      const data = ffmpeg.FS('readFile', 'output.mp4');

      setVideoSrc(URL.createObjectURL(new Blob([data.buffer], {type: 'video/' + extension})));
    } finally {
      setSpinMessage('');
      setIsProcessing(false);
    }
  };

  return (
    <div style={{margin: 20, textAlign: 'center'}}>
      <Space direction="vertical" align="center">
        <img
          width="150px"
          alt="video compress"
          src="https://image.shutterstock.com/image-vector/video-compressing-icon-shows-cube-260nw-1017168082.jpg"
        />
        <Title level={1}>Video Compress</Title>
        <Title level={4}>Reduce the size of your video in a simple way.</Title>
      </Space>
      <Divider />
      <Spin spinning={isProcessing} tip={spinMessage}>
        <Dragger customRequest={dummyRequest} {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag video to this area to upload</p>
          <p className="ant-upload-hint">
            Upload only one video at time. After processed, the download will be available.
          </p>
        </Dragger>
      </Spin>
      <Divider />
      <Space direction="vertical" align="center">
        {videoSrc !== null && (
          <Button type="primary" size="large" icon={<DownloadOutlined />} href={videoSrc} download>
            Download result!
          </Button>
        )}
        <video id="player" controls hidden={isProcessing === true || videoSrc === null} />
        <p>
          Video compress is a tool to reduce the size of your videos, suitable to be executed in mobile devices without
          losing so much quality.
        </p>
      </Space>
    </div>
  );
};

export default VideoCompress;
