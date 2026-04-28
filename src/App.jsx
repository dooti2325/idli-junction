import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PublicLayout from './pages/PublicLayout';
import AdminLayout from './pages/AdminLayout';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/*" element={<PublicLayout />} />
          <Route path="/admin/*" element={<AdminLayout />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
