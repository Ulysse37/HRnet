import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import { store } from './redux/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css';
import Home from './pages/home/Home';
import Employee from './pages/employee/Employee';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router /* basename='/HRnet' */>
        <Routes>
          <Route path="/HRnet/" element={<Home />}></Route>
          <Route path="/HRnet/employee-list" element={<Employee />}></Route>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
