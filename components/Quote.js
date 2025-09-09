import React, { useState, useEffect } from "react";

const Quote = () => {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    async function fetchQuote() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/homequotesection`);

        const data = await res.json();
        setQuote(data);
      } catch (e) {
        setQuote(null);
      }
    }
    fetchQuote();
  }, []);

  return (
    <section className="py-20 px-5 lg:py-40 lg:px-8 bg-gradient-to-br from-amber-50 to-amber-100 text-center border-y border-amber-100">
      <div className="max-w-sm mx-auto lg:max-w-2xl space-y-4 lg:space-y-6">
        <div className="w-16 h-1 bg-amber-300 rounded-full mx-auto lg:w-24"></div>
        <p className="italic text-amber-900 font-medium text-base leading-relaxed lg:text-xl lg:leading-relaxed">
          {quote?.text ||
            '"Whoever saves one life - it is as if he had saved mankind entirely."'}
        </p>
        <p className="text-sm text-amber-700 lg:text-base">
          {quote?.reference || "— Surah Al-Ma'idah 5:32"}
        </p>
        <div className="w-16 h-1 bg-amber-300 rounded-full mx-auto lg:w-24"></div>
      </div>
    </section>
  );
};

export default Quote;
