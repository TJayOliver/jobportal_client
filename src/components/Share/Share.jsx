import {
  WhatsappShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookShareButton,
  FacebookIcon,
  XIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "react-share";

const Share = ({ image, url, title, description }) => {
  return (
    <section className="gap-1 flex">
      <WhatsappShareButton url={url} title={title}>
        <WhatsappIcon size={40} round={true} />
      </WhatsappShareButton>

      <FacebookShareButton url={url} quote={title}>
        <FacebookIcon size={40} round={true} />
      </FacebookShareButton>

      <TwitterShareButton url={url} title={title}>
        <XIcon size={40} round={true} />
      </TwitterShareButton>

      <LinkedinShareButton
        url={url}
        title={title}
        source={url}
        summary={description}
      >
        <LinkedinIcon size={40} round={true} />
      </LinkedinShareButton>
    </section>
  );
};

export default Share;
