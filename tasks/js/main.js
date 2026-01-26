// main.js
// Основные функции приложения - 7 УРОВНЕЙ + ФИНАЛ

console.log('✅ main.js загружен');

// Очередь модальных окон
let modalQueue = [];
let isModalOpen = false;

// Флаг защиты кода
let codeProtectionEnabled = true;

function loadLevel(levelNumber) {
    console.log(`Загрузка уровня ${levelNumber}...`);
    const container = document.getElementById('level-container');
    
    if (!container) {
        console.error('Контейнер не найден!');
        return;
    }
    
    // Показываем загрузку
    container.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>Загружаем уровень ${levelNumber}...</p>
        </div>
    `;
    
    // Обновляем прогресс бар
    if (typeof updateProgressBar === 'function') {
        updateProgressBar(levelNumber);
    }
    
    // Небольшая задержка для анимации
    setTimeout(() => {
        loadLevelContent(levelNumber, container);
    }, 300);
}

function loadLevelContent(levelNumber, container) {
    console.log(`=== ЗАГРУЗКА УРОВНЯ ${levelNumber} ===`);
    
    let levelHtml = '';
    let initFunction = null;
    
    // 7 УРОВНЕЙ + ФИНАЛ
    switch(levelNumber) {
        case 1:
            console.log('Уровень 1: getLevel1HTML -', typeof window.getLevel1HTML);
            
            if (window.getLevel1HTML && typeof window.getLevel1HTML === 'function') {
                try {
                    levelHtml = window.getLevel1HTML();
                    console.log('✅ getLevel1HTML выполнена успешно');
                } catch (error) {
                    console.error('❌ Ошибка в getLevel1HTML:', error);
                    levelHtml = getFallbackHTML(1);
                }
            } else {
                console.error('❌ getLevel1HTML не найдена');
                levelHtml = getFallbackHTML(1);
            }
            initFunction = window.initLevel;
            break;
            
        case 2:
            console.log('Уровень 2: getLevel2HTML -', typeof window.getLevel2HTML);
            
            if (window.getLevel2HTML && typeof window.getLevel2HTML === 'function') {
                try {
                    levelHtml = window.getLevel2HTML();
                    console.log('✅ getLevel2HTML выполнена успешно');
                } catch (error) {
                    console.error('❌ Ошибка в getLevel2HTML:', error);
                    levelHtml = getFallbackHTML(2);
                }
            } else {
                console.error('❌ getLevel2HTML не найдена');
                levelHtml = getFallbackHTML(2);
            }
            initFunction = window.initLevel2;
            break;
            
        case 3:
            console.log('Уровень 3: getLevel3HTML -', typeof window.getLevel3HTML);
            
            if (window.getLevel3HTML && typeof window.getLevel3HTML === 'function') {
                try {
                    levelHtml = window.getLevel3HTML();
                    console.log('✅ getLevel3HTML выполнена успешно');
                } catch (error) {
                    console.error('❌ Ошибка в getLevel3HTML:', error);
                    levelHtml = getFallbackHTML(3);
                }
            } else {
                console.error('❌ getLevel3HTML не найдена');
                levelHtml = getFallbackHTML(3);
            }
            initFunction = window.initLevel3;
            break;
            
        case 4:
            console.log('Уровень 4: getLevel4HTML -', typeof window.getLevel4HTML);
            
            if (window.getLevel4HTML && typeof window.getLevel4HTML === 'function') {
                try {
                    levelHtml = window.getLevel4HTML();
                    console.log('✅ getLevel4HTML выполнена успешно');
                } catch (error) {
                    console.error('❌ Ошибка в getLevel4HTML:', error);
                    levelHtml = getFallbackHTML(4);
                }
            } else {
                console.error('❌ getLevel4HTML не найдена');
                levelHtml = getFallbackHTML(4);
            }
            initFunction = window.initLevel4;
            break;
            
        case 5:
            console.log('Уровень 5: getLevel5HTML -', typeof window.getLevel5HTML);
            
            if (window.getLevel5HTML && typeof window.getLevel5HTML === 'function') {
                try {
                    levelHtml = window.getLevel5HTML();
                    console.log('✅ getLevel5HTML выполнена успешно');
                } catch (error) {
                    console.error('❌ Ошибка в getLevel5HTML:', error);
                    levelHtml = getFallbackHTML(5);
                }
            } else {
                console.error('❌ getLevel5HTML не найдена');
                levelHtml = getFallbackHTML(5);
            }
            initFunction = window.initLevel5;
            break;
            
        case 6:
            console.log('Уровень 6: getLevel6HTML -', typeof window.getLevel6HTML);
            
            if (window.getLevel6HTML && typeof window.getLevel6HTML === 'function') {
                try {
                    levelHtml = window.getLevel6HTML();
                    console.log('✅ getLevel6HTML выполнена успешно');
                } catch (error) {
                    console.error('❌ Ошибка в getLevel6HTML:', error);
                    levelHtml = getFallbackHTML(6);
                }
            } else {
                console.error('❌ getLevel6HTML не найдена');
                levelHtml = getFallbackHTML(6);
            }
            initFunction = window.initLevel6;
            break;
            
        case 7:
            console.log('Уровень 7: getLevel7HTML -', typeof window.getLevel7HTML);
            
            if (window.getLevel7HTML && typeof window.getLevel7HTML === 'function') {
                try {
                    levelHtml = window.getLevel7HTML();
                    console.log('✅ getLevel7HTML выполнена успешно');
                } catch (error) {
                    console.error('❌ Ошибка в getLevel7HTML:', error);
                    levelHtml = getFallbackHTML(7);
                }
            } else {
                console.error('❌ getLevel7HTML не найдена');
                levelHtml = getFallbackHTML(7);
            }
            initFunction = window.initLevel7;
            break;
            
        case 8:
            // ФИНАЛЬНЫЙ ЭКРАН
            console.log('=== ФИНАЛЬНЫЙ ЭКРАН ===');
            levelHtml = `
            <div class="level-container">
                <!-- Левая панель - простое поздравление -->
                <div class="panel story-panel" style="text-align: center; display: flex; flex-direction: column; justify-content: center;">
                    <div style="margin-bottom: 30px;">
                        <div style="font-size: 80px; margin: 20px 0;">🤖✨</div>
                        <h1 style="color: var(--primary); margin-bottom: 15px;">Молодец!</h1>
                        <p style="font-size: 18px; line-height: 1.6;">
                            Ты прошёл все 7 уровней<br>
                            и помог роботу Питону.
                        </p>
                    </div>
                    
                    <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 15px; margin: 20px 0;">
                        <p style="font-size: 16px; line-height: 1.6;">
                            <strong>Робот говорит:</strong><br>
                            "Спасибо! Теперь я в порядке.<br>
                            Ты многому научился -<br>
                            продолжай программировать!"
                        </p>
                    </div>
                    
                    <div style="margin-top: 30px;">
                        <button class="btn btn-primary" onclick="loadLevel(1)" style="padding: 15px 30px; font-size: 18px; width: 100%;">
                            <span>🔄</span> Начать сначала
                        </button>
                    </div>
                </div>
                
                <!-- Правая панель - краткие итоги -->
                <div class="panel task-panel">
                    <h2 style="color: var(--accent); margin-bottom: 25px; text-align: center;">Что ты изучил</h2>
                    
                    <!-- Список тем -->
                    <div style="background: rgba(255,255,255,0.03); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                        <h3 style="color: var(--light); margin-bottom: 15px;">🎯 Темы курса</h3>
                        
                        <div style="display: flex; flex-direction: column; gap: 10px;">
                            <div style="display: flex; align-items: center; gap: 10px; padding: 8px 0;">
                                <div style="color: var(--success); font-size: 20px;">✓</div>
                                <div>Переменные и вывод данных</div>
                            </div>
                            
                            <div style="display: flex; align-items: center; gap: 10px; padding: 8px 0;">
                                <div style="color: var(--success); font-size: 20px;">✓</div>
                                <div>Математические операции</div>
                            </div>
                            
                            <div style="display: flex; align-items: center; gap: 10px; padding: 8px 0;">
                                <div style="color: var(--success); font-size: 20px;">✓</div>
                                <div>Условия if/else</div>
                            </div>
                            
                            <div style="display: flex; align-items: center; gap: 10px; padding: 8px 0;">
                                <div style="color: var(--success); font-size: 20px;">✓</div>
                                <div>Сложные условия (and/or)</div>
                            </div>
                            
                            <div style="display: flex; align-items: center; gap: 10px; padding: 8px 0;">
                                <div style="color: var(--success); font-size: 20px;">✓</div>
                                <div>Циклы for</div>
                            </div>
                            
                            <div style="display: flex; align-items: center; gap: 10px; padding: 8px 0;">
                                <div style="color: var(--success); font-size: 20px;">✓</div>
                                <div>Циклы с условиями</div>
                            </div>
                            
                            <div style="display: flex; align-items: center; gap: 10px; padding: 8px 0;">
                                <div style="color: var(--success); font-size: 20px;">✓</div>
                                <div>Случайные числа</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Простая статистика -->
                    <div style="background: rgba(0,180,216,0.05); padding: 15px; border-radius: 10px; margin-bottom: 20px;">
                        <h3 style="color: var(--primary); margin-bottom: 10px;">📈 Итоги</h3>
                        <p style="margin: 5px 0;">✓ 7 уровней пройдено</p>
                        <p style="margin: 5px 0;">✓ Основы Python освоены</p>
                        <p style="margin: 5px 0;">✓ Робот спасён</p>
                    </div>
                    
                    <!-- Что дальше -->
                    <div style="background: rgba(157, 78, 221, 0.05); padding: 15px; border-radius: 10px;">
                        <h3 style="color: var(--accent2); margin-bottom: 10px;">🚀 Дальше?</h3>
                        <p style="margin: 5px 0; font-size: 14px;">
                            Попробуй создать свой проект:<br>
                            • Простую игру<br>
                            • Калькулятор<br>
                            • Бота для чата
                        </p>
                    </div>
                    
                    <!-- Кнопка статистики -->
                    <div style="margin-top: 30px; text-align: center;">
                        <button class="btn btn-secondary" onclick="showProgressStats()" style="padding: 12px 25px;">
                            <span>📊</span> Посмотреть статистику
                        </button>
                    </div>
                </div>
            </div>`;
            break;
        
        default:
            console.log('Неизвестный уровень:', levelNumber);
            levelHtml = getFallbackHTML(Math.min(levelNumber, 8));
    }
    
    console.log(`Уровень ${levelNumber}: HTML готов (${levelHtml.length} символов)`);
    
    if (levelHtml) {
        container.innerHTML = levelHtml;
        console.log(`✅ Уровень ${levelNumber} загружен в контейнер`);
        
        // ВАЖНО: Добавляем задержку перед защитой кода
        setTimeout(() => {
            // Запускаем инициализацию уровня
            if (initFunction && typeof initFunction === 'function') {
                console.log(`Запускаем initLevel${levelNumber}...`);
                try {
                    initFunction();
                    console.log(`✅ initLevel${levelNumber} выполнен успешно`);
                } catch (error) {
                    console.error(`❌ Ошибка в initLevel${levelNumber}:`, error);
                }
            }
            
            // Активируем защиту примеров кода в ЛЕВОЙ панели
            setTimeout(() => {
                if (typeof protectCodeExamples === 'function') {
                    console.log('🛡️ Активируем защиту примеров кода в левой панели...');
                    protectCodeExamples();
                }
            }, 200);
        }, 50);
        
        playSound('click');
    } else {
        console.error(`❌ Не удалось получить HTML для уровня ${levelNumber}`);
        container.innerHTML = `
            <div class="error">
                <h2>Ошибка загрузки уровня ${levelNumber}</h2>
                <p>Не удалось загрузить контент уровня.</p>
                <button class="btn btn-primary" onclick="loadLevel(1)">
                    Вернуться к первому уровню
                </button>
            </div>
        `;
    }
}

// Функции для защиты от копирования
function preventCopy(e) {
    e.preventDefault();
    showMessage('🔒 Защита кода', 
        'Копирование примеров кода отключено для лучшего обучения!<br><br>' +
        '<strong>Почему это важно:</strong><br>' +
        '• Написание кода вручную лучше запоминается<br>' +
        '• Ты учишься находить и исправлять ошибки<br>' +
        '• Развивается мышечная память<br><br>' +
        'Просто напиши код самостоятельно - так ты научишься быстрее!', 
        'warning');
    return false;
}

function preventSelect(e) {
    e.preventDefault();
    return false;
}

function getFallbackHTML(levelNumber) {
    return `
    <div class="level-container">
        <div class="panel">
            <h1>Уровень ${levelNumber}</h1>
            <p>Это уровень ${levelNumber}.</p>
            <div style="margin: 20px 0;">
                ${levelNumber < 8 ? 
                    `<button class="btn btn-primary" onclick="loadLevel(${levelNumber + 1})">
                        Перейти к уровню ${levelNumber + 1}
                    </button>` : 
                    '<p>Это финальный уровень</p>'
                }
            </div>
            ${levelNumber > 1 ? 
                `<button class="btn btn-secondary" onclick="loadLevel(${levelNumber - 1})">
                    Назад к уровню ${levelNumber - 1}
                </button>` : ''
            }
        </div>
    </div>
    `;
}

// Получение HTML уровня
function getLevelHTML(levelNumber) {
    switch(levelNumber) {
        case 1: return window.getLevel1HTML ? window.getLevel1HTML() : getFallbackHTML(1);
        case 2: return window.getLevel2HTML ? window.getLevel2HTML() : getFallbackHTML(2);
        case 3: return window.getLevel3HTML ? window.getLevel3HTML() : getFallbackHTML(3);
        case 4: return window.getLevel4HTML ? window.getLevel4HTML() : getFallbackHTML(4);
        case 5: return window.getLevel5HTML ? window.getLevel5HTML() : getFallbackHTML(5);
        case 6: return window.getLevel6HTML ? window.getLevel6HTML() : getFallbackHTML(6);
        case 7: return window.getLevel7HTML ? window.getLevel7HTML() : getFallbackHTML(7);
        default: return getFallbackHTML(levelNumber);
    }
}

// Управление звуком
function playSound(soundName) {
    const sound = document.getElementById(`sound-${soundName}`);
    if (sound) {
        try {
            sound.currentTime = 0;
            sound.play().catch(e => console.log('Звуки не настроены:', e));
        } catch (e) {
            console.log('Ошибка воспроизведения звука:', e);
        }
    }
}

// Показ сообщений с очередью
function showMessage(title, text, type = 'info') {
    console.log(`Добавляем в очередь: ${title}`);
    
    // Добавляем сообщение в очередь
    modalQueue.push({
        title,
        text,
        type
    });
    
    // Если модальное окно закрыто, показываем следующее
    if (!isModalOpen) {
        showNextMessage();
    }
}

// Показать следующее сообщение из очереди
function showNextMessage() {
    if (modalQueue.length === 0) {
        isModalOpen = false;
        return;
    }
    
    const nextMessage = modalQueue.shift();
    isModalOpen = true;
    
    const modal = document.getElementById('modal');
    const modalText = document.getElementById('modal-text');
    
    if (!modal || !modalText) {
        console.error('Модальное окно не найдено!');
        isModalOpen = false;
        return;
    }
    
    const icon = {
        info: 'ℹ️',
        success: '✅',
        warning: '⚠️',
        error: '❌'
    }[nextMessage.type];
    
    modalText.innerHTML = `
        <h2>${icon} ${nextMessage.title}</h2>
        <div style="margin: 20px 0; line-height: 1.6;">${nextMessage.text}</div>
        <div style="text-align: center; margin-top: 30px;">
            <button class="btn btn-primary" onclick="closeModalAndShowNext()" style="padding: 12px 30px;">
                Закрыть
            </button>
        </div>
    `;
    
    modal.style.display = 'flex';
    playSound(nextMessage.type === 'error' ? 'error' : 'click');
}

// Закрытие модального окна с показом следующего
function closeModalAndShowNext() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.style.display = 'none';
        playSound('click');
        // Показываем следующее сообщение из очереди
        setTimeout(() => showNextMessage(), 300);
    }
}

// Закрытие модального окна
function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.style.display = 'none';
        playSound('click');
        isModalOpen = false;
    }
}

// Сохранение прогресса
function saveProgress(level, data = {}) {
    try {
        const progress = JSON.parse(localStorage.getItem('codeQuestProgress') || '{}');
        progress[`level${level}`] = {
            completed: true,
            completedAt: new Date().toISOString(),
            ...data
        };
        localStorage.setItem('codeQuestProgress', JSON.stringify(progress));
        
        // Обновляем прогресс бар
        if (typeof updateProgressBar === 'function') {
            updateProgressBar(level);
        }
        
        // Показываем достижение (добавляется в очередь)
        showAchievement(level);
    } catch (e) {
        console.error('Ошибка сохранения прогресса:', e);
    }
}

// Показать достижение
function showAchievement(level) {
    const achievements = {
        1: { title: 'Первый код!', desc: 'Ты создал свою первую переменную', emoji: '👨‍💻' },
        2: { title: 'Математик', desc: 'Решил все вычисления', emoji: '🧮' },
        3: { title: 'Логик', desc: 'Освоил условия if/else', emoji: '🎯' },
        4: { title: 'Программист', desc: 'Победил сложные условия!', emoji: '🚀' },
        5: { title: 'Автоматизатор', desc: 'Освоил мощь циклов!', emoji: '🔄' },
        6: { title: 'Аналитик', desc: 'Совместил циклы и условия!', emoji: '🔍' },
        7: { title: 'Генератор', desc: 'Освоил случайные числа!', emoji: '🎲' },
        8: { title: 'Спасатель', desc: 'Полностью восстановил робота!', emoji: '🏆' }
    };
    
    const achievement = achievements[level];
    if (achievement) {
        showMessage('🎉 ДОСТИЖЕНИЕ!', `
            <div style="text-align: center;">
                <div style="font-size: 80px; margin: 20px 0;">${achievement.emoji}</div>
                <h3 style="color: var(--accent);">${achievement.title}</h3>
                <p>${achievement.desc}</p>
            </div>
        `, 'success');
    }
}

// Переход к следующему уровню
function goToNextLevel(currentLevel) {
    console.log(`Переход с уровня ${currentLevel} на следующий`);
    
    if (currentLevel < 8) { // 8 - это финальный экран
        // Сохраняем прогресс текущего уровня если ещё не сохранён
        try {
            const progress = JSON.parse(localStorage.getItem('codeQuestProgress') || '{}');
            if (!progress[`level${currentLevel}`]) {
                saveProgress(currentLevel, { autoSaved: true });
            }
        } catch (e) {
            console.error('Ошибка сохранения:', e);
        }
        
        loadLevel(currentLevel + 1);
    } else {
        // Финальный уровень
        saveProgress(8);  // Сохраняем уровень 8 как финальный
        loadLevel(8);     // Загружаем финальный экран
    }
}

// ЕДИНАЯ ФУНКЦИЯ ДЛЯ СОЗДАНИЯ КНОПКИ СЛЕДУЮЩЕГО УРОВНЯ
function createNextLevelButton(currentLevel, usedHint = false) {
    // Удаляем старую кнопку если есть
    const oldButtons = document.querySelectorAll('.next-level-btn-container');
    oldButtons.forEach(button => button.remove());
    
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'next-level-btn-container';
    buttonContainer.style.cssText = `
        margin-top: 30px;
        text-align: center;
        animation: fadeIn 0.8s ease;
    `;
    
    const nextButton = document.createElement('button');
    nextButton.className = 'btn btn-primary';
    
    // Определяем стиль в зависимости от уровня и наличия подсказки
    let buttonText = '';
    let buttonStyle = '';
    let nextLevelNumber = currentLevel + 1;
    
    switch(currentLevel) {
        case 1:
            buttonText = '🎮 Уровень 2 ➡️';
            break;
        case 2:
            buttonText = '🎮 Уровень 3 ➡️';
            break;
        case 3:
            buttonText = '🎮 Уровень 4 ➡️';
            break;
        case 4:
            buttonText = '🎮 Уровень 5 ➡️';
            break;
        case 5:
            buttonText = '🎮 Уровень 6 ➡️';
            break;
        case 6:
            buttonText = '🎮 Уровень 7 ➡️';
            break;
        case 7:
            buttonText = '🏆 Финальный экран ➡️';
            nextLevelNumber = 8; // Финальный экран
            break;
        default:
            buttonText = 'Следующий уровень ➡️';
    }
    
    // Настраиваем стиль
    if (usedHint) {
        // Жёлтый стиль для уровней с подсказкой
        buttonStyle = `
            padding: 20px 40px;
            font-size: 24px;
            background: linear-gradient(135deg, var(--warning), #ff8c00);
            border: 3px solid var(--light);
            box-shadow: 0 0 30px rgba(255, 158, 0, 0.5);
            animation: pulseGlowYellow 2s infinite;
        `;
        // Если использована подсказка, добавляем жёлтый значок
        buttonText = buttonText.replace('🎮', '🟡');
    } else {
        // Зелёный/фиолетовый стиль для полного прохождения
        buttonStyle = `
            padding: 20px 40px;
            font-size: 24px;
            background: linear-gradient(135deg, var(--accent2), #7b2cbf);
            border: 3px solid var(--light);
            box-shadow: 0 0 30px rgba(157, 78, 221, 0.5);
            animation: pulseGlow 2s infinite;
        `;
    }
    
    nextButton.style.cssText = buttonStyle;
    nextButton.innerHTML = buttonText;
    
    // Назначаем обработчик клика
    nextButton.onclick = function() {
        playSound('click');
        goToNextLevel(currentLevel);
    };
    
    buttonContainer.appendChild(nextButton);
    
    // Ищем место для вставки
    const taskPanel = document.querySelector('.panel.task-panel');
    if (taskPanel) {
        // Пытаемся найти контейнер с кнопками действий
        const actionButtons = taskPanel.querySelector('.action-buttons');
        if (actionButtons) {
            // Вставляем после кнопок действий
            actionButtons.parentNode.insertBefore(buttonContainer, actionButtons.nextSibling);
        } else {
            // Или просто в конец панели
            taskPanel.appendChild(buttonContainer);
        }
    }
    
    return buttonContainer;
}

// Функция для включения/выключения защиты кода
function toggleCodeProtection(enabled) {
    codeProtectionEnabled = enabled;
    if (enabled) {
        console.log('🛡️ Защита кода включена');
        // Повторно активируем защиту
        if (typeof protectCodeExamples === 'function') {
            protectCodeExamples();
        }
    } else {
        console.log('🔓 Защита кода отключена');
        // Убираем обработчики
        const codeBlocks = document.querySelectorAll('.code-editor, .code-content, .code-example');
        codeBlocks.forEach(block => {
            block.style.userSelect = 'auto';
            block.style.webkitUserSelect = 'auto';
            block.removeEventListener('copy', preventCopy);
            block.removeEventListener('cut', preventCopy);
            block.removeEventListener('selectstart', preventSelect);
        });
    }
}

// Инициализация модального окна
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM загружен');
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close-modal');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModalAndShowNext);
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModalAndShowNext();
            }
        });
    }
});

// Экспорт функций
window.loadLevel = loadLevel;
window.playSound = playSound;
window.showMessage = showMessage;
window.closeModal = closeModal;
window.closeModalAndShowNext = closeModalAndShowNext;
window.saveProgress = saveProgress;
window.goToNextLevel = goToNextLevel;
window.getLevelHTML = getLevelHTML;
window.createNextLevelButton = createNextLevelButton;
window.toggleCodeProtection = toggleCodeProtection;
window.preventCopy = preventCopy;
window.preventSelect = preventSelect;

console.log('✅ Все функции main.js экспортированы');