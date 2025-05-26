import { SiFacebook } from "react-icons/si";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#0F141E] p-8 flex flex-col justify-evenly text-md text-white relative gap-8">
      <section className="flex flex-col md:flex-row justify-between gap-4">
        {/* quick links */}
        <div className="flex flex-col gap-3 text-slate-200">
          <h1 className="font-bold text-xl text-white">Quick Links</h1>
          <a className="hover:text-white/50 text-sm" href="/">
            Home
          </a>
          <a className="hover:text-white/50 text-sm" href="/job">
            Job
          </a>
          <a className="hover:text-white/50 text-sm" href="/scholarship">
            Scholarship
          </a>
        </div>
        {/* contact */}
        <div className="flex flex-col gap-3 text-slate-200">
          <h1 className="font-bold text-xl text-white">Contact & Legal</h1>
          <a className="text-sm">support@opportunityarchives.com</a>
          <a className="hover:text-white/50 text-sm" href="#">
            Privacy Policy
          </a>
          <a className="hover:text-white/50 text-sm" href="#">
            Terms & Condition
          </a>
        </div>
        {/* social handles */}
        <div className="flex flex-col gap-3 text-slate-200">
          <h1 className="font-bold text-xl text-white">
            Follow Us - Lets Connect
          </h1>
          <div className="flex items-center gap-2">
            <a className="hover:text-white/50 " href="#">
              <FaSquareXTwitter />
            </a>
            <a className="hover:text-white/50" href="#">
              <SiFacebook />
            </a>
          </div>
        </div>
      </section>
      {/* subscribe */}
      <section className="flex justify-between">
        <h1 className="md:text-3xl">
          Never Miss an Opportunity - <br></br> Join Our Community
        </h1>
        <div className="flex flex-col gap-2">
          <input
            className=" outline-none bg-transparent border-b placeholder:text-sm p-1 w-full"
            placeholder="email address"
          />
          <button className="bg-yellow-400 rounded-3xl text-black text-sm p-1 md:p-2">
            Subscribe
          </button>
        </div>
      </section>
      <hr></hr>
      <p className="flex justify-center">
        Copyright &copy;{new Date().getFullYear()} | Privacy Policy
      </p>
    </footer>
  );
};

export default Footer;
