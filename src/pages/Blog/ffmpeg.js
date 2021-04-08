import BlogPost from '../../components/BlogPost';
import {AllTools} from '../../components/Sections';

const BlogFfmpeg = () => {
  const paragraphs = [
    'FFmpeg is the main mixed media system, ready to translate, encode, transcode, mux, demux, stream, channel and play basically whatever people and machines have made.',
    'It upholds the most dark old configurations up to the front line. Regardless of in the event that they were planned by certain guidelines board, the local area or a partnership.',
    'It is likewise exceptionally convenient: FFmpeg arranges, runs, and passes our testing foundation Destiny across Linux, Macintosh operating system X, Microsoft Windows, the BSDs, Solaris, and so forth under a wide assortment of construct conditions, machine designs, and setups.',
    'It contains libavcodec, libavutil, libavformat, libavfilter, libavdevice, libswscale and libswresample which can be utilized by applications. Just as ffmpeg, ffplay and ffprobe which can be utilized by end clients for transcoding and playing.',
    'The FFmpeg project attempts to give the best in fact conceivable answer for engineers of uses and end clients the same. To accomplish this we join the best free programming choices accessible. We somewhat favor our own code to keep the conditions on other libs low and to boost code dividing among parts of FFmpeg. Any place the topic of "best" can\'t be addressed we support the two choices so the end client can pick.',
    'Everybody is welcome in FFmpeg and all commitments are welcome as well. We are glad to get patches, pull demands, bug reports, gifts or some other sort of commitment.',
    'Security is a high need and code audit is constantly finished in light of safety. Despite the fact that because of the exceptionally a lot of code contacting untrusted information security issues are unavoidable and hence we give as speedy as potential updates to our last steady deliveries when new security issues are found.',
  ];
  const callToAction = {link: 'https://www.ffmpeg.org/', text: 'ffmpeg website.'};
  return (
    <div>
      <BlogPost
        img="/assets/images/ffmpeg.jpeg"
        title="What is FFMPEg?"
        subtitle="A brief summary of why we use ffmpeg."
        body={paragraphs}
        callToAction={callToAction}
      />
      <AllTools />
    </div>
  );
};

export default BlogFfmpeg;
