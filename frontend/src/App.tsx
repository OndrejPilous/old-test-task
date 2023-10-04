import React, { useEffect, useState } from "react";
import "./App.css";

type SrealityOffer = {
  id: number;
  title: string;
  address: string;
  price: string;
  img: string;
};

function App() {
  const [data, setData] = useState<SrealityOffer[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/v1/getData?page=${page}&pageSize=${pageSize}`
        );
  
        if (!response.ok) {
          throw new Error(`Request failed`);
        }
  
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

  }, [page, pageSize]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sreality data scraper</h1>
      </header>
      <main>
        <div className="pagination">
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            Previous
          </button>
          <span>Page {page}</span>
          <button onClick={() => setPage(page + 1)}>Next</button>
        </div>
        <div className="offer-list">
          {/* Display your list of offers here */}
          {data.map((offer) => (
            <div className="offer-card" key={offer.id}>
              <h2>{offer.title}</h2>
              <p>{offer.address}</p>
              <p>{offer.price}</p>
              <img src={offer.img} alt={offer.title} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
