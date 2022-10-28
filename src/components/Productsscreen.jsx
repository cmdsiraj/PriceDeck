import Product from "./Product";
import ScrollToTopButton from "./ScrollToTopButton";

const Productsscreen = (props) => {
  return (
    <div className="p-4 bg-slate-200">
      <div>
        <h4 className="mb-2">
          Showing results for{" "}
          <b className="text-xl text-neutral-800">
            <i>{props.product}</i>
          </b>
        </h4>
      </div>
      <div
        className="grid gap-3 justify-around 
          items-center place-content-center
          md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4"
      >
        {props.data.map((d) => {
          return <Product key={d.Link} data={d} />;
        })}
      </div>
      <ScrollToTopButton />
    </div>
  );
};

export default Productsscreen;
