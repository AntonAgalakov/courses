// Глобальные переменные
let currentLevel = 0;
let health = 100;
let correctAnswers = 0;

// Массив уровней с вашими вопросами (полностью совместимый с оригинальной структурой)

const levels = [
  {
    title: "Этап 1: Анализ требований",
    situation: "Заказчик: «Мне нужно приложение, как у Uber, но для кошек».\n\nЧто спросить в первую очередь?",
    options: [
      "Какой у вас бюджет?",
      "Кто будет пользоваться? Что именно они должны делать?",
      "Хотите ли вы анимацию при запуске?"
    ],
    correct: 1,
    feedbackCorrect: "✅ Правильно! Первый шаг в любом проекте — понять проблему. Без анализа пользователей и их потребностей нельзя создать эффективное решение. Сначала спрашиваем о пользователях и сценариях использования.",
    feedbackWrong: "❌ Бюджет и визуальные эффекты важны, но не на первом этапе. Сначала нужно понять саму задачу: кто целевая аудитория, какие проблемы решает приложение, какие сценарии использования."
  },
  {
    title: "Этап 2: Работа в команде",
    situation: "В проекте участвуют: программист, дизайнер, тестировщик, менеджер.\n\nКто отвечает за то, чтобы функция «бронирование» работала так, как хочет клиент?",
    options: [
      "Программист",
      "Менеджер / Бизнес-аналитик",
      "Тестировщик"
    ],
    correct: 1,
    feedbackCorrect: "✅ Верно! Роль бизнес-аналитика или проджект-менеджера — быть мостом между клиентом и командой. Они переводят требования бизнеса в технические спецификации и следят за соответствием результата ожиданиям заказчика.",
    feedbackWrong: "❌ Программист отвечает за реализацию, тестировщик — за качество, но соответствие бизнес-требованиям — зона ответственности менеджера или бизнес-аналитика. Именно они работают с требованиями заказчика."
  },
  {
    title: "Этап 3: Проектирование архитектуры",
    situation: "Нужно хранить данные о пользователях, заказах и отзывах.\n\nКак лучше организовать?",
    options: [
      "Всё в одном файле Excel",
      "Отдельные таблицы в базе данных с связями",
      "Каждый раз спрашивать у пользователя заново"
    ],
    correct: 1,
    feedbackCorrect: "✅ Правильный выбор! Реляционная база данных с нормализованной структурой — основа масштабируемости и целостности данных. Отдельные таблицы со связями позволяют эффективно хранить и обрабатывать связанные данные.",
    feedbackWrong: "❌ Excel не предназначен для работы в многопользовательских приложениях. Это приведет к проблемам с целостностью данных, конкурентным доступом и производительностью при росте объема данных."
  },
  {
    title: "Этап 4: Документация кода",
    situation: "Какой комментарий действительно помогает?",
    options: [
      "// делаем что-то",
      "// проверяем, не истёк ли срок действия токена (RFC 7519)",
      "// TODO: fix this later"
    ],
    correct: 1,
    feedbackCorrect: "✅ Да! Хороший комментарий объясняет «почему», а не «что». Он добавляет контекст, ссылки на спецификации, причины неочевидных решений. Комментарий про RFC 7519 полезен, так как объясняет стандарт, по которому работает проверка токена.",
    feedbackWrong: "❌ Комментарии должны добавлять смысл, а не шум. «TODO» без конкретики и сроков бесполезен, а комментарии, описывающие очевидные вещи, только загромождают код."
  },
  {
    title: "Этап 5: Релиз без паники",
    situation: "Вы исправили баг в приложении. Как безопасно выпустить обновление?",
    options: [
      "Залить новый код прямо на главный сервер ночью",
      "Сначала протестировать на staging-среде, затем обновить для 10% пользователей (canary release), потом для всех",
      "Отправить пользователям архив с новым .exe и пусть сами обновят"
    ],
    correct: 1,
    feedbackCorrect: "✅ Профессиональный подход! Постепенное развёртывание (canary release) позволяет выявить проблемы на небольшой аудитории до полного релиза. Тестирование на копии продакшена (staging) даёт уверенность, что обновление не сломает основной сервис.",
    feedbackWrong: "❌ Прямой деплой в продакшен — риск для бизнеса. Если баг останется незамеченным, это может привести к простою сервиса и потере клиентов. Автоматизация развёртывания и поэтапный релиз — стандарт зрелых команд."
  },
  {
    title: "Этап 6: Тестирование",
    situation: "У вас есть функция divide(a, b). Какие тесты ОБЯЗАТЕЛЬНЫ?",
    options: [
      "divide(10, 2) == 5",
      "divide(10, 0) → ошибка",
      "Оба варианта"
    ],
    correct: 2,
    feedbackCorrect: "✅ Правильно! Качественное тестирование должно покрывать как позитивные сценарии («счастливый путь»), так и негативные (крайние случаи и ошибочные ситуации). Деление на ноль — классический edge case, который обязательно нужно обрабатывать.",
    feedbackWrong: "❌ Если не проверить деление на ноль — приложение может упасть в production. Тестирование только «счастливого пути» создаёт ложное чувство безопасности. Нужно тестировать и ошибочные сценарии."
  },
  {
    title: "Этап 7: Контроль версий",
    situation: "Вы исправили баг, коллега добавил новую фичу. Как не сломать друг друга?",
    options: [
      "Пересылать файлы в WhatsApp",
      "Использовать Git и делать merge",
      "Работать в разных папках"
    ],
    correct: 1,
    feedbackCorrect: "✅ Верно! Git — это не просто инструмент для хранения кода, а система для совместной работы. Ветки, мерж-реквесты, код-ревью — всё это позволяет команде работать параллельно, не мешая друг другу.",
    feedbackWrong: "❌ Без системы контроля версий командная работа превращается в хаос. Git решает проблемы совместной работы, отслеживания изменений, отката к предыдущим версиям и разрешения конфликтов."
  },
  {
    title: "Этап 8: Код другого — святыня?",
    situation: "Вы видите ужасный, но рабочий код коллеги. Что делать?",
    options: [
      "Молча переписать ночью, когда никто не видит",
      "Обсудить на код-ревью: «Как насчёт рефакторинга? Могу помочь»",
      "Оставить как есть — «не моё дело»"
    ],
    correct: 1,
    feedbackCorrect: "✅ Мудрый выбор! Код принадлежит команде, а не отдельному разработчику. Конструктивная обратная связь на ревью с предложением помощи укрепляет культуру и улучшает качество продукта без конфликтов.",
    feedbackWrong: "❌ Тайное исправление кода нарушает доверие и может сломать функционал, о котором вы не знаете. Игнорирование проблем ведёт к «техническому долгу». Открытый диалог — основа профессионального роста команды."
  },
  {
    title: "Этап 9: Документация — мёртвый груз?",
    situation: "«Хороший код самодокументирован». Это правда?",
    options: [
      "Да — комментарии только мешают",
      "Нет — документация нужна для архитектуры, API и нетривиальных решений",
      "Только для open-source проектов"
    ],
    correct: 1,
    feedbackCorrect: "✅ Верно! Код показывает КАК что-то работает, а документация — ПОЧЕМУ принято такое решение. Архитектурные диаграммы, API-документация и объяснение сложных алгоритмов экономят коллегам часы разбирательств.",
    feedbackWrong: "❌ Даже самый чистый код не объяснит бизнес-логику или причины выбора конкретного алгоритма. Отсутствие документации превращает проект в «чёрный ящик», который невозможно поддерживать при смене команды."
  },
  {
    title: "Этап 10: Поддержка проекта",
    situation: "Приложение выпущено. Пользователи пишут: «Кнопка 'Оплатить' не работает».\n\nЧто делать?",
    options: [
      "Игнорировать — у нас же всё тестировалось!",
      "Собрать логи, воспроизвести баг, выпустить хотфикс",
      "Удалить кнопку"
    ],
    correct: 1,
    feedbackCorrect: "✅ Верно! Жизненный цикл ПО не заканчивается на релизе. Мониторинг, сбор обратной связи, оперативное исправление критических багов — всё это часть работы разработчика. Именно поддержка отличает качественный продукт.",
    feedbackWrong: "❌ Игнорирование обратной связи пользователей убивает доверие к продукту и компании. В современной разработке обратная связь пользователей — это ценнейший ресурс для улучшения продукта."
  },
  {
    title: "Этап 11: Логирование",
    situation: "Что логировать в production-приложении?",
    options: [
      "Всё: запросы, ответы, пароли, токены — «вдруг пригодится»",
      "Только ошибки и критические события, без персональных данных",
      "Ничего — «логи только замедляют»"
    ],
    correct: 1,
    feedbackCorrect: "✅ Логи должны помогать в диагностике, не нарушая приватность. Персональные данные, пароли, токены — никогда в логах! Это требование безопасности и законов.",
    feedbackWrong: "❌ Логирование всего — риск утечки данных и переполнения диска. Отсутствие логов — слепота при инцидентах."
  },
  {
    title: "Этап 12: Ответственность",
    situation: "Ваш код вызвал сбой в production, клиент потерял деньги. Что делать?",
    options: [
      "Сказать: «Это баг в библиотеке X»",
      "Признать проблему, помочь восстановить данные, провести постмортем",
      "Удалить свой аккаунт из Git и исчезнуть"
    ],
    correct: 1,
    feedbackCorrect: "✅ Профессионал берёт ответственность. Постмортем без обвинений — путь к улучшению процессов и предотвращению повторения.",
    feedbackWrong: "❌ Перекладывание вины разрушает доверие. Бегство — не решение, а признание непрофессионализма."
  },
  {
    title: "Этап 13: Этичный код",
    situation: "Заказчик просит добавить скрытый сбор данных о пользователях (геолокация, контакты) без их ведома. Как поступить?",
    options: [
      "Сделать как просили — это же его приложение",
      "Отказаться и объяснить юридические/этические риски. Предложить прозрачный сбор с согласия",
      "Сделать, но добавить комментарий «// Заказчик заставил»"
    ],
    correct: 1,
    feedbackCorrect: "✅ Этика — часть профессионализма. GDPR, доверие пользователей и репутация важнее краткосрочной выгоды. Честный диалог с заказчиком укрепляет вашу позицию как эксперта.",
    feedbackWrong: "❌ Скрытое слежение ведёт к штрафам, блокировкам и потере репутации. Комментарии не спасут от ответственности. Вы — соавтор кода, и несёте за него ответственность."
  },
  {
    title: "Этап 14: Легаси-код",
    situation: "Нужно исправить баг в старом модуле без тестов и документации. Что делать в первую очередь?",
    options: [
      "Сразу править код — «и так сойдёт»",
      "Написать тесты на текущее поведение (characterization tests), потом вносить изменения",
      "Переписать модуль целиком за один день"
    ],
    correct: 1,
    feedbackCorrect: "✅ Тесты — ваш щит при работе с легаси. Characterization tests фиксируют текущую логику, позволяя безопасно вносить правки. Это правило Майкла Физерса: «Не трогай легаси без тестов».",
    feedbackWrong: "❌ Слепые правки в неизвестном коде почти гарантированно создадут новые баги. Полный переписывание без тестов — риск для стабильности и сроков проекта."
  },
  {
    title: "Этап 15: Коммуникация",
    situation: "Дизайнер прислал макет с анимацией, которую технически невозможно реализовать в срок. Что делать?",
    options: [
      "Молча сделать упрощённую версию и надеяться, что не заметят",
      "Сразу обсудить: показать технические ограничения, предложить альтернативу, согласовать компромисс",
      "Написать в чат: «Дизайнеры опять фантазируют»"
    ],
    correct: 1,
    feedbackCorrect: "✅ Открытый диалог до начала работы экономит время и нервы. Профессионал объясняет ограничения, предлагает решения и ищет баланс между дизайном и реализуемостью.",
    feedbackWrong: "❌ Скрытые упрощения ведут к конфликтам при сдаче. Публичная критика разрушает командную атмосферу. Уважение и сотрудничество — основа успеха."
  }
];

