import bodyImage from "../resources/body_image.jpg";

function Home() {
  return (
    <div className="text-center bg-black font-serif w-full grid grid-cols-2 h-fit gap-1 p-4 shadow-md shadow-gray-500">
      <div>
        <img src={bodyImage} className="w-full h-full" />
      </div>
      <div className="h-full text-center grid place-items-center">
        <span>
          <h1 className="text-white text-8xl font-bold italic">
            PRICE <span className="text-amber-600">DECK</span>
          </h1>
          <h4 className="text-white text text-4xl">
            A Price Comparision Website
          </h4>
        </span>
      </div>
    </div>
  );
}

export default Home;
