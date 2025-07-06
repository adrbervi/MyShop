import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import ProductList from "./components/ProductList";
import { BiSolidCommentError } from "react-icons/bi";

export interface Rating {
  count: number;
  rate: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  imageUrl: string;
  rating: Rating;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>(null);

  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      try {
        const response = await axios.get<Product[]>(
          "https://fakestoreapi.com/products"
        );
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setLoading(false);
          setError(error.message);
        } else {
          setLoading(false);
          setError("Hubo un error en la consulta");
        }
        console.log("Error al consultar los usuarios");
      }
    };
    fetchProducts();
  }, []);

  // console.log(products);

  if (loading) {
    return (
      <div>
        <h2>Loading....</h2>
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return (
      <p>
        <span className="text-red-500">
          <BiSolidCommentError />
        </span>
        Hubo un TREMENDISIMO error...
        <span className="text-red-900">
          <BiSolidCommentError />
        </span>
      </p>
    );
  }

  return (
    <>
      <ProductList products={products} />
    </>
  );
}

export default App;
