import { useEffect, useState } from 'react';
import './UI.css';
import AnswerBox from './AnswerBox';

function UI() {

        class Graph {
        constructor() {
            this.adjacencyList = {}; // список смежности аля
        }

        clearGraph(){
            this.adjacencyList ={};
        }

        //Добавить вершину
        addEdge(start, end, weight) {
            if (!this.adjacencyList[start]) {
                this.adjacencyList[start] = [];
            }
            if (Object.values(this.adjacencyList[start]).filter((item) => (item.node === end)).length == 0){
                this.adjacencyList[start].push({ node: end, weight: weight }); 
            } else {
                Object.values(this.adjacencyList[start]).map((item) => {
                                                                if (item.node == end)
                                                                        item.weight = weight;
                                                                })}
            // в список смежности к вершине вставляем узел (end) и вес пути к нему

        }

        getNeighbors(node) {
            return this.adjacencyList[node] || [];
        }

        //Ищем кратчайший путь от 1 вершины до другой по Дейкстру
        findShortestPath(start, end) { 
            const distances = {}; // расстояния
            const previous = {}; // предыдущие
            const queue = new PriorityQueue(); // Очередь с приоритетом
            
            for (const edge in this.adjacencyList) {
                distances[edge] = Infinity;
                previous[edge] = null;
            } // Сперва проставили все расстояния как бесконечность, а предыдущие пустые
            
            distances[start] = 0;
            queue.enqueue(start, 0); // Добавили в приоритетную очередь первую вершину
            
            while (!queue.isEmpty()) {
                const currentEdge = queue.dequeue().element; // удаляет самый приоритетный элемент - возвращает его же
                
                if (currentEdge === end) {
                    const path = [];
                    let temp = currentEdge;
                    while (temp) {
                        path.push(temp);
                        temp = previous[temp];
                    }
                    return path.reverse();
                }
                
                for (const neighbor of this.getNeighbors(currentEdge)) { // for .. of - neighbor будет мини объектиком {node:.. ,weight:..}
                    const alt = distances[currentEdge] + neighbor.weight;
                    if (alt < distances[neighbor.node]) {
                        distances[neighbor.node] = alt; // дистанция от соседнего узла
                        previous[neighbor.node] = currentEdge; // предыдущая вершина для соседнего узла  - эта вершина
                        queue.enqueue(neighbor.node, alt); // добавляем в приоритетную очередь [вершина, дистанция до нее] (приоритет по дистанции как раз)
                    }
                }
            }
            
            return []; // Если путь не найден
        }

        kShortestPaths(start, end, k) {
            let MRemovedEdges = []
            const firstPath = this.findShortestPath(start, end);
            const paths = [firstPath.join('')];
            const pathCosts = [this.calculatePathCost(firstPath)];
            const uniquePaths = new Set(paths.map(path => path)); // Используем Set для уникальности

            for (let i = 0; i < Object.values(Object.values(graph)[0]).length; i++) {
                let newPaths = [];
                for (let j = 0; j < paths.length; j++) {
                    const path = paths[j];
                    const pathCost = pathCosts[j];

                    for (let n = 0; n < path.length - 1; n++) {
                        const tempNode = path[n];
                        const rootPath = path.slice(0, n + 1);
                        const removedEdges = this.removeEdges(rootPath);
                        MRemovedEdges.push(...removedEdges);


                        //const tempPath = this.findShortestPath(start, end);
                        const tempPath = this.findShortestPath(tempNode, end);
                

                        if (tempPath.length > 0 ) {

                            const totalPath = rootPath + tempPath.slice(1).join("");
                            const totalCost = this.calculatePathCost(totalPath);
                            
                            const pathKey = totalPath;
                            if (!uniquePaths.has(pathKey) && (totalPath[0] === start) && (totalPath[totalPath.length-1] === end) ) {
                                newPaths.push({ path: totalPath, cost: totalCost });
                                uniquePaths.add(pathKey); // Добавляем путь в Set
                            }
                        }
                    }
                }

                
                //this.restoreEdges(MRemovedEdges);

                // Сортируем новые пути по стоимости
                newPaths.sort((a, b) => a.cost - b.cost);

                // Добавляем только уникальные пути
                for (const newPath of newPaths) {
                    if (paths.length < k) {
                        paths.push(newPath.path);
                        pathCosts.push(newPath.cost);
                    } else {
                        break; // Если мы уже нашли k путей, выходим
                    }
                }

                if (paths.length >= k) break;
            }

            this.restoreEdges(MRemovedEdges);

            return {paths: paths, costs: pathCosts};
            /* return paths.slice(0, k); */
        }



        calculatePathCost(path) {
            let cost = 0;
            for (let i = 0; i < path.length - 1; i++) {
                const neighbors = this.getNeighbors(path[i]);
                for (const neighbor of neighbors) {
                    if (neighbor.node === path[i + 1]) {
                        cost += neighbor.weight;
                        break;
                    }
                }
            }
            return cost;
        }



        removeEdges(rootPath) {
            const removedEdges = [];
            for (let i = 0; i < rootPath.length - 1; i++) {
                const start = rootPath[i];
                const end = rootPath[i + 1];
                const neighbors = this.getNeighbors(start);
                for (const neighbor of neighbors) {
                    if (neighbor.node === end) {
                        removedEdges.push({ start: start, end: end, weight: neighbor.weight });
                        this.adjacencyList[start] = this.adjacencyList[start].filter(edge => edge.node !== end);
                        break;
                    }
                }
            }

            return removedEdges;
        }

        restoreEdges(removedEdges) {
            for (const edge of removedEdges) {
                this.addEdge(edge.start, edge.end, edge.weight);
            }
        }

        graphInfo () {
            console.log(this.adjacencyList);
        }
    }

    class PriorityQueue {
        constructor() {
            this.items = [];
        }

        enqueue(element, priority) {
            this.items.push({ element, priority });
            this.items.sort((a, b) => a.priority - b.priority);
        }

        dequeue() {
            return this.items.shift();
        }

        isEmpty() {
            return this.items.length === 0;
        }
    }

    let graph = new Graph();

    const [graphState, setGraphState] = useState(graph)
    const [tvGraph, setTvGraph] = useState("")
    const [answersList, setAnswersList] = useState([])

    const set_nodeState = (e) => {
        e.preventDefault();

        graph.adjacencyList = graphState.adjacencyList;


        if (!e.target["A"].value.replaceAll(' ', '').isEmpty  && !e.target["B"].value.replaceAll(' ', '').isEmpty && e.target["C"].value != 0 && !e.target["C"].value.isEmpty){
            graph.addEdge(e.target["A"].value.replaceAll(' ', '').toUpperCase(),e.target["B"].value.replaceAll(' ', '').toUpperCase(),+e.target["C"].value);
        };
            
        setGraphState(graph);

        getTvGraph();
    };

    function getTvGraph () {
        let str = "";

        for (let node of Object.keys(graph.adjacencyList)){
            str += " |" + node + "| ";
            for (let neighbor of graph.getNeighbors(node)){
                str += (" " + neighbor.node)
            }
            str+="\n"
        }
        setTvGraph(str);
    }

    useEffect(() => {
        setTvGraph(tvGraph);
      },[graphState]) 

    function aboutGraph () {
        let info = "Текущий граф:\n"

        graph.adjacencyList = graphState.adjacencyList;

        for (let node of Object.keys(graph.adjacencyList)){
            info += " |" + node + "| ";
            for (let neighbor of graph.getNeighbors(node)){
                info += (" " + neighbor.node + " ("+neighbor.weight+") ")
            }
            info+="\n"
        }
        alert(info);
    }

    function getDemo (e) {

        graph.clearGraph();

        const G1 = () => {
            graph.addEdge('A', 'B', 2);
            graph.addEdge('A', 'C', 10);
            graph.addEdge('A', 'D', 3);
            graph.addEdge('B', 'C', 3);
            graph.addEdge('D', 'C', 1);
            graph.addEdge('C', 'E', 2);
            graph.addEdge('E', 'D', 5);
        }

        const G2 = () => {
            graph.addEdge('A', 'B', 2);
            graph.addEdge('A', 'F', 3);
            graph.addEdge('B', 'C', 2);
            graph.addEdge('C', 'B', 3);
            graph.addEdge('C', 'A', 4);
            graph.addEdge('D', 'B', 7);
            graph.addEdge('E', 'D', 9);
            graph.addEdge('E', 'F', 5);
            graph.addEdge('E', 'G', 6);
            graph.addEdge('F', 'C', 8);
            graph.addEdge('F', 'G', 2);
            graph.addEdge('G', 'A', 5);
            graph.addEdge('G', 'F', 1);

            graph.addEdge('E','Q',4);
            graph.addEdge('Q','A',4);
            graph.addEdge('E','R',3);
            graph.addEdge('R','A',3);
        }

        switch (e.target.innerHTML){
            case "G1":
                G1();
                setGraphState(graph);
                break;
            case "G2":
                G2();
                setGraphState(graph);
                break;
            case "N":
                setGraphState(graph);
                break;
        }

        setGraphState(graph);
        getTvGraph();
    }

    function calculate_paths (e) {
        e.preventDefault();

        graph.adjacencyList = graphState.adjacencyList;

        let paths = null;

        if (!e.target["C"].value.replaceAll(' ', '').isEmpty  && !e.target["B"].value.replaceAll(' ', '').isEmpty && e.target["A"].value != 0 && !e.target["A"].value.isEmpty){
            paths = graph.kShortestPaths(e.target["B"].value.replaceAll(' ', '').toUpperCase(), e.target["C"].value.replaceAll(' ', '').toUpperCase(), e.target["A"].value);
            setAnswersList(() => ([{
                k: e.target["A"].value, 
                A: e.target["B"].value.replaceAll(' ', '').toUpperCase(), 
                B: e.target["C"].value.replaceAll(' ', '').toUpperCase(), 
                paths: paths.paths,
                costs: paths.costs,
            }, ...answersList]))
        };
    }

    function clearAnswerList () {
        setAnswersList([])
    }

    

    return (
      <div className="main_UI_box">
          <p>Списки смежности <div class="infoBut" title='Подробнее...' onClick={aboutGraph}>i</div></p> 
          <pre>{tvGraph}</pre>

          <form id="set_node" onSubmit={set_nodeState}>
            <p>Добавить вершину</p>
            <input class="inputField" type='text' placeholder='[В1]' name="A"></input>
            <input class="inputField" type='text' placeholder='[В2]' name="B"></input>
            <input class="inputField" type='number' min = "0" placeholder='[Длина]' name="C"></input>
            <button class="addBut" form="set_node" type="submit">Добавить</button>
          </form>

          <div class="demoGraphs">Демо: 
            <div class = "infoBut" onClick={getDemo}>G1</div>
            <div class = "infoBut" onClick={getDemo}>G2</div>
            <div class = "infoBut" onClick={getDemo}>N</div>
          </div>

          <form id="calculate_paths" onSubmit={calculate_paths}>
            <p>Найти k наименьших путей <div class="infoBut" title='Очистить...' onClick={clearAnswerList}>С</div> </p>
            <input class="inputField" type='number' min="0" placeholder='[k]' name="A"></input>
            <input class="inputField" type='text' placeholder='[В1]' name="B"></input>
            <input class="inputField" type='text' placeholder='[В2]' name="C"></input>
            <button class="addBut" form="calculate_paths" type="submit">Рассчитать</button>
          </form>

          <div class = "answer_wrapper">
            {answersList.map((item) => (
                <AnswerBox k = {item.k} A = {item.A} B = {item.B} paths = {item.paths} costs = {item.costs}/>
            ))}
          </div>
   
            
      </div>
    );
  }
  
  export default UI;
  