import { useState, useEffect, useRef, useMemo, useReducer } from "react"; //importamos todos los hooks necesarios
import "./App.css";
import axios from "axios";
import ProductList from "./components/ProductList";
import { BiSolidCommentError } from "react-icons/bi";
import type Product from "./helpers/interfaces";
import type { FetchState } from "./helpers/interfaces";

const initialState: FetchState = {
  data: [],
  loading: true,
  error: null,
};

function fetchReducer(state: FetchState, action: any): FetchState {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, data: action.payload };
    case "FETCH_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const [searchTerm, setSearchTerm] = useState<string>(""); //👈🏼 estado para la busqueda
  const searchInputRef = useRef<HTMLInputElement>(null); // ref para el input

  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const response = await axios.get<Product[]>(
          "https://fakestoreapi.com/products"
        );
        console.log(response);
        dispatch({ type: "FETCH_SUCCESS", payload: response.data });
      } catch (error) {
        const message = "Hubo un error";
        dispatch({ type: "FETCH_FAILURE", payload: message });
      }
    };
    fetchProducts();
  }, []);

  // 👇🏼 lo usamos para poner el foco en el input
  useEffect(() => {
    searchInputRef.current?.focus();
  }, [state.loading]);

  // 👇🏼 lo usamos para filtrar eficientemente los productos
  const filteredProducts = useMemo(() => {
    return state.data.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
  }, [state.data, searchTerm]); //👈🏼 Dependencias: se recalcula - solo si products o searchTerms cambian

  // console.log(products);

  if (state.loading) {
    return (
      <div>
        <h2>Loading....</h2>
        <div className="loader"></div>
      </div>
    );
  }

  if (state.error) {
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
