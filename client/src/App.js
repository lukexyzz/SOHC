import { useEffect, useState } from 'react';

const API_BASE = process.env.REACT_APP_API_URL || "";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/hello`)
      .then(res => res.json())
      .then(data => setData(data.message));
}, []);

  return (
    <div>
      <h1>Server says: {data ? data : "Loading..."}</h1>
    </div>
  );
}

// THIS IS THE MISSING LINE:
export default App;