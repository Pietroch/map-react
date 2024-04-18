import React, { useState } from 'react';
import { SegmentedControl } from '@mantine/core';
import AuthenticationForm from './Auth';
import Map from './Map';
import Map2 from './Map2';
import Table from './blood/table';

import './App.css'

const App = () => {
  const [activeModule, setActiveModule] = useState('Auth');

  const handleModuleChange = (value) => {
    setActiveModule(value);
  };

  return (
    <>
      <h1>Bienvenue sur mon application !</h1>
      <div className="header">
        <SegmentedControl
          data={['Auth', 'Map', 'Map2', 'Table']}
          value={activeModule}
          onChange={handleModuleChange}
        />
      </div>
      <div className="container">
        {activeModule === 'Auth' && <AuthenticationForm />}
        {activeModule === 'Map' && <Map />}
        {activeModule === 'Map2' && <Map2 />}
        {activeModule === 'Table' && <Table />}
      </div>
    </>
  );
};

export default App;
