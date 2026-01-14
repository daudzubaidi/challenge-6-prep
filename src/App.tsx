import { Routes, Route } from 'react-router-dom';
import { HomePage } from './components/pages/Home/HomePage';
import { DetailPage } from './components/pages/Detail/DetailPage';
import { FavoritesPage } from './components/pages/Favorites/FavoritesPage';
import { SearchPage } from './components/pages/Search/SearchPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movie/:id" element={<DetailPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
}

export default App;
