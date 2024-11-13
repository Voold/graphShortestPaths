import './App.css';
import CodeBlock from './CodeBlock';
import UI from './UI';

function App() {

  return (
    <>
      <header>Работу выполнил студент группы 8К32 - Харитонкин А.Е.</header>
      <div className="App">

        <div class = "codePart">
          <CodeBlock/>
        </div>

        <div class = "visualPart">
          <div class = "visualPart_wrapper">
            <UI/>
          </div>
        </div>

      </div>
    </>
    
  );
}

export default App;
