import {
  WhatsappShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookShareButton,
  WhatsappIcon,
  FacebookIcon,
  XIcon,
  LinkedinIcon,
} from "react-share";

const Share = ({ url, title, description }) => {
  return (
    <section className="gap-1 flex">
      <WhatsappShareButton url={url} title={title}>
        <WhatsappIcon size={40} round />
      </WhatsappShareButton>

      <FacebookShareButton url={url} quote={title}>
        <FacebookIcon size={40} round />
      </FacebookShareButton>

      <TwitterShareButton url={url} title={title}>
        <XIcon size={40} round />
      </TwitterShareButton>

      <LinkedinShareButton
        url={url}
        title={title}
        source={url}
        summary={description}
      >
        <LinkedinIcon size={40} round />
      </LinkedinShareButton>
    </section>
  );
};
export default Share;
