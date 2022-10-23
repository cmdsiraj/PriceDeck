// // import "./product.css";
// import "./index.css";
function Product(props) {
  return (
    <div className="product-card p-1 min-h-full shadow-md shadow-zinc-400 hover:shadow-lg hover:shadow-zinc-800 bg-red-100 transition delay-150 duration-300 ease-in-out">
      <a href={props.data.Link} target="_blank" rel="noreferrer">
        <div
          className="product-image-container 
        flex flex-wrap justify-center mt-2"
        >
          <div
            className="flex flex-wrap 
          justify-center"
          >
            <img
              src={props.data.Image}
              alt={props.data.Name}
              className="max-w-full h-auto"
            />
          </div>
        </div>
        <div className="flex flex-col justify-items-center mt-5 mb-3">
          <div className="product-title text-center">
            <h4
              className="text-indigo-900 
            hover:text-rose-800 font-semibold"
            >
              {props.data.Name}
            </h4>
          </div>
          <div className="product-price text-3xl font-medium text-center">
            <h3>{props.data.Price}</h3>
          </div>
          <div className="border-t-2 border-solid w-full text-center">
            <span className="font-extralight text-base text-stone-500">
              Product from
            </span>
            <p className="italic font-medium font-serif">
              {props.data.Website}
            </p>
          </div>
        </div>
      </a>
    </div>
  );
}

export default Product;
