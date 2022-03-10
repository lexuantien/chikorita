import React, { useEffect } from 'react';
import Header from "./header"
import { logDebug } from './middleware/logger';

const App = () => {

  const method = "get"
  useEffect(() => {
    logDebug(`Unknown redirect method "${method}". Defaulting to replace`)
  }, [])


  return (
    <div>
      <Header />
    </div>
  );
};

export default App;