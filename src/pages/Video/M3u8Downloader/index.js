import React, { useState, useEffect } from "react";
import { Divider, Space, Upload, message, Spin, Button, Input } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import MyConsole from "../../../components/MyConsole";
import { TitleSection, AboutSection } from "../../../components/Sections";

import { fs } from "memfs";

import axios from "axios";

const M3u8Downloader = () => {
  const [ffmpegLoaded, setFfmpegLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [videoSrc, setVideoSrc] = useState(null);
  const [spinMessage, setSpinMessage] = useState("");
  const [m3u8linkUrl, setM3u8linkUrl] = useState("myM3u8link.com.br");

  var path = require("path");

  useEffect(() => {
    if (videoSrc !== null) {
      const video = document.getElementById("player");
      video.src = videoSrc;
    }
  }, [videoSrc]);

  const ffmpeg = createFFmpeg({
    log: true,
  });

  const parseFilename = (line) => {
    return line;
  };

  const writeFileRecursive = (file, data) => {
    const dirname = path.dirname(file);
    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname, { recursive: true });
    }
    fs.writeFileSync(file, data);
  };

  const explorM3u8Url = async (url, baseUrl) => {
    await axios.get(url).then(async (response) => {
      let lines = response.data.trim().split(/\s*[\r\n]+\s*/g);

      for (const line of lines) {
        if (line.startsWith("#") === false && line.trim().length > 0) {
          const file = await fetchFile(
            line.startsWith("http") ? line.trim() : baseUrl + "/" + line.trim()
          );

          writeFileRecursive(parseFilename(line), file);

          //ffmpeg.FS("writeFile", parseFilename(line), file);

          if (line.trim().includes(".m3u8")) {
            if (line.includes("/")) {
              let newBaseUrl = baseUrl + "/" + line.split("/")[0];

              await explorM3u8Url(
                line.startsWith("http")
                  ? line.trim()
                  : baseUrl + "/" + line.trim(),
                newBaseUrl
              );
            } else {
              await explorM3u8Url(
                line.startsWith("http")
                  ? line.trim()
                  : baseUrl + "/" + line.trim(),
                baseUrl
              );
            }
          }
        } else if (line.includes(".key")) {
          const pattern = /URI="(.*?)"/;
          const match = line.match(pattern);

          if (match) {
            const keyUri = match[1];

            const file = await fetchFile(
              line.startsWith("http")
                ? keyUri.trim()
                : baseUrl + "/" + keyUri.trim()
            );

            console.log(file);
            console.log(parseFilename(keyUri));

            writeFileRecursive(parseFilename(keyUri), file);
            //ffmpeg.FS("writeFile", parseFilename(keyUri), file);
          }
        }
      }
    });
  };

  const processFFMPEG = async () => {
    try {
      setIsProcessing(true);
      setVideoSrc(null);

      setSpinMessage("Preparing to compress....");

      if (ffmpegLoaded === false) {
        await ffmpeg.load();
        setFfmpegLoaded(true);
      }
      setSpinMessage(
        "Converting to mp4... Wait, it can take a while... (generally the length of your video)"
      );

      let url = m3u8linkUrl;
      if (!m3u8linkUrl.startsWith("http")) {
        url = "https://" + m3u8linkUrl;
      }

      const file = await fetchFile(url); // encodeM3u8File(url);
      ffmpeg.FS("writeFile", `myfile.m3u8`, file);

      const baseUrl = url.substring(0, url.lastIndexOf("/"));

      await explorM3u8Url(url, baseUrl);

      await ffmpeg.run(
        "-allowed_extensions",
        "ALL",
        "-i",
        "myfile.m3u8",
        "-bsf:a",
        "aac_adtstoasc",
        "-vcodec",
        "copy",
        "-c",
        "copy",
        "-crf",
        "50",
        "output.mp4"
      );

      const data = ffmpeg.FS("readFile", "output.mp4");

      setVideoSrc(
        URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" }))
      );
    } finally {
      setSpinMessage("");
      setIsProcessing(false);
    }
  };

  return (
    <div style={{ margin: 20, textAlign: "center" }}>
      <TitleSection
        title='M3U8 Downloader'
        subtitle='Download a video stream (in m3u8 format) as mp4 file.'
        img='assets/images/m3u.svg'
      />
      <Divider />
      <Spin spinning={isProcessing} tip={spinMessage}>
        <Space>
          <Input
            addonBefore='https://'
            value={m3u8linkUrl}
            onChange={(e) => setM3u8linkUrl(e.target.value)}
          />
          <Button type='primary' onClick={processFFMPEG}>
            Process
          </Button>
        </Space>
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
        title='M3u8 Downloader'
        description='This tool enables you to download any m3u8 file avaible on the internet as mp4.'
        steps={[
          {
            title: "1. Fill the URL field with the m3u8 https url",
            description:
              "Copy and paste the url of the m3u8 file you want to convert and download.",
          },
          {
            title: "2. Processing",
            description:
              "After indicating the url, click in the start button. You can the proccess by looking the logs on the black box that will appear on the screen.",
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

export default M3u8Downloader;
