import { useState } from "react";
import MostraAnime from "./MostraAnime";


function ApiAnime (){

    const [anime,setAnime] = useState(); // criei os estados

    // na linha 14 passo por props o 'anime' que contem o nome do Anime
    return(
        <div className="principal">
            <h2>Digite o nome do anime: </h2>
            <input type="text" onChange={(e)=>setAnime(e.target.value)}/>
            <MostraAnime nomeAnime={anime}></MostraAnime>
        </div>
    )
        
    
} export default ApiAnime;