// Логика третьего уровня

let level3Completed = false;
let usedHint = false;
let completionType = 'full';

function initLevel3() {
    console.log('Уровень 3 инициализирован');
    level3Completed = false;
    usedHint = false;
    completionType = 'none';
    
    const progress = JSON.parse(localStorage.getItem('codeQuestProgress') || '{}');
    if (progress.level3) {
        level3Completed = true;
        completionType = progress.level3.completionType || 'full';
        showLevel3Result(completionType);
    }
}

function toggleHintLevel3() {
    const hintContainer = document.getElementById('hintContainer3');
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
                usedHint = true;
                completionType = 'half';
                closeModal();
                hintContainer.style.display = 'block';
                hintContainer.style.animation = 'none';
                setTimeout(() => {
                    hintContainer.style.animation = 'fadeIn 0.5s ease';
                }, 10);
                saveHintUsage();
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
    
    playSound('click');
}

function saveHintUsage() {
    const progress = JSON.parse(localStorage.getItem('codeQuestProgress') || '{}');
    progress.level3_hint_used = true;
    localStorage.setItem('codeQuestProgress', JSON.stringify(progress));
}

function checkAnswerLevel3() {
    const answerInput = document.getElementById('answerInput3');
    const userAnswer = answerInput.value.trim();
    
    if (!userAnswer) {
        showMessage('Ошибка', 'Введи + или -', 'error');
        return;
    }
    
    // Правильный ответ: "-" (при температуре 35 доступ запрещён)
    if (userAnswer === '-' || userAnswer === '−') {
        level3Completed = true;
        completionType = usedHint ? 'half' : 'full';
        
        saveProgress(3, { 
            completionType: completionType,
            usedHint: usedHint,
            answer: userAnswer
        });
        
        showLevel3Result(completionType);
        playSound('success');
    } else if (userAnswer === '+') {
        showMessage(
            'Неверно',
            'Подумай ещё. При температуре 35 условие "температура от 20 до 30" не выполняется.',
            'warning'
        );
        playSound('error');
    } else {
        showMessage('Ошибка', 'Нужно ввести только + или -', 'error');
        playSound('error');
    }
}

function showLevel3Result(type) {
    const answerInput = document.getElementById('answerInput3');
    const checkBtn = document.querySelector('.check-btn-level3');
    
    if (answerInput) answerInput.disabled = true;
    if (checkBtn) {
        checkBtn.disabled = true;
        if (type === 'full') {
            checkBtn.innerHTML = '<span>✅</span> Верно!';
            checkBtn.style.background = 'linear-gradient(135deg, var(--success), #2d936c)';
        } else if (type === 'half') {
            checkBtn.innerHTML = '<span>🟡</span> Верно (с подсказкой)';
            checkBtn.style.background = 'linear-gradient(135deg, var(--warning), #ff8c00)';
        }
    }
    
    setTimeout(() => {
        showNextLevelButton3(type);
    }, 500);
}

function showNextLevelButton3(type) {
    createNextLevelButton(3, type === 'half');
}

