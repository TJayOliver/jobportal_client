import whatsAppImage from "../../assets/whatsApp.png";
import barcodeImage from "../../assets/Wbarcode.jpg";

const Platforms = ({ platformsState, setPlatformsState }) => {
  return (
    <aside
      onClick={() => {
        setPlatformsState((prev) => !prev);
      }}
      className={platformsState ? "barcodeUp bg-white p-2" : "barcodeDown"}
    >
      <img
        src={platformsState ? barcodeImage : whatsAppImage}
        className="w-full h-full object-cover"
      />
    </aside>
  );
};

export default Platforms;
