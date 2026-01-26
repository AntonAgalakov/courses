// Логика второго уровня

let level2Completed = false;
let correctAnswer = 85; // Правильный ответ для сложной формулы

function initLevel2() {
    console.log('Уровень 2 инициализирован');
    level2Completed = false;
    
    // Восстанавливаем состояние если уже был выполнен
    const progress = JSON.parse(localStorage.getItem('codeQuestProgress') || '{}');
    if (progress.level2 && progress.level2.completed) {
        level2Completed = true;
        showNextLevelButton();
        document.getElementById('answerInput').disabled = true;
        document.querySelector('.check-btn').disabled = true;
        document.querySelector('.check-btn').innerHTML = '<span>✅</span> Уже выполнено!';
    }
}

function toggleHintLevel2() {
    const hintContainer = document.getElementById('hintContainer2');
    const isVisible = hintContainer.style.display === 'block';
    hintContainer.style.display = isVisible ? 'none' : 'block';
    
    // Анимация
    if (!isVisible) {
        hintContainer.style.animation = 'none';
        setTimeout(() => {
            hintContainer.style.animation = 'fadeIn 0.5s ease';
        }, 10);
    }
    
    playSound('click');
}

function checkAnswerLevel2() {
    const answerInput = document.getElementById('answerInput');
    const userAnswer = answerInput.value.trim();
    const checkBtn = document.querySelector('.check-btn');
    
    if (!userAnswer) {
        showMessage('Ошибка', 'Введи число, которое получилось в программе!', 'error');
        return;
    }
    
    if (parseInt(userAnswer) === correctAnswer) {
        // Правильный ответ
        level2Completed = true;
        answerInput.disabled = true;
        checkBtn.disabled = true;
        checkBtn.innerHTML = '<span>✅</span> Верно!';
        checkBtn.style.background = 'linear-gradient(135deg, var(--success), #2d936c)';
        
        // Анимация успеха
        const robot = document.querySelector('.robot');
        if (robot) {
            robot.classList.add('success-animation');
            robot.style.background = 'linear-gradient(135deg, #9d4edd, #7b2cbf)';
        }
        
        // Сохраняем прогресс
        saveProgress(2, { 
            answer: userAnswer, 
            energy: correctAnswer
        });
        
        // Показываем кнопку следующего уровня
        setTimeout(() => {
            showNextLevelButton();
            showMessage(
                '🎉 Правильно!',
                'Отличная работа! Число ' + correctAnswer + ' - это верный ответ.<br><br>' +
                '<strong>Робот говорит:</strong><br>' +
                '"Спасибо! Теперь у меня есть энергия для продолжения!"<br><br>' +
                'Нажми кнопку "Уровень 3" чтобы продолжить.',
                'success'
            );
        }, 500);
        
        playSound('success');
    } else {
        // Неправильный ответ
        showMessage(
            'Неверно',
            'Это не то число.<br><br>' +
            '<strong>Совет:</strong><br>' +
            '1. Напиши программу с формулой<br>' +
            '2. Запусти её<br>' +
            '3. Когда спросит "Сколько батареек?" - введи 5<br>' +
            '4. Посмотри какое число вывелось<br>' +
            '5. Введи это число<br><br>' +
            'Не пытайся считать в уме - запусти программу!',
            'warning'
        );
        
        // Анимация ошибки
        answerInput.style.animation = 'none';
        setTimeout(() => {
            answerInput.style.animation = 'shake 0.5s ease';
        }, 10);
        
        playSound('error');
    }
}

function showNextLevelButton() {
    createNextLevelButton(2);
}

// HTML второго уровня
function getLevel2HTML() {
    return `
    <div class="level-container">
        <!-- Левая панель - история -->
        <div class="panel story-panel">
            <div class="badge badge-level">🎮 Уровень 2: Сложные вычисления</div>
            
            <div class="robot-container">
                <div class="robot">🤖</div>
            </div>
            
            <h2>Сложная формула</h2>
            <p>Робот показывает сложные расчёты.</p>
            
            <div class="dialogue">
                <div class="typing">
                    Нашёл сложную формулу для расчёта энергии...
                </div>
                <div style="margin-top: 15px;">
                    Нужно её запрограммировать!
                </div>
                <div style="margin-top: 10px; color: var(--accent); font-weight: bold;">
                    Посчитай по формуле и узнай сколько энергии я получу!
                </div>
            </div>
            
            <h3>🎯 Что нужно сделать:</h3>
            <ol style="margin-left: 20px; line-height: 1.8;">
                <li><strong>Открой файл</strong> <code>robot.py</code></li>
                <li><strong>Удали старый код</strong> (уровня 1)</li>
                <li><strong>Напиши программу</strong> с формулой ниже</li>
                <li><strong>Запусти программу</strong> (кнопка ▶️ Run)</li>
                <li><strong>Введи 5</strong> когда программа спросит</li>
                <li><strong>Получившийся результат</strong> введи в поле проверки</li>
                <li><strong>При правильном ответе</strong> появится кнопка "Уровень 3"!</li>
            </ol>
        </div>
        
        <!-- Правая панель - задание -->
        <div class="panel task-panel">
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 25px;">
                <div style="font-size: 50px;">🔢</div>
                <div>
                    <h2>СЛОЖНАЯ ФОРМУЛА</h2>
                    <p>Большие числа и вычисления</p>
                </div>
            </div>
            
            <p><strong>Задание:</strong> Напиши программу, которая:</p>
            <ol style="margin-left: 20px; margin-bottom: 25px; line-height: 1.8;">
                <li>Спрашивает число с клавиатуры: "Сколько батареек?"</li>
                <li>Считает по формуле:</li>
            </ol>
            
            <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 10px; margin: 20px 0; text-align: center;">
                <h3 style="color: var(--accent); margin-bottom: 15px;">ФОРМУЛА</h3>
                <div style="font-size: 20px; font-family: 'Courier New', monospace; background: #1a1a1a; padding: 20px; border-radius: 8px;">
                    энергия = ((батарейки × 347) + (128 × 2) - 1766) ÷ 3 + 10
                </div>
                <p style="margin-top: 15px; font-size: 14px; opacity: 0.8;">Не считай в уме - напиши программу!</p>
            </div>
            
            <div class="code-editor">
                <div class="code-header">
                    <div class="code-title">robot.py</div>
                    <div style="color: #6e7681; font-size: 14px;">Python</div>
                </div>
                <div class="code-content">
                    <div class="line">
                        <span class="line-number">1</span>
                        <span class="code-comment"># Уровень 2: Сложные вычисления</span>
                    </div>
                    <div class="line">
                        <span class="line-number">2</span>
                    </div>
                    <div class="line">
                        <span class="line-number">3</span>
                        <span class="code-comment"># Напиши свой код здесь:</span>
                    </div>
                    <div class="line">
                        <span class="line-number">4</span>
                        <span class="code-comment"># 1. Спроси количество батареек как число</span>
                    </div>
                    <div class="line">
                        <span class="line-number">5</span>
                        <span class="code-comment"># 2. Посчитай по формуле: (батарейки * 255) / 15</span>
                    </div>
                    <div class="line">
                        <span class="line-number">6</span>
                        <span class="code-comment"># 3. Покажи результат</span>
                    </div>
                </div>
            </div>
            
            <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 10px; margin: 20px 0;">
                <h3>📝 Пример работы программы:</h3>
                <p>Если всё сделано правильно, программа будет работать так:</p>
                <div style="background: #1a1a1a; padding: 15px; border-radius: 5px; font-family: 'Courier New', monospace; margin-top: 10px;">
                    <p>Сколько батареек? <span style="color: var(--accent)">5</span></p>
                    <p>Энергия: <strong>???</strong></p>
                </div>
                <p style="margin-top: 10px;"><strong>Запусти программу, чтобы узнать какое число получится!</strong></p>
            </div>
            
            <!-- Блок проверки ответа -->
            <div style="background: rgba(255,255,255,0.05); padding: 25px; border-radius: 10px; margin: 25px 0; border: 2px solid var(--primary);">
                <h3 style="margin-bottom: 20px;">✅ ПРОВЕРКА РЕЗУЛЬТАТА</h3>
                
                <p><strong>Какое число получилось при вводе 5?</strong></p>
                <p style="font-size: 14px; opacity: 0.8; margin-bottom: 15px;">(Только запустив программу можно узнать ответ!)</p>
                
                <div style="display: flex; gap: 15px; margin-top: 15px;">
                    <input 
                        type="number" 
                        id="answerInput" 
                        placeholder="Введи число"
                        style="
                            flex: 1;
                            padding: 15px;
                            border-radius: 10px;
                            border: 2px solid var(--primary);
                            background: rgba(255,255,255,0.1);
                            color: white;
                            font-size: 18px;
                            font-family: 'Ubuntu', sans-serif;
                        "
                    >
                    <button class="btn btn-primary check-btn" onclick="checkAnswerLevel2()" style="min-width: 150px;">
                        <span>🔍</span> Проверить
                    </button>
                </div>
                
                <div style="margin-top: 20px; padding: 15px; background: rgba(255,0,110,0.1); border-radius: 8px;">
                    <p style="display: flex; align-items: center; gap: 10px;">
                        <span>🎯</span>
                        <strong>При правильном ответе появится кнопка "Уровень 3"!</strong>
                    </p>
                </div>
            </div>
            
            <div class="hint-container" id="hintContainer2" style="display: none;">
                <h3>💡 Как написать программу:</h3>
                
                <p><strong>1. Спросить число с клавиатуры:</strong></p>
                <p>Используй <code>int(input())</code> чтобы сразу получить число:</p>
                <div style="background: #2d2d2d; padding: 10px; border-radius: 5px; margin: 10px 0; font-family: 'Courier New', monospace;">
                    <code style="color: #9cdcfe">batt</code> = <code style="color: #569cd6">int</code>(<code style="color: #569cd6">input</code>(<code style="color: #ce9178">"Сколько батареек? "</code>))
                </div>
                
                <p><strong>2. Посчитать по формуле:</strong></p>
                <div style="background: #2d2d2d; padding: 10px; border-radius: 5px; margin: 10px 0; font-family: 'Courier New', monospace;">
                    <code style="color: #9cdcfe">energy</code> = ((<code style="color: #9cdcfe">batt</code> * <code style="color: #b5cea8">347</code>) + (<code style="color: #b5cea8">128</code> * <code style="color: #b5cea8">2</code>) - <code style="color: #b5cea8">1766</code>) / <code style="color: #b5cea8">3</code> + <code style="color: #b5cea8">10</code>
                </div>
                
                <p><strong>3. Показать результат:</strong></p>
                <div style="background: #2d2d2d; padding: 10px; border-radius: 5px; margin: 10px 0; font-family: 'Courier New', monospace;">
                    <code style="color: #569cd6">print</code>(<code style="color: #ce9178">"Энергия:"</code>, <code style="color: #9cdcfe">energy</code>)
                </div>
                
                <div style="background: rgba(0,180,216,0.1); padding: 15px; border-radius: 8px; margin-top: 15px;">
                    <p>🎯 <strong>Запомни:</strong></p>
                    <p><code>int(input("текст"))</code> — спрашивает и сразу превращает в число</p>
                    <p>При вводе 5 должно получиться 85</p>
                </div>
            </div>
            
            <div style="margin-top: 40px;">
                <div class="action-buttons">
                    <button class="btn btn-secondary" onclick="toggleHintLevel2()">
                        <span>💡</span> Подсказка
                    </button>
                    <button class="btn btn-secondary" onclick="loadLevel(1)" style="margin-left: 10px;">
                        <span>⬅️</span> Уровень 1
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
}

// Экспорт функций
window.initLevel2 = initLevel2;
window.toggleHintLevel2 = toggleHintLevel2;
window.checkAnswerLevel2 = checkAnswerLevel2;
window.showNextLevelButton = showNextLevelButton;
window.getLevel2HTML = getLevel2HTML;