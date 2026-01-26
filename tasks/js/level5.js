// level5.js
// Логика пятого уровня - Циклы For

let level5Completed = false;
let usedHintLevel5 = false;

function initLevel5() {
    console.log('Уровень 5 инициализирован');
    level5Completed = false;
    usedHintLevel5 = false;
    
    // Восстанавливаем состояние если уже был выполнен
    const progress = JSON.parse(localStorage.getItem('codeQuestProgress') || '{}');
    if (progress.level5) {
        level5Completed = true;
        usedHintLevel5 = progress.level5.usedHint || false;
        showLevel5Result();
    }
}

function toggleHintLevel5() {
    const hintContainer = document.getElementById('hintContainer5');
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
                usedHintLevel5 = true;
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

function checkAnswerLevel5() {
    const answerInput = document.getElementById('answerInput5');
    const userAnswer = answerInput.value.trim();
    
    if (!userAnswer) {
        showMessage('Ошибка', 'Введи число!', 'error');
        return;
    }
    
    // Правильный ответ: сумма чисел от 1 до 567 = 161028
    if (parseInt(userAnswer) === 161028) {
        level5Completed = true;
        
        saveProgress(5, { 
            usedHint: usedHintLevel5,
            completionType: usedHintLevel5 ? 'half' : 'full',
            answer: userAnswer,
            sum: 161028
        });
        
        showLevel5Result();
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
            '1. Напиши программу с циклом for<br>' +
            '2. Суммируй все числа от 1 до 567<br>' +
            '3. Запусти программу<br>' +
            '4. Посмотри какое число получилось<br>' +
            '5. Введи это число<br><br>' +
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

function showLevel5Result() {
    const answerInput = document.getElementById('answerInput5');
    const checkBtn = document.querySelector('.check-btn-level5');
    
    if (answerInput) answerInput.disabled = true;
    if (checkBtn) {
        checkBtn.disabled = true;
        if (usedHintLevel5) {
            checkBtn.innerHTML = '<span>🟡</span> Верно (с подсказкой)';
            checkBtn.style.background = 'linear-gradient(135deg, var(--warning), #ff8c00)';
        } else {
            checkBtn.innerHTML = '<span>✅</span> Верно!';
            checkBtn.style.background = 'linear-gradient(135deg, var(--success), #2d936c)';
        }
    }
    
    setTimeout(() => {
        showNextLevelButton5();
        showMessage(
            '🎉 Потрясающе!',
            'Ты освоил циклы for - одну из самых мощных возможностей программирования!<br><br>' +
            '<strong>Робот говорит:</strong><br>' +
            '"Память полностью восстановлена! Циклы обработали все 567 секторов за миллисекунды!"<br><br>' +
            'Теперь я помню всё: как меня создали, как работала лаборатория...<br>' +
            'Спасибо тебе, герой! Миссия завершена!"',
            'success'
        );
    }, 500);
}

function showNextLevelButton5() {
    createNextLevelButton(5, usedHintLevel5);
}

// HTML пятого уровня
function getLevel5HTML() {
    return `
    <div class="level-container">
        <!-- Левая панель - история -->
        <div class="panel story-panel">
            <div class="badge badge-level">🎮 Уровень 5: Восстановление памяти</div>
            
            <div class="robot-container">
                <div class="robot">🤖</div>
            </div>
            
            <h2>Циклы For</h2>
            <p>Робот обнаружил повреждённые секторы памяти. Нужно просуммировать все исправные секторы чтобы восстановить систему.</p>
            
            <div class="dialogue">
                <div class="typing">
                    Моя память разбита на 567 секторов!
                </div>
                <div style="margin-top: 15px;">
                    Чтобы восстановить систему, нужно просуммировать все номера исправных секторов от 1 до 567.
                </div>
                <div style="margin-top: 10px; color: var(--accent); font-weight: bold;">
                    Помоги мне посчитать эту сумму с помощью цикла for!
                </div>
            </div>
            
            <h3>🎯 Пример работы с циклом:</h3>
            <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; margin: 15px 0;">
                <p><strong>Пример:</strong> Копим деньги на робота</p>
                
                <div style="background: #1a1a1a; padding: 20px; border-radius: 5px; margin-top: 10px; font-family: 'Courier New', monospace; font-size: 14px; line-height: 1.6;">
<pre style="margin: 0; color: #d4d4d4;">
<span style="color: #d4d4d4;">print(</span><span style="color: #ce9178;">"Копим деньги каждый день:"</span><span style="color: #d4d4d4;">)</span>

<span style="color: #d4d4d4;">деньги = </span><span style="color: #b5cea8;">0</span><span style="color: #d4d4d4;">  </span><span style="color: #6a9955;"># Начинаем с 0 рублей</span>

<span style="color: #6a9955;"># Копим 5 дней</span>
<span style="color: #569cd6;">for</span><span style="color: #d4d4d4;"> день </span><span style="color: #569cd6;">in</span><span style="color: #d4d4d4;"> range(</span><span style="color: #b5cea8;">1</span><span style="color: #d4d4d4;">, </span><span style="color: #b5cea8;">6</span><span style="color: #d4d4d4;">):</span>
<span style="color: #d4d4d4;">    деньги = деньги + </span><span style="color: #b5cea8;">10</span><span style="color: #d4d4d4;">  </span><span style="color: #6a9955;"># Каждый день добавляем 10 рублей</span>
<span style="color: #d4d4d4;">    print(</span><span style="color: #ce9178;">f"День {день}: {деньги} рублей"</span><span style="color: #d4d4d4;">)</span>
    
<span style="color: #d4d4d4;">print(</span><span style="color: #ce9178;">f"За 5 дней накопили: {деньги} рублей"</span><span style="color: #d4d4d4;">)</span>
</pre>
                </div>
                
                <div style="background: #2d2d2d; padding: 10px; border-radius: 5px; margin-top: 10px; font-family: 'Courier New', monospace; font-size: 14px;">
<pre style="margin: 0; color: #d4d4d4;">
Копим деньги каждый день:
День 1: 10 рублей
День 2: 20 рублей  
День 3: 30 рублей
День 4: 40 рублей
День 5: 50 рублей
За 5 дней накопили: 50 рублей
</pre>
                </div>
                
                <p style="margin-top: 10px; font-size: 14px;">
                    <strong>Как работает:</strong><br>
                    • <code>range(1, 6)</code> создаёт числа: 1, 2, 3, 4, 5<br>
                    • Цикл повторяется <strong>5 раз</strong> - по одному разу для каждого дня<br>
                    • Каждый раз переменная <code>деньги</code> увеличивается на 10<br>
                    • В итоге получаем 50 рублей
                </p>
            </div>
            
            <p><strong>Теперь примени эту логику для 567 секторов памяти!</strong></p>
        </div>
        
        <!-- Правая панель - задание -->
        <div class="panel task-panel">
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 25px;">
                <div style="font-size: 50px;">🔄</div>
                <div>
                    <h2>ЦИКЛЫ FOR</h2>
                    <p>Автоматизируем повторяющиеся задачи</p>
                </div>
            </div>
            
            <div style="background: rgba(157, 78, 221, 0.1); padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 5px solid #9d4edd;">
                <h3>📝 ТВОЁ ЗАДАНИЕ:</h3>
                <p>Напиши программу, которая суммирует все числа от 1 до 567:</p>
                
                <div style="background: rgba(0,0,0,0.3); padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <p><strong>ПРОБЛЕМА:</strong></p>
                    <p>У робота 567 секторов памяти с номерами от 1 до 567.</p>
                    <p>Нужно сложить все эти номера чтобы восстановить систему.</p>
                    
                    <div style="text-align: center; margin: 25px 0; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 10px;">
                        <div style="font-size: 48px; color: var(--accent);">1 + 2 + 3 + ... + 567 = ?</div>
                        <p style="margin-top: 10px; opacity: 0.8;">(всего 567 чисел!)</p>
                    </div>
                    
                    <p><strong>ПРОГРАММА ДОЛЖНА:</strong></p>
                    <ul style="margin-left: 20px; margin-top: 15px; line-height: 1.8;">
                        <li>Создать переменную для суммы (начать с 0)</li>
                        <li>Использовать цикл <code>for</code> для чисел от 1 до 567</li>
                        <li>В цикле добавлять каждое число к сумме</li>
                        <li>После цикла вывести общую сумму</li>
                    </ul>
                    
                    <div style="background: rgba(0,180,216,0.1); padding: 15px; border-radius: 5px; margin-top: 20px; border-left: 3px solid var(--primary);">
                        <p><strong>💡 Циклы экономят время!</strong></p>
                        <p>Без цикла пришлось бы писать: <code>сумма = 1 + 2 + 3 + ... + 567</code> (567 раз!)</p>
                        <p>С циклом нужно всего 4 строчки кода!</p>
                    </div>
                </div>
            </div>
            
            <div class="code-editor">
                <div class="code-header">
                    <div class="code-title">memory.py</div>
                    <div style="color: #6e7681; font-size: 14px;">Python</div>
                </div>
                <div class="code-content">
                    <div class="line">
                        <span class="line-number">1</span>
                        <span class="code-comment"># Уровень 5: Восстановление памяти</span>
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
                        <span class="code-comment"># 1. Создай переменную для суммы (начни с 0)</span>
                    </div>
                    <div class="line">
                        <span class="line-number">5</span>
                        <span class="code-comment"># 2. Используй цикл for для чисел от 1 до 567</span>
                    </div>
                    <div class="line">
                        <span class="line-number">6</span>
                        <span class="code-comment"># 3. В цикле добавляй каждое число к сумме</span>
                    </div>
                    <div class="line">
                        <span class="line-number">7</span>
                        <span class="code-comment"># 4. После цикла выведи сумму</span>
                    </div>
                </div>
            </div>
            
            <!-- Блок проверки -->
            <div style="background: rgba(255,255,255,0.05); padding: 25px; border-radius: 10px; margin: 25px 0; border: 2px solid var(--primary);">
                <h3 style="margin-bottom: 20px;">✅ ПРОВЕРКА РЕЗУЛЬТАТА</h3>
                
                <p><strong>Запусти свою программу и посмотри результат:</strong></p>
                <p style="font-size: 14px; opacity: 0.8; margin-bottom: 15px;">
                    Программа должна вывести одно число - сумму всех чисел от 1 до 567.
                </p>
                
                <div style="background: #1a1a1a; padding: 15px; border-radius: 5px; margin: 15px 0; font-family: 'Courier New', monospace; text-align: center;">
                    <p>Твоя программа выведет одно большое число</p>
                    <p style="color: var(--accent); font-size: 18px; font-weight: bold; margin-top: 10px;">???</p>
                    <p style="font-size: 12px; opacity: 0.7; margin-top: 5px;">Запусти программу чтобы узнать!</p>
                </div>
                
                <p><strong>Введи получившееся число:</strong></p>
                
                <div style="display: flex; gap: 15px; margin-top: 15px; align-items: center; justify-content: center;">
                    <input 
                        type="number" 
                        id="answerInput5" 
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
                    <button class="btn btn-primary check-btn-level5" onclick="checkAnswerLevel5()" style="min-width: 150px;">
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
            
            <div class="hint-container" id="hintContainer5" style="display: none;">
                <h3 style="color: var(--warning); display: flex; align-items: center; gap: 10px;">
                    <span>🟡</span> ПОДСКАЗКА (уровень зачтётся на 50%)
                </h3>
                
                <p><strong>Как подойти к решению:</strong></p>
                
                <div style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px; margin: 15px 0;">
                    <p><strong>Шаг 1: Подготовь переменную-накопитель</strong></p>
                    <p>Нужна переменная, которая будет хранить сумму. Начни её с 0.</p>
                    
                    <p><strong>Шаг 2: Используй цикл for с range()</strong></p>
                    <p><code>range(1, 568)</code> создаст все числа от 1 до 567.</p>
                    
                    <p><strong>Шаг 3: Внутри цикла добавляй числа</strong></p>
                    <p>Каждое число из цикла нужно прибавить к сумме.</p>
                    
                    <p><strong>Шаг 4: Выведи результат</strong></p>
                    <p>После цикла покажи получившуюся сумму.</p>
                </div>
                
                <p><strong>Ключевые элементы:</strong></p>
                <ul style="margin-left: 20px; margin-top: 10px; line-height: 1.6;">
                    <li><code>for число in range(начало, конец):</code> - структура цикла</li>
                    <li><code>range(1, 568)</code> даст числа: 1, 2, 3, ..., 567</li>
                    <li>Оператор <code>+=</code> или <code>сумма = сумма + число</code> для сложения</li>
                    <li>Переменная должна быть создана ДО цикла</li>
                </ul>
                
                <div style="background: rgba(255,158,0,0.1); padding: 15px; border-radius: 8px; margin-top: 15px;">
                    <p>🎯 <strong>Совет:</strong> Начни с простого - попробуй сначала сложить числа от 1 до 10.</p>
                    <p>Когда получится - измени range() на (1, 568).</p>
                </div>
            </div>
            
            <div style="margin-top: 40px;">
                <div class="action-buttons">
                    <button class="btn btn-secondary" onclick="toggleHintLevel5()" style="background: rgba(255,158,0,0.2); border-color: var(--warning);">
                        <span>🟡</span> Подсказка
                    </button>
                    <button class="btn btn-secondary" onclick="loadLevel(4)" style="margin-left: 10px;">
                        <span>⬅️</span> Уровень 4
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
}

// Экспорт функций
window.initLevel5 = initLevel5;
window.toggleHintLevel5 = toggleHintLevel5;
window.checkAnswerLevel5 = checkAnswerLevel5;
window.getLevel5HTML = getLevel5HTML;