import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import CSVReader from "react-csv-reader";
import axios from "axios";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [file, setFile] = useState(null);
  const [csv, setCsv] = useState(null);
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState([]);

  const data = new FormData();
  data.append("file", csv);

  async function checkProducts() {
    setErrors([]);
    async function fetchProducts() {
      try {
        const res = await axios.post(
          "http://localhost:5000/get-products",
          file
        );
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    async function fetchErrors() {
      try {
        await axios.post("http://localhost:5000/check-products", data, {
          headers: { "Content-type": "multipart/form-data" },
        });
      } catch (err) {
        setErrors(err.response.data);
      }
    }
    fetchProducts();
    fetchErrors();
  }

  async function updatePrices() {
    try {
      const res = await axios.post(
        "http://localhost:5000/edit-products",
        data,
        { headers: { "Content-type": "multipart/form-data" } }
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }
  console.log(csv);
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-24 ${inter.className}`}>
      <div className="flex">
        <button
          className="border-2 border-black p-2 mr-96 bg-green-500"
          onClick={checkProducts}>
          Validar
        </button>
        <button
          className={`border-2 border-black p-2 ${
            errors.length === 0 && csv !== null && "bg-green-500"
          }`}
          disabled={errors.length > 0 && csv !== null}
          onClick={updatePrices}>
          Atualizar
        </button>
      </div>
      <h1 className="mt-20 mb-3">Altere o preço dos produtos</h1>
      <CSVReader
        label="Insira aqui o seu .csv: "
        onFileLoaded={(data, _fileInfo, originalFile) => {
          setCsv(originalFile);
          setFile(data);
        }}
      />
      {products.length > 0 && (
        <table className="borer-2 border-black text-center mt-20">
          <thead className="border-2 border-black">
            <tr>
              <th>Código</th>
              <th>Nome</th>
              <th>Preço Atual</th>
              <th>Novo Preço</th>
            </tr>
          </thead>
          <tbody className="border-2 border-black">
            {products.map((product, index) => {
              return (
                <tr key={product.code}>
                  <td>{product.code}</td>
                  <td>{product.name}</td>
                  <td>{product.salePrice}</td>
                  {file[index + 1][1] ? (
                    <td>{file[index + 1][1]}</td>
                  ) : (
                    <td>Informe o novo valor do produto</td>
                  )}
                  {errors.length > 0 &&
                    errors.map(
                      (e) =>
                        Number(Object.keys(e)) === product.code && (
                          <td>{Object.values(e)}</td>
                        )
                    )}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <div></div>
    </main>
  );
}
