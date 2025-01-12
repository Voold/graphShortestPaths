import './AnswerBox.css';

function SecCodeAnswer(props) {

  function showHistory(){
    let str = "Ход решения: \n"

    props.history.forEach(element => {
        str+= (element + "\n");
    });

    alert (str);
  }

  return (
    <>
    <div className="main_answer_box">

        <div class="mab_lpart">
            <ul>
                {props.answer.map((item) => (
                    <li>{item}</li>
                ))}
            </ul> 
        </div>

        <div class = "mab_rpart">
            <div class="infoBut" title="Подробнее..." onClick={showHistory}>...</div>
        </div>

    </div>
    <div className="main_answer_box">

        <div class="mab_lpart">
            <ul>
                {props.history.map((item) => (
                    <li>{item}</li>
                ))}
            </ul> 
        </div>

    </div>
    </>
  );
}

export default SecCodeAnswer;