// Инициализация после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  console.log("Игра готова к запуску");
});

// Функция запуска игры (вызывается из HTML через onclick)
function startGame() {
  console.log("Начинаем игру...");
  document.getElementById('start-screen').classList.add('hidden');
  document.getElementById('game-screen').classList.remove('hidden');
  loadLevel(0);
}

// Загрузка уровня
function loadLevel(levelIndex) {
  currentLevel = levelIndex;
  
  // Обновление прогресса
  document.getElementById('current-level').textContent = currentLevel + 1;
  document.getElementById('level-title-display').textContent = levels[currentLevel].title;
  
  // Отображение ситуации
  document.getElementById('situation-text').innerHTML = levels[currentLevel].situation.replace(/\n/g, '<br>');
  
  // Генерация вариантов ответов (но не показываем их сразу)
  let optionsHTML = '';
  levels[currentLevel].options.forEach((option, idx) => {
    const letter = String.fromCharCode(65 + idx);
    optionsHTML += `
      <div class="option-card" data-index="${idx}" onclick="selectOption(${idx})">
        <div class="option-letter">${letter}</div>
        <div class="option-text">${option}</div>
        <div style="color: var(--text-muted);">
          <i class="fas fa-chevron-right"></i>
        </div>
      </div>
    `;
  });
  
  document.getElementById('options-grid').innerHTML = optionsHTML;
  
  // Скрываем варианты, показываем кнопку "Показать варианты"
  document.getElementById('show-options-container').classList.remove('hidden');
  document.getElementById('options-container').classList.add('hidden');
  
  // Скрываем обратную связь и кнопку "Следующий вопрос"
  const feedbackEl = document.getElementById('feedback');
  feedbackEl.classList.add('hidden');
  feedbackEl.innerHTML = '';
  
  const nextBtnContainer = document.getElementById('next-button-container');
  if (nextBtnContainer) nextBtnContainer.classList.add('hidden');
}

