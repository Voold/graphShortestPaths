import { useEffect, useState } from 'react';
import './UI.css';
import AnswerBox from './AnswerBox';
import SecCodeAnswer from './SecCodeAnswer';

function SecCodeOut() {

    let input=[]

    // Функция для проверки, может ли одна конъюнкция поглотить другую
    function canAbsorb(a, b) {
        // Проверяем, есть ли у a все переменные b
        for (let ch of b) {
            // Игнорируем пробелы
            if (ch === ' ') continue;

            // Проверяем наличие переменной или ее отрицания
            if (!a.includes(ch) && !a.includes(ch.toUpperCase())) {
                input.push(`Конъюнкция '${a}' не может поглотить '${b}'`);
                //console.log(`Конъюнкция '${a}' не может поглотить '${b}'`);
                return false;
            }
        }
        input.push(`Конъюнкция '${a}' может поглотить '${b}'`);
        //console.log(`Конъюнкция '${a}' может поглотить '${b}'`);
        return true;
    }

    // Функция для минимизации булевой функции методом Блейка-Порецкого
    function minimize(dnf) {
        input=[];
        const minimizedSet = new Set();

        // Перебираем все конъюнкции
        for (const conj of dnf) {
            let absorbed = false;

            // Проверка на наличие отрицательных литералов
            if (conj.includes('¬')) {
                input.push(`Конъюнкция '${conj}' содержит отрицательные литералы.`);
                //console.log(`Конъюнкция '${conj}' содержит отрицательные литералы.`);
            }

            for (const other of dnf) {
                if (conj !== other && canAbsorb(conj, other)) {
                    absorbed = true;
                    input.push(`Конъюнкция '${conj}' поглощена другой.`);
                    //console.log(`Конъюнкция '${conj}' поглощена другой.`);
                    break;
                }
            }
            // Если не поглощена, добавляем в результирующее множество
            if (!absorbed) {
                minimizedSet.add(conj);
                input.push(`Конъюнкция '${conj}' добавлена в минимизированное множество.`);
                //console.log(`Конъюнкция '${conj}' добавлена в минимизированное множество.`);
            }
        }

        return Array.from(minimizedSet);
    }



    function calculate() {
        if (!DNF.length) return;

        // Минимизация
        const minimizedResult = minimize(DNF);
        
        // Обновляем состояние с использованием функционального обновления
        setAnswersList(prevAnswers => [
            {
                answer: [`\nМинимизированная ДНФ: `, ...minimizedResult], // Добавляем минимизированные конъюнкции
                history: input,
            },
            ...prevAnswers,
        ]);
        
        // Выводим alert с минимизированной ДНФ
        alert(`Минимизированная ДНФ: \n${minimizedResult.join(" v ")}`);
    }

    function infoF(){
        alert("Исходная ДНФ: \n"+DNF.join(" v "));
    }

    function pushToDNF(event){
        event.preventDefault();
        if (!DNF.includes(event.target[0].value))
            setDNF([...DNF, event.target[0].value]);
        event.target[0].value = "";
    }

    function setD1(){
        setDNF(["A B C D",
            "¬A B C",
            "A ¬C D",
            "B C D",
            "¬A B",
            "B ¬C",
            "C D",
            "¬A"]);
    }
    function setD2(){
        setDNF([
            "A B C",
            "¬A D",
            "B C ¬D",
            "¬B C D",
            "A ¬C",
            "D",
            "¬A ¬B",
            "C D"
        ]);
    }
    function setN(){
        setDNF([]);
    }

    const [DNF, setDNF] = useState([]);
    const [answersList, setAnswersList] = useState([]);


    return (
        <div className="main_UI_box">
          <p>Исходная ДНФ <div class="infoBut" title='Подробнее...' onClick={infoF}>i</div></p> 
          <pre>
            <ul>
                {DNF.map((item) => (
                    <li>{item}</li>
                ))}
            </ul>
          </pre>

          <form id="set_node" onSubmit={pushToDNF}>
            <p>Добавить конъюнкцию</p>
            <input class="bigField inputField" type='text' placeholder='Конъюнкция: ¬A B C' name="A"></input>
            <button class="addBut" form="set_node" type="submit">Добавить</button>
          </form>

          <div class="demoGraphs">Демо: 
            <div class = "infoBut" onClick={setD1}>D-1</div>
            <div class = "infoBut" onClick={setD2}>D-2</div>
            <div class = "infoBut" onClick={setN}>N</div>
          </div>


        <div class="addBut bigBut" onClick={calculate}>Рассчитать</div>


          <div class = "answer_wrapper">
            <ul>
                {answersList.map((item) => (
                    <li>{<SecCodeAnswer answer={item.answer} history={item.history}/>}</li>
                ))} 
            </ul>
          </div>
   
            
      </div>
   
    );
  }
  
  export default SecCodeOut;
  