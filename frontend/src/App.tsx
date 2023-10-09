import { useEffect, useState } from "react";
import "./App.css";

import Pagination from "./components/Pagination";
import Offer from "./components/Offer";

import axios from "axios";

type SrealityOffer = {
  id: number;
  title: string;
  address: string;
  price: string;
  img: string;
  url: string;
};

function App() {
  const [data, setData] = useState<SrealityOffer[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    axios
      .get(
        `http://localhost:8080/api/v1/getData?page=${page}&pageSize=${pageSize}`
      )
      .then((response: any) => {
        console.log(response.data); // The response data
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetchData();
    setTotalPages(Math.ceil(500 / pageSize));
  }, [page, pageSize]);

  useEffect(() => {
    const el: any = document.querySelector("header");
    if (data.length === 0) {
      el.classList.add("header-active");
      setLoading(true);
      setTimeout(() => {
        fetchData();
      }, 5000);
    } else {
      setLoading(false);
      if (el) {
        el.classList.remove("header-active");
      }
    }
  }, [data]);

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newSize = parseInt(event.target.value);
    setPageSize(newSize);
    setPage(1); // Reset to the first page when changing page size
  };

  const paginationJsx: JSX.Element =
    loading === false ? (
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
        handlePageSizeChange={handlePageSizeChange}
        pageSize={pageSize}
      />
    ) : (
      <></>
    );

  const logoLoading: JSX.Element =
    loading === true ? (
      <div className="loading">
        <img id="logo" src="/images/sreality-app-logo2.png" />
        <span>the data is loading, please wait</span>
      </div>
    ) : (
      <></>
    );

  return (
    <div className="App">
      <div className="wrapper">
        <header>
          <h1>Sreality data scraper</h1>
        </header>
        <main>
          {paginationJsx}
          {logoLoading}
          <div className="offer-list">
            {data.map((offer) => (
              <Offer
                key={offer.id}
                title={offer.title}
                address={offer.address}
                price={offer.price}
                img={offer.img}
                url={offer.url}
              />
            ))}
          </div>
        </main>
        <footer>{paginationJsx}</footer>
      </div>
    </div>
  );
}

export default App;
