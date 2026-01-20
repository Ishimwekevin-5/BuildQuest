import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Engineers from './pages/Engineers';
import Equipment from './pages/Equipment';
import LandPlots from './pages/LandPlots';
import ProjectAdvisor from './pages/ProjectAdvisor';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/engineers" element={<Engineers />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/landplots" element={<LandPlots />} />
          <Route path="/advisor" element={<ProjectAdvisor />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;