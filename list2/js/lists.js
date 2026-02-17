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
                                <h4>Анализировать данные</h4>
                                <p>Находить максимум, минимум, среднее</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="start-section">
                    <div class="cta-box">
                        <h3>🚀 Начни сейчас!</h3>
                        <p><strong>10 практических заданий</strong> на работу со списками.</p>
                        <p>От списка покупок до битвы с драконами!</p>
                        
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
        1: "🛒 Список покупок",
        2: "👾 Фотограф инопланетян",
        3: "📊 Анализ оценок",
        4: "💣 Сапер",
        5: "🗝️ Где ключ?",
        6: "🏆 Рекордсмен",
        7: "👥 Список друзей в игре",
        8: "📝 Редактор списка дел",
        9: "🔄 Циклический сдвиг",
        10: "🐉 Герой против Драконов"
    };
    return titles[taskNum] || `Задание ${taskNum}`;
}

function getTaskShortDescription(taskNum) {
    const descriptions = {
        1: "Работа со списком покупок: замена элементов",
        2: "Отфильтровать инопланетян с четным числом глаз",
        3: "Найти среднюю, макс, мин оценку и количество пятерок",
        4: "Собирать монеты до встречи с бомбой",
        5: "Найти индекс ключа в списке ящиков",
        6: "Найти максимальное число в списке",
        7: "Добавлять друзей в список и проверять дубликаты",
        8: "Добавлять и удалять дела из списка",
        9: "Сдвинуть элементы списка вправо",
        10: "Сразиться с драконами и пройти уровень"
    };
    return descriptions[taskNum] || "";
}

