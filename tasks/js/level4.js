// level4.js
// Логика четвертого уровня - Исправленная версия

let level4Completed = false;
let usedHintLevel4 = false;

function initLevel4() {
    console.log('Уровень 4 инициализирован');
    level4Completed = false;
    usedHintLevel4 = false;
    
    // Восстанавливаем состояние если уже был выполнен
    const progress = JSON.parse(localStorage.getItem('codeQuestProgress') || '{}');
    if (progress.level4) {
        level4Completed = true;
        usedHintLevel4 = progress.level4.usedHint || false;
        showLevel4Result();
    }
}

function toggleHintLevel4() {
    const hintContainer = document.getElementById('hintContainer4');
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
                usedHintLevel4 = true;
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

function checkAnswerLevel4() {
    const answerInput = document.getElementById('answerInput4');
    const userAnswer = answerInput.value.trim().toLowerCase();
    
    if (!userAnswer) {
        showMessage('Ошибка', 'Выбери вариант ответа!', 'error');
        return;
    }
    
    // Правильный ответ: "full" для данных: ранг=2, время=ночь, доступ=да
    if (userAnswer === 'full') {
        level4Completed = true;
        
        saveProgress(4, { 
            usedHint: usedHintLevel4,
            completionType: usedHintLevel4 ? 'half' : 'full',
            answer: userAnswer
        });
        
        showLevel4Result();
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
            '1. Напиши программу с if-elif-elif-else<br>' +
            '2. Запусти её<br>' +
            '3. Когда спросит - введи: 2, ночь, да<br>' +
            '4. Посмотри что вывелось<br>' +
            '5. Выбери этот вариант',
            'warning'
        );
        playSound('error');
    }
}

function showLevel4Result() {
    const answerInput = document.getElementById('answerInput4');
    const checkBtn = document.querySelector('.check-btn-level4');
    
    if (answerInput) answerInput.disabled = true;
    if (checkBtn) {
        checkBtn.disabled = true;
        if (usedHintLevel4) {
            checkBtn.innerHTML = '<span>🟡</span> Верно (с подсказкой)';
            checkBtn.style.background = 'linear-gradient(135deg, var(--warning), #ff8c00)';
        } else {
            checkBtn.innerHTML = '<span>✅</span> Верно!';
            checkBtn.style.background = 'linear-gradient(135deg, var(--success), #2d936c)';
        }
    }
    
    setTimeout(() => {
        showNextLevelButton4();
        showMessage(
            '🎉 Отлично!',
            'Ты освоил сложные условия с if-elif-else и комбинацией and/or!<br><br>' +
            '<strong>Робот говорит:</strong><br>' +
            '"Система безопасности настроена! Теперь мы можем войти в главный зал лаборатории."<br><br>' +
            'Нажми кнопку "Финал" чтобы завершить миссию!',
            'success'
        );
    }, 500);
}

function showNextLevelButton4() {
    createNextLevelButton(4, usedHintLevel4);
}

// HTML четвертого уровня - ВЕРНУЛ СТАРЫЙ ПРИМЕР
function getLevel4HTML() {
    return `
    <div class="level-container">
        <!-- Левая панель - история -->
        <div class="panel story-panel">
            <div class="badge badge-level">🎮 Уровень 4: Секретная лаборатория</div>
            
            <div class="robot-container">
                <div class="robot">🤖</div>
            </div>
            
            <h2>Система безопасности</h2>
            <p>Вы вошли в центральный зал лаборатории. На огромном экране — статусы всех систем.</p>
            
            <div class="dialogue">
                <div class="typing">
                    Отлично! Теперь нужно настроить уровни доступа к главному компьютеру.
                </div>
                <div style="margin-top: 15px;">
                    Есть три уровня доступа: полный, ограниченный и экстренный.
                </div>
                <div style="margin-top: 10px; color: var(--accent); font-weight: bold;">
                    Уровень доступа зависит от звания, времени суток и особых разрешений!
                </div>
            </div>
            


<h3>🎯 Пример похожей задачи:</h3>
<div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; margin: 15px 0;">
    <p><strong>Задача:</strong> Выбор режима работы реактора</p>
    
    <div style="background: #1a1a1a; padding: 20px; border-radius: 5px; margin-top: 10px; font-family: 'Courier New', monospace; font-size: 14px; line-height: 1.6; overflow-x: auto;">
<pre style="margin: 0; color: #d4d4d4;">
<span style="color: #6a9955;"># Выбор режима работы реактора</span>
<span style="color: #d4d4d4;">мощность = </span><span style="color: #569cd6;">int</span><span style="color: #d4d4d4;">(</span><span style="color: #569cd6;">input</span><span style="color: #d4d4d4;">(</span><span style="color: #ce9178;">"Текущая мощность: "</span><span style="color: #d4d4d4;">))</span>
<span style="color: #d4d4d4;">температура = </span><span style="color: #569cd6;">int</span><span style="color: #d4d4d4;">(</span><span style="color: #569cd6;">input</span><span style="color: #d4d4d4;">(</span><span style="color: #ce9178;">"Температура реактора: "</span><span style="color: #d4d4d4;">))</span>
<span style="color: #d4d4d4;">авария = </span><span style="color: #569cd6;">input</span><span style="color: #d4d4d4;">(</span><span style="color: #ce9178;">"Есть авария? (да/нет): "</span><span style="color: #d4d4d4;">)</span>

<span style="color: #6a9955;"># Выбор режима:</span>
<span style="color: #d4d4d4;">if авария == </span><span style="color: #ce9178;">"да"</span><span style="color: #d4d4d4;"> </span><span style="color: #569cd6;">or</span><span style="color: #d4d4d4;"> температура > </span><span style="color: #b5cea8;">100</span><span style="color: #d4d4d4;">:</span>
<span style="color: #d4d4d4;">    </span><span style="color: #569cd6;">print</span><span style="color: #d4d4d4;">(</span><span style="color: #ce9178;">"СТОП"</span><span style="color: #d4d4d4;">)  </span><span style="color: #6a9955;"># Аварийная остановка</span>
<span style="color: #d4d4d4;">elif мощность >= </span><span style="color: #b5cea8;">80</span><span style="color: #d4d4d4;"> </span><span style="color: #569cd6;">and</span><span style="color: #d4d4d4;"> температура < </span><span style="color: #b5cea8;">50</span><span style="color: #d4d4d4;">:</span>
<span style="color: #d4d4d4;">    </span><span style="color: #569cd6;">print</span><span style="color: #d4d4d4;">(</span><span style="color: #ce9178;">"МАКС"</span><span style="color: #d4d4d4;">)  </span><span style="color: #6a9955;"># Максимальная мощность</span>
<span style="color: #d4d4d4;">elif мощность < </span><span style="color: #b5cea8;">30</span><span style="color: #d4d4d4;"> </span><span style="color: #569cd6;">or</span><span style="color: #d4d4d4;"> температура < </span><span style="color: #b5cea8;">20</span><span style="color: #d4d4d4;">:</span>
<span style="color: #d4d4d4;">    </span><span style="color: #569cd6;">print</span><span style="color: #d4d4d4;">(</span><span style="color: #ce9178;">"МИН"</span><span style="color: #d4d4d4;">)   </span><span style="color: #6a9955;"># Минимальный режим</span>
<span style="color: #d4d4d4;">else:</span>
<span style="color: #d4d4d4;">    </span><span style="color: #569cd6;">print</span><span style="color: #d4d4d4;">(</span><span style="color: #ce9178;">"НОРМ"</span><span style="color: #d4d4d4;">)  </span><span style="color: #6a9955;"># Нормальная работа</span>
</pre>
    </div>
    
    <p style="margin-top: 10px; font-size: 14px;">
        <strong>Как работает:</strong><br>
        • <code>or</code> — если есть авария ИЛИ перегрев → сразу СТОП<br>
        • <code>and</code> — оба условия должны быть верны для режима МАКС<br>
        • Другой <code>or</code> — если мало мощности ИЛИ слишком холодно → МИН<br>
        • Всё остальное → НОРМ
    </p>
</div>
            
            <p><strong>Теперь создай такую же логику для системы доступа!</strong></p>
        </div>
        
        <!-- Правая панель - задание -->
        <div class="panel task-panel">
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 25px;">
                <div style="font-size: 50px;">🔒</div>
                <div>
                    <h2>СИСТЕМА ДОСТУПА</h2>
                    <p>Сложные условия с if-elif-else</p>
                </div>
            </div>
            
            <div style="background: rgba(157, 78, 221, 0.1); padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 5px solid #9d4edd;">
                <h3>📝 ТВОЁ ЗАДАНИЕ:</h3>
                <p>Напиши программу для выбора уровня доступа к системе:</p>
                
                <div style="background: rgba(0,0,0,0.3); padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <p><strong>ВХОДНЫЕ ДАННЫЕ (спросить у пользователя):</strong></p>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 15px 0;">
                        <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px;">
                            <h4>👑 Ранг:</h4>
                            <p>Число от 1 до 3</p>
                            <ul style="margin-left: 20px; font-size: 14px;">
                                <li>1 - Новичок</li>
                                <li>2 - Опытный</li>
                                <li>3 - Админ</li>
                            </ul>
                        </div>
                        
                        <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px;">
                            <h4>⏰ Время суток:</h4>
                            <p>Строка</p>
                            <ul style="margin-left: 20px; font-size: 14px;">
                                <li>"день" - с 8:00 до 20:00</li>
                                <li>"ночь" - с 20:00 до 8:00</li>
                            </ul>
                        </div>
                        
                        <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; grid-column: span 2;">
                            <h4>🔑 Особый доступ:</h4>
                            <p>Строка "да" или "нет"</p>
                            <p style="font-size: 14px; margin-top: 5px;">Есть ли у человека специальное разрешение</p>
                        </div>
                    </div>
                </div>
                
                <div style="background: rgba(0,0,0,0.3); padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <p><strong>ПРАВИЛА ДОСТУПА (проверяются по порядку!):</strong></p>
                    
                    <div style="margin-top: 20px;">
                        <div class="access-rule">
                            <h4>1. <span class="access-badge access-full">Полный доступ</span></h4>
                            <p>Выводится <code>"full"</code> если:</p>
                            <p style="margin-left: 20px; margin-top: 10px;">
                                • Человек является <strong>админом</strong> (ранг = 3)<br>
                                <strong>ИЛИ</strong><br>
                                • Человек <strong>опытный</strong> (ранг = 2) <strong>И</strong> имеет <strong>особый доступ</strong>
                            </p>
                        </div>
                        
                        <div class="access-rule" style="margin-top: 25px;">
                            <h4>2. <span class="access-badge access-limited">Ограниченный доступ</span></h4>
                            <p>Выводится <code>"limited"</code> если:</p>
                            <p style="margin-left: 20px; margin-top: 10px;">
                                • Человек <strong>опытный</strong> (ранг = 2)<br>
                                <strong>И</strong> сейчас <strong>день</strong><br>
                                <strong>И</strong> <strong>нет</strong> особого доступа
                            </p>
                        </div>
                        
                        <div class="access-rule" style="margin-top: 25px;">
                            <h4>3. <span class="access-badge access-emergency">Экстренный доступ</span></h4>
                            <p>Выводится <code>"emergency"</code> если:</p>
                            <p style="margin-left: 20px; margin-top: 10px;">
                                • Сейчас <strong>ночь</strong><br>
                                <strong>И</strong> есть <strong>особый доступ</strong>
                            </p>
                        </div>
                        
                        <div class="access-rule" style="margin-top: 25px;">
                            <h4>4. <span class="access-badge access-denied">Нет доступа</span></h4>
                            <p>Выводится <code>"denied"</code> если:</p>
                            <p style="margin-left: 20px; margin-top: 10px;">
                                • Ни одно из условий выше не подошло
                            </p>
                        </div>
                    </div>
                    
                    <div style="background: rgba(255, 158, 0, 0.1); padding: 15px; border-radius: 5px; margin-top: 25px; border-left: 3px solid var(--warning);">
                        <p><strong>💡 Важно запомнить:</strong></p>
                        <p>• Программа проверяет условия <strong>по порядку сверху вниз</strong></p>
                        <p>• Как только одно условие сработало - остальные не проверяются</p>
                        <p>• Используй <code>if-elif-elif-else</code> для такой логики</p>
                    </div>
                </div>
            </div>
            
            <div class="code-editor">
                <div class="code-header">
                    <div class="code-title">security.py</div>
                    <div style="color: #6e7681; font-size: 14px;">Python</div>
                </div>
                <div class="code-content">
                    <div class="line">
                        <span class="line-number">1</span>
                        <span class="code-comment"># Уровень 4: Система безопасности</span>
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
                        <span class="code-comment"># 1. Спроси ранг (1, 2 или 3)</span>
                    </div>
                    <div class="line">
                        <span class="line-number">5</span>
                        <span class="code-comment"># 2. Спроси время суток ('день' или 'ночь')</span>
                    </div>
                    <div class="line">
                        <span class="line-number">6</span>
                        <span class="code-comment"># 3. Спроси особый доступ ('да' или 'нет')</span>
                    </div>
                    <div class="line">
                        <span class="line-number">7</span>
                        <span class="code-comment"># 4. Используй if-elif-elif-else для проверки</span>
                    </div>
                    <div class="line">
                        <span class="line-number">8</span>
                        <span class="code-comment"># 5. Выведи 'full', 'limited', 'emergency' или 'denied'</span>
                    </div>
                </div>
            </div>
            
            <!-- Блок проверки -->
            <div style="background: rgba(255,255,255,0.05); padding: 25px; border-radius: 10px; margin: 25px 0; border: 2px solid var(--primary);">
                <h3 style="margin-bottom: 20px;">✅ ПРОВЕРЬ ПОНИМАНИЕ</h3>
                
                <p><strong>Запусти свою программу и введи:</strong></p>
                <div style="background: #1a1a1a; padding: 15px; border-radius: 5px; margin: 15px 0; font-family: 'Courier New', monospace; text-align: center;">
                    <p>Ранг: <span style="color: var(--accent)">2</span></p>
                    <p>Время суток: <span style="color: var(--accent)">ночь</span></p>
                    <p>Особый доступ: <span style="color: var(--accent)">да</span></p>
                </div>
                
                <p><strong>Что выведет программа?</strong></p>
                <p style="font-size: 14px; opacity: 0.8; margin-bottom: 15px;">(Введи full, limited, emergency или denied)</p>
                
                <div style="display: flex; gap: 15px; margin-top: 15px; align-items: center; justify-content: center;">
                    <select 
                        id="answerInput4"
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
                        <option value="">Выбери ответ</option>
                        <option value="full">full (полный)</option>
                        <option value="limited">limited (ограниченный)</option>
                        <option value="emergency">emergency (экстренный)</option>
                        <option value="denied">denied (нет доступа)</option>
                    </select>
                    <button class="btn btn-primary check-btn-level4" onclick="checkAnswerLevel4()" style="min-width: 150px;">
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
            
<div class="hint-container" id="hintContainer4" style="display: none;">
    <h3 style="color: var(--warning); display: flex; align-items: center; gap: 10px;">
        <span>🟡</span> ПОДСКАЗКА (уровень зачтётся на 50%)
    </h3>
    
    <p><strong>Структура решения с пропусками:</strong></p>
    <div style="background: #2d2d2d; padding: 15px; border-radius: 5px; margin: 15px 0; font-family: 'Courier New', monospace; font-size: 14px; line-height: 1.6;">
<pre style="margin: 0; color: #d4d4d4;">
<span style="color: #6a9955;"># Структура кода:</span>
<span style="color: #d4d4d4;">if ____________________:</span>
<span style="color: #d4d4d4;">    print(</span><span style="color: #ce9178;">"full"</span><span style="color: #d4d4d4;">)</span>
<span style="color: #d4d4d4;">elif ____________________:</span>
<span style="color: #d4d4d4;">    print(</span><span style="color: #ce9178;">"limited"</span><span style="color: #d4d4d4;">)</span>
<span style="color: #d4d4d4;">elif ____________________:</span>
<span style="color: #d4d4d4;">    print(</span><span style="color: #ce9178;">"emergency"</span><span style="color: #d4d4d4;">)</span>
<span style="color: #d4d4d4;">else:</span>
<span style="color: #d4d4d4;">    print(</span><span style="color: #ce9178;">"denied"</span><span style="color: #d4d4d4;">)</span>
</pre>
    </div>
    
    <p><strong>Что должно быть в пропусках:</strong></p>
    
    <div style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px; margin: 15px 0;">
        <p><strong>Первое условие (для "full"):</strong></p>
        <div style="background: #2d2d2d; padding: 10px; border-radius: 5px; margin: 10px 0; font-family: 'Courier New', monospace;">
            <span style="color: #9cdcfe;">ранг</span> == <span style="color: #b5cea8;">3</span> <span style="color: #569cd6;">or</span> (<span style="color: #9cdcfe;">ранг</span> == <span style="color: #b5cea8;">2</span> <span style="color: #569cd6;">and</span> <span style="color: #9cdcfe;">доступ</span> == <span style="color: #ce9178;">"да"</span>)
        </div>
        <p style="font-size: 14px; margin-top: 5px;">Это значит: "админ ИЛИ (опытный И имеет доступ)"</p>
        

    </div>
    
    <p><strong>Как думать:</strong></p>
    <p>1. Посмотри на данные: ранг=2, время=ночь, доступ=да</p>
    <p>2. Проверь первое условие: подходит ли для полного доступа?</p>
    <p>3. Если нет - проверь второе условие</p>
    <p>4. Если нет - проверь третье условие</p>
    <p>5. Если ничего не подошло - выведи "denied"</p>
</div>
            
            <div style="margin-top: 40px;">
                <div class="action-buttons">
                    <button class="btn btn-secondary" onclick="toggleHintLevel4()" style="background: rgba(255,158,0,0.2); border-color: var(--warning);">
                        <span>🟡</span> Подсказка
                    </button>
                    <button class="btn btn-secondary" onclick="loadLevel(3)" style="margin-left: 10px;">
                        <span>⬅️</span> Уровень 3
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
}

// Экспорт функций
window.initLevel4 = initLevel4;
window.toggleHintLevel4 = toggleHintLevel4;
window.checkAnswerLevel4 = checkAnswerLevel4;
window.getLevel4HTML = getLevel4HTML;