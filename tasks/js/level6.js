// level6.js
// Логика шестого уровня - Циклы с условиями

let level6Completed = false;
let usedHintLevel6 = false;

function initLevel6() {
    console.log('Уровень 6 инициализирован');
    level6Completed = false;
    usedHintLevel6 = false;
    
    // Восстанавливаем состояние если уже был выполнен
    const progress = JSON.parse(localStorage.getItem('codeQuestProgress') || '{}');
    if (progress.level6) {
        level6Completed = true;
        usedHintLevel6 = progress.level6.usedHint || false;
        showLevel6Result();
    }
}

function toggleHintLevel6() {
    const hintContainer = document.getElementById('hintContainer6');
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
                usedHintLevel6 = true;
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

function checkAnswerLevel6() {
    const answerInput = document.getElementById('answerInput6');
    const userAnswer = answerInput.value.trim();
    
    if (!userAnswer) {
        showMessage('Ошибка', 'Введи число!', 'error');
        return;
    }
    
    // Правильный ответ: количество чисел от 1 до 100, делящихся на 2 и на 3 = 16
    if (parseInt(userAnswer) === 16) {
        level6Completed = true;
        
        saveProgress(6, { 
            usedHint: usedHintLevel6,
            completionType: usedHintLevel6 ? 'half' : 'full',
            answer: userAnswer,
            criticalErrors: 16
        });
        
        showLevel6Result();
        playSound('success');
        
        // Анимация успеха
        const robot = document.querySelector('.robot');
        if (robot) {
            robot.classList.add('success-animation');
            robot.style.background = 'linear-gradient(135deg, var(--success), #2d936c)';
        }
    } else {
        showMessage(
            'Неверно',
            'Попробуй ещё раз!<br><br>' +
            '<strong>Совет:</strong><br>' +
            '1. Напиши программу с циклом for от 1 до 100<br>' +
            '2. Внутри цикла проверяй: делится ли число на 2 И на 3<br>' +
            '3. Если да - увеличь счётчик на 1<br>' +
            '4. После цикла выведи значение счётчика<br>' +
            '5. Запусти программу и посмотри результат<br><br>' +
            'Не пытайся считать вручную - напиши программу!',
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

function showLevel6Result() {
    const answerInput = document.getElementById('answerInput6');
    const checkBtn = document.querySelector('.check-btn-level6');
    
    if (answerInput) answerInput.disabled = true;
    if (checkBtn) {
        checkBtn.disabled = true;
        if (usedHintLevel6) {
            checkBtn.innerHTML = '<span>🟡</span> Верно (с подсказкой)';
            checkBtn.style.background = 'linear-gradient(135deg, var(--warning), #ff8c00)';
        } else {
            checkBtn.innerHTML = '<span>✅</span> Верно!';
            checkBtn.style.background = 'linear-gradient(135deg, var(--success), #2d936c)';
        }
    }
    
    setTimeout(() => {
        showNextLevelButton6();
        showMessage(
            '🎉 Великолепно!',
            'Ты освоил комбинацию циклов и сложных условий!<br><br>' +
            '<strong>Робот говорит:</strong><br>' +
            '"Анализ завершён! Найдено 16 критических ошибок в системных логах.<br>' +
            'Теперь мы можем исправить все уязвимости системы!"<br><br>' +
            'Ты становишься настоящим программистом!',
            'success'
        );
    }, 500);
}

function showNextLevelButton6() {
    createNextLevelButton(6, usedHintLevel6);
}

// HTML шестого уровня
function getLevel6HTML() {
    return `
    <div class="level-container">
        <!-- Левая панель - история -->
        <div class="panel story-panel">
            <div class="badge badge-level">🎮 Уровень 6: Анализ системных логов</div>
            
            <div class="robot-container">
                <div class="robot">🤖</div>
            </div>
            
            <h2>Циклы с условиями</h2>
            <p>Робот обнаружил логи системы и ищет критические ошибки, которые произошли в определённые моменты времени.</p>
            
            <div class="dialogue">
                <div class="typing">
                    Система вела запись каждую минуту в течение 100 минут!
                </div>
                <div style="margin-top: 15px;">
                    Нужно найти все КРИТИЧЕСКИЕ ошибки - те, что произошли в минуты, которые делятся одновременно на 2 И на 3.
                </div>
                <div style="margin-top: 10px; color: var(--accent); font-weight: bold;">
                    Это идеальная задача для цикла с условием внутри!
                </div>
            </div>
            
            <h3>🎯 Пример работы с циклом и условиями:</h3>
            <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; margin: 15px 0;">
                <p><strong>Пример:</strong> Проверка температурных датчиков</p>
                
                <div style="background: #1a1a1a; padding: 20px; border-radius: 5px; margin-top: 10px; font-family: 'Courier New', monospace; font-size: 14px; line-height: 1.6;">
<pre style="margin: 0; color: #d4d4d4;">
<span style="color: #d4d4d4;">print(</span><span style="color: #ce9178;">"Проверяем показания 15 датчиков:"</span><span style="color: #d4d4d4;">)</span>

<span style="color: #d4d4d4;">опасные_датчики = </span><span style="color: #b5cea8;">0</span>
<span style="color: #d4d4d4;">нормальные_датчики = </span><span style="color: #b5cea8;">0</span>

<span style="color: #6a9955;"># Датчики пронумерованы от 1 до 15</span>
<span style="color: #569cd6;">for</span><span style="color: #d4d4d4;"> номер_датчика </span><span style="color: #569cd6;">in</span><span style="color: #d4d4d4;"> range(</span><span style="color: #b5cea8;">1</span><span style="color: #d4d4d4;">, </span><span style="color: #b5cea8;">16</span><span style="color: #d4d4d4;">):</span>
<span style="color: #d4d4d4;">    температура = номер_датчика * </span><span style="color: #b5cea8;">3</span><span style="color: #d4d4d4;">  </span><span style="color: #6a9955;"># Пример температуры</span>
    
    <span style="color: #6a9955;"># Если температура высокая И номер чётный</span>
    <span style="color: #569cd6;">if</span><span style="color: #d4d4d4;"> температура > </span><span style="color: #b5cea8;">20</span><span style="color: #d4d4d4;"> </span><span style="color: #569cd6;">and</span><span style="color: #d4d4d4;"> номер_датчика % </span><span style="color: #b5cea8;">2</span><span style="color: #d4d4d4;"> == </span><span style="color: #b5cea8;">0</span><span style="color: #d4d4d4;">:</span>
        <span style="color: #d4d4d4;">print(</span><span style="color: #ce9178;">f"⚠️ Датчик {номер_датчика}: ОПАСНО! {температура}°C"</span><span style="color: #d4d4d4;">)</span>
        <span style="color: #d4d4d4;">опасные_датчики = опасные_датчики + </span><span style="color: #b5cea8;">1</span>
    <span style="color: #569cd6;">elif</span><span style="color: #d4d4d4;"> температура > </span><span style="color: #b5cea8;">15</span><span style="color: #d4d4d4;">:</span>  <span style="color: #6a9955;"># Просто высокая температура</span>
        <span style="color: #d4d4d4;">print(</span><span style="color: #ce9178;">f"🔶 Датчик {номер_датчика}: высокая {температура}°C"</span><span style="color: #d4d4d4;">)</span>
        <span style="color: #d4d4d4;">нормальные_датчики = нормальные_датчики + </span><span style="color: #b5cea8;">1</span>
    <span style="color: #569cd6;">else</span><span style="color: #d4d4d4;">:</span>  <span style="color: #6a9955;"># Нормальная температура</span>
        <span style="color: #d4d4d4;">print(</span><span style="color: #ce9178;">f"✅ Датчик {номер_датчика}: нормально {температура}°C"</span><span style="color: #d4d4d4;">)</span>
        <span style="color: #d4d4d4;">нормальные_датчики = нормальные_датчики + </span><span style="color: #b5cea8;">1</span>

<span style="color: #d4d4d4;">print(</span><span style="color: #ce9178;">f"</span><span style="color: #ce9178;">\\n</span><span style="color: #ce9178;">Итог: {опасные_датчики} опасных, {нормальные_датчики} нормальных"</span><span style="color: #d4d4d4;">)</span>
</pre>
                </div>
                
                <p style="margin-top: 10px; font-size: 14px;">
                    <strong>Как работает:</strong><br>
                    • Цикл проходит по всем 15 датчикам<br>
                    • Условие с <code>and</code> проверяет ДВА условия одновременно<br>
                    • Два счётчика ведут учёт разных типов датчиков<br>
                    • В конце выводится статистика
                </p>
            </div>
            
            <p><strong>Теперь примени эту логику для анализа 100 минут системных логов!</strong></p>
        </div>
        
        <!-- Правая панель - задание -->
        <div class="panel task-panel">
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 25px;">
                <div style="font-size: 50px;">🔍</div>
                <div>
                    <h2>ЦИКЛЫ С УСЛОВИЯМИ</h2>
                    <p>Фильтрация данных в цикле</p>
                </div>
            </div>
            
            <div style="background: rgba(255, 107, 107, 0.1); padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 5px solid #ff6b6b;">
                <h3>📝 ТВОЁ ЗАДАНИЕ:</h3>
                <p>Напиши программу для поиска критических ошибок в системных логах:</p>
                
                <div style="background: rgba(0,0,0,0.3); padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <p><strong>ПРОБЛЕМА:</strong></p>
                    <p>Система вела запись 100 минут (от 1 до 100).</p>
                    <p>Критическая ошибка - та, что произошла в минуту, которая делится одновременно на 2 И на 3.</p>
                    
                    <div style="text-align: center; margin: 25px 0; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 10px;">
                        <div style="font-size: 36px; color: var(--accent); margin-bottom: 10px;">Найти минуты, где:</div>
                        <div style="display: flex; justify-content: center; gap: 30px; margin-top: 15px;">
                            <div style="text-align: center;">
                                <div style="font-size: 48px;">🔢 ÷ 2</div>
                                <div style="font-size: 14px; opacity: 0.8;">остаток = 0</div>
                            </div>
                            <div style="align-self: center; font-size: 24px;">И</div>
                            <div style="text-align: center;">
                                <div style="font-size: 48px;">🔢 ÷ 3</div>
                                <div style="font-size: 14px; opacity: 0.8;">остаток = 0</div>
                            </div>
                        </div>
                    </div>
                    
                    <p><strong>ПРОГРАММА ДОЛЖНА:</strong></p>
                    <ul style="margin-left: 20px; margin-top: 15px; line-height: 1.8;">
                        <li>Перебирать все минуты от 1 до 100</li>
                        <li>Для каждой минуты проверять ОБА условия:
                            <ul style="margin-left: 20px; margin-top: 5px;">
                                <li>Делится ли на 2 без остатка?</li>
                                <li>Делится ли на 3 без остатка?</li>
                            </ul>
                        </li>
                        <li>Если ОБА условия верны - это критическая ошибка</li>
                        <li>Считать количество критических ошибок</li>
                        <li>Вывести общее количество</li>
                    </ul>
                    
                    <div style="background: rgba(255, 158, 0, 0.1); padding: 15px; border-radius: 5px; margin-top: 20px; border-left: 3px solid var(--warning);">
                        <p><strong>💡 Математическая подсказка:</strong></p>
                        <p>Если число делится и на 2, и на 3, то оно делится на 6.</p>
                        <p>Но не считай вручную - напиши программу, которая это проверяет!</p>
                    </div>
                </div>
            </div>
            
            <div class="code-editor">
                <div class="code-header">
                    <div class="code-title">logs_analysis.py</div>
                    <div style="color: #6e7681; font-size: 14px;">Python</div>
                </div>
                <div class="code-content">
                    <div class="line">
                        <span class="line-number">1</span>
                        <span class="code-comment"># Уровень 6: Анализ системных логов</span>
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
                        <span class="code-comment"># 1. Создай счётчик для критических ошибок (начни с 0)</span>
                    </div>
                    <div class="line">
                        <span class="line-number">5</span>
                        <span class="code-comment"># 2. Используй цикл for для минут от 1 до 100</span>
                    </div>
                    <div class="line">
                        <span class="line-number">6</span>
                        <span class="code-comment"># 3. Внутри цикла проверяй ОБА условия с помощью and</span>
                    </div>
                    <div class="line">
                        <span class="line-number">7</span>
                        <span class="code-comment"># 4. Если условия верны - увеличь счётчик на 1</span>
                    </div>
                    <div class="line">
                        <span class="line-number">8</span>
                        <span class="code-comment"># 5. После цикла выведи значение счётчика</span>
                    </div>
                </div>
            </div>
            
            <!-- Блок проверки -->
            <div style="background: rgba(255,255,255,0.05); padding: 25px; border-radius: 10px; margin: 25px 0; border: 2px solid var(--primary);">
                <h3 style="margin-bottom: 20px;">✅ ПРОВЕРКА РЕЗУЛЬТАТА</h3>
                
                <p><strong>Запусти свою программу и посмотри результат:</strong></p>
                <p style="font-size: 14px; opacity: 0.8; margin-bottom: 15px;">
                    Программа должна вывести число - количество минут с критическими ошибками.
                </p>
                
                <div style="background: #1a1a1a; padding: 15px; border-radius: 5px; margin: 15px 0; font-family: 'Courier New', monospace; text-align: center;">
                    <p>Пример вывода программы:</p>
                    <div style="display: flex; justify-content: center; gap: 20px; margin: 15px 0;">
                        <div style="text-align: center;">
                            <div style="font-size: 24px; color: var(--accent);">6</div>
                            <div style="font-size: 12px; opacity: 0.7;">первая ошибка</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 24px; color: var(--accent);">12</div>
                            <div style="font-size: 12px; opacity: 0.7;">вторая ошибка</div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 24px; color: var(--accent);">...</div>
                            <div style="font-size: 12px; opacity: 0.7;">и так далее</div>
                        </div>
                    </div>
                    <p style="color: var(--accent); font-size: 18px; font-weight: bold; margin-top: 10px;">Всего: ???</p>
                    <p style="font-size: 12px; opacity: 0.7; margin-top: 5px;">Запусти программу чтобы узнать!</p>
                </div>
                
                <p><strong>Введи количество критических ошибок:</strong></p>
                
                <div style="display: flex; gap: 15px; margin-top: 15px; align-items: center; justify-content: center;">
                    <input 
                        type="number" 
                        id="answerInput6" 
                        placeholder="Введи число"
                        style="
                            width: 200px;
                            padding: 15px;
                            border-radius: 10px;
                            border: 2px solid var(--primary);
                            background: rgba(255,255,255,0.1);
                            color: white;
                            font-size: 18px;
                            text-align: center;
                            font-family: 'Ubuntu', sans-serif;
                        "
                    >
                    <button class="btn btn-primary check-btn-level6" onclick="checkAnswerLevel6()" style="min-width: 150px;">
                        <span>🔍</span> Проверить
                    </button>
                </div>
                
                <div style="margin-top: 20px; padding: 15px; background: rgba(255,158,0,0.1); border-radius: 8px; border: 2px dashed var(--warning);">
                    <p style="display: flex; align-items: center; gap: 10px;">
                        <span>⚠️</span>
                        <strong>Подсказка снижает оценку! Сначала попробуй сам.</strong>
                    </p>
                </div>
            </div>
            
            <div class="hint-container" id="hintContainer6" style="display: none;">
                <h3 style="color: var(--warning); display: flex; align-items: center; gap: 10px;">
                    <span>🟡</span> ПОДСКАЗКА (уровень зачтётся на 50%)
                </h3>
                
                <p><strong>Как подойти к решению:</strong></p>
                
                <div style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px; margin: 15px 0;">
                    <p><strong>Шаг 1: Подготовь счётчик</strong></p>
                    <p>Создай переменную для подсчёта критических ошибок. Начни с 0.</p>
                    
                    <p><strong>Шаг 2: Организуй цикл</strong></p>
                    <p>Используй <code>for минута in range(1, 101):</code> для всех 100 минут.</p>
                    
                    <p><strong>Шаг 3: Напиши сложное условие</strong></p>
                    <p>Проверь делится ли минута на 2 И на 3 одновременно:</p>
                    <p><code>if минута % 2 == 0 and минута % 3 == 0:</code></p>
                    
                    <p><strong>Шаг 4: Увеличь счётчик</strong></p>
                    <p>Если условие верно - добавь 1 к счётчику.</p>
                    
                    <p><strong>Шаг 5: Выведи результат</strong></p>
                    <p>После цикла покажи значение счётчика.</p>
                </div>
                
                <p><strong>Ключевые элементы:</strong></p>
                <ul style="margin-left: 20px; margin-top: 10px; line-height: 1.6;">
                    <li><code>%</code> - оператор остатка от деления</li>
                    <li><code>and</code> - логическое "И" (оба условия должны быть верны)</li>
                    <li><code>счётчик = счётчик + 1</code> - увеличение счётчика</li>
                    <li>Условие внутри цикла - это нормально и правильно!</li>
                </ul>
                
                <div style="background: rgba(255,158,0,0.1); padding: 15px; border-radius: 8px; margin-top: 15px;">
                    <p>🎯 <strong>Совет:</strong> Сначала проверь программу на небольшом диапазоне, например от 1 до 20.</p>
                    <p>Когда убедишься, что она работает правильно - измени range() на (1, 101).</p>
                </div>
            </div>
            
            <div style="margin-top: 40px;">
                <div class="action-buttons">
                    <button class="btn btn-secondary" onclick="toggleHintLevel6()" style="background: rgba(255,158,0,0.2); border-color: var(--warning);">
                        <span>🟡</span> Подсказка
                    </button>
                    <button class="btn btn-secondary" onclick="loadLevel(5)" style="margin-left: 10px;">
                        <span>⬅️</span> Уровень 5
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
}

// Экспорт функций
window.initLevel6 = initLevel6;
window.toggleHintLevel6 = toggleHintLevel6;
window.checkAnswerLevel6 = checkAnswerLevel6;
window.getLevel6HTML = getLevel6HTML;