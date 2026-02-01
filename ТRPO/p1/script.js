// Глобальные переменные
let currentLevel = 0;
let correctAnswers = 0;
let currentPasswordInput = [];
let passwordAttempts = 0;
const MAX_ATTEMPTS = 3;
let activeLevel = null;
let health = 100;

// Декодирование Base64
function decodeBase64(encoded) {
    try {
        return JSON.parse(atob(encoded));
    } catch (e) {
        console.error('Ошибка декодирования:', e);
        return null;
    }
}

// Уровни (только пароли и правильные ответы закодированы)
const levels = [
    {
        title: "Этап 1: Анализ требований",
        situation: "Заказчик: «Мне нужно приложение, как у Uber, но для кошек».<br><br>Что спросить в первую очередь?",
        options: [
            "Кто будет пользоваться? Что именно они должны делать?",
            "Бюджет и сроки проекта",
            "Хотите ли вы анимацию при запуске?"
        ],
        correctAnswerEncoded: "MA==",
        passwordEncoded: "WzEsMywyXQ=="
    },
    {
        title: "Этап 2: Работа в команде",
        situation: "В проекте участвуют: программист, дизайнер, тестировщик, менеджер.\n\nКто отвечает за то, чтобы функция «бронирование» работала так, как хочет клиент?",
        options: [
          "Программист",
          "Менеджер / Бизнес-аналитик",
          "Тестировщик"
        ],
        correctAnswerEncoded: "MQ==",
        passwordEncoded: "WzIsNCwxLDNd"
    },
    {
      title: "Этап 3: Проектирование архитектуры",
      situation: "Нужно хранить данные о пользователях, заказах и отзывах.\n\nКак лучше организовать?",
      options: [
        "Всё в одном файле Excel",
        "Отдельные таблицы в базе данных с связями",
        "Каждый раз спрашивать у пользователя заново"
      ],
        correctAnswerEncoded: "MQ==",
        passwordEncoded: "WzMsMSw0XQ=="
    },
    {
      title: "Этап 4: Документация кода",
      situation: "Какой комментарий действительно помогает?",
      options: [
        "// делаем что-то",
        "// TODO: fix this later",
        "// проверяем, не истёк ли срок действия токена (RFC 7519)"
      ],
        correctAnswerEncoded: "Mg==",
        passwordEncoded: "WzQsMiwxXQ=="
        
    },
    {
        title: "Этап 5: Релиз без паники",
        situation: "Вы исправили баг в приложении. Как безопасно выпустить обновление?",
        options: [
          "Залить новый код прямо на главный сервер ночью",
          "Сначала протестировать на staging-среде, затем обновить для 10% пользователей (canary release), потом для всех",
          "Отправить пользователям архив с новым .exe и пусть сами обновят"
        ],
        correctAnswerEncoded: "MQ==",
        passwordEncoded: "WzEsNCwyLDNd"
        
    },
    {
        title: "Этап 6: Тестирование",
        situation: "У вас есть функция divide(a, b). Какие тесты ОБЯЗАТЕЛЬНЫ?",
        options: [
          "divide(10, 2) == 5",
          "divide(10, 0) → ошибка",
          "Оба варианта"
        ],
        correctAnswerEncoded: "Mg==",
        passwordEncoded: "WzIsMywxXQ=="
        
    },
    {
        title: "Этап 7: Контроль версий",
        situation: "Вы исправили баг, коллега добавил новую фичу. Как не сломать друг друга?",
        options: [
          "Пересылать файлы в WhatsApp",
          "Использовать Git и делать merge",
          "Работать в разных папках"
        ],
        correctAnswerEncoded: "MQ==",
        passwordEncoded: "WzMsMiwxXQ=="
    },
    {
        title: "Этап 8: Код другого — святыня?",
        situation: "Вы видите ужасный, но рабочий код коллеги. Что делать?",
        options: [
          "Молча переписать ночью, когда никто не видит",
          "Обсудить на код-ревью: «Как насчёт рефакторинга? Могу помочь»",
          "Оставить как есть — «не моё дело»"
        ],
        correctAnswerEncoded: "MQ==",
        passwordEncoded: "WzEsMiw0XQ=="
    },
    {
        title: "Этап 9: Документация — мёртвый груз?",
        situation: "«Хороший код самодокументирован». Это правда?",
        options: [
          "Да — комментарии только мешают",
          "Только для open-source проектов",
          "Нет — документация нужна для архитектуры, API и нетривиальных решений"
        ],
        correctAnswerEncoded: "Mg==",
        passwordEncoded: "WzQsMSwzLDJd"
    },
    {
        title: "Этап 10: Поддержка проекта",
        situation: "Приложение выпущено. Пользователи пишут: «Кнопка 'Оплатить' не работает».\n\nЧто делать?",
        options: [
          "Игнорировать — у нас же всё тестировалось!",
          "Собрать логи, воспроизвести баг, выпустить хотфикс",
          "Удалить кнопку"
        ],
        correctAnswerEncoded: "MQ==",
        passwordEncoded: "WzIsMSwzXQ=="
    },
    {
      title: "Этап 11: Логирование",
      situation: "Что логировать в production-приложении?",
      options: [
        "Только ошибки и критические события, без персональных данных",
        "Всё: запросы, ответы, пароли, токены — «вдруг пригодится»",
        "Ничего — «логи только замедляют»"
      ],
        correctAnswerEncoded: "MA==",
        passwordEncoded: "WzMsNCwxLDJd"
    },
    {
        title: "Этап 12: Ответственность",
        situation: "Ваш код вызвал сбой в production, клиент потерял деньги. Что делать?",
        options: [
          "Сказать: «Это баг в библиотеке X»",
          "Удалить свой аккаунт из Git и исчезнуть",
          "Признать проблему, помочь восстановить данные, провести постмортем"
        ],
        correctAnswerEncoded: "Mg==",
        passwordEncoded: "WzEsMywyLDRd"
    },
    {
        title: "Этап 13: Этичный код",
        situation: "Заказчик просит добавить скрытый сбор данных о пользователях (геолокация, контакты) без их ведома. Как поступить?",
        options: [
          "Отказаться и объяснить юридические/этические риски. Предложить прозрачный сбор с согласия",
          "Сделать как просили — это же его приложение",
          "Сделать, но добавить комментарий «// Заказчик заставил»"
        ],
        correctAnswerEncoded: "MA==",
        passwordEncoded: "WzQsMiwxXQ=="
    },
    {
        title: "Этап 14: Легаси-код",
        situation: "Нужно исправить баг в старом модуле без тестов и документации. Что делать в первую очередь?",
        options: [
          "Сразу править код — «и так сойдёт»",
          "Переписать модуль целиком за один день",
          "Написать тесты на текущее поведение, потом вносить изменения",
        ],
        correctAnswerEncoded: "Mg==",
        passwordEncoded: "WzIsMywxXQ=="
    },
    {
      title: "Этап 15: Коммуникация",
      situation: "Дизайнер прислал макет с анимацией, которую технически невозможно реализовать в срок. Что делать?",
      options: [
        "Молча сделать упрощённую версию и надеяться, что не заметят",
        "Сразу обсудить: показать технические ограничения, предложить альтернативу, согласовать компромисс",
        "Написать в чат: «Дизайнеры опять фантазируют»"
      ],
        correctAnswerEncoded: "MQ==",
        passwordEncoded: "WzEsNCwyLDNd"
    }
];

