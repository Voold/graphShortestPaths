import './App.css';
import SecCodeBlock from './SecCodeBlock';
import SecCodeOut from './SecCodeOut';

function AppCode2() {

  return (
    <>
      <div className="App">

        <div class = "codePart">
          <SecCodeBlock/>
        </div>

        <div class = "visualPart">
          <div class = "visualPart_wrapper">
            <SecCodeOut/>
          </div>
        </div>
     </div> 
    </>
  );
}

export default AppCode2;