function getTaskContent(taskNum) {
    const taskDetails = {
        1: {
            fullDescription: `
            <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 20px;">
                <div style="font-size: 80px;">🛒</div>
                <div>
                    <h3 style="margin: 0; color: var(--primary);">Список покупок</h3>
                    <p style="margin: 5px 0 0 0;">Помоги маме с покупками!</p>
                </div>
            </div>
            <pre style="background: var(--background-lighter); padding: 15px; border-radius: 10px; font-family: monospace; font-size: 20px; text-align: center;">
    🧾 ХЛЕБ   🥛 МОЛОКО   🧀 СЫР   🥩 КОЛБАСА   🧈 МАСЛО
            </pre>
            <p>Пользователь вводит 5 названий продуктов через пробел. Программа должна:</p>
            <ol>
                <li>Сохранить их в список.</li>
                <li>Вывести первый и последний продукт.</li>
                <li>Заменить второй продукт на слово "Яблоки" 🍎.</li>
                <li>Вывести итоговый список.</li>
            </ol>`,
            expectedOutput: `<div class="code-output">
                <div class="output-label">📥 Пример ввода:</div>
                <code>Хлеб Молоко Сыр Колбаса Масло</code>
                <br><br>
                <div class="output-label">📤 Пример вывода:</div>
                <code>Первый продукт: Хлеб</code><br>
                <code>Последний продукт: Масло</code><br>
                <code>['Хлеб', 'Яблоки', 'Сыр', 'Колбаса', 'Масло']</code>
                <div style="margin-top: 15px; font-size: 24px; text-align: center;">
                    🍞 🍎 🧀 🥩 🧈
                </div>
            </div>`,
            hint: "Используй <code>input().split()</code> для разделения строки на список. Помни, что индексация начинается с 0.",
            similarExample: `<div class="similar-example">
                <h4>📚 Похожий пример:</h4>
                <code>words = input("Введите слова: ").split()</code><br>
                <code>print("Первое слово:", words[0])</code><br>
                <code>words[1] = "Новое слово"</code><br>
                <code>print(words)</code>
            </div>`
        },
        2: {
            fullDescription: `
            <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 20px;">
                <div style="font-size: 80px;">👾📸</div>
                <div>
                    <h3 style="margin: 0; color: var(--primary);">Фотограф инопланетян</h3>
                    <p style="margin: 5px 0 0 0;">Сфоткай только четных!</p>
                </div>
            </div>
            <pre style="background: var(--background-lighter); padding: 15px; border-radius: 10px; font-family: monospace; font-size: 16px; text-align: center;">
    👾[1]   👾👾👾👾👾[5]   👾👾👾👾👾👾👾👾[8]   👾👾👾👾👾👾👾👾👾👾👾👾[12]
            </pre>
            <p>Есть список инопланетян, у каждого разное количество глаз: <code>[1, 5, 8, 12, 3, 20, 7]</code>.</p>
            <p>Твой фотоаппарат работает только на четные числа! Пройди циклом по списку и сохрани в новый список только тех, у кого четное количество глаз.</p>`,
            expectedOutput: `<div class="code-output">
                <div class="output-label">Ожидаемый вывод:</div>
                <code>[8, 12, 20]</code>
                <div style="margin-top: 15px; display: flex; justify-content: center; gap: 20px; font-size: 30px;">
                    <span>👾👾👾👾👾👾👾👾</span>
                    <span>👾👾👾👾👾👾👾👾👾👾👾👾</span>
                    <span>👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾👾</span>
                </div>
            </div>`,
            hint: "Проверяй остаток от деления на 2: <code>if eyes % 2 == 0</code>",
            similarExample: `<div class="similar-example">
                <h4>📚 Похожий пример:</h4>
                <code>numbers = [1, 2, 3, 4, 5, 6]</code><br>
                <code>even_numbers = []</code><br>
                <code>for num in numbers:</code><br>
                <code>&nbsp;&nbsp;&nbsp;&nbsp;if num % 2 == 0:</code><br>
                <code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;even_numbers.append(num)</code><br>
                <code>print(even_numbers)  # [2, 4, 6]</code>
            </div>`
        },
        3: {
            fullDescription: `
            <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 20px;">
                <div style="font-size: 80px;">📊📝</div>
                <div>
                    <h3 style="margin: 0; color: var(--primary);">Анализ оценок</h3>
                    <p style="margin: 5px 0 0 0;">Помоги ученику узнать успеваемость</p>
                </div>
            </div>
            <pre style="background: var(--background-lighter); padding: 15px; border-radius: 10px; font-family: monospace; font-size: 24px; text-align: center;">
    📝 4️⃣ 5️⃣ 3️⃣ 5️⃣ 4️⃣ 5️⃣ 2️⃣ 5️⃣
            </pre>
            <p>Ученик получил оценки за четверть: <code>[4, 5, 3, 5, 4, 5, 2, 5]</code>.</p>
            <p>Напишите программу, которая:</p>
            <ol>
                <li>Находит среднюю оценку.</li>
                <li>Находит максимальную и минимальную оценку.</li>
                <li>Считает, сколько раз была поставлена оценка "5".</li>
            </ol>`,
            expectedOutput: `<div class="code-output">
                <div class="output-label">Ожидаемый вывод:</div>
                <code>Средняя оценка: 4.125</code><br>
                <code>Максимальная оценка: 5</code><br>
                <code>Минимальная оценка: 2</code><br>
                <code>Количество пятерок: 4</code>
                <div style="margin-top: 15px; font-size: 30px; text-align: center;">
                    5️⃣ 5️⃣ 5️⃣ 5️⃣ = 4 пятерки! 🎉
                </div>
            </div>`,
            hint: "Используй <code>sum()</code>, <code>len()</code>, <code>max()</code>, <code>min()</code> и <code>count()</code>",
            similarExample: `<div class="similar-example">
                <h4>📚 Похожий пример:</h4>
                <code>numbers = [10, 20, 30, 40, 50]</code><br>
                <code>average = sum(numbers) / len(numbers)</code><br>
                <code>maximum = max(numbers)</code><br>
                <code>minimum = min(numbers)</code><br>
                <code>count_30 = numbers.count(30)</code>
            </div>`
        },
        4: {
            fullDescription: `
            <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 20px;">
                <div style="font-size: 80px;">💣💰</div>
                <div>
                    <h3 style="margin: 0; color: var(--primary);">Сапер</h3>
                    <p style="margin: 5px 0 0 0;">Собирай монеты, но берегись бомбы!</p>
                </div>
            </div>
            <pre style="background: var(--background-lighter); padding: 15px; border-radius: 10px; font-family: monospace; font-size: 24px; text-align: center;">
    [💰5] [💰10] [💰3] [💣99] [💰7] [💰2] [💰8]
            </pre>
            <p>Ты собираешь монеты. Но если попадется бомба (99), игра заканчивается сразу.</p>
            <p>Дан список: <code>[5, 10, 3, 99, 7, 2, 8]</code>. Посчитай, сколько монет успел собрать до бомбы.</p>`,
            expectedOutput: `<div class="code-output">
                <div class="output-label">Ожидаемый вывод:</div>
                <code>Собрано монет до бомбы: 18</code>
                <div style="margin-top: 15px; display: flex; justify-content: center; gap: 10px; font-size: 30px;">
                    <span>💰5</span> + <span>💰10</span> + <span>💰3</span> = <span>💰18</span>
                </div>
                <div style="margin-top: 10px; font-size: 40px; text-align: center;">
                    💥 БАБАХ! 💥
                </div>
            </div>`,
            hint: "Используй цикл <code>for</code> с <code>break</code> при встрече 99",
            similarExample: `<div class="similar-example">
                <h4>📚 Похожий пример:</h4>
                <code>numbers = [1, 2, 3, 0, 4, 5]</code><br>
                <code>sum = 0</code><br>
                <code>for num in numbers:</code><br>
                <code>&nbsp;&nbsp;&nbsp;&nbsp;if num == 0:</code><br>
                <code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;break</code><br>
                <code>&nbsp;&nbsp;&nbsp;&nbsp;sum += num</code><br>
                <code>print(sum)  # 6</code>
            </div>`
        },
        5: {
            fullDescription: `
            <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 20px;">
                <div style="font-size: 80px;">🗝️📦</div>
                <div>
                    <h3 style="margin: 0; color: var(--primary);">Где ключ?</h3>
                    <p style="margin: 5px 0 0 0;">Найди ключ среди ящиков!</p>
                </div>
            </div>
            <pre style="background: var(--background-lighter); padding: 15px; border-radius: 10px; font-family: monospace; font-size: 30px; text-align: center;">
    📦[0]   📦[0]   📦[1]🔑   📦[0]
            </pre>
            <p>В списке ящиков <code>[0, 0, 1, 0]</code> единица — это ключ. Найди номер ящика (индекс), где лежит ключ.</p>`,
            expectedOutput: `<div class="code-output">
                <div class="output-label">Ожидаемый вывод:</div>
                <code>Ключ в ящике номер: 2</code>
                <p class="small-text">(Индексация начинается с 0, поэтому ящик под номером 2 - это третий по счету)</p>
                <div style="margin-top: 15px; display: flex; justify-content: center; gap: 20px; font-size: 40px;">
                    <span>📦</span> <span>📦</span> <span style="filter: drop-shadow(0 0 10px gold);">📦🔑</span> <span>📦</span>
                </div>
                <div style="text-align: center; margin-top: 10px;">
                    ⬆️ КЛЮЧ ЗДЕСЬ! ⬆️
                </div>
            </div>`,
            hint: "Используй метод <code>.index(1)</code> или цикл с проверкой",
            similarExample: `<div class="similar-example">
                <h4>📚 Похожий пример:</h4>
                <code>items = ['камень', 'камень', 'золото', 'камень']</code><br>
                <code>index = items.index('золото')</code><br>
                <code>print(f"Золото на позиции: {index}")  # 2</code>
            </div>`
        },
        6: {
            fullDescription: `
            <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 20px;">
                <div style="font-size: 80px;">🏆📈</div>
                <div>
                    <h3 style="margin: 0; color: var(--primary);">Рекордсмен</h3>
                    <p style="margin: 5px 0 0 0;">Найди лучшего игрока!</p>
                </div>
            </div>
            <pre style="background: var(--background-lighter); padding: 15px; border-radius: 10px; font-family: monospace; font-size: 24px; text-align: center;">
    👤45  👤78  👤92🏆  👤31  👤56  👤88
            </pre>
            <p>Дан список очков игроков: <code>[45, 78, 92, 31, 56, 88]</code>.</p>
            <p>Найди самое большое число. Запоминай лучший результат в переменной.</p>`,
            expectedOutput: `<div class="code-output">
                <div class="output-label">Ожидаемый вывод:</div>
                <code>Рекорд: 92</code>
                <div style="margin-top: 15px; display: flex; justify-content: center; align-items: center; gap: 10px; font-size: 50px;">
                    <span>👤</span>
                    <span style="font-size: 60px; color: gold;">92🏆</span>
                </div>
                <div style="text-align: center; margin-top: 10px; font-size: 20px;">
                    ЧЕМПИОН! 🎉
                </div>
            </div>`,
            hint: "Используй <code>max()</code> или пройди циклом, сравнивая каждое число с текущим максимумом",
            similarExample: `<div class="similar-example">
                <h4>📚 Похожий пример (без max):</h4>
                <code>scores = [45, 78, 92, 31, 56, 88]</code><br>
                <code>record = scores[0]</code><br>
                <code>for score in scores:</code><br>
                <code>&nbsp;&nbsp;&nbsp;&nbsp;if score > record:</code><br>
                <code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;record = score</code><br>
                <code>print("Рекорд:", record)</code>
            </div>`
        },
        7: {
            fullDescription: `
            <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 20px;">
                <div style="font-size: 80px;">👥🎮</div>
                <div>
                    <h3 style="margin: 0; color: var(--primary);">Список друзей в игре</h3>
                    <p style="margin: 5px 0 0 0;">Добавляй друзей без дубликатов!</p>
                </div>
            </div>
            <pre style="background: var(--background-lighter); padding: 15px; border-radius: 10px; font-family: monospace; font-size: 24px; text-align: center;">
    👤 Алекс   👤 Мария   👤 Иван
            </pre>
            <p>Создай пустой список друзей. Программа должна:</p>
            <ol>
                <li>Добавить в список друзей: "Алекс", "Мария", "Иван".</li>
                <li>Вывести текущий список.</li>
                <li>Спросить у пользователя имя нового друга и добавить его, если его еще нет в списке.</li>
                <li>Вывести обновленный список.</li>
            </ol>`,
            expectedOutput: `<div class="code-output">
                <div class="output-label">📱 Пример работы:</div>
                <code>Текущие друзья: ['Алекс', 'Мария', 'Иван']</code><br>
                <code>Введите имя нового друга: Елена</code><br>
                <code>Друг добавлен!</code><br>
                <code>Обновленный список: ['Алекс', 'Мария', 'Иван', 'Елена']</code><br><br>
                <code>Введите имя нового друга: Алекс</code><br>
                <code>Этот друг уже есть в списке!</code><br>
                <code>Обновленный список: ['Алекс', 'Мария', 'Иван', 'Елена']</code>
                <div style="margin-top: 15px; display: flex; justify-content: center; gap: 20px; font-size: 40px;">
                    <span>👤Алекс</span> <span>👤Мария</span> <span>👤Иван</span> <span style="color: green;">➕👤Елена</span>
                </div>
            </div>`,
            hint: "Используй <code>if new_friend not in friends:</code> для проверки",
            similarExample: `<div class="similar-example">
                <h4>📚 Похожий пример:</h4>
                <code>shopping_list = ['хлеб', 'молоко']</code><br>
                <code>item = input("Что добавить? ")</code><br>
                <code>if item not in shopping_list:</code><br>
                <code>&nbsp;&nbsp;&nbsp;&nbsp;shopping_list.append(item)</code><br>
                <code>&nbsp;&nbsp;&nbsp;&nbsp;print("Добавлено!")</code><br>
                <code>else:</code><br>
                <code>&nbsp;&nbsp;&nbsp;&nbsp;print("Уже есть!")</code>
            </div>`
        },
        8: {
            fullDescription: `
            <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 20px;">
                <div style="font-size: 80px;">📝✅</div>
                <div>
                    <h3 style="margin: 0; color: var(--primary);">Редактор списка дел</h3>
                    <p style="margin: 5px 0 0 0;">Отмечай дела как выполненные!</p>
                </div>
            </div>
            <pre style="background: var(--background-lighter); padding: 15px; border-radius: 10px; font-family: monospace; font-size: 18px; text-align: center;">
    1. 🛒 купить продукты
    2. 📚 сделать уроки
    3. 📞 позвонить маме
    4. 🧹 убраться в комнате
            </pre>
            <p>У тебя есть список дел: <code>['купить продукты', 'сделать уроки', 'позвонить маме', 'убраться в комнате']</code>.</p>
            <p>Программа должна:</p>
            <ol>
                <li>Вывести список дел с номерами (начиная с 1).</li>
                <li>Спросить у пользователя, какое дело он выполнил (ввести номер).</li>
                <li>Удалить это дело из списка.</li>
                <li>Вывести обновленный список.</li>
            </ol>`,
            expectedOutput: `<div class="code-output">
                <div class="output-label">📋 Пример работы:</div>
                <code>1. купить продукты</code><br>
                <code>2. сделать уроки</code><br>
                <code>3. позвонить маме</code><br>
                <code>4. убраться в комнате</code><br>
                <code>Какое дело выполнил? (введи номер): 2</code><br>
                <code>Дело "сделать уроки" выполнено! ✅</code><br>
                <code>Осталось дел: 3</code><br>
                <code>1. купить продукты</code><br>
                <code>2. позвонить маме</code><br>
                <code>3. убраться в комнате</code>
                <div style="margin-top: 15px; display: flex; justify-content: center; gap: 20px; font-size: 30px;">
                    <span>🛒</span> <span style="text-decoration: line-through; opacity: 0.5;">📚</span> <span>📞</span> <span>🧹</span>
                </div>
            </div>`,
            hint: "Используй <code>pop(index-1)</code> для удаления по индексу (не забудь про разницу в нумерации)",
            similarExample: `<div class="similar-example">
                <h4>📚 Похожий пример:</h4>
                <code>tasks = ['task1', 'task2', 'task3']</code><br>
                <code>for i, task in enumerate(tasks, 1):</code><br>
                <code>&nbsp;&nbsp;&nbsp;&nbsp;print(f"{i}. {task}")</code><br>
                <code>num = int(input("Номер: "))</code><br>
                <code>removed = tasks.pop(num-1)</code><br>
                <code>print(f"Удалено: {removed}")</code>
            </div>`
        },
        9: {
            fullDescription: `
            <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 20px;">
                <div style="font-size: 80px;">🔄➡️</div>
                <div>
                    <h3 style="margin: 0; color: var(--primary);">Циклический сдвиг</h3>
                    <p style="margin: 5px 0 0 0;">Сдвинь элементы как по кругу!</p>
                </div>
            </div>
            <pre style="background: var(--background-lighter); padding: 15px; border-radius: 10px; font-family: monospace; font-size: 30px; text-align: center;">
    [1] [2] [3] [4] [5]  ➡️  [5] [1] [2] [3] [4]
            </pre>
            <p>Дан список: <code>[1, 2, 3, 4, 5]</code>.</p>
            <p>Сдвинь все элементы списка на одну позицию вправо. Последний элемент должен стать первым.</p>
            <p><strong>Пример:</strong> [1, 2, 3, 4, 5] → [5, 1, 2, 3, 4]</p>`,
            expectedOutput: `<div class="code-output">
                <div class="output-label">Ожидаемый вывод:</div>
                <code>[5, 1, 2, 3, 4]</code>
                <div style="margin-top: 15px; display: flex; justify-content: center; align-items: center; gap: 10px; font-size: 40px;">
                    <span>1️⃣</span><span>2️⃣</span><span>3️⃣</span><span>4️⃣</span><span style="color: red;">5️⃣</span>
                    <span style="font-size: 30px;">➡️</span>
                    <span style="color: red;">5️⃣</span><span>1️⃣</span><span>2️⃣</span><span>3️⃣</span><span>4️⃣</span>
                </div>
            </div>`,
            hint: "Сохрани последний элемент в переменную, сдвинь все остальные, поставь сохраненный элемент в начало",
            similarExample: `<div class="similar-example">
                <h4>📚 Похожий пример:</h4>
                <code>numbers = [1, 2, 3, 4, 5]</code><br>
                <code>last = numbers[-1]</code><br>
                <code>for i in range(len(numbers)-1, 0, -1):</code><br>
                <code>&nbsp;&nbsp;&nbsp;&nbsp;numbers[i] = numbers[i-1]</code><br>
                <code>numbers[0] = last</code><br>
                <code>print(numbers)  # [5, 1, 2, 3, 4]</code>
            </div>`
        },
        10: {
            fullDescription: `
            <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 20px;">
                <div style="font-size: 80px;">🐉⚔️</div>
                <div>
                    <h3 style="margin: 0; color: var(--primary);">Герой против Драконов</h3>
                    <p style="margin: 5px 0 0 0;">Сразись с драконами и пройди уровень!</p>
                </div>
            </div>
            <pre style="background: var(--background-lighter); padding: 15px; border-radius: 10px; font-family: monospace; font-size: 24px; text-align: center;">
    🐉[12]  🐉[10]  🐉[10]  🐉[15]  🐉[15]
    ⚔️ ГЕРОЙ (сила 13)
            </pre>
            <p>У тебя есть список здоровья драконов: <code>[12, 10, 10, 15, 15]</code>.</p>
            <p>Сила удара твоего героя — 13.</p>
            <p>Пройди циклом по списку: если сила героя больше или равна здоровью дракона — ты победил его (счет +1).</p>
            <p>В конце скажи, прошел ли ты уровень (победил 3 и более драконов).</p>`,
            expectedOutput: `<div class="code-output">
                <div class="output-label">Ожидаемый вывод:</div>
                <code>Побеждено драконов: 3</code><br>
                <code>Уровень пройден! 🎉</code>
                <p class="small-text">(Победил: 12, 10, 10 — 3 дракона)</p>
                <div style="margin-top: 15px; display: flex; justify-content: center; align-items: center; gap: 20px; font-size: 40px;">
                    <span style="opacity: 0.5;">🐉</span> <span style="opacity: 0.5;">🐉</span> <span style="opacity: 0.5;">🐉</span> <span>🐉</span> <span>🐉</span>
                </div>
                <div style="text-align: center; margin-top: 10px; font-size: 30px;">
                    ⚔️🏆 ПОБЕДА! 🏆⚔️
                </div>
            </div>`,
            hint: "Пройди циклом по списку, сравнивай каждое значение с силой удара (13)",
            similarExample: `<div class="similar-example">
                <h4>📚 Похожий пример:</h4>
                <code>enemies = [5, 8, 12, 3]</code><br>
                <code>power = 10</code><br>
                <code>defeated = 0</code><br>
                <code>for enemy in enemies:</code><br>
                <code>&nbsp;&nbsp;&nbsp;&nbsp;if power >= enemy:</code><br>
                <code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;defeated += 1</code><br>
                <code>print(f"Побеждено: {defeated}")</code>
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
                            <div class="overview-title">${getTaskTitle(num).replace(/[🛒👾📊💣🗝️🏆👥📝🔄🐉]/g, '')}</div>
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