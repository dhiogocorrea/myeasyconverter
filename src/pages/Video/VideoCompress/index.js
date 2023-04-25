import React, { useState, useEffect } from "react";
import { Divider, Space, Upload, message, Spin, Button } from "antd";
import { InboxOutlined, DownloadOutlined } from "@ant-design/icons";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import MyConsole from "../../../components/MyConsole";
import { TitleSection, AboutSection } from "../../../components/Sections";

const { Dragger } = Upload;

const VideoCompress = () => {
  const [ffmpegLoaded, setFfmpegLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [videoSrc, setVideoSrc] = useState(null);
  const [spinMessage, setSpinMessage] = useState("");

  useEffect(() => {
    if (videoSrc !== null) {
      const video = document.getElementById("player");
      video.src = videoSrc;
    }
  }, [videoSrc]);
  const ffmpeg = createFFmpeg({
    log: true,
  });

  const props = {
    name: "file",
    multiple: false,
    accept: "video/*",
    onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        processFFMPEG(info.file.originFileObj);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 1000);
  };

  const processFFMPEG = async (file) => {
    try {
      setIsProcessing(true);
      setVideoSrc(null);

      setSpinMessage("Preparing to compress....");

      if (ffmpegLoaded === false) {
        await ffmpeg.load();
        setFfmpegLoaded(true);
      }
      setSpinMessage(
        "Compressing... Wait, it can take a while... (generally the length of your video)"
      );

      const name = file.name;
      const extension = name.split(".").pop();

      ffmpeg.FS("writeFile", name, await fetchFile(file));
      await ffmpeg.run(
        "-i",
        name,
        "-vf",
        "scale=iw/2:ih/2",
        "output." + extension
      );
      const data = ffmpeg.FS("readFile", "output." + extension);

      setVideoSrc(
        URL.createObjectURL(
          new Blob([data.buffer], { type: "video/" + extension })
        )
      );
    } finally {
      setSpinMessage("");
      setIsProcessing(false);
    }
  };

  return (
    <div style={{ margin: 20, textAlign: "center" }}>
      <TitleSection
        title='Video Compress'
        subtitle='Reduce the size of your video in a simple way.'
        img='assets/images/video_compress.svg'
      />
      <Divider />
      <Spin spinning={isProcessing} tip={spinMessage}>
        <Dragger customRequest={dummyRequest} {...props}>
          <p className='ant-upload-drag-icon'>
            <InboxOutlined />
          </p>
          <p className='ant-upload-text'>
            Click or drag video to this area to upload
          </p>
          <p className='ant-upload-hint'>
            Upload only one video at time. After processed, the download will be
            available.
          </p>
        </Dragger>
      </Spin>
      <Divider />
      <MyConsole showLog={isProcessing === true} />
      <Space direction='vertical' align='center'>
        {videoSrc !== null && (
          <Button
            type='primary'
            size='large'
            icon={<DownloadOutlined />}
            href={videoSrc}
            download
          >
            Download result!
          </Button>
        )}
        <video
          id='player'
          controls
          hidden={isProcessing === true || videoSrc === null}
        />
      </Space>
      <Divider />
      <AboutSection
        title='Video Compress'
        description='Video Compress is a tool to reduce the size of your videos, suitable to be executed in mobile devices without losing so much quality. It can reduce around 60% of your file size, depending on the case! You can use it with any video formats: mp4, avi, webm, mov and others.'
        steps={[
          {
            title: "1. Upload a file",
            description:
              "Choose the video from your computer that you and to compress. You can drag and drop it in the white zone with the blue icon, or click on the blue zone and choose it.",
          },
          {
            title: "2. Processing",
            description:
              "After the upload of the video file, the compressing process will start immediatly. You can the proccess by looking the logs on the black box that will appear on the screen.",
          },
          {
            title: "3. Download result",
            description:
              'After the proccess completed, click on "Download result" button and it\'s done! You can also check a preview from the video on our site before you download it.',
          },
        ]}
      />
    </div>
  );
};

export default VideoCompress;
