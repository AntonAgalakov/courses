// Логика первого уровня

function initLevel() {
    console.log('Уровень 1 инициализирован');
    
    // Если уровень уже пройден, показываем кнопку уровня 2
    const progress = JSON.parse(localStorage.getItem('codeQuestProgress') || '{}');
    if (progress.level1 && progress.level1.completed) {
        showNextLevelButtonLevel1();
    }
}

function toggleHint() {
    const hintContainer = document.getElementById('hintContainer');
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

function completeLevel1() {
    // Анимация успеха
    const robot = document.querySelector('.robot');
    if (robot) {
        robot.classList.add('success-animation');
        robot.style.background = 'linear-gradient(135deg, var(--success), #2d936c)';
    }
    
    // Показываем сообщение
    setTimeout(() => {
        showMessage(
            '🎉 Уровень пройден!',
            'Отлично! Ты создал свою первую переменную!<br><br>' +
            '<strong>Робот говорит:</strong><br>' +
            '"Спасибо! Я получил энергию и теперь могу двигаться!"<br><br>' +
            'Нажми кнопку "Уровень 2" чтобы продолжить.',
            'success'
        );
        
        // Показываем кнопку следующего уровня
        showNextLevelButtonLevel1();
        
    }, 1000);
    
    playSound('success');
}

function showNextLevelButtonLevel1() {
    createNextLevelButton(1);
}

// HTML первого уровня (встроенный, чтобы не было ошибки загрузки)
// В функции getLevel1HTML() обновляем инструкцию:

function getLevel1HTML() {
    return `
    <div class="level-container">
        <!-- Левая панель - история -->
        <div class="panel story-panel">
            <div class="badge badge-level">🎮 Уровень 1: Первый контакт</div>
            
            <div class="robot-container">
                <div class="robot">🤖</div>
            </div>
            
            <h2>Заброшенная лаборатория</h2>
            <p>Ты находишься в темной комнате. В углу мигает слабый красный свет.</p>
            
            <div class="dialogue">
                <div class="typing">
                    *пиип* Привет... меня зовут Питон... Я робот-помощник...
                </div>
                <div style="margin-top: 15px;">
                    Мои системы почти отключились... Батарея на 1%...
                </div>
                <div style="margin-top: 10px; color: var(--accent); font-weight: bold;">
                    Дай мне энергию! Создай переменную "power" со значением 10 и покажи её на экране!
                </div>
            </div>
            
            <h3>🎯 Цель уровня:</h3>
            <ul class="instruction-steps">
                <li>Открой <strong>VS Code</strong> (или другую среду разработки)</li>
                <li>Создай новый файл Python (<code>File → New File</code>)</li>
                <li>Сохрани его как <code>robot.py</code> (<code>Ctrl+S</code>)</li>
                <li>Напиши код из задания справа</li>
                <li>Запусти программу (кнопка <strong>▶️ Run</strong> в правом верхнем углу)</li>
                <li>Если увидишь <code>"Сила робота: 10"</code> - ты справился!</li>
            </ul>
            
        </div>
        
        <!-- Правая панель - задание -->
        <div class="panel task-panel">
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 25px;">
                <div style="font-size: 50px;">💻</div>
                <div>
                    <h2>СОЗДАНИЕ ПЕРЕМЕННОЙ</h2>
                    <p>Твоя первая программа на Python</p>
                </div>
            </div>
            
            <p>В программировании <strong>переменная</strong> — это как коробка с именем, в которую можно положить значение.</p>
            
            <div class="code-editor">
                <div class="code-header">
                    <div class="code-title">robot.py</div>
                    <div style="color: #6e7681; font-size: 14px;">Python</div>
                </div>
                <div class="code-content">
                    <div class="line">
                        <span class="line-number">1</span>
                        <span class="code-comment"># =============================</span>
                    </div>
                    <div class="line">
                        <span class="line-number">2</span>
                        <span class="code-comment"># СПАСЕНИЕ РОБОТА ПИТОНА</span>
                    </div>
                    <div class="line">
                        <span class="line-number">3</span>
                        <span class="code-comment"># Уровень 1: Первый контакт</span>
                    </div>
                    <div class="line">
                        <span class="line-number">4</span>
                        <span class="code-comment"># =============================</span>
                    </div>
                    <div class="line">
                        <span class="line-number">5</span>
                    </div>
                    <div class="line">
                        <span class="line-number">6</span>
                        <span class="code-comment"># Даём энергию роботу</span>
                    </div>
                    <div class="line">
                        <span class="line-number">7</span>
                        <span class="code-var">power</span> = <span class="code-number">10</span>
                    </div>
                    <div class="line">
                        <span class="line-number">8</span>
                    </div>
                    <div class="line">
                        <span class="line-number">9</span>
                        <span class="code-comment"># Показываем силу робота</span>
                    </div>
                    <div class="line">
                        <span class="line-number">10</span>
                        <span class="code-keyword">print</span>(<span class="code-string">"Сила робота:"</span>, <span class="code-var">power</span>)
                    </div>
                    <div class="line">
                        <span class="line-number">11</span>
                    </div>
                    <div class="line">
                        <span class="line-number">12</span>
                        <span class="code-comment"># Запусти эту программу!</span>
                    </div>
                    <div class="line">
                        <span class="line-number">13</span>
                        <span class="code-comment"># Должно появиться: Сила робота: 10</span>
                    </div>
                </div>
            </div>
            
            <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 10px; margin: 20px 0;">
                <h3>📝 Что произойдёт в VS Code:</h3>
                <p>1. В <strong>терминале</strong> (нижняя часть окна) появится результат</p>
                <p>2. Ты увидишь сообщение: <code>Сила робота: 10</code></p>
                <p>3. Если видишь ошибку — проверь, нет ли опечаток в коде</p>
            </div>
            
            <div class="hint-container" id="hintContainer" style="display: none;">
                <h3>💡 Как это работает?</h3>
                <p><strong>1. Создание переменной:</strong></p>
                <p><code>power = 10</code> — это как сказать "пусть power будет равно 10"</p>
                
                <p><strong>2. Вывод на экран:</strong></p>
                <p><code>print("Сила робота:", power)</code> — команда "напечатай"</p>
                <p>• Сначала печатает текст <code>"Сила робота:"</code></p>
                <p>• Затем печатает значение переменной <code>power</code> (то есть 10)</p>
                <p>• Между ними автоматически ставится пробел</p>
                
                <p><strong>Результат в терминале VS Code:</strong> Сила робота: 10</p>
                
                <div style="background: rgba(0,180,216,0.1); padding: 15px; border-radius: 8px; margin-top: 15px;">
                    <p>🎯 <strong>Простая аналогия:</strong></p>
                    <p>Представь, что <code>power</code> — это наклейка на коробке.</p>
                    <p>Коробка (переменная) → Наклейка (имя) → Содержимое (значение)</p>
                </div>
            </div>
            
            <div style="margin-top: 40px;">
                <div class="action-buttons">
                    <button class="btn btn-secondary" onclick="toggleHint()">
                        <span>💡</span> Показать подсказку
                    </button>
                    <button class="btn btn-primary" onclick="completeLevel1()">
                        <span>✅</span> Я выполнил задание!
                    </button>
                </div>
                
                <div style="margin-top: 30px; text-align: center;">
                    <button class="btn btn-secondary" onclick="loadLevel(1)">
                        <span>🔄</span> Начать уровень заново
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
}

// Экспорт функций
window.initLevel = initLevel;
window.toggleHint = toggleHint;
window.completeLevel1 = completeLevel1;
window.getLevel1HTML = getLevel1HTML;