import whatsAppImage from "../../assets/whatsApp.png";

const Platforms = () => {
  return (
    <aside className="bottom-48 left-3 rounded-lg h-24 w-24 fixed drop-shadow-md">
      <a href="bit.ly/4dxzY0S">
        <img src={whatsAppImage} className="w-full h-full object-cover" />
      </a>
    </aside>
  );
};

export default Platforms;
