// level7.js
// Логика седьмого уровня - Случайные числа с проверкой всех цифр

let level7Completed = false;
let usedHintLevel7 = false;
let generatedNumbers = [null, null, null, null]; // Будем хранить сгенерированные числа

function initLevel7() {
    console.log('Уровень 7 инициализирован');
    level7Completed = false;
    usedHintLevel7 = false;
    generatedNumbers = [null, null, null, null];
    
    // Восстанавливаем состояние если уже был выполнен
    const progress = JSON.parse(localStorage.getItem('codeQuestProgress') || '{}');
    if (progress.level7) {
        level7Completed = true;
        usedHintLevel7 = progress.level7.usedHint || false;
        if (progress.level7.generatedNumbers) {
            generatedNumbers = progress.level7.generatedNumbers;
        }
        showLevel7Result();
    }
    
    // Генерируем пример чисел для демонстрации
    generateExampleNumbers();
}

function generateExampleNumbers() {
    // Генерируем примерные числа для демонстрации в интерфейсе
    for (let i = 0; i < 4; i++) {
        generatedNumbers[i] = Math.floor(Math.random() * 10);
    }
}

function toggleHintLevel7() {
    const hintContainer = document.getElementById('hintContainer7');
    const isVisible = hintContainer.style.display === 'block';
    
    if (!isVisible) {
        showMessage(
            '⚠️ Внимание!',
            'Если воспользуешься подсказкой, уровень зачтётся только на 50%.<br><br>' +
            'В статистике будет жёлтый цвет вместо зелёного.<br><br>' +
            '<strong>Ты уверен?</strong>',
            'warning'
        );
        
        setTimeout(() => {
            const modalText = document.getElementById('modal-text');
            const confirmDiv = document.createElement('div');
            confirmDiv.style.cssText = `
                display: flex;
                gap: 15px;
                margin-top: 20px;
                justify-content: center;
            `;
            
            const yesBtn = document.createElement('button');
            yesBtn.className = 'btn btn-primary';
            yesBtn.innerHTML = '✅ Да, показать';
            yesBtn.onclick = function() {
                usedHintLevel7 = true;
                closeModal();
                hintContainer.style.display = 'block';
                hintContainer.style.animation = 'none';
                setTimeout(() => {
                    hintContainer.style.animation = 'fadeIn 0.5s ease';
                }, 10);
                playSound('click');
            };
            
            const noBtn = document.createElement('button');
            noBtn.className = 'btn btn-secondary';
            noBtn.innerHTML = '❌ Нет';
            noBtn.onclick = function() {
                closeModal();
                playSound('click');
            };
            
            confirmDiv.appendChild(yesBtn);
            confirmDiv.appendChild(noBtn);
            modalText.appendChild(confirmDiv);
        }, 100);
        
    } else {
        hintContainer.style.display = 'none';
    }
}

function checkAnswerLevel7() {
    const num1Input = document.getElementById('num1Input');
    const num2Input = document.getElementById('num2Input');
    const num3Input = document.getElementById('num3Input');
    const num4Input = document.getElementById('num4Input');
    const sumInput = document.getElementById('sumInput');
    
    // Получаем значения из полей ввода
    const num1 = num1Input.value.trim();
    const num2 = num2Input.value.trim();
    const num3 = num3Input.value.trim();
    const num4 = num4Input.value.trim();
    const sum = sumInput.value.trim();
    
    // Проверяем, что все поля заполнены
    if (!num1 || !num2 || !num3 || !num4 || !sum) {
        showMessage('Ошибка', 'Заполни все поля!', 'error');
        return;
    }
    
    // Проверяем, что все значения - числа от 0 до 9
    const numbers = [num1, num2, num3, num4];
    for (let i = 0; i < numbers.length; i++) {
        if (!/^\d$/.test(numbers[i])) {
            showMessage('Ошибка', `Цифра ${i+1} должна быть числом от 0 до 9!`, 'error');
            highlightInput(`num${i+1}Input`);
            return;
        }
        const num = parseInt(numbers[i]);
        if (num < 0 || num > 9) {
            showMessage('Ошибка', `Цифра ${i+1} должна быть от 0 до 9!`, 'error');
            highlightInput(`num${i+1}Input`);
            return;
        }
    }
    
    // Проверяем, что сумма - число
    if (!/^\d+$/.test(sum)) {
        showMessage('Ошибка', 'Сумма должна быть числом!', 'error');
        highlightInput('sumInput');
        return;
    }
    
    // Преобразуем все в числа
    const num1Val = parseInt(num1);
    const num2Val = parseInt(num2);
    const num3Val = parseInt(num3);
    const num4Val = parseInt(num4);
    const sumVal = parseInt(sum);
    
    // Проверяем диапазон суммы
    if (sumVal < 0 || sumVal > 36) {
        showMessage('Ошибка', 'Сумма должна быть от 0 до 36!', 'error');
        highlightInput('sumInput');
        return;
    }
    
    // Проверяем правильность вычисления суммы
    const calculatedSum = num1Val + num2Val + num3Val + num4Val;
    
    if (calculatedSum !== sumVal) {
        showMessage(
            'Ошибка вычисления',
            `Ты неправильно посчитал сумму!<br><br>` +
            `<strong>Твои цифры:</strong> ${num1Val}, ${num2Val}, ${num3Val}, ${num4Val}<br>` +
            `<strong>Сумма цифр:</strong> ${num1Val} + ${num2Val} + ${num3Val} + ${num4Val} = ${calculatedSum}<br>` +
            `<strong>Твоя сумма:</strong> ${sumVal}<br><br>` +
            `Проверь вычисления и попробуй снова!`,
            'warning'
        );
        
        // Анимация ошибки для суммы
        highlightInput('sumInput');
        playSound('error');
        return;
    }
    
    // Если все проверки пройдены
    level7Completed = true;
    
    // Сохраняем сгенерированные числа
    generatedNumbers = [num1Val, num2Val, num3Val, num4Val];
    
    saveProgress(7, { 
        usedHint: usedHintLevel7,
        completionType: usedHintLevel7 ? 'half' : 'full',
        numbers: generatedNumbers,
        sum: sumVal,
        note: 'Проверены все 4 цифры и их сумма'
    });
    
    showLevel7Result();
    playSound('success');
    
    // Анимация успеха
    const robot = document.querySelector('.robot');
    if (robot) {
        robot.classList.add('success-animation');
        robot.style.background = 'linear-gradient(135deg, var(--success), #2d936c)';
    }
}

function highlightInput(inputId) {
    const input = document.getElementById(inputId);
    if (input) {
        input.style.animation = 'none';
        setTimeout(() => {
            input.style.animation = 'shake 0.5s ease';
            input.style.borderColor = 'var(--error)';
            setTimeout(() => {
                input.style.borderColor = '';
            }, 1000);
        }, 10);
    }
}

function showLevel7Result() {
    // Отключаем все поля ввода и кнопку
    const inputs = ['num1Input', 'num2Input', 'num3Input', 'num4Input', 'sumInput'];
    const checkBtn = document.querySelector('.check-btn-level7');
    
    inputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) input.disabled = true;
    });
    
    if (checkBtn) {
        checkBtn.disabled = true;
        if (usedHintLevel7) {
            checkBtn.innerHTML = '<span>🟡</span> Верно (с подсказкой)';
            checkBtn.style.background = 'linear-gradient(135deg, var(--warning), #ff8c00)';
        } else {
            checkBtn.innerHTML = '<span>✅</span> Верно!';
            checkBtn.style.background = 'linear-gradient(135deg, var(--success), #2d936c)';
        }
    }
    
    setTimeout(() => {
        showNextLevelButton7();
        showMessage(
            '🎉 Отлично!',
            'Ты освоил работу со случайными числами!<br><br>' +
            '<strong>Робот говорит:</strong><br>' +
            '"Новый пароль сгенерирован! Система безопасности лаборатории защищена.<br>' +
            'Каждый запуск программы даёт разные цифры - это и есть случайность!"<br><br>' +
            'Ты научился создавать программы с разными результатами!',
            'success'
        );
    }, 500);
}

function showNextLevelButton7() {
    createNextLevelButton(7, usedHintLevel7);
}