// HTML третьего уровня
function getLevel3HTML() {
    return `
    <div class="level-container">
        <!-- Левая панель - история -->
        <div class="panel story-panel">
            <div class="badge badge-level">🎮 Уровень 3: Сложные условия</div>
            
            <div class="robot-container">
                <div class="robot">🤖</div>
            </div>
            
            <h2>Защитная дверь</h2>
            <p>Робот подводит вас к металлической двери с тремя индикаторами.</p>
            
            <div class="dialogue">
                <div class="typing">
                    Это защитная дверь в главную лабораторию!
                </div>
                <div style="margin-top: 15px;">
                    У неё строгие правила:
                </div>
                <div style="margin-top: 10px; padding: 15px; background: rgba(255,0,110,0.1); border-radius: 8px;">
                    <strong>Дверь открывается если:</strong><br>
                    ✓ Энергия ≥ 50 (у нас 85)<br>
                    ✓ Температура 20-30°<br>
                    ✓ Код доступа 1234
                </div>
                <div style="margin-top: 15px; color: var(--accent); font-weight: bold;">
                    Нужны ВСЕ три условия одновременно!
                </div>
            </div>
            
            <h3>🎯 Пример похожей задачи:</h3>
            <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; margin: 15px 0;">
                <p><strong>Задача:</strong> Проверить можно ли получить доступ к компьютеру</p>
                
                <div style="background: #1a1a1a; padding: 15px; border-radius: 5px; margin-top: 10px; font-family: 'Courier New', monospace; font-size: 14px;">
# Проверка доступа к компьютеру<br>
пароль = "qwerty"<br>
время = 14  # 14:00<br>
<br>
# Проверяем два условия<br>
if пароль == "qwerty" and время >= 9 and время <= 18:<br>
&nbsp;&nbsp;&nbsp;&nbsp;print("+")  # доступ есть<br>
else:<br>
&nbsp;&nbsp;&nbsp;&nbsp;print("-")  # доступ закрыт
                </div>
                
                <p style="margin-top: 10px; font-size: 14px;">
                    <strong>Как работает:</strong><br>
                    • Нужен правильный пароль <strong>И</strong> подходящее время<br>
                    • Если оба условия верны → <code>+</code><br>
                    • Если хотя бы одно неверно → <code>-</code>
                </p>
            </div>
            
            <p><strong>Теперь примени эту логику к нашей двери!</strong></p>
        </div>
        
        <!-- Правая панель - задание -->
        <div class="panel task-panel">
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 25px;">
                <div style="font-size: 50px;">🔐</div>
                <div>
                    <h2>ПРОВЕРКА ДОСТУПА</h2>
                    <p>Используем оператор AND</p>
                </div>
            </div>
            
            <div style="background: rgba(0,180,216,0.1); padding: 20px; border-radius: 10px; margin: 20px 0;">
                <h3>📝 ТВОЁ ЗАДАНИЕ:</h3>
                <p>Напиши программу которая проверяет доступ через дверь:</p>
                
                <div style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px; margin: 15px 0;">
                    <p><strong>УСЛОВИЯ ОТКРЫТИЯ ДВЕРИ:</strong></p>
                    <p>1. Энергия ≥ 50 (используй <code>energy = 85</code>)</p>
                    <p>2. Температура от 20 до 30 градусов (спроси у пользователя)</p>
                    <p>3. Код доступа 1234 (спроси у пользователя)</p>
                    
                    <p><strong>ПРОГРАММА ДОЛЖНА:</strong></p>
                    <p>• Проверить ВСЕ три условия с помощью <code>and</code></p>
                    <p>• Если ВСЕ условия верны → вывести <code>+</code></p>
                    <p>• Если ХОТЯ БЫ одно неверно → вывести <code>-</code></p>
                </div>
            </div>
            
            <div class="code-editor">
                <div class="code-header">
                    <div class="code-title">robot.py</div>
                    <div style="color: #6e7681; font-size: 14px;">Python</div>
                </div>
                <div class="code-content">
                    <div class="line">
                        <span class="line-number">1</span>
                        <span class="code-comment"># Уровень 3: Проверка доступа в лабораторию</span>
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
                        <span class="code-comment"># 1. Задай энергию (85)</span>
                    </div>
                    <div class="line">
                        <span class="line-number">5</span>
                        <span class="code-comment"># 2. Спроси температуру</span>
                    </div>
                    <div class="line">
                        <span class="line-number">6</span>
                        <span class="code-comment"># 3. Спроси код доступа</span>
                    </div>
                    <div class="line">
                        <span class="line-number">7</span>
                        <span class="code-comment"># 4. Проверь ВСЕ условия с помощью and</span>
                    </div>
                    <div class="line">
                        <span class="line-number">8</span>
                        <span class="code-comment"># 5. Выведи + если доступ есть, иначе -</span>
                    </div>
                </div>
            </div>
            
            <!-- Блок проверки -->
            <div style="background: rgba(255,255,255,0.05); padding: 25px; border-radius: 10px; margin: 25px 0; border: 2px solid var(--primary);">
                <h3 style="margin-bottom: 20px;">✅ ПРОВЕРЬ ПОНИМАНИЕ</h3>
                
                <p><strong>Запусти свою программу и введи:</strong></p>
                <div style="background: #1a1a1a; padding: 15px; border-radius: 5px; margin: 15px 0; font-family: 'Courier New', monospace; text-align: center;">
                    <p>Температура: <span style="color: var(--accent)">35</span></p>
                    <p>Код доступа: <span style="color: var(--accent)">1234</span></p>
                </div>
                
                <p><strong>Что выведет программа?</strong></p>
                <p style="font-size: 14px; opacity: 0.8; margin-bottom: 15px;">(Введи + или -)</p>
                
                <div style="display: flex; gap: 15px; margin-top: 15px; align-items: center; justify-content: center;">
                    <input 
                        type="text" 
                        id="answerInput3" 
                        placeholder="+/-"
                        maxlength="1"
                        style="
                            width: 100px;
                            padding: 15px;
                            border-radius: 10px;
                            border: 2px solid var(--primary);
                            background: rgba(255,255,255,0.1);
                            color: white;
                            font-size: 24px;
                            text-align: center;
                            font-family: 'Ubuntu', sans-serif;
                        "
                    >
                    <button class="btn btn-primary check-btn-level3" onclick="checkAnswerLevel3()" style="min-width: 150px;">
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
            
            <div class="hint-container" id="hintContainer3" style="display: none;">
                <h3 style="color: var(--warning); display: flex; align-items: center; gap: 10px;">
                    <span>🟡</span> ПОДСКАЗКА (уровень зачтётся на 50%)
                </h3>
                
                <p><strong>Пример решения:</strong></p>
                <div style="background: #2d2d2d; padding: 15px; border-radius: 5px; margin: 15px 0; font-family: 'Courier New', monospace; font-size: 14px;">
# Уровень 3: Проверка доступа<br>
<br>
# Данные из прошлого уровня<br>
energy = 85<br>
<br>
# Спрашиваем температуру и код<br>
temperature = int(input("Какая температура? "))<br>
code = int(input("Введите код: "))<br>
<br>
# Проверяем ВСЕ условия<br>
if energy >= 50 and temperature >= 20 and temperature <= 30 and code == 1234:<br>
&nbsp;&nbsp;&nbsp;&nbsp;print("+")<br>
else:<br>
&nbsp;&nbsp;&nbsp;&nbsp;print("-")
                </div>
                
                <p><strong>Объяснение:</strong></p>
                <p>• При температуре 35 условие <code>temperature <= 30</code> будет False</p>
                <p>• Значит ВСЕ условия с <code>and</code> не выполнятся</p>
                <p>• Программа выведет: <strong>-</strong></p>
                
                <div style="background: rgba(255,158,0,0.1); padding: 15px; border-radius: 8px; margin-top: 15px;">
                    <p>🎯 <strong>Ответ для проверки: -</strong></p>
                    <p>Но помни: в статистике уровень будет жёлтым 🟡</p>
                </div>
            </div>
            
            <div style="margin-top: 40px;">
                <div class="action-buttons">
                    <button class="btn btn-secondary" onclick="toggleHintLevel3()" style="background: rgba(255,158,0,0.2); border-color: var(--warning);">
                        <span>🟡</span> Подсказка
                    </button>
                    <button class="btn btn-secondary" onclick="loadLevel(2)" style="margin-left: 10px;">
                        <span>⬅️</span> Уровень 2
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
}

// Экспорт функций
window.initLevel3 = initLevel3;
window.toggleHintLevel3 = toggleHintLevel3;
window.checkAnswerLevel3 = checkAnswerLevel3;
window.getLevel3HTML = getLevel3HTML;