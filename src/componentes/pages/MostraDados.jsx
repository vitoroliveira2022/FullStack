import './MostraDados.modules.css'; // importei o CSS do componente

// recebo os dados via props, até msm a função excluirAnime 
function MostraDados(props) {
    return(
        <div className="divFilha">
            <img src={props.url_img} alt="imagemAnime"></img>
            <p>Nome: {props.titulo}</p>
            <p>Ano: {props.ano}</p>
            <p>Qtde de ep: {props.ep}</p>
            <button onClick={props.excluirAnime} className='btExcluir'>Excluir</button>
        </div>
    )
}
export default MostraDados;
