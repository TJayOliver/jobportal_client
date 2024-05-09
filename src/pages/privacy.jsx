import Footer from "../components/Footer/Footer";
import Platforms from "../components/Platforms/Platforms";
import Header from "../components/Header/Header";
import Subscribe from "../components/Subscribe/Subscribe";
import { useState } from "react";

const Privacy = () => {
  const [SubscribeState, SetSubscribeState] = useState(false);
  return (
    <>
      <Header />
      <Subscribe
        SubscribeState={SubscribeState}
        SetSubscribeState={SetSubscribeState}
      />
      <main className="max-w-5xl flex flex-col m-auto justify-center ">
        <section className="flex flex-col justify-between">
          <div>
            <h1 className="font-bold">Privacy Policy</h1>
            <p>
              Welcome to FutureForte! This Privacy Policy describes how
              FutureForte ("we," "us," or "our") collects, uses, and shares
              information when you visit{" "}
              <a href="https://futureforte.netlify.app">(the "Site").</a>
            </p>
          </div>
          <div>
            <h1 className="font-bold">Information We Collect</h1>
            <p>
              When you visit the Site, we may collect certain information
              automatically from your device. This information may include your
              IP address, which we use to identify the countries that access our
              website. We collect this information to better understand our
              audience and improve the content and services we offer.
            </p>
          </div>
          <div>
            <h1 className="font-bold">Cookies</h1>
            <p>
              We use cookies on the Site to enhance your experience. Cookies are
              small files that are stored on your device when you visit a
              website. They help us analyze website traffic and tailor our
              services to your preferences. You can choose to disable cookies
              through your browser settings, but please note that some features
              of the Site may not function properly if you do so.
            </p>
          </div>
          <div>
            <h1 className="font-bold">Google AdSense</h1>
            <p>
              We use Google AdSense to display advertisements on the Site.
              Google AdSense may use cookies and similar technologies to serve
              personalized ads based on your browsing activity. For more
              information about how Google uses data when you use our Site and
              how you can control the information collected by Google, please
              see Google's Privacy & Terms.
            </p>
          </div>
          <div>
            <h1 className="font-bold">Information Sharing</h1>
            <p>
              We do not sell, trade, or otherwise transfer your personal
              information to third parties without your consent, except as
              described in this Privacy Policy or as required by law. We may
              share aggregated, non-personally identifiable information about
              our users with third parties for marketing, advertising, or other
              purposes.
            </p>
          </div>
          <div>
            <h1 className="font-bold">Data Security</h1>
            <p>
              We take reasonable measures to protect the information we collect
              from unauthorized access, disclosure, alteration, or destruction.
              However, no method of transmission over the Internet or electronic
              storage is 100% secure, so we cannot guarantee absolute security.
              **Changes to this Privacy Policy. We may update this Privacy
              Policy from time to time to reflect changes in our practices or
              for other operational, legal, or regulatory reasons. We encourage
              you to review this Privacy Policy periodically for any changes.
              Your continued use of the Site after any such changes constitutes
              your acceptance of the revised Privacy Policy. **Contact Us** If
              you have any questions or concerns about this Privacy Policy or
              our data practices, please contact us. By using the Site, you
              consent to the collection and use of your information as described
              in this Privacy Policy.
            </p>
          </div>
        </section>
      </main>
      <Platforms />
      <Footer onClick={() => SetSubscribeState(true)} />
    </>
  );
};

export default Privacy;