// Запуск игры
function startGame() {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    currentLevel = 0;
    correctAnswers = 0;
    loadLevel(currentLevel);
}

// Загрузка уровня
function loadLevel(levelIndex) {
    const rawLevel = levels[levelIndex];
    activeLevel = {
        ...rawLevel,
        correctAnswer: decodeBase64(rawLevel.correctAnswerEncoded),
        password: decodeBase64(rawLevel.passwordEncoded)
    };
    
    // Обновляем интерфейс
    document.getElementById('level-title-display').textContent = activeLevel.title;
    document.getElementById('current-level-display').textContent = levelIndex + 1;
    document.getElementById('current-level').textContent = levelIndex + 1;
    document.getElementById('situation-text').innerHTML = activeLevel.situation;
    
    // Скрываем ненужные элементы
    document.getElementById('options-container').classList.add('hidden');
    document.getElementById('next-button-container').classList.add('hidden');
    document.getElementById('feedback').classList.add('hidden');
    
    // Настройка пароля
    setupPasswordUI(activeLevel);
    updateHealth(health);
}

// Настройка UI пароля
function setupPasswordUI(level) {
    document.getElementById('password-container').classList.remove('hidden');
    // document.getElementById('password-hint').innerHTML = level.passwordHint;
    document.getElementById('password-error').style.display = 'none';
    
    // Сбрасываем состояние
    currentPasswordInput = [];
    passwordAttempts = 0;
    updatePasswordUI(level);
}

