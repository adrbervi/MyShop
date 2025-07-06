import { useState, useEffect, useRef, useMemo } from "react"; //importamos todos los hooks necesarios
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
  const [searchTerm, setSearchTerm] = useState<string>(""); //👈🏼 estado para la busqueda
  const searchInputRef = useRef<HTMLInputElement>(null); // ref para el input

  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      try {
        const response = await axios.get<Product[]>(
          "https://fakestoreapi.com/products"
        );
        setProducts(response.data);
        /* setLoading(false); */ // colocado en el finally
      } catch (error) {
        if (error instanceof Error) {
          /*setLoading(false);*/ /// colocado en el finally
          setError(error.message);
        } else {
          setError("Hubo un error en la consulta");
        }
        console.log("Error al consultar los usuarios");
      } finally {
        setLoading(false); //👈🏼 Se ejecuta siempre, bueno, para quietar el loading
      }
    };
    fetchProducts();
  }, []);

  // 👇🏼 lo usamos para poner el foco en el input To Do: revisar
  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  // 👇🏼 lo usamos para filtrar eficientemente los productos
  const filteredProducts = useMemo(() => {
    console.log("filtrando usuarios");
    return products.filter(
      (
        product // ToDO: Analizar si en vez de includes() usamos mejor startsWith
      ) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]); //👈🏼 Dependencias: se recalcula - solo si products o searchTerms cambian

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
    <div className="p-4 container mx-auto">
      <h1 className="text-4xl font-bold text-center my-6 text-gray-800">
        Mi lista de Productos
      </h1>
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Busca por title, category o price...."
          className="w-full max-w-lg p-3 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
          ref={searchInputRef}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ProductList products={filteredProducts} />
    </div>
  );
}

export default App;
