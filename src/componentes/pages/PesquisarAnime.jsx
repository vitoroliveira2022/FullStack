import { useState } from "react";
import BotaoPesquisar from './BotaoPesquisar';
import MostraDados from "./MostraDados";
import axios from 'axios';
import './PesquisarAnime.modules.css'; // importei o CSS desse elemento

function PesquisarAnime(){ 
    const [anime,setAnime] = useState(); // para o anime que digitar
    const [animes, setAnimes] = useState([]); // para todos os animes

    function pesquisandoAnime(){
        axios.get('https://api.jikan.moe/v4/anime?q='+anime+'&sfw') // faz a requisição de acordo com o anime q digitar
            .then((res)=>{
                const novoAnime = {
                    imagem: res.data.data[0].images.jpg.image_url,
                    titulo: res.data.data[0].title,
                    ano: res.data.data[0].year,
                    episodios: res.data.data[0].episodes
                };
                setAnimes(animesAntigos => [...animesAntigos, novoAnime]); // coloca anime na lista de animes
            }).catch((erro)=>{
                console.log(erro)
            })           
    }

    function excluirAnime(index) {
        setAnimes(animesAntigos => animesAntigos.filter((anime, i) => i !== index)); // exclui anime por seu index
    }

    // na linha 41 estou passando o evento (função pesquisandoAnime) e o conteudo interno do botao via props para
    // o elemento BotaoPesquisar

    // na linha 43 eu percorro todo o array de animes e mostro cada anime (renderiza MostraDados para cada anime)

    // na linhas 45 a 50 eu passo os dados da API via props, inclusive uma função para o elemento MostraDados
    return (
        <div>
            <h2>Pesquisando animes</h2>
            <label>Digite o nome do anime: </label>
            <input type="text" onChange={(e)=>setAnime(e.target.value)}/>
            <BotaoPesquisar event={pesquisandoAnime} text="Pesquisar" />
            <div className="divPai">
                {animes.map((anime, index) => 
                    <MostraDados 
                        key={index} 
                        url_img={anime.imagem} 
                        titulo={anime.titulo} 
                        ano={anime.ano} 
                        ep={anime.episodios}
                        excluirAnime={() => excluirAnime(index)}
                     ></MostraDados>
                )}
            </div>
        </div>
    )
}
export default PesquisarAnime;