// Обновление визуального состояния пароля
function updatePasswordUI(level) {
    // document.getElementById('password-progress').textContent = `${currentPasswordInput.length}/${level.password.length}`;
    // document.getElementById('password-attempts').textContent = `${passwordAttempts}/${MAX_ATTEMPTS}`;
    
    const digitsContainer = document.getElementById('password-digits');
    digitsContainer.innerHTML = '';
    
    for (let i = 0; i < level.password.length; i++) {
        const digitSpan = document.createElement('span');
        digitSpan.className = 'password-digit';
        digitSpan.textContent = i < currentPasswordInput.length ? currentPasswordInput[i] : '_';
        if (i < currentPasswordInput.length) digitSpan.classList.add('filled');
        digitsContainer.appendChild(digitSpan);
    }
}

// Проверка пароля
function checkPassword() {
    if (!activeLevel) return;
    
    const isCorrect = currentPasswordInput.every(
        (val, idx) => val === activeLevel.password[idx]
    );
    
    if (isCorrect) {
        // Успешно - показываем варианты
        document.getElementById('password-container').classList.add('hidden');
        document.getElementById('options-container').classList.remove('hidden');
        generateOptions(activeLevel);
    } else {
        // Ошибка
        passwordAttempts++;
        showError('❌ Неверная комбинация! Попробуйте снова.');
        
        if (passwordAttempts >= MAX_ATTEMPTS) {
            revealPasswordHint(activeLevel);
        }
        
        setTimeout(() => {
            currentPasswordInput = [];
            if (activeLevel) updatePasswordUI(activeLevel);
            document.getElementById('password-error').style.display = 'none';
        }, 1500);
    }
}

// Генерация вариантов ответов
function generateOptions(level) {
    const container = document.getElementById('options-grid');
    container.innerHTML = '';
    
    level.options.forEach((option, index) => {
        const optionEl = document.createElement('div');
        optionEl.className = 'option-card';
        optionEl.innerHTML = `
            <div class="option-number">${index + 1}</div>
            <div class="option-text">${option}</div>
        `;
        optionEl.onclick = () => selectOption(index, level);
        container.appendChild(optionEl);
    });
}

// Выбор варианта ответа
function selectOption(selectedIndex, level) {
    document.querySelectorAll('.option-card').forEach(el => {
        el.style.pointerEvents = 'none';
        el.classList.add('disabled');
    });
    
    const options = document.querySelectorAll('.option-card');
    options[level.correctAnswer].classList.add('correct');
    
    if (selectedIndex !== level.correctAnswer) {
        options[selectedIndex].classList.add('incorrect');
        health = health - 10;
        updateHealth(health);
    } else {
        correctAnswers++;
    }
    
    showFeedback(selectedIndex === level.correctAnswer, level);
    
    setTimeout(() => {
        document.getElementById('next-button-container').classList.remove('hidden');
    }, 1500);
}