// Показ вариантов ответов
function showOptions() {
  document.getElementById('show-options-container').classList.add('hidden');
  document.getElementById('options-container').classList.remove('hidden');
}

// Обработка выбора варианта
function selectOption(selectedIndex) {
  const level = levels[currentLevel];
  const isCorrect = selectedIndex === level.correct;
  
  // Отключаем все карточки
  document.querySelectorAll('.option-card').forEach(card => {
    card.style.pointerEvents = 'none';
  });
  
  // Получаем все карточки
  const optionCards = document.querySelectorAll('.option-card');
  const selectedCard = optionCards[selectedIndex];
  
  // Обработка правильного ответа
  if (isCorrect) {
    health = Math.min(100, health + 10);
    correctAnswers++;
    selectedCard.classList.add('correct-answer');
    
    // Отображение обратной связи
    document.getElementById('feedback').innerHTML = `
      <div class="feedback-header">
        <i class="fas fa-check-circle"></i> Верное решение
      </div>
      <div class="feedback-content">
        ${level.feedbackCorrect}
      </div>
    `;
    document.getElementById('feedback').className = "feedback-card feedback-correct";
  } 
  // Обработка неправильного ответа
  else {
    health = Math.max(0, health - 10);
    selectedCard.classList.add('wrong-answer');
    
    // Подсвечиваем правильный ответ
    const correctCard = optionCards[level.correct];
    correctCard.classList.add('correct-answer');
    
    // Добавляем иконки
    addIcon(correctCard, 'correct-answer-icon', '<i class="fas fa-check"></i>');
    addIcon(selectedCard, 'wrong-answer-icon', '<i class="fas fa-times"></i>');
    
    // Отображение обратной связи
    document.getElementById('feedback').innerHTML = `
      <div class="feedback-header">
        <i class="fas fa-times-circle"></i> Неверный выбор
      </div>
      <div class="feedback-content">
        ${level.feedbackWrong}<br><br>
        <strong>Правильный ответ: ${String.fromCharCode(65 + level.correct)}</strong>
      </div>
    `;
    document.getElementById('feedback').className = "feedback-card feedback-wrong";
  }
  
  // Показываем обратную связь и обновляем здоровье
  document.getElementById('feedback').classList.remove('hidden');
  updateHealthDisplay();
  
  // Показываем кнопку "Следующий вопрос"
  showNextButton();
}

