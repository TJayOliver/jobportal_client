import megaphone from "../../assets/megaphone.png";

const SubscribeBlueBox = ({ onClick }) => {
  return (
    <section
      className={
        "flex justify-between p-2 bg-gradient-to-tr from-blue-500 to-teal-500 items-center rounded-md mt-1 mb-2"
      }
    >
      <div className="text-white">
        <p className=" text-xl md:text-3xl font-medium">Job Alert E-mails </p>
        <small>
          Keep track of positions that you're interested in by signing up for
          job alert emails
        </small>
      </div>

      <div className="rounded-lg bg-gradient-to-r from-white/90 to-white flex flex-col items-center justify-center gap-4 h-48 w-44 p-1">
        <img src={megaphone} className=" object-cover h-32" loading="lazy" />
        <button
          onClick={onClick}
          className="p-2 bg-gradient-to-tr from-blue-500 to-teal-500 w-full text-sm whitespace-nowrap rounded-md text-white font-medium"
        >
          Notify Me
        </button>
      </div>
    </section>
  );
};

export default SubscribeBlueBox;
