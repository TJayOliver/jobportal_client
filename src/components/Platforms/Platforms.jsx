import whatsAppImage from "../../assets/whatsApp.png";

const Platforms = () => {
  return (
    <aside className="rounded-full left-3 h-16 w-16 fixed bottom-14 drop-shadow-md z-50">
      <a href="https://bit.ly/4dxzY0S">
        <img src={whatsAppImage} className="w-full h-full object-cover" />
      </a>
    </aside>
  );
};

export default Platforms;
