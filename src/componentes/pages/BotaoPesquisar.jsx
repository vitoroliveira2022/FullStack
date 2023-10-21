import './BotaoPesquisar.modules.css';

function BotaoPesquisar(props){ 
    // estou usando o evento passado (função pesquisandoAnime) e o conteudo interno passado via props
    return<>
        <button onClick={props.event}>{props.text}</button>
    </>
}export default BotaoPesquisar;