// Вспомогательная функция для добавления иконок
function addIcon(card, className, iconHTML) {
  const icon = document.createElement('div');
  icon.className = className;
  icon.innerHTML = iconHTML;
  card.appendChild(icon);
}

// Показ кнопки "Следующий вопрос"
function showNextButton() {
  let container = document.getElementById('next-button-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'next-button-container';
    container.className = 'next-button-container';
    
    const button = document.createElement('button');
    button.className = 'btn-next';
    button.innerHTML = `<i class="fas fa-arrow-right"></i> ${currentLevel < levels.length - 1 ? 'Следующий кейс' : 'Завершить практикум'}`;
    button.onclick = nextQuestion;
    
    container.appendChild(button);
    document.querySelector('.challenge-card').appendChild(container);
  } else {
    container.classList.remove('hidden');
    container.querySelector('button').innerHTML = `<i class="fas fa-arrow-right"></i> ${currentLevel < levels.length - 1 ? 'Следующий кейс' : 'Завершить практикум'}`;
  }
}

// Переход к следующему вопросу
function nextQuestion() {
  if (currentLevel < levels.length - 1) {
    loadLevel(currentLevel + 1);
  } else {
    showFinalScreen();
  }
}

// Обновление индикатора здоровья
function updateHealthDisplay() {
  document.getElementById('health').textContent = health + '%';
  const bar = document.getElementById('progress-bar');
  bar.style.width = health + '%';
  
  // Удаляем все классы состояния
  bar.classList.remove('health-good', 'health-warning', 'health-critical');
  
  // Добавляем нужный класс
  if (health > 70) bar.classList.add('health-good');
  else if (health > 30) bar.classList.add('health-warning');
  else bar.classList.add('health-critical');
}

