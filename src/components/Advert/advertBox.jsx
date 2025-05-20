const AdvertBox = ({ image }) => {
  return (
    <div
      style={{ backgroundImage: `url(${image})` }}
      className="h-72 motion-preset-rebound-right bg-cover w-full rounded-2xl"
    ></div>
  );
};
export default AdvertBox;
