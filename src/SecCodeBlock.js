import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import './CodeBlock.css';


const CodeBlock = () => {
    const codeString = `// Функция для проверки, может ли одна конъюнкция поглотить другую
function canAbsorb(a, b) {
    // Проверяем, есть ли у a все переменные b
    for (let ch of b) {
        // Игнорируем пробелы
        if (ch === ' ') continue;

        // Проверяем наличие переменной или ее отрицания
        if (!a.includes(ch) && !a.includes(ch.toUpperCase())) {
            console.log(\`Конъюнкция '\${a}' не может поглотить '\${b}'\`);
            return false;
        }
    }
    console.log(\`Конъюнкция \'\${a}\' может поглотить \'\${b}\'\`);
    return true;
}

// Функция для минимизации булевой функции методом Блейка-Порецкого
function minimize(dnf) {
    const minimizedSet = new Set();

    // Перебираем все конъюнкции
    for (const conj of dnf) {
        let absorbed = false;

        // Проверка на наличие отрицательных литералов
        if (conj.includes('¬')) {
            console.log(\`Конъюнкция \'\${conj}\' содержит отрицательные литералы.\`);
        }

        for (const other of dnf) {
            if (conj !== other && canAbsorb(conj, other)) {
                absorbed = true;
                console.log(\`Конъюнкция \'\${conj}\' поглощена другой.\`);
                break;
            }
        }
        // Если не поглощена, добавляем в результирующее множество
        if (!absorbed) {
            minimizedSet.add(conj);
            console.log(\`Конъюнкция \'\${conj}\' добавлена в минимизированное множество.\`);
        }
    }

    return Array.from(minimizedSet);
}

    `;


    return (
        <div class = "main_CodeBlock">
            <h2>Метод Блейка-Порецкого</h2>
            <SyntaxHighlighter language="javascript" style={oneDark} showLineNumbers={true}>
                {codeString}
            </SyntaxHighlighter>
        </div>
    );
};

export default CodeBlock;