// Финальный экран
function showFinalScreen() {
  document.getElementById('game-screen').classList.add('hidden');
  document.getElementById('final-screen').classList.remove('hidden');
  
  // Заполняем результаты
  document.getElementById('final-health').textContent = health + '%';
  document.getElementById('correct-answers').textContent = correctAnswers;
  document.getElementById('completed-levels').textContent = levels.length;
  
  // Определяем сообщение и иконку
  const messageEl = document.getElementById('final-message');
  const textEl = document.getElementById('final-text');
  const iconEl = document.getElementById('result-icon');
  
  if (health >= 80 && correctAnswers >= 8) {
    messageEl.textContent = "Проект спасён! Отличный результат!";
    textEl.innerHTML = "Вы отлично справились со всеми кейсами!";
    iconEl.innerHTML = '<i class="fas fa-trophy"></i>';
  } else if (health >= 50) {
    messageEl.textContent = "Хороший результат!";
    textEl.innerHTML = "Проект удалось спасти!";
    iconEl.innerHTML = '<i class="fas fa-medal"></i>';
  } else if (health > 0) {
    messageEl.textContent = "Проект в опасности, но вы получили ценный опыт!";
    textEl.innerHTML = "Есть над чем поработать, но вы на правильном пути!";
    iconEl.innerHTML = '<i class="fas fa-lightbulb"></i>';
  } else {
    messageEl.textContent = "Проект закрыт...";
    textEl.innerHTML = "Не расстраивайтесь — это ценный урок!";
    iconEl.innerHTML = '<i class="fas fa-book"></i>';
  }
}

// Функция для кнопки "Поделиться" (если есть в интерфейсе)
function shareResults() {
  const message = `Я прошёл практикум "Спаси проект Новичок" с результатом ${health}%!`;
  if (navigator.share) {
    navigator.share({
      title: 'Результаты практикума',
      text: message,
      url: window.location.href
    });
  } else {
    alert(`${message}\n\nПоделитесь ссылкой: ${window.location.href}`);
  }
}