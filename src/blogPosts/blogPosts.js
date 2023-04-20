import { dataProtectionParagraphs } from "./dataProtection";
import { ffmpegCTA, ffmpegParagraphs } from "./ffmpeg";
import { videoConvertSeoParagraphs } from "./videoConvertSeo";
import {
  whyMyEasyConverterParagraph,
  whyMyEasyConverterCTA,
} from "./whyMyeasyconverter";

const allPosts = {
  whyMyEasyConverter: {
    alt_image: "whyMyEasyConverter",
    image: "assets/images/whyMyEasyConverter.jpg",
    title: "Why to use MyEasyConverter?",
    description: "The power of audio and video transformation in your hands",
    paragraphs: whyMyEasyConverterParagraph,
    callToAction: whyMyEasyConverterCTA,
  },
  ffmpeg: {
    alt_image: "ffmpeg",
    image: "assets/images/ffmpeg.jpeg",
    title: "How FFMPeg Works?",
    description: "A brief summary of why we use ffmpeg",
    paragraphs: ffmpegParagraphs,
    callToAction: ffmpegCTA,
  },
  videoConvertSeo: {
    alt_image: "video-convert-seo",
    image: "assets/images/video-converter-color-icon-vector-illustration.webp",
    title: "Video Compressing and SEO",
    description: "How Compressed Videos Can Improve Your Website's Ranking",
    paragraphs: videoConvertSeoParagraphs,
    callToAction: null,
  },
  dataProtection: {
    alt_image: "data-protection",
    image: "assets/images/data-protection.jpg",
    title: "Importance of data protection",
    description: "Why do  you have to care about your data",
    paragraphs: dataProtectionParagraphs,
    callToAction: whyMyEasyConverterCTA,
  },
};

export default allPosts;
