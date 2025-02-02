import { QuoteList } from "../components/QuoteList.tsx";
import { QuoteItem } from "../components/QuoteItem.tsx";
import api from "../api.ts";

import { useEffect, useState } from "react";

export const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const fetchQuotes = async () => {
    try {
      const response = await api.get("/quotes");
      setQuotes(response.data.quotes);
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <QuoteList>
      {quotes.map((quote: { id: number; quote: string; author: string }) => (
        <QuoteItem key={quote.id} quote={quote.quote} author={quote.author} />
      ))}
    </QuoteList>
  );
};
