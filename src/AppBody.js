import './App.css';
import CodeBlock from './CodeBlock';
import UI from './UI';

function AppBody() {

  return (
    <>
      
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

export default AppBody;
