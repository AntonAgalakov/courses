
// JavaScript для урока по спискам (только задачи и теория)

let currentTask = 1;
const totalTasks = 10;
let completedTasks = new Set();

function loadContent(section) {
    const container = document.getElementById('content-container');
    
    if (!container) {
        console.error('Контейнер не найден!');
        return;
    }
    
    container.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>Загружаем урок...</p>
        </div>
    `;
    
    setTimeout(() => {
        if (section === 'main') {
            container.innerHTML = getMainContent();
        } else if (section === 'task') {
            container.innerHTML = getTaskContent(currentTask);
        } else if (section === 'final') {
            container.innerHTML = getFinalContent();
        }
        
        updateProgress();
        playSound('click');
    }, 300);
}

function getMainContent() {
    return `
    <div class="lesson-container">
        <div class="panel main-panel">
            <div class="lesson-header">
                <div class="badge badge-lesson">📋 Урок для начинающих</div>
                <h1>Списки в Python — твой первый шаг</h1>
                ${completedTasks.size > 0 ? `
                <div class="progress-display">
                    Твой прогресс: <strong>${completedTasks.size}/${totalTasks}</strong> заданий
                </div>
                ` : ''}
            </div>
            
            <div class="simple-explanation">
                <div class="explanation-card">
                    <h2>🤔 Что такое список?</h2>
                    <p><strong>Список — это как коробка с несколькими вещами.</strong></p>
                    
                    <div class="analogy">
                        <div class="analogy-item">
                            <div class="analogy-icon">📦</div>
                            <div class="analogy-content">
                                <h4>В жизни:</h4>
                                <p>Список покупок в магазине: "молоко, хлеб, яйца, сыр"</p>
                            </div>
                        </div>
                        <div class="analogy-item">
                            <div class="analogy-icon">💻</div>
                            <div class="analogy-content">
                                <h4>В программировании:</h4>
                                <p><code>products = ["молоко", "хлеб", "яйца", "сыр"]</code></p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="explanation-card">
                    <h2>🎯 Зачем нужны списки?</h2>
                    <p>Без списков программировали бы так:</p>
                    
                    <div class="code-comparison">
                        <div class="bad-way">
                            <h4>❌ Сложно и долго:</h4>
                            <code>product1 = "молоко"</code><br>
                            <code>product2 = "хлеб"</code><br>
                            <code>product3 = "яйца"</code><br>
                            <code># ... и так для 100 товаров</code>
                        </div>
                        <div class="good-way">
                            <h4>✅ Просто и удобно:</h4>
                            <code>products = ["молоко", "хлеб", "яйца"]</code><br>
                            <code># всего одна переменная!</code>
                        </div>
                    </div>
                    
                    <div class="use-cases">
                        <h3>Где используют списки?</h3>
                        <div class="uses-grid">
                            <div class="use-item">
                                <div class="use-icon">🎮</div>
                                <h4>Игры</h4>
                                <p>Список предметов в инвентаре</p>
                            </div>
                            <div class="use-item">
                                <div class="use-icon">📱</div>
                                <h4>Соцсети</h4>
                                <p>Список друзей или подписок</p>
                            </div>
                            <div class="use-item">
                                <div class="use-icon">🛒</div>
                                <h4>Интернет-магазины</h4>
                                <p>Список товаров в корзине</p>
                            </div>
                            <div class="use-item">
                                <div class="use-icon">🎵</div>
                                <h4>Музыка</h4>
                                <p>Плейлист с треками</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="explanation-card">
                    <h2>🔧 Как работает список?</h2>
                    
                    <div class="working-example">
    <div class="example-title">Представь, что это инвентарь в игре:</div>
    
    <div class="inventory-visual">
        <div class="item-slot">
            <div class="slot-number">1</div>
            <div class="item-name">⚔️ Меч дракона</div>
            <div class="slot-index">[0]</div>
        </div>
        <div class="item-slot">
            <div class="slot-number">2</div>
            <div class="item-name">🛡️ Щит героя</div>
            <div class="slot-index">[1]</div>
        </div>
        <div class="item-slot">
            <div class="slot-number">3</div>
            <div class="item-name">🧪 Зелье здоровья</div>
            <div class="slot-index">[2]</div>
        </div>
        <div class="item-slot">
            <div class="slot-number">4</div>
            <div class="item-name">🗝️ Ключ от замка</div>
            <div class="slot-index">[3]</div>
        </div>
    </div>
    
    <div class="code-actions">
        <div class="action">
            <span class="action-label">Хочешь первый предмет?</span>
            <code class="action-code">inventory[0] → "Меч дракона"</code>
        </div>
        <div class="action">
            <span class="action-label">Хочешь добавить предмет?</span>
            <code class="action-code">inventory.append("Карта сокровищ")</code>
        </div>
        <div class="action">
            <span class="action-label">Хочешь знать сколько?</span>
            <code class="action-code">len(inventory) → 4</code>
        </div>
    </div>
</div>
                    
                    <div class="simple-definition">
                        <h3>📝 Простыми словами:</h3>
                        <p><strong>Список — это упорядоченная коллекция.</strong> У каждого элемента есть свой номер (индекс), 
                        и мы можем легко получить любой элемент по его номеру, добавить новый или удалить старый.</p>
                    </div>
                </div>
                
                <div class="explanation-card">
                    <h2>🎓 Что ты научишься делать?</h2>
                    
                    <div class="learning-steps">
                        <div class="step">
                            <div class="step-number">1</div>
                            <div class="step-content">
                                <h4>Создавать списки</h4>
                                <p>Собирать несколько значений в одну переменную</p>
                            </div>
                        </div>
                        <div class="step">
                            <div class="step-number">2</div>
                            <div class="step-content">
                                <h4>Получать доступ к элементам</h4>
                                <p>Доставать конкретные значения по их номеру</p>
                            </div>
                        </div>
                        <div class="step">
                            <div class="step-number">3</div>
                            <div class="step-content">
                                <h4>Менять списки</h4>
                                <p>Добавлять новые значения и удалять старые</p>
                            </div>
                        </div>
                        <div class="step">
                            <div class="step-number">4</div>
                            <div class="step-content">
                                <h4>Искать в списках</h4>
                                <p>Проверять, есть ли нужное значение в списке</p>
                            </div>
                        </div>
                        <div class="step">
                            <div class="step-number">5</div>
                            <div class="step-content">
                                <h4>Фильтровать данные</h4>
                                <p>Создавать новые списки на основе условий</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="start-section">
                    <div class="cta-box">
                        <h3>🚀 Начни сейчас!</h3>
                        <p><strong>10 простых заданий</strong> с постепенным увеличением сложности.</p>
                        <p>Каждое задание — это маленький шаг к пониманию списков.</p>
                        
                        <div class="guarantees">
                            <div class="guarantee">
                                <div class="guarantee-icon">🎯</div>
                                <div class="guarantee-text">Без сложной теории</div>
                            </div>
                            <div class="guarantee">
                                <div class="guarantee-icon">💡</div>
                                <div class="guarantee-text">Примеры после решения</div>
                            </div>
                            <div class="guarantee">
                                <div class="guarantee-icon">✅</div>
                                <div class="guarantee-text">Проверь себя сразу</div>
                            </div>
                        </div>
                        
                        <button class="btn btn-primary btn-large start-button" onclick="startTask(${completedTasks.size > 0 ? currentTask : 1})">
                            <span>${completedTasks.size > 0 ? '↻' : '🚀'}</span>
                            ${completedTasks.size > 0 ? 'Продолжить' : 'Начать урок'}
                        </button>
                        
                        ${completedTasks.size > 0 ? `
                            <div class="already-started">
                                <p>Ты уже выполнил ${completedTasks.size} заданий! Молодец! 👏</p>
                                <button class="btn btn-outline" onclick="loadContent('final')">
                                    📊 Посмотреть прогресс
                                </button>
                            </div>
                        ` : `
                            <p class="start-note">Никакой регистрации. Просто нажми и начни учиться!</p>
                        `}
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}