// Показ обратной связи
function showFeedback(isCorrect, level) {
    const feedbackEl = document.getElementById('feedback');
    feedbackEl.className = `feedback-card ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`;
    feedbackEl.style.display = 'block';
    
    if (isCorrect) {
        feedbackEl.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <div class="feedback-title">Правильно!</div>
            <div class="feedback-text"></div>
        `;
    } else {
        feedbackEl.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <div class="feedback-title">Нужно подумать!</div>
            <div class="feedback-text">Правильный ответ: "${level.options[level.correctAnswer]}". В следующий раз у вас получится!</div>
        `;
    }
}

// Обновление здоровья
function updateHealth(value) {
    value = health
    document.getElementById('health-display').textContent = `${value}%`;
    document.getElementById('health').textContent = `${value}%`;
    document.getElementById('progress-bar-fill').style.width = `${value}%`;
    
    const bar = document.getElementById('progress-bar-fill');
    if (value > 70) bar.style.background = 'var(--success)';
    else if (value > 40) bar.style.background = 'var(--warning)';
    else bar.style.background = 'var(--error)';
}

// Показ ошибки пароля
function showError(message) {
    const errorEl = document.getElementById('password-error');
    errorEl.textContent = message;
    errorEl.style.display = 'block';
}

// Подсказка при превышении попыток
function revealPasswordHint(level) {
    
}

// Переход на следующий уровень
function nextLevel() {
    currentLevel++;
    if (currentLevel < levels.length) {
        loadLevel(currentLevel);
    } else {
        showFinalScreen();
    }
}

// Финальный экран
function showFinalScreen() {
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('final-screen').classList.remove('hidden');
    
    const health = parseInt(document.getElementById('health-display').textContent);
    document.getElementById('final-health').textContent = `${health}%`;
    document.getElementById('completed-levels').textContent = levels.length;
    document.getElementById('correct-answers').textContent = correctAnswers;
    
    let resultText = 'Отличная работа!';
    let iconClass = 'fa-trophy';
    
    if (health >= 90 && correctAnswers >= 13) {
        resultText = 'Отлично';
        iconClass = 'fa-crown';
    } else if (health >= 70 && correctAnswers >= 10) {
        resultText = 'Супер';
        iconClass = 'fa-medal';
    } else if (health >= 50 && correctAnswers >= 7) {
        resultText = 'Хорошо';
        iconClass = 'fa-star';
    } else {
        resultText = 'Ну я не верю в такой исход';
        iconClass = 'fa-heartbeat';
    }
    
    document.getElementById('final-text').textContent = resultText;
    document.querySelector('#result-icon i').className = `fas ${iconClass}`;
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    // Кнопка старта
    document.getElementById('start-btn').addEventListener('click', startGame);
    
    // Кнопки пароля (делегирование)
    document.getElementById('game-screen').addEventListener('click', (e) => {
        if (e.target.classList.contains('password-btn')) {
            e.preventDefault();
            if (!activeLevel || document.getElementById('password-container').classList.contains('hidden')) return;
            
            const key = parseInt(e.target.dataset.key);
            if (isNaN(key) || key < 1 || key > 4) return;
            
            currentPasswordInput.push(key);
            updatePasswordUI(activeLevel);
            
            if (currentPasswordInput.length === activeLevel.password.length) {
                checkPassword();
            }
        }
    });
    
    // Клавиатура
    document.addEventListener('keydown', (e) => {
        if (!activeLevel || document.getElementById('password-container').classList.contains('hidden')) return;
        if (e.key >= '1' && e.key <= '4') {
            e.preventDefault();
            const key = parseInt(e.key);
            currentPasswordInput.push(key);
            updatePasswordUI(activeLevel);
            
            if (currentPasswordInput.length === activeLevel.password.length) {
                checkPassword();
            }
        }
    });
    
    // Кнопка "Далее"
    document.getElementById('next-btn').addEventListener('click', nextLevel);
    
    // Кнопка перезапуска
    document.getElementById('restart-btn').addEventListener('click', () => {
        location.reload();
    });
});