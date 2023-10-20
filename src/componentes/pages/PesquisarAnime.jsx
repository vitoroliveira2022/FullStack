import BotaoPesquisar from "./BotaoPesquisar";
import { useState } from "react";
import axios from 'axios';
import './PesquisarAnime.modules.css'; 


function PesquisarAnime(){ // desmembrei a props para uma unica propriedade 
    const [anime,setAnime] = useState(); // criei os estados

    function pesquisandoAnime(){
        axios.get('https://api.jikan.moe/v4/anime?q='+anime+'&sfw') 
            .then((res)=>{
                let div = document.querySelector('.divPai');
                let div2 = document.createElement('div');
                div2.setAttribute('class','divFilha');

                let imagem = document.createElement('img');
                imagem.src = res.data.data[0].images.jpg.image_url;
                let titulo = document.createElement('p');
                titulo.innerHTML = 'Nome: ' +res.data.data[0].title;
                let ano = document.createElement('p');
                ano.innerHTML = 'Ano de lançamento: ' +res.data.data[0].year;
                let ep = document.createElement('p');
                ep.innerHTML = 'Qtde de ep: '+res.data.data[0].episodes;
                
                // Para excluir divFilha
                let btExcluir = document.createElement('button');
                btExcluir.classList.add('btExcluir'); // para formatar CSS
                btExcluir.innerText = 'Excluir'; // colocando o texto do button
                btExcluir.onclick = function() {
                    div2.remove();
                };

                // Colocando imagem e as informacoes da API tudo na divFilha
                div2.appendChild(imagem);
                div2.appendChild(titulo);
                div2.appendChild(ano);
                div2.appendChild(ep);
                div2.appendChild(btExcluir);
                
                // Coloca a divFilha dentro da divPai
                div.appendChild(div2); 

                
            }).catch((erro)=>{
                console.log(erro)
            })           
    }


    return (
        <div>
            <h2>Pesquisando animes</h2>
            <label>Digite o nome do anime: </label>
            <input type="text" onChange={(e)=>setAnime(e.target.value)}/>
            <BotaoPesquisar event={pesquisandoAnime} text="Pesquisar" />
            <div className="divPai"></div>
        </div>
    )
}export default PesquisarAnime;