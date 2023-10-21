import {Link} from 'react-router-dom'; // como separei esse menu, ai importo o Link aqui, se fosse tudo no App.jsx 
// ai tinha que importar lá junto com os outros
import './Navbar.modules.css';

function Navbar(){
    return(
        <ul>
            <li><Link to="/" className='link'>Home</Link></li>
            <li><Link to="/pesquisarAnime" className='link'>Pesquisar Anime</Link></li>
        </ul>
    )
}export default Navbar;