import React, { useState, useMemo } from "react";
import BotaoPesquisar from './BotaoPesquisar';
import MostraDados from "./MostraDados";
import axios from 'axios';
import './PesquisarAnime.modules.css';
import Mensagem from "./Mensagem";

function PesquisarAnime() { 
    const [anime, setAnime] = useState(""); 
    const [animes, setAnimes] = useState([]); 
    const [mensagem, setMensagem] = useState(""); 

    const memorizaNomeAnime = useMemo(() => anime, [anime]); // estou usando para memorizar o valor do estado 'anime' (input)
    //  sempre que estado 'anime' mudar, a função será executada e um novo valor do estado 'anime' será memorizado.

    async function pesquisandoAnime() {
        try {
            const res = await axios.get('https://api.jikan.moe/v4/anime?q=' + memorizaNomeAnime + '&sfw'); // faz a requisição passando o valor memorizado 
            if (res.data.data.length > 0) { // se retornou os dados de algum anime da API
                const novoAnime = { // estou pegando só os dados do primeiro anime do array nas linhas abaixo
                    imagem: res.data.data[0].images.jpg.image_url,
                    titulo: res.data.data[0].title,
                    ano: res.data.data[0].year,
                    episodios: res.data.data[0].episodes
                };
    
                const existeAnime = animes.some(a => a.titulo === novoAnime.titulo);  // existeAnime usa o método some para verificar se algum anime da lista de animes possui o mesmo titulo que o novoAnime
                if (!existeAnime) { // se não existe anime com o mesmo titulo na lista de animes 
                    setAnimes([...animes, novoAnime]); // coloca o anime na lista de animes
                    setMensagem(''); // vai deixar mensagem em branco quando funcionar
                } else {
                    setMensagem('O anime "' + novoAnime.titulo + '" já está na sua lista de animes');
                }
            } else{ // se não existe na API algum anime com o titulo igual do valor memorizado
                setMensagem('Não foi encontrado nenhum anime com o nome "' + memorizaNomeAnime + '"!');
            }
        } catch (erro) {
            console.log(erro);
        }
    }
    

    function excluirAnime(index) {
        setAnimes(animes.filter((_, i) => i !== index)); // exclui anime por seu índice
    }
    // na linha 60 estou passando o evento (função pesquisandoAnime) e o conteudo interno do botao via 
    //props para o componente 'BotaoPesquisar'
    
    // na linha 61 eu estou renderizando um componente de forma condicional
    
    // na linha 63 eu percorro todo o array de animes para mostrar dados de cada anime 
    // (renderiza MostraDados para cada anime)

    // na linhas 65 a 70 eu passo os dados de cada anime via props e uma função (excluirAnime, recebe o indice do anime como parametro) para o componente MostraDados
    return (
        <div>
            <h2>Lista de animes: </h2>
            <label>Digite o nome do anime: </label>
            <input type="text" onChange={(e) => setAnime(e.target.value)}/>
            <BotaoPesquisar event={pesquisandoAnime} text="Pesquisar" />
            {mensagem && <Mensagem texto={mensagem} />}
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
    );
}

export default PesquisarAnime;
