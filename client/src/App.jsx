import React, { useEffect } from 'react';
import Registration from './components/Registration'

import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import './App.css';

function App() {

  useEffect(() => {
    M.AutoInit();
  }, [])

  return (
    <div className="container center">
      <p className="flow-text red-text">React Forms</p>
      <Registration />
    </div>
  );
}

export default App;