function getTaskTitle(taskNum) {
    const titles = {
        1: "Мой топ игр",
        2: "Первая и последняя", 
        3: "Добавь новинку",
        4: "Исправь ошибку",
        5: "Сколько всего?",
        6: "Есть ли Minecraft?",
        7: "Нумерованный плейлист",
        8: "Только хиты",
        9: "Топ-5 с сюрпризом",
        10: "Чистка подписок"
    };
    return titles[taskNum] || `Задание ${taskNum}`;
}

function getTaskShortDescription(taskNum) {
    const descriptions = {
        1: "Создай список из 5 любимых игр",
        2: "Выведи первую и последнюю игру",
        3: 'Добавь "Palworld" в конец списка',
        4: 'Замени "Fortnite" на "Overwatch"',
        5: "Узнай количество игр в списке",
        6: 'Проверь наличие "Minecraft"',
        7: "Выведи треки с нумерацией",
        8: "Отфильтруй треки с буквой 'a'",
        9: "Поменяй местами и добавь новую игру",
        10: "Отфильтруй настоящих людей"
    };
    return descriptions[taskNum] || "";
}

function getTaskContent(taskNum) {
    const taskDetails = {
        1: {
            fullDescription: `<p>Создай список из 5 своих любимых игр и выведи его на экран.</p>`,
            expectedOutput: `<div class="code-output">
                <div class="output-label">Ожидаемый вывод:</div>
                <code>Мой топ игр: ['Minecraft', 'Among Us', 'Fortnite', 'Civilization VI', 'Uncharted']</code>
            </div>`,
            hint: "Используй квадратные скобки [] и перечисли игры через запятые.",
            similarExample: `<div class="similar-example">
                <h4>📚 Похожий пример:</h4>
                <code>movies = ["Гарри Поттер", "Мстители", "Назад в будущее"]</code><br>
                <code>print("Фильмы:", movies)</code>
            </div>`
        },
        2: {
            fullDescription: `<p>Из своего списка игр выведи первую и последнюю игру.</p>`,
            expectedOutput: `<div class="code-output">
                <div class="output-label">Ожидаемый вывод:</div>
                <code>Первая игра: Minecraft</code><br>
                <code>Последняя игра: Uncharted</code>
            </div>`,
            hint: "Индексация начинается с 0. Используй games[0] и games[-1]",
            similarExample: `<div class="similar-example">
                <h4>📚 Похожий пример:</h4>
                <code>fruits = ["яблоко", "банан", "апельсин"]</code><br>
                <code>print("Первый:", fruits[0])</code><br>
                <code>print("Последний:", fruits[-1])</code>
            </div>`
        },
        3: {
            fullDescription: `<p>Ты только что попробовал игру "Subway Surfers" — добавь её в конец списка.</p>`,
            expectedOutput: `<div class="code-output">
                <div class="output-label">Ожидаемый вывод:</div>
                <code>После добавления: ['Minecraft', 'Among Us', 'Fortnite', 'Civilization VI', 'Uncharted', 'Subway Surfers']</code>
            </div>`,
            hint: 'Используй метод .append("Palworld")',
            similarExample: `<div class="similar-example">
                <h4>📚 Похожий пример:</h4>
                <code>animals = ["кошка", "собака"]</code><br>
                <code>animals.append("хомяк")</code><br>
                <code>print(animals)  # ['кошка', 'собака', 'хомяк']</code>
            </div>`
        },
        4: {
            fullDescription: `<p>Оказалось, что "Fortnite" тебе уже не нравится. Замени её на "Overwatch".</p>`,
            expectedOutput: `<div class="code-output">
                <div class="output-label">Ожидаемый вывод:</div>
                <code>После замены: ['Minecraft', 'Among Us', 'Overwatch', 'Civilization VI', 'Overwatch', 'Subway Surfers']</code>
            </div>`,
            hint: "Сначала найди индекс через .index(), затем замени элемент",
            similarExample: `<div class="similar-example">
                <h4>📚 Похожий пример:</h4>
                <code>colors = ["красный", "синий", "зелёный"]</code><br>
                <code>colors[1] = "голубой"</code><br>
                <code>print(colors)  # ['красный', 'голубой', 'зелёный']</code>
            </div>`
        },
        5: {
            fullDescription: `<p>Выведи, сколько игр у тебя в топе.</p>`,
            expectedOutput: `<div class="code-output">
                <div class="output-label">Ожидаемый вывод:</div>
                <code>Всего игр в топе: 6</code>
            </div>`,
            hint: "Используй функцию len(games)",
            similarExample: `<div class="similar-example">
                <h4>📚 Похожий пример:</h4>
                <code>numbers = [10, 20, 30, 40, 50]</code><br>
                <code>print("Количество:", len(numbers))  # 5</code>
            </div>`
        },
        6: {
            fullDescription: `<p>Проверь, есть ли "Minecraft" в твоём списке. Если есть — напиши "Классика!", если нет — "Странно...".</p>`,
            expectedOutput: `<div class="code-output">
                <div class="output-label">Ожидаемый вывод:</div>
                <code>Классика!</code>
            </div>`,
            hint: 'Используй if "Minecraft" in games:',
            similarExample: `<div class="similar-example">
                <h4>📚 Похожий пример:</h4>
                <code>items = ["меч", "щит", "зелье"]</code><br>
                <code>if "щит" in items:</code><br>
                <code>&nbsp;&nbsp;&nbsp;&nbsp;print("Защита есть!")</code>
            </div>`
        },
        7: {
            fullDescription: `<p>Создай список фильмов и выведи их на экран с нумерацией от 1 до 5.</p>
                            <p>Используй формат: "1. Название фильма (год выхода)"</p>`,
            expectedOutput: `<div class="code-output">
                <div class="output-label">Ожидаемый вывод:</div>
                <code>1. Начало (2010)</code><br>
                <code>2. Интерстеллар (2014)</code><br>
                <code>3. Побег из Шоушенка (1994)</code><br>
                <code>4. Матрица (1999)</code><br>
                <code>5. Тёмный рыцарь (2008)</code>
            </div>`,
            hint: "Используй enumerate(movies, 1) в цикле for",
            similarExample: `<div class="similar-example">
                <h4>📚 Похожий пример:</h4>
                <code>books = ["1984", "Преступление и наказание", "Мастер и Маргарита"]</code><br>
                <code>for i, book in enumerate(books, 1):</code><br>
                <code>&nbsp;&nbsp;&nbsp;&nbsp;print(f"{i}. {book}")</code>
            </div>`
        },
        8: {
            fullDescription: `<p>Создай новый список hits, в который войдут только те фильмы, в названии которых есть буква 'р'.</p>`,
            expectedOutput: `<div class="code-output">
                <div class="output-label">Ожидаемый вывод:</div>
                <code>Фильмы с буквой 'р': ['Интерстеллар', 'Матрица', 'Тёмный рыцарь']</code>
            </div>`,
            hint: "Используй .lower() и проверяй if 'p' in films",
            similarExample: `<div class="similar-example">
                <h4>📚 Похожий пример:</h4>
                <code>words = ["python", "java", "c++", "javascript"]</code><br>
                <code>js_words = []</code><br>
                <code>for word in words:</code><br>
                <code>&nbsp;&nbsp;&nbsp;&nbsp;if "java" in word:</code><br>
                <code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;js_words.append(word)</code>
            </div>`
        },
        9: {
            fullDescription: `<p>1. Поменяй местами первую и последнюю игру.<br>2. Спроси у пользователя, какую игру поставить на первое место.</p>`,
            expectedOutput: `<div class="code-output">
                <div class="output-label">Ожидаемый вывод:</div>
                <code>Какую игру поставить на первое место? Cyberpunk 2077</code><br>
                <code>Финальный топ: ['Cyberpunk 2077', 'Among Us', 'Overwatch', 'Stardew Valley', 'Palworld', 'Minecraft']</code>
            </div>`,
            hint: "Используй games[0], games[-1] = games[-1], games[0] и input()",
            similarExample: `<div class="similar-example">
                <h4>📚 Похожий пример:</h4>
                <code>items = ["A", "B", "C", "D"]</code><br>
                <code>items[0], items[-1] = items[-1], items[0]</code><br>
                <code>print(items)  # ['D', 'B', 'C', 'A']</code>
            </div>`
        },
        10: {
            fullDescription: `<p>У тебя есть список подписчиков. Отфильтруй его, оставив только настоящих людей:</p>
                <div class="attention-box">
                    <strong>Критерии настоящего человека:</strong>
                    <ul>
                        <li>✅ Аккаунт начинается с @</li>
                        <li>❌ Не содержит слов: "bot", "spam", "продажа"</li>
                        <li>❌ Не состоит только из цифр</li>
                    </ul>
                </div>
                <p>Создай новый список <code>real_people</code> с отфильтрованными аккаунтами.</p>`,
            expectedOutput: `<div class="code-output">
                <div class="output-label">Исходный список:</div>
                <code>subscribers = ['@alex_programmer', '@gaming_queen', 'spam_bot123', '@musiclover', '123456789', 'продажа_курсов', '@cat_videos', 'SupportBot', '@travel_diary', '@python_master']</code>
                <br><br>
                <div class="output-label">Ожидаемый вывод:</div>
                <code>Настоящие люди: ['@alex_programmer', '@gaming_queen', '@musiclover', '@cat_videos', '@travel_diary', '@python_master']</code>
            </div>`,
            hint: "Используй несколько условий в if: <code>account.startswith('@') and any(c.isalpha() for c in account) and not any(bad in account.lower() for bad in ['bot', 'spam', 'продажа'])</code>",
            similarExample: `<div class="similar-example">
                <h4>📚 Похожий пример:</h4>
                <code>usernames = ['@user1', 'bot123', '@real_person', '12345']</code><br>
                <code>valid = []</code><br>
                <code>for user in usernames:</code><br>
                <code>&nbsp;&nbsp;&nbsp;&nbsp;if user.startswith('@') for c in user):</code><br>
                <code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;valid.append(user)</code><br>
                <code>print(valid)  # ['@user1', '@real_person']</code>
            </div>`
        }
    };
    
    const task = taskDetails[taskNum] || taskDetails[1];
    const isCompleted = completedTasks.has(taskNum);
    const isLastTask = taskNum === totalTasks;
    
    return `
    <div class="lesson-container">
        <div class="panel task-panel">
            <div class="task-header">
                <div class="task-meta">
                    <div class="task-badge">
                        <span class="task-number-badge">${taskNum}</span>
                        <span class="task-status ${isCompleted ? 'completed' : ''}">
                            ${isCompleted ? '✅ Выполнено' : 'В процессе'}
                        </span>
                    </div>
                    <h1 class="task-title">${getTaskTitle(taskNum)}</h1>
                    <p class="task-subtitle">Задание ${taskNum} из ${totalTasks}</p>
                </div>
                
                <div class="task-progress">
                    <div class="progress-info">
                        Прогресс: <strong>${completedTasks.size}/${totalTasks}</strong>
                    </div>
                </div>
            </div>
            
            <div class="task-content">
                <div class="task-description-card">
                    <h3>📝 Задание:</h3>
                    ${task.fullDescription}
                    ${task.expectedOutput}
                </div>
                
                ${isCompleted ? task.similarExample : ''}
                
                <div class="task-tips">
                    <h3>🎯 Советы:</h3>
                    <ul>
                        <li>Создай файл <code>task_${taskNum}.py</code> в VS Code</li>
                        <li>Пиши код постепенно, проверяя каждую часть</li>
                        <li>Используй команду <code>print()</code> для отладки</li>
                        <li>Запускай программу кнопкой ▶️ Run</li>
                        ${!isCompleted ? '<li>После выполнения вернись сюда и нажми "Отметить как выполненное"</li>' : ''}
                    </ul>
                </div>
            </div>
            
            <div class="task-actions-panel">
                <div class="navigation-buttons">
                    ${taskNum > 1 ? `
                        <button class="btn btn-outline" onclick="prevTask()">
                            ← Предыдущее
                        </button>
                    ` : '<div></div>'}
                    
                    <button class="btn btn-secondary" onclick="loadContent('main')">
                        📋 Все задания
                    </button>
                    
                    ${taskNum < totalTasks ? `
                        <button class="btn btn-outline" onclick="nextTask()">
                            Следующее →
                        </button>
                    ` : '<div></div>'}
                </div>
                
                <div class="completion-section">
                    <div class="combined-button">
                        ${!isCompleted ? `
                            <button class="btn-combined" onclick="completeTask(${taskNum})">
                                ✅ Отметить как выполненное
                            </button>
                        ` : isLastTask ? `
                            <button class="btn-final" onclick="loadContent('final')">
                                🏆 Перейти к результатам
                            </button>
                        ` : `
                            <button class="btn-combined btn-combined-secondary" onclick="nextTask()">
                                ✅ Выполнено → Следующее
                            </button>
                        `}
                    </div>
                    <p class="completion-note">Вернись сюда после выполнения в VS Code</p>
                    ${isCompleted ? `
                        <div class="solution-note">
                            <p>✅ Отличная работа! Вот пример решения для сравнения:</p>
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    </div>
    `;
}

function getFinalContent() {
    const progress = (completedTasks.size / totalTasks) * 100;
    
    return `
    <div class="lesson-container">
        <div class="panel final-panel">
            <div class="final-header">
                <div class="final-icon">${progress === 100 ? '🏆' : '📊'}</div>
                <h1>${progress === 100 ? 'Урок завершён!' : 'Твой прогресс'}</h1>
                <p class="final-subtitle">
                    Выполнено: <strong>${completedTasks.size} из ${totalTasks}</strong> заданий
                </p>
            </div>
            
            <div class="progress-visual">
                <div class="progress-circle">
                    <div class="circle-progress" style="--progress: ${progress}%;">
                        <span class="progress-percent">${Math.round(progress)}%</span>
                    </div>
                </div>
            </div>
            
            <div class="tasks-summary">
                <h3>Выполненные задания:</h3>
                <div class="tasks-overview">
                    ${[1,2,3,4,5,6,7,8,9,10].map(num => `
                        <div class="task-overview-item ${completedTasks.has(num) ? 'completed' : ''}">
                            <div class="overview-number">${num}</div>
                            <div class="overview-title">${getTaskTitle(num)}</div>
                            <div class="overview-status">
                                ${completedTasks.has(num) ? '✅' : '❌'}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="final-actions">
                <button class="btn btn-primary btn-large" onclick="loadContent('main')">
                    <span>📋</span> Вернуться к заданиям
                </button>
                <button class="btn btn-outline btn-large" onclick="resetLesson()">
                    <span>🔄</span> Начать урок заново
                </button>
            </div>
            
            <div class="final-message">
                <p>🎉 Отличная работа! Ты освоил основы работы со списками в Python.</p>
                <p class="small-text">Продолжай практиковаться и переходи к следующим темам программирования!</p>
            </div>
        </div>
    </div>
    `;
}

// Основные функции
function startTask(taskNum) {
    currentTask = taskNum;
    loadContent('task');
}

function nextTask() {
    if (currentTask < totalTasks) {
        currentTask++;
        loadContent('task');
    }
}

function prevTask() {
    if (currentTask > 1) {
        currentTask--;
        loadContent('task');
    }
}

function showTaskHint(taskNum) {
    currentTask = taskNum;
    loadContent('task');
}

function completeTask(taskNum) {
    completedTasks.add(taskNum);
    saveProgress();
    updateProgress();
    
    // Перезагружаем контент текущего задания, чтобы показать пример
    loadContent('task');
    
    // Показываем сообщение об успехе
    setTimeout(() => {
        showMessage(
            '✅ Задание выполнено!',
            `Отлично! Задание "${getTaskTitle(taskNum)}" выполнено.<br><br>
            Теперь ты можешь посмотреть пример решения для сравнения.`,
            'success'
        );
    }, 300);
    
    playSound('success');
}

function updateProgress() {
    const progressFill = document.querySelector('.progress-fill');
    const levelNumber = document.querySelector('.level-number');
    
    if (progressFill && levelNumber) {
        const progress = (completedTasks.size / totalTasks) * 100;
        progressFill.style.width = `${progress}%`;
        levelNumber.textContent = `Задание ${currentTask}/${totalTasks}`;
    }
}

function saveProgress() {
    try {
        const progress = {
            completedTasks: Array.from(completedTasks),
            lastTask: currentTask,
            savedAt: new Date().toISOString()
        };
        localStorage.setItem('pythonListsProgress', JSON.stringify(progress));
    } catch (e) {
        console.error('Ошибка сохранения:', e);
    }
}

function loadProgress() {
    try {
        const progress = JSON.parse(localStorage.getItem('pythonListsProgress') || '{}');
        if (progress.completedTasks) {
            completedTasks = new Set(progress.completedTasks);
        }
        if (progress.lastTask) {
            currentTask = progress.lastTask;
        }
    } catch (e) {
        console.error('Ошибка загрузки:', e);
    }
}

function resetProgress() {
    if (confirm('Точно сбросить весь прогресс?')) {
        localStorage.removeItem('pythonListsProgress');
        completedTasks.clear();
        currentTask = 1;
        loadContent('main');
        showMessage('Прогресс сброшен', 'Начинаем урок заново!', 'info');
    }
}

function resetLesson() {
    completedTasks.clear();
    currentTask = 1;
    saveProgress();
    loadContent('main');
}

function showStats() {
    const statsHTML = `
        <h2>📊 Статистика урока</h2>
        <div style="text-align: center; margin: 20px 0;">
            <div style="font-size: 48px; margin: 10px 0;">${Math.round((completedTasks.size / totalTasks) * 100)}%</div>
            <p>Выполнено: <strong>${completedTasks.size}/${totalTasks}</strong> заданий</p>
        </div>
        
        <div style="margin: 20px 0;">
            <h3>Выполненные задания:</h3>
            <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; margin-top: 15px;">
                ${[1,2,3,4,5,6,7,8,9,10].map(num => `
                    <div style="
                        width: 50px; 
                        height: 50px; 
                        border-radius: 50%; 
                        background: ${completedTasks.has(num) ? 'var(--success)' : 'var(--background-lighter)'}; 
                        display: flex; 
                        align-items: center;
                        justify-content: center;
                        font-weight: bold;
                        border: 2px solid ${completedTasks.has(num) ? 'var(--success)' : 'var(--primary)'};
                        margin: 0 auto;
                        color: ${completedTasks.has(num) ? 'white' : 'var(--text)'};
                    ">
                        ${num}
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div style="margin-top: 25px; display: flex; gap: 15px;">
            <button class="btn btn-secondary" onclick="resetProgress()" style="flex: 1;">
                <span>🗑️</span> Сбросить прогресс
            </button>
            <button class="btn btn-primary" onclick="closeModal()" style="flex: 1;">
                <span>✖️</span> Закрыть
            </button>
        </div>
    `;
    
    document.getElementById('modal-text').innerHTML = statsHTML;
    document.getElementById('modal').style.display = 'flex';
}

function showMessage(title, text, type = 'info') {
    const modal = document.getElementById('modal');
    const modalText = document.getElementById('modal-text');
    
    if (!modal || !modalText) return;
    
    const icon = {
        info: 'ℹ️',
        success: '✅',
        warning: '⚠️',
        error: '❌'
    }[type];
    
    modalText.innerHTML = `
        <h2>${icon} ${title}</h2>
        <div style="margin: 20px 0; line-height: 1.6;">${text}</div>
        <div style="text-align: center; margin-top: 30px;">
            <button class="btn btn-primary" onclick="closeModal()" style="padding: 12px 30px;">
                Понятно
            </button>
        </div>
    `;
    
    modal.style.display = 'flex';
    playSound('click');
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.style.display = 'none';
        playSound('click');
    }
}

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

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    loadProgress();
    console.log('Урок "Списки в Python" инициализирован');
});

// Экспорт функций
window.loadContent = loadContent;
window.startTask = startTask;
window.nextTask = nextTask;
window.prevTask = prevTask;
window.showTaskHint = showTaskHint;
window.completeTask = completeTask;
window.showStats = showStats;
window.resetProgress = resetProgress;
window.resetLesson = resetLesson;
window.closeModal = closeModal;
window.showMessage = showMessage;
