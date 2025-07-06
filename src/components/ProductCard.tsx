import type Product from "../helpers/interfaces";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="border p-4 rounded-lg shadow-xl bg-blue-100">
      <h2 className="text-xl font-semibold text-purple-800">{product.title}</h2>
      <p className="text-gray-800">
        <strong>Category: </strong>
        {product.category}
      </p>
      <p className="text-gray-800">
        <strong>Price: </strong>
        {product.price}
      </p>
      <div>
        <h3>
          <strong>Rating: </strong>
        </h3>
        <p className="text-gray-800">
          <p>
            <u>Rate:</u> {product.rating.rate}
          </p>
          <p>
            <u>Count:</u> {product.rating.count}
          </p>
        </p>
      </div>

      <div></div>

      <p className="text-gray-800">
        <strong>Description: </strong>
        {product.description}
      </p>
    </div>
  );
};

export default ProductCard;
