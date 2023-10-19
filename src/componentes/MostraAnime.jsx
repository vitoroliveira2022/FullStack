import axios from "axios";
import '../componentes/MostraAnime.modules.css'

function MostraAnime({nomeAnime}){ // desmembrei a props para uma unica propriedade 

    function pesquisaAnime(){
        axios.get('https://api.jikan.moe/v4/anime?q='+nomeAnime+'&sfw') // anime tem o valor recebido por props
            .then((res)=>{
                let div = document.querySelector('.organizaAnimes');
                let imagem = document.createElement('img');
                imagem.src = res.data.data[0].images.jpg.image_url;
                imagem.classList.add('imagemAnime'); // Adiciona a classe à imagem
                
            
                
                let div2 = document.createElement('div');
                div2.setAttribute('class','organizaInfo');
                let titulo = document.createElement('p');
                titulo.innerHTML = 'Nome: ' +res.data.data[0].title;
                let ano = document.createElement('p');
                ano.innerHTML = 'Ano de lançamento: ' +res.data.data[0].year;
                let ep = document.createElement('p');
                ep.innerHTML = 'Qtde de ep: '+res.data.data[0].episodes;

                div2.appendChild(imagem);
                div2.appendChild(titulo);
                div2.appendChild(ano);
                div2.appendChild(ep);

                div.appendChild(div2);

            }).catch((erro)=>{
                console.log(erro)
            })       
    }

    return (
        <div>
            <button className="bt" onClick={pesquisaAnime}>PESQUISAR</button>
            <div className="organizaAnimes">
            </div>
        </div>
    )
}export default MostraAnime;