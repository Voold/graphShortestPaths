import './App.css';
import { Link } from "react-router-dom";
import AppBody from './AppBody';
import {Route,Routes} from 'react-router-dom';
import AppCode2 from './AppCode2';

function App() {

  return (
    <>
      <header>Работу выполнил студент группы 8К32 - Харитонкин А.Е.</header>
      <header class="navigation">
        <Link className='navLink' to="/">Блейк-Порецкий</ Link>
        <Link className='navLink' to="/findPaths">Поиск путей</ Link>
      </header>
      <Routes>
          <Route path='/' element={<AppCode2/>} />
          <Route path="/findPaths" element={<AppBody/>}/>
      </Routes>
    </>
    
  );
}

export default App;
