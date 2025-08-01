import bannerImage from "../assets/Banner.jpg";

// Main Poster for the Dashboard
const Poster = () => {
  return (
    <div className="relative bg-black w-full max-w-[100vw] rounded-b-2xl overflow-hidden shadow-lg mx-auto mb-10">
      <img
        src={bannerImage}
        className="opacity-50 h-[55vh] w-full  object-cover bg-bottom"
        alt="Poster"
      />
    </div>
  );
};

export default Poster;