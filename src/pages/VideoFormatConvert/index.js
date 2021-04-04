import React, {useState, useEffect} from 'react';
import {Divider, Space, Typography, Upload, message, Spin, Button, Select} from 'antd';
import {InboxOutlined, DownloadOutlined} from '@ant-design/icons';
import {createFFmpeg, fetchFile} from '@ffmpeg/ffmpeg';

const {Title} = Typography;
const {Dragger} = Upload;

const VideoFormatConvert = () => {
  const [ffmpegLoaded, setFfmpegLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [videoSrc, setVideoSrc] = useState(null);
  const [spinMessage, setSpinMessage] = useState('');
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [fileObj, setFileObj] = useState(null);

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
        setFileObj(info.file.originFileObj);
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

      setSpinMessage('Preparing to convert....');

      if (ffmpegLoaded === false) {
        await ffmpeg.load();
        setFfmpegLoaded(true);
      }
      setSpinMessage('Converting... Wait, it can take a while...');

      const name = file.name;
      const output = 'output.' + selectedFormat;

      ffmpeg.FS('writeFile', name, await fetchFile(file));
      await ffmpeg.run('-i', name, output);
      const data = ffmpeg.FS('readFile', output);

      setVideoSrc(URL.createObjectURL(new Blob([data.buffer], {type: 'video/' + selectedFormat})));
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
          alt="video format convert"
          src="https://cdn2.vectorstock.com/i/1000x1000/40/91/video-conversion-icon-vector-21024091.jpg"
        />
        <Title level={1}>Video Format Converter</Title>
        <Title level={4}>Convert your video file to another format.</Title>
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

      <Typography>Select the output format:</Typography>
      <Select
        disabled={isProcessing}
        defaultValue="mp4"
        style={{width: 120}}
        onChange={value => setSelectedFormat(value)}
      >
        <Select.Option value="mp4">MP4</Select.Option>
        <Select.Option value="avi">AVI</Select.Option>
        <Select.Option value="mkv">MKV</Select.Option>
        <Select.Option value="mov">MOV</Select.Option>
        <Select.Option value="wmv">WMV</Select.Option>
        <Select.Option value="flv">FLV</Select.Option>
        <Select.Option value="webm">WEBM</Select.Option>
        <Select.Option value="ogg">OGG</Select.Option>
        <Select.Option value="ogv">OGV</Select.Option>
      </Select>
      <Button disabled={fileObj === null || isProcessing === true} onClick={() => processFFMPEG(fileObj)}>
        Convert now!
      </Button>
      <Divider />
      <Space direction="vertical" align="center">
        {videoSrc !== null && (
          <Button type="primary" size="large" icon={<DownloadOutlined />} href={videoSrc} download>
            Download result!
          </Button>
        )}
        <video id="player" controls hidden={true} />
        <p>Video format converter is a tool to fastly change the format of your videos in a very fast and easy way.</p>
        <p>If the video download comes without extension, just rename it adding the extension.</p>
      </Space>
    </div>
  );
};

export default VideoFormatConvert;
