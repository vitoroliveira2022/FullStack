import React, { useState, useEffect, useMemo } from "react";
import MostraDados from "./MostraDados";
import axios from "axios";
import './PesquisarAnime.modules.css';
import Mensagem from "./Mensagem";

function PesquisarAnime() { 
    // criando as variaveis de estado e as funções para atualizar elas
    const [anime, setAnime] = useState(); // vai nascer com valor inicial undefined
    const [animes, setAnimes] = useState([]); // cria um array para guardar os animes
    const [mensagem, setMensagem] = useState(); 

    useEffect(() => { // para chamar a função pesquisandoAnime sempre que a variável de estado 'anime' for alterada
        pesquisandoAnime();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [anime]);

    async function pesquisandoAnime() {
        try {
            // Quando abrir a pagina n vai entrar aqui, o valor da variavel de estado 'anime' (input) estará 'undefined', mas entra ao digitar e depois deixar vazio o input ;
            if (anime === "") { 
                setAnimes([]); // limpa o array de animes (variavel de estado 'animes')
                setMensagem('Digite um nome de anime !');
                return;
            }
            const res = await axios.get('https://api.jikan.moe/v4/anime?q=' + anime + '&sfw'); // faz a requisição de acordo com o valor da variavel de estado 'anime'
            if (res.data.data.length > 0) { // se a API retorna algum dado
                const novosAnimes = res.data.data.map(animeData => ({ // cria um array de animes, onde cada elemento do array é um objeto que representa um anime
                    imagem: animeData.images.jpg.image_url,
                    titulo: animeData.title,
                    ano: animeData.year,
                    episodios: animeData.episodes
                }));

                // filtra o array de animes e cria um array só com os animes não repetidos
                const animesUnicos = novosAnimes.filter(novoAnime => {
                    return !animes.some(a => a.titulo === novoAnime.titulo);
                });

                if (animesUnicos.length > 0) { // se o array de animes únicos tiver algum elemento
                    setAnimes([...animes, ...animesUnicos]); // adicionar esses elementos ao array 'animes' (variavel de estado 'animes')
                    setMensagem(''); 
                } 
            }
            
        } catch (erro) {
            console.log(erro);
        }
    }

    
      
    const mostraDadosComponents = useMemo(() => {
    if (anime && anime.length > 0) { // se a variavel de estado 'anime' não estiver vazia
        // filtra a lista de animes para incluir só os animes que o título começa com o valor da variável de estado 'anime' (substring)
        // depois mapeia cada anime filtrado para um componente 'MostraDados' criando uma lista de componentes 'MostraDados' que
        // vão ser renderizados 
        return animes.filter(a => a.titulo.toLowerCase().substring(0, anime.length) === anime.toLowerCase()).map((anime, index) => 
            <MostraDados 
                key={index} 
                url_img={anime.imagem} 
                titulo={anime.titulo} 
                ano={anime.ano} 
                ep={anime.episodios}
            ></MostraDados>
        )
    }
}, [animes, anime]);

    return (
        <div>
            <h2>Lista de animes: </h2>
            <label>Digite o nome do anime: </label>
            <input type="text" onChange={(e) => setAnime(e.target.value)}/>
            {mensagem && <Mensagem texto={mensagem} />} {/* renderizando componente de forma condicional */}
            <div className="divPai">
                {mostraDadosComponents}
            </div>
        </div>
    );
}

export default PesquisarAnime;
