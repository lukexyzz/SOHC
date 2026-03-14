import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div>
      <h1>Server says: {data ? data : "Loading..."}</h1>
    </div>
  );
}

// THIS IS THE MISSING LINE:
export default App;