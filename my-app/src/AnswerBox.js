import './AnswerBox.css';

function AnswerBox(props) {

  function showPathsAndCosts(){
    let str = "Пути до этого графа: \n\n"
    for (let i = 0; i < props.paths.length; i++){
      str += " * Путь: "+props.paths[i] + " цены - ("+props.costs[i]+")\n"
    }

    if ( props.paths.length == 1 && props.paths[0] == "" && props.costs[0] == 0) {
      str = "Путей нет! 0_0";
    }

    alert (str);
  }

  return (
    <div className="main_answer_box">

      <div class="mab_lpart">
        k = {props.k} | {props.A}&rarr;{props.B}  <br/>
        {props.paths.join(", ")} {props.paths == 0 && "Путей нет   0_0"} 
      </div>

      <div class = "mab_rpart">
        <div class="infoBut" title="Подробнее..." onClick={showPathsAndCosts}>...</div>
      </div>

    </div>
  );
}

export default AnswerBox;
