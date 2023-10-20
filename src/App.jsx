import { BrowserRouter as Router,Routes, Route} from 'react-router-dom'; // importei e uso tudo aqui

import Home from './componentes/pages/Home'; // importou o componente (pagina)
import Navbar from './componentes/Navbar'; // importou o componente (pagina)
import PesquisarAnime from './componentes/pages/PesquisarAnime';
import Footer from './componentes/Footer';

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/pesquisarAnime" element={<PesquisarAnime></PesquisarAnime>} />
      </Routes>
      <Footer></Footer>
    </Router>
  );
}

export default App;
