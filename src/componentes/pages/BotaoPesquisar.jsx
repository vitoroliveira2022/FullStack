import './BotaoPesquisar.modules.css';

function BotaoPesquisar(props){
    return<>
        <button onClick={props.event}>{props.text}</button>
    </>
}export default BotaoPesquisar;