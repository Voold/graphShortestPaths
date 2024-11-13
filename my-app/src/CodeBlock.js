import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import './CodeBlock.css';


const CodeBlock = () => {
    const codeString = `class Graph {
        constructor() {
            this.adjacencyList = {}; // список смежности аля
        }

        //Добавить вершину
        addEdge(start, end, weight) {
            if (!this.adjacencyList[start]) {
                this.adjacencyList[start] = [];
            }
            this.adjacencyList[start].push({ node: end, weight: weight }); 
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
                const currentEdge = queue.dequeue(); 
                
                
                if (currentEdge === end) {
                    const path = [];
                    let temp = currentEdge;
                    while (temp) {
                        path.push(temp);
                        temp = previous[temp];
                    }
                    return path.reverse();
                }
                
                // for .. of - neighbor будет мини объектиком {node:.. ,weight:..}
                for (const neighbor of this.getNeighbors(currentEdge)) { 
                    const alt = distances[currentEdge] + neighbor.weight;
                    if (alt < distances[neighbor.node]) {
                        distances[neighbor.node] = alt; // дистанция от соседнего узла
                        previous[neighbor.node] = currentEdge; // предыдущая вершина для соседнего узла  - эта вершина
                        queue.enqueue(neighbor.node, alt); // добавляем в приоритетную очередь 
                                                           // [вершина, дистанция до нее] (приоритет по дистанции как раз)
                    }
                }
            }
            
            return []; // Если путь не найден
        }

        kShortestPaths(start, end, k) {
            let removedEdges = []
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
                        removedEdges.push(removedEdges);

                        //const tempPath = this.findShortestPath(start, end);
                        const tempPath = this.findShortestPath(tempNode, end);
                

                        if (tempPath.length > 0 ) {

                            const totalPath = rootPath + tempPath.slice(1).join("");
                            const totalCost = this.calculatePathCost(totalPath);
                            
                            const pathKey = totalPath;
                            if (!uniquePaths.has(pathKey) && (totalPath[0] === start) && (totalPath[totalPath.length-1] === end) ) {
                                newPaths.push({ path: totalPath, cost: totalCost });
                                uniquePaths.add(pathKey); 
                            }
                        }

                        
                    }
                }

                this.restoreEdges(removedEdges);

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

            return paths.slice(0, k);
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
    }

    class PriorityQueue {
        // создание нового экземпляра
        constructor() {
            this.items = [];
        }

        // устанавливает новый элемент в очередь по приоритету
        enqueue(element, priority) {
            this.items.push({ element, priority });
            this.items.sort((a, b) => a.priority - b.priority);
        }

        // удаляет самый приоритетный элемент - возвращает его же
        dequeue() {
            return this.items.shift();
        }

        // проверка на пустоту
        isEmpty() {
            return this.items.length === 0;
        }
    }
    `;


    return (
        <div class = "main_CodeBlock">
            <h2>Поиск k наименьших путей в графе на JavaScript</h2>
            <SyntaxHighlighter language="javascript" style={oneDark} showLineNumbers={true}>
                {codeString}
            </SyntaxHighlighter>
        </div>
    );
};

export default CodeBlock;