// HTML седьмого уровня (обновленная версия с полями для всех цифр)
function getLevel7HTML() {
    return `
    <div class="level-container">
        <!-- Левая панель - история -->
        <div class="panel story-panel">
            <div class="badge badge-level">🎮 Уровень 7: Генератор цифр</div>
            
            <div class="robot-container">
                <div class="robot">🤖</div>
            </div>
            
            <h2>Случайные числа</h2>
            <p>Роботу нужно создать 4 случайные цифры для проверки системы безопасности.</p>
            
            <div class="dialogue">
                <div class="typing">
                    Мне нужно 4 случайные цифры для тестирования!
                </div>
                <div style="margin-top: 15px;">
                    Каждая цифра должна быть случайной от 0 до 9. 
                    Потом нужно посчитать их сумму.
                </div>
                <div style="margin-top: 10px; color: var(--accent); font-weight: bold;">
                    Используем модуль random для создания случайных чисел!
                </div>
            </div>
            
            <h3>🎯 Пример работы со случайными числами:</h3>
            <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; margin: 15px 0;">
                <p><strong>Пример:</strong> Бросаем игральный кубик</p>
                
                <div style="background: #1a1a1a; padding: 20px; border-radius: 5px; margin-top: 10px; font-family: 'Courier New', monospace; font-size: 14px; line-height: 1.6;">
<pre style="margin: 0; color: #d4d4d4;">
<span style="color: #569cd6;">import</span><span style="color: #d4d4d4;"> random  </span><span style="color: #6a9955;"># Импортируем модуль random</span>

<span style="color: #d4d4d4;">print(</span><span style="color: #ce9178;">"Бросаем игральный кубик 3 раза:"</span><span style="color: #d4d4d4;">)</span>

<span style="color: #d4d4d4;">сумма = </span><span style="color: #b5cea8;">0</span>

<span style="color: #d4d4d4;">результат1 = random.randint(</span><span style="color: #b5cea8;">1</span><span style="color: #d4d4d4;">, </span><span style="color: #b5cea8;">6</span><span style="color: #d4d4d4;">)</span>
<span style="color: #d4d4d4;">print(</span><span style="color: #ce9178;">f"Первый бросок: {результат1}"</span><span style="color: #d4d4d4;">)</span>
<span style="color: #d4d4d4;">сумма = сумма + результат1</span>

<span style="color: #d4d4d4;">результат2 = random.randint(</span><span style="color: #b5cea8;">1</span><span style="color: #d4d4d4;">, </span><span style="color: #b5cea8;">6</span><span style="color: #d4d4d4;">)</span>
<span style="color: #d4d4d4;">print(</span><span style="color: #ce9178;">f"Второй бросок: {результат2}"</span><span style="color: #d4d4d4;">)</span>
<span style="color: #d4d4d4;">сумма = сумма + результат2</span>

<span style="color: #d4d4d4;">результат3 = random.randint(</span><span style="color: #b5cea8;">1</span><span style="color: #d4d4d4;">, </span><span style="color: #b5cea8;">6</span><span style="color: #d4d4d4;">)</span>
<span style="color: #d4d4d4;">print(</span><span style="color: #ce9178;">f"Третий бросок: {результат3}"</span<span style="color: #d4d4d4;">)</span>
<span style="color: #d4d4d4;">сумма = сумма + результат3</span>

<span style="color: #d4d4d4;">print(</span><span style="color: #ce9178;">f"Общая сумма: {сумма}"</span><span style="color: #d4d4d4;">)</span>
</pre>
                </div>
                
                <p style="margin-top: 10px; font-size: 14px;">
                    <strong>Как работает:</strong><br>
                    • <code>import random</code> - загружает модуль случайных чисел<br>
                    • <code>random.randint(1, 6)</code> - случайное число от 1 до 6<br>
                    • Каждый запуск даёт разные результаты<br>
                    • Сумма накапливается в переменной
                </p>
            </div>
            
            <p><strong>Теперь создай программу для генерации 4 случайных цифр!</strong></p>
        </div>
        
        <!-- Правая панель - задание -->
        <div class="panel task-panel">
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 25px;">
                <div style="font-size: 50px;">🎲</div>
                <div>
                    <h2>СЛУЧАЙНЫЕ ЧИСЛА</h2>
                    <p>Генерация цифр с random</p>
                </div>
            </div>
            
            <div style="background: rgba(0, 180, 216, 0.1); padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 5px solid #00b4d8;">
                <h3>📝 ТВОЁ ЗАДАНИЕ:</h3>
                <p>Напиши программу, которая генерирует 4 случайные цифры и считает их сумму:</p>
                
                <div style="background: rgba(0,0,0,0.3); padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <p><strong>ЗАДАЧА:</strong></p>
                    <p>Создать 4 случайные цифры от 0 до 9 и посчитать их сумму.</p>
                    
                    <div style="text-align: center; margin: 25px 0; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 10px;">
                        <div style="font-size: 36px; color: var(--accent); margin-bottom: 10px;">Пример работы программы:</div>
                        <div style="font-family: 'Courier New', monospace; font-size: 18px; margin: 15px 0; line-height: 2;">
                            Первая цифра: 7<br>
                            Вторая цифра: 2<br>
                            Третья цифра: 8<br>
                            Четвертая цифра: 4<br>
                            <span style="color: var(--success); font-weight: bold;">Сумма всех цифр: 21</span>
                        </div>
                        <p style="font-size: 14px; opacity: 0.7; margin-top: 10px;">
                            Цифры будут другими при каждом запуске!
                        </p>
                    </div>
                    
                    <p><strong>ПРОГРАММА ДОЛЖНА:</strong></p>
                    <ul style="margin-left: 20px; margin-top: 15px; line-height: 1.8;">
                        <li>Импортировать модуль <code>random</code></li>
                        <li>Создать 4 переменные для цифр</li>
                        <li>Каждой присвоить случайное число от 0 до 9</li>
                        <li>Вывести каждую цифру на отдельной строке</li>
                        <li>Посчитать и вывести сумму всех цифр</li>
                    </ul>
                    
                    <div style="background: rgba(56, 176, 0, 0.1); padding: 15px; border-radius: 5px; margin-top: 20px; border-left: 3px solid var(--success);">
                        <p><strong>💡 Важная особенность:</strong></p>
                        <p>Каждый запуск программы даёт РАЗНЫЕ цифры!</p>
                        <p>Это нормально - так и должно быть у случайных чисел.</p>
                    </div>
                </div>
            </div>
            
            <div class="code-editor">
                <div class="code-header">
                    <div class="code-title">random_digits.py</div>
                    <div style="color: #6e7681; font-size: 14px;">Python</div>
                </div>
                <div class="code-content">
                    <div class="line">
                        <span class="line-number">1</span>
                        <span class="code-comment"># Уровень 7: Генератор случайных цифр</span>
                    </div>
                    <div class="line">
                        <span class="line-number">2</span>
                    </div>
                    <div class="line">
                        <span class="line-number">3</span>
                        <span class="code-comment"># Напиши свой код ниже:</span>
                    </div>
                    <div class="line">
                        <span class="line-number">4</span>
                        <span class="code-comment"># 1. Импортируй модуль random</span>
                    </div>
                    <div class="line">
                        <span class="line-number">5</span>
                        <span class="code-comment"># 2. Создай 4 переменные для цифр</span>
                    </div>
                    <div class="line">
                        <span class="line-number">6</span>
                        <span class="code-comment"># 3. Каждой присвой случайное число от 0 до 9</span>
                    </div>
                    <div class="line">
                        <span class="line-number">7</span>
                        <span class="code-comment"># 4. Выведи каждую цифру</span>
                    </div>
                    <div class="line">
                        <span class="line-number">8</span>
                        <span class="code-comment"># 5. Посчитай и выведи сумму всех цифр</span>
                    </div>
                </div>
            </div>
            
            <!-- Блок проверки -->
            <div style="background: rgba(255,255,255,0.05); padding: 25px; border-radius: 10px; margin: 25px 0; border: 2px solid var(--primary);">
                <h3 style="margin-bottom: 20px;">✅ ПРОВЕРКА РЕЗУЛЬТАТА</h3>
                
                <p><strong>Запусти свою программу и запиши результаты:</strong></p>
                <p style="font-size: 14px; opacity: 0.8; margin-bottom: 15px;">
                    Программа выведет 4 случайные цифры и их сумму.
                    Запиши все числа, которые получились у тебя.
                </p>
                
                <div style="background: #1a1a1a; padding: 15px; border-radius: 5px; margin: 15px 0; font-family: 'Courier New', monospace; text-align: center;">
                    <p>Твоя программа выведет примерно так:</p>
                    <div style="margin: 15px 0; line-height: 1.8;">
                        <div style="color: var(--primary);">Первая цифра: 7</div>
                        <div style="color: var(--primary);">Вторая цифра: 2</div>
                        <div style="color: var(--primary);">Третья цифра: 8</div>
                        <div style="color: var(--primary);">Четвертая цифра: 4</div>
                        <div style="color: var(--success); font-weight: bold; margin-top: 10px;">Сумма всех цифр: 21</div>
                    </div>
                    <p style="font-size: 12px; opacity: 0.7; margin-top: 5px;">Цифры будут другими - это нормально!</p>
                </div>
                
                <p><strong>Введи все цифры из своей программы:</strong></p>
                
                <div style="display: flex; gap: 10px; margin: 20px 0; justify-content: center; align-items: center;">
                    <div style="text-align: center;">
                        <div style="font-size: 14px; margin-bottom: 5px; color: var(--primary);">Первая цифра:</div>
                        <input 
                            type="number" 
                            id="num1Input" 
                            placeholder="0-9"
                            min="0"
                            max="9"
                            style="
                                width: 80px;
                                padding: 12px;
                                border-radius: 8px;
                                border: 2px solid var(--primary);
                                background: rgba(255,255,255,0.1);
                                color: white;
                                font-size: 18px;
                                text-align: center;
                                font-family: 'Ubuntu', sans-serif;
                            "
                        >
                    </div>
                    
                    <div style="text-align: center;">
                        <div style="font-size: 14px; margin-bottom: 5px; color: var(--primary);">Вторая цифра:</div>
                        <input 
                            type="number" 
                            id="num2Input" 
                            placeholder="0-9"
                            min="0"
                            max="9"
                            style="
                                width: 80px;
                                padding: 12px;
                                border-radius: 8px;
                                border: 2px solid var(--primary);
                                background: rgba(255,255,255,0.1);
                                color: white;
                                font-size: 18px;
                                text-align: center;
                                font-family: 'Ubuntu', sans-serif;
                            "
                        >
                    </div>
                    
                    <div style="text-align: center;">
                        <div style="font-size: 14px; margin-bottom: 5px; color: var(--primary);">Третья цифра:</div>
                        <input 
                            type="number" 
                            id="num3Input" 
                            placeholder="0-9"
                            min="0"
                            max="9"
                            style="
                                width: 80px;
                                padding: 12px;
                                border-radius: 8px;
                                border: 2px solid var(--primary);
                                background: rgba(255,255,255,0.1);
                                color: white;
                                font-size: 18px;
                                text-align: center;
                                font-family: 'Ubuntu', sans-serif;
                            "
                        >
                    </div>
                    
                    <div style="text-align: center;">
                        <div style="font-size: 14px; margin-bottom: 5px; color: var(--primary);">Четвертая цифра:</div>
                        <input 
                            type="number" 
                            id="num4Input" 
                            placeholder="0-9"
                            min="0"
                            max="9"
                            style="
                                width: 80px;
                                padding: 12px;
                                border-radius: 8px;
                                border: 2px solid var(--primary);
                                background: rgba(255,255,255,0.1);
                                color: white;
                                font-size: 18px;
                                text-align: center;
                                font-family: 'Ubuntu', sans-serif;
                            "
                        >
                    </div>
                </div>
                
                <p><strong>Введи сумму всех 4 цифр (от 0 до 36):</strong></p>
                
                <div style="display: flex; gap: 15px; margin-top: 15px; align-items: center; justify-content: center;">
                    <input 
                        type="number" 
                        id="sumInput" 
                        placeholder="Сумма от 0 до 36"
                        min="0"
                        max="36"
                        style="
                            width: 250px;
                            padding: 15px;
                            border-radius: 10px;
                            border: 2px solid var(--success);
                            background: rgba(255,255,255,0.1);
                            color: white;
                            font-size: 18px;
                            text-align: center;
                            font-family: 'Ubuntu', sans-serif;
                        "
                    >
                    <button class="btn btn-primary check-btn-level7" onclick="checkAnswerLevel7()" style="min-width: 150px;">
                        <span>🔢</span> Проверить
                    </button>
                </div>
                
                <div style="margin-top: 20px; padding: 15px; background: rgba(255,158,0,0.1); border-radius: 8px; border: 2px dashed var(--warning);">
                    <p style="display: flex; align-items: center; gap: 10px;">
                        <span>⚠️</span>
                        <strong>Подсказка снижает оценку! Сначала попробуй сам.</strong>
                    </p>
                </div>
                
                <div style="margin-top: 15px; padding: 12px; background: rgba(0, 180, 216, 0.1); border-radius: 8px; border: 1px solid #00b4d8;">
                    <p style="font-size: 14px; display: flex; align-items: center; gap: 10px;">
                        <span>💡</span>
                        <strong>Совет:</strong> Проверь, что сумма равна сложению всех четырех цифр!
                    </p>
                </div>
            </div>
            
            <div class="hint-container" id="hintContainer7" style="display: none;">
                <h3 style="color: var(--warning); display: flex; align-items: center; gap: 10px;">
                    <span>🟡</span> ПОДСКАЗКА (уровень зачтётся на 50%)
                </h3>
                
                <p><strong>Как подойти к решению:</strong></p>
                
                <div style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px; margin: 15px 0;">
                    <p><strong>Шаг 1: Импорт модуля</strong></p>
                    <p>В самом начале программы напиши: <code>import random</code></p>
                    
                    <p><strong>Шаг 2: Создание переменных</strong></p>
                    <p>Создай 4 переменные: <code>цифра1</code>, <code>цифра2</code>, <code>цифра3</code>, <code>цифра4</code></p>
                    
                    <p><strong>Шаг 3: Генерация цифр</strong></p>
                    <p>Каждой переменной присвой случайное число: <code>цифра1 = random.randint(0, 9)</code></p>
                    
                    <p><strong>Шаг 4: Вывод цифр</strong></p>
                    <p>Выведи каждую цифру: <code>print(f"Первая цифра: {цифра1}")</code></p>
                    
                    <p><strong>Шаг 5: Подсчёт суммы</strong></p>
                    <p>Создай переменную <code>сумма</code> и сложи все цифры</p>
                    <p><code>сумма = цифра1 + цифра2 + цифра3 + цифра4</code></p>
                    
                    <p><strong>Шаг 6: Вывод суммы</strong></p>
                    <p>Выведи получившуюся сумму</p>
                </div>
                
                <p><strong>Ключевые элементы:</strong></p>
                <ul style="margin-left: 20px; margin-top: 10px; line-height: 1.6;">
                    <li><code>import random</code> - обязательно в начале</li>
                    <li><code>random.randint(0, 9)</code> - случайное число 0-9</li>
                    <li>Создай 4 отдельные переменные для цифр</li>
                    <li>Сумма = просто сложи все 4 переменные</li>
                    <li>Каждый запуск даёт разные результаты - это правильно!</li>
                </ul>
                
                <div style="background: rgba(255,158,0,0.1); padding: 15px; border-radius: 8px; margin-top: 15px;">
                    <p>🎯 <strong>Совет:</strong> Запусти программу несколько раз, чтобы убедиться, что цифры разные.</p>
                    <p>Сумма должна быть в диапазоне от 0 до 36 включительно.</p>
                    <p>Проверь вычисления: сумма всех 4 цифр должна совпадать с твоим расчетом.</p>
                </div>
            </div>
            
            <div style="margin-top: 40px;">
                <div class="action-buttons">
                    <button class="btn btn-secondary" onclick="toggleHintLevel7()" style="background: rgba(255,158,0,0.2); border-color: var(--warning);">
                        <span>🟡</span> Подсказка
                    </button>
                    <button class="btn btn-secondary" onclick="loadLevel(6)" style="margin-left: 10px;">
                        <span>⬅️</span> Уровень 6
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
}

// Экспорт функций
window.initLevel7 = initLevel7;
window.toggleHintLevel7 = toggleHintLevel7;
window.checkAnswerLevel7 = checkAnswerLevel7;
window.getLevel7HTML = getLevel7HTML;