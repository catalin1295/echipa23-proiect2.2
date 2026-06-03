import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar       from './components/layout/Navbar';
import Footer       from './components/layout/Footer';
import Home         from './pages/Home';
import About        from './pages/About';
import Blog         from './pages/Blog';
import ArticlePage  from './pages/ArticlePage';
import Contact      from './pages/Contact';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        {/* Navbar sticky — vizibil pe fiecare pagina */}
        <Navbar />

        {/* Continut principal */}
        <main className="flex-1 pt-16">
          <Routes>
            <Route path="/"           element={<Home />}        />
            <Route path="/about"      element={<About />}       />
            <Route path="/blog"       element={<Blog />}        />
            <Route path="/blog/:slug" element={<ArticlePage />} />
            <Route path="/contact"    element={<Contact />}     />
          </Routes>
        </main>

        {/* Footer cu copyright */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
