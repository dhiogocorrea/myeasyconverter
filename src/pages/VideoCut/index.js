import React, {useState, useEffect} from 'react';
import {Divider, Space, Upload, message, Spin, Button, Row, Col, Typography} from 'antd';
import {InboxOutlined, DownloadOutlined} from '@ant-design/icons';
import {createFFmpeg, fetchFile} from '@ffmpeg/ffmpeg';
import MyConsole from '../../components/MyConsole';
import {TitleSection, AboutSection} from '../../components/Sections';
import {MaskedInput} from 'antd-mask-input';

const {Dragger} = Upload;

const VideoCut = () => {
  const [ffmpegLoaded, setFfmpegLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [videoSrc, setVideoSrc] = useState(null);
  const [videoSrcResult, setVideoSrcResult] = useState(null);
  const [spinMessage, setSpinMessage] = useState('');
  const [fileObj, setFileObj] = useState(null);

  const [startAt, setStartAt] = useState('00:00:00');
  const [endAt, setEndAt] = useState('00:01:10');

  useEffect(
    () => {
      if (videoSrc !== null) {
        const video = document.getElementById('player');
        video.src = videoSrc;
      }
    },
    [videoSrc],
  );

  useEffect(
    () => {
      if (videoSrcResult !== null) {
        const video = document.getElementById('player_result');
        video.src = videoSrcResult;
      }
    },
    [videoSrcResult],
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
        setVideoSrc(URL.createObjectURL(info.file.originFileObj));
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
      setVideoSrcResult(null);

      setSpinMessage('Preparing to convert....');

      if (ffmpegLoaded === false) {
        await ffmpeg.load();
        setFfmpegLoaded(true);
      }
      setSpinMessage('Converting... Wait, it can take a while...');

      const name = file.name;
      const extension = name.split('.').pop();

      ffmpeg.FS('writeFile', name, await fetchFile(file));
      await ffmpeg.run('-i', name, '-ss', startAt, '-t', endAt, '-async', 1, 'output.' + extension);
      const data = ffmpeg.FS('readFile', 'output.' + extension);

      setVideoSrcResult(URL.createObjectURL(new Blob([data.buffer], {type: 'video/' + extension})));
    } finally {
      setSpinMessage('');
      setIsProcessing(false);
    }
  };

  return (
    <div style={{margin: 20, textAlign: 'center'}}>
      <TitleSection title="Video Cut" subtitle="Cut your video file." img="assets/images/video_cut.svg" />
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
      <video id="player" controls hidden={videoSrc === null} style={{minWidth: 300}} />
      {videoSrc !== null && (
        <Row direction="vertical" align="center">
          <Col xs={6} />
          <Col xs={6}>
            <Typography.Text>
              Choose the start point and end point to crop (i.e. 00:00 and 01:10) . It is formatted as hour:min:seg .
            </Typography.Text>
            <MaskedInput
              prefix="Start time:"
              mask="11:11:11"
              value={startAt}
              onChange={e => setStartAt(e.target.value)}
            />
            <MaskedInput prefix="End time:" mask="11:11:11" value={endAt} onChange={e => setEndAt(e.target.value)} />
          </Col>
          <Col xs={6} />
        </Row>
      )}
      <Button disabled={fileObj === null || isProcessing === true} onClick={() => processFFMPEG(fileObj)}>
        Cut now!
      </Button>
      <MyConsole showLog={isProcessing === true} />
      {videoSrcResult !== null && (
        <Space direction="vertical" align="center">
          <video id="player_result" controls hidden={videoSrc === null} style={{minWidth: 300}} />
          <Button type="primary" size="large" icon={<DownloadOutlined />} href={videoSrcResult} download>
            Download result!
          </Button>
        </Space>
      )}
      <Divider />
      <AboutSection
        title="Video Cut"
        description="Video cut is a tool to fastly cut videos in any format. Just add the video, set the start and end time, and that's it! There is no file size or time limitation."
        steps={[
          {
            title: '1. Upload a file',
            description:
              'Choose the video from your computer that you and to cut. You can drag and drop it in the white zone with the blue icon, or click on the blue zone and choose it.',
          },
          {
            title: '2. Choose the start and end time',
            description:
              'Inform the start and end time in the given fields. The format must be HH:mm:ss (hours minutes seconds).',
          },
          {
            title: '3. Cut Now!',
            description:
              'Click on "Cut Now" button and wait for the proccess to be done. You can the proccess by looking the logs on the black box that will appear on the screen.',
          },
          {
            title: '4. Download result',
            description:
              'After the proccess completed, click on "Download result" button and it\'s done! You can also check a preview of the new video.',
          },
        ]}
      />
    </div>
  );
};

export default VideoCut;
