/* ==========================================
   🐍 PYTHON JUNIOR PLATFORM | js/app.js
   ========================================== */

// === 1. ГЛОБАЛЬНОЕ СОСТОЯНИЕ ===
const APP = {
  theme: localStorage.getItem('theme') || 'dark',
  xp: parseInt(localStorage.getItem('py_xp') || '0'),
  progress: JSON.parse(localStorage.getItem('py_progress') || '{}')
};

// Инициализация темы при загрузке
document.documentElement.setAttribute('data-theme', APP.theme);
document.querySelectorAll('.theme-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    APP.theme = APP.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', APP.theme);
    localStorage.setItem('theme', APP.theme);
  });
});

// Обновление UI статистики
function updateStats() {
  document.querySelectorAll('.xp-val').forEach(el => el.textContent = APP.xp);
  document.querySelectorAll('.progress-ring .fill').forEach(ring => {
    const lesson = ring.dataset.lesson;
    const completed = APP.progress[lesson];
    ring.style.strokeDasharray = '113';
    ring.style.strokeDashoffset = completed ? '0' : '113';
  });
}
updateStats();

// === 2. УВЕДОМЛЕНИЯ (TOAST) ===
function toast(msg, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.innerHTML = `<span>${type === 'success' ? '✅' : type === 'error' ? '❌' : '💡'}</span> ${msg}`;
  container.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 300); }, 2500);
}

// === 3. КОНФЕТТИ ===
function fireConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth; canvas.height = window.innerHeight;
  const particles = Array.from({length: 120}, () => ({
    x: Math.random() * canvas.width, y: -10,
    r: Math.random() * 6 + 2, dx: Math.random() * 4 - 2, dy: Math.random() * 4 + 2,
    color: `hsl(${Math.random()*360}, 80%, 60%)`
  }));
  let active = true;
  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p => {
      p.x += p.dx; p.y += p.dy; p.r *= 0.99;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle = p.color; ctx.fill();
    });
    if (particles.some(p => p.y < canvas.height) && active) requestAnimationFrame(draw);
    else ctx.clearRect(0,0,canvas.width,canvas.height);
  }
  draw(); setTimeout(() => active = false, 2500);
}

// === 4. БАЗА ВОПРОСОВ ПО УРОКАМ ===
const LESSON_QUIZZES = {
  "1": [
    { q: "1. Какой способ корректно считывает целое число?", options: ["A) input()", "B) int(input())", "C) str(input())", "D) input(int())"], correct: 1, hint: "input() возвращает строку. Оберни в int() для числа." },
    { q: "2. Что выведет программа?<br><code>x = 10<br>if x > 5: print(\"A\")<br>elif x > 8: print(\"B\")</code>", options: ["A) A", "B) B", "C) C", "D) AB"], correct: 0, hint: "if-elif выполняет только первый подходящий блок." },
    { q: "3. Как проверить, что число n чётное?", options: ["A) if n % 2 == 0:", "B) if n / 2 == 0:", "C) if n // 2 == 0:", "D) if n & 1:"], correct: 0 },
    { q: "4. Что выведет код?<br><code>age = 20<br>status = \"Взрослый\" if age >= 18 else \"Ребёнок\"</code>", options: ["A) True", "B) Взрослый", "C) Ребёнок", "D) Ошибка"], correct: 1 },
    { q: "5. Что выведет цикл?<br><code>i=0<br>while i<5:<br>&nbsp;&nbsp;if i==3:break<br>&nbsp;&nbsp;print(i,end=' ')<br>&nbsp;&nbsp;i+=1</code>", options: ["A) 0 1 2 3", "B) 0 1 2", "C) 0 1 2 3 4", "D) Бесконечный цикл"], correct: 1, hint: "break прерывает цикл до вывода 3." },
    { q: "6. Что делает continue в цикле?", options: ["A) Прерывает цикл полностью", "B) Пропускает остаток итерации и переходит к следующей", "C) Сбрасывает счётчик", "D) Приостанавливает программу"], correct: 1 },
    { q: "7. Результат?<br><code>a,b=5,10<br>if a>3 and b<20 or a==b:print(\"Да\")</code>", options: ["A) Да", "B) Нет", "C) Ошибка", "D) Зависит от версии"], correct: 0, hint: "and выше по приоритету, чем or." },
    { q: "8. Сколько раз сработает print?<br><code>for i in range(0,5,2):print(i)</code>", options: ["A) 2", "B) 3", "C) 4", "D) 5"], correct: 1, hint: "range(0,5,2) даёт: 0, 2, 4 → три значения." }
  ],
  "2": [
  {
    q: "1. Как создать строку в Python?",
    options: ["A) Только в двойных кавычках", "B) Только в одинарных", "C) В любых кавычках: '', \"\", \"\"\"\"\"\"", "D) С помощью функции str()"],
    correct: 2
  },
  {
    q: "2. Что выведет <code>'Python'[1]</code>?",
    options: ["A) 'P'", "B) 'y'", "C) 't'", "D) Ошибка"],
    correct: 1
  },
  {
    q: "3. Какой метод заменит все пробелы на подчёркивания?",
    options: ["A) .swap(' ', '_')", "B) .change(' ', '_')", "C) .replace(' ', '_')", "D) .fix(' ', '_')"],
    correct: 2
  },
  {
    q: "4. Что вернёт <code>'Привет'.upper()</code>?",
    options: ["A) 'привет'", "B) 'ПРИВЕТ'", "C) 'Привет'", "D) Ошибка"],
    correct: 1
  },
  {
    q: "5. Как получить последние 3 символа строки s?",
    options: ["A) s[0:3]", "B) s[-3:]", "C) s[3:]", "D) s[:-3]"],
    correct: 1,
    hint: "Отрицательные индексы считаются с конца строки."
  },
  {
    q: "6. Что делает метод .strip()?",
    options: ["A) Удаляет все пробелы из строки", "B) Удаляет пробелы только в начале", "C) Удаляет пробелы в начале и конце", "D) Разбивает строку на слова"],
    correct: 2
  }
]
};

// === 5. УНИВЕРСАЛЬНЫЙ ДВИЖОК ТЕСТОВ ===
class LessonQuiz {
  constructor(lessonId) {
    this.lessonId = lessonId;
    this.questions = LESSON_QUIZZES[lessonId] || [];
    this.currentIdx = 0;
    this.answers = JSON.parse(localStorage.getItem(`quiz_${lessonId}`) || '{}');
    delete this.answers.xp; // XP храним отдельно
  }

  init() {
    if (this.questions.length === 0) {
      document.getElementById('quizContainer').innerHTML = '<p style="text-align:center;color:var(--text-muted)">Тесты для этого урока скоро появятся! 🚧</p>';
      document.getElementById('quizNav').style.display = 'none';
      return;
    }
    this.renderHeader();
    this.renderQuestion();
    this.updateNav();
  }

  renderHeader() {
    const header = document.getElementById('quizHeader');
    if (!header) return;
    header.innerHTML = `
      <span>Вопрос <span id="qCurrent">1</span> из ${this.questions.length}</span>
      <div class="quiz-progress-bar"><div class="quiz-progress-fill" id="qProgress" style="width:${100/this.questions.length}%"></div></div>
      <span>⭐ <span id="qXP">0</span> XP</span>
    `;
  }

  renderQuestion() {
    const q = this.questions[this.currentIdx];
    const saved = this.answers[this.currentIdx];
    const container = document.getElementById('quizContainer');
    
    let html = `<div class="quiz-item">
      <div class="quiz-q">${q.q}</div><div class="quiz-options">`;
    
    q.options.forEach((opt, i) => {
      let cls = '';
      if (saved?.checked) {
        if (i === q.correct) cls = 'correct';
        else if (saved.selected === i) cls = 'wrong';
      } else if (saved?.selected === i) cls = 'selected';
      html += `<div class="quiz-opt ${cls}" data-idx="${i}">${opt}</div>`;
    });
    
    html += `</div>`;
    
    if (q.hint && !saved?.checked) {
      html += `<button class="hint-btn" onclick="window.quiz.toggleHint(this)">💡 Подсказка</button><div class="hint-text">${q.hint}</div>`;
    }
    
    if (!saved?.checked) {
      html += `<button class="btn btn-ghost check-btn" onclick="window.quiz.checkAnswer()" ${saved?.selected === undefined ? 'disabled' : ''}>Проверить</button>`;
    } else {
      html += `<div style="margin-top:10px;font-weight:600;color:${saved.isCorrect?'var(--success)':'var(--error)'}">
                ${saved.isCorrect?'✅ Правильно! +25 XP':'❌ Неверно'}
               </div>`;
    }
    html += `</div>`;
    container.innerHTML = html;
    
    // Обработчики выбора
    container.querySelectorAll('.quiz-opt').forEach(opt => {
      opt.onclick = () => {
        if (saved?.checked) return;
        container.querySelectorAll('.quiz-opt').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        this.answers[this.currentIdx] = { ...this.answers[this.currentIdx], selected: +opt.dataset.idx };
        container.querySelector('.check-btn').disabled = false;
      };
    });
    
    // Обновляем заголовок
    document.getElementById('qCurrent').textContent = this.currentIdx + 1;
    document.getElementById('qProgress').style.width = `${((this.currentIdx+1)/this.questions.length)*100}%`;
  }

  toggleHint(btn) {
    const hint = btn.nextElementSibling;
    hint.style.display = hint.style.display === 'block' ? 'none' : 'block';
  }

  checkAnswer() {
    const q = this.questions[this.currentIdx];
    const saved = this.answers[this.currentIdx];
    if (saved?.selected === undefined) return;
    
    const isCorrect = saved.selected === q.correct;
    this.answers[this.currentIdx] = { ...saved, checked: true, isCorrect };
    
    if (isCorrect && !saved.isCorrect) {
      APP.xp += 25;
      localStorage.setItem('py_xp', APP.xp);
      updateStats();
      toast('+25 XP! Правильно!', 'success');
    }
    
    this.save();
    this.renderQuestion();
  }

  navigate(dir) {
    const newIdx = this.currentIdx + dir;
    if (newIdx < 0 || newIdx >= this.questions.length) return;
    this.save();
    this.currentIdx = newIdx;
    this.renderQuestion();
    this.updateNav();
  }

  updateNav() {
    document.getElementById('prevBtn').disabled = this.currentIdx === 0;
    const isLast = this.currentIdx === this.questions.length - 1;
    document.getElementById('nextBtn').style.display = isLast ? 'none' : 'inline-flex';
    document.getElementById('finishBtn').style.display = isLast ? 'inline-flex' : 'none';
  }

  finish() {
    const total = this.questions.length;
    const answered = Object.values(this.answers).filter(a => a.checked).length;
    if (answered < total) {
      toast(`Ответьте на все вопросы (${answered}/${total})`, 'error');
      return;
    }
    
    // Бонус за прохождение урока
    if (!APP.progress[this.lessonId]) {
      APP.progress[this.lessonId] = true;
      APP.xp += 50;
      localStorage.setItem('py_progress', JSON.stringify(APP.progress));
      localStorage.setItem('py_xp', APP.xp);
      updateStats();
      fireConfetti();
      toast('🎉 Урок пройден! +50 XP бонус', 'success');
    }
    
    // Показываем итог
    const correct = Object.values(this.answers).filter(a => a.isCorrect).length;
    document.getElementById('quizHeader').style.display = 'none';
    document.getElementById('quizContainer').style.display = 'none';
    document.getElementById('quizNav').style.display = 'none';
    
    const summary = document.getElementById('quizSummary');
    summary.style.display = 'block';
    document.getElementById('finalScore').textContent = `${correct}/${total}`;
    
    const msg = document.getElementById('finalMessage');
    if (correct === total) msg.textContent = 'Идеально! Ты мастер! 🏆';
    else if (correct >= total * 0.75) msg.textContent = 'Отлично! Почти без ошибок! 🌟';
    else if (correct >= total * 0.5) msg.textContent = 'Хорошо! Повтори теорию 💪';
    else msg.textContent = 'Не сдавайся! Попробуй ещё раз 🚀';
  }

  save() {
    localStorage.setItem(`quiz_${this.lessonId}`, JSON.stringify(this.answers));
  }
}

// === 6. АВТО-ИНИЦИАЛИЗАЦИЯ ===
document.addEventListener('DOMContentLoaded', () => {
  const lessonId = window.location.pathname.match(/lesson(\d+)/)?.[1];
  if (lessonId && document.getElementById('quizContainer')) {
    window.quiz = new LessonQuiz(lessonId);
    quiz.init();
  }
});

// === 7. КАРУСЕЛЬ ПРАКТИЧЕСКИХ ЗАДАНИЙ ===
function initTasksCarousel() {
  const taskCards = document.querySelectorAll('.task-card');
  const prevBtn = document.getElementById('prevTask');
  const nextBtn = document.getElementById('nextTask');
  const currentEl = document.getElementById('currentTask');
  const totalEl = document.getElementById('totalTasks');
  const progressFill = document.getElementById('taskProgress');
  const dotsContainer = document.getElementById('carouselDots');
  
  if (!taskCards.length || !prevBtn || !nextBtn) return;
  
  let currentIndex = 0;
  const totalTasks = taskCards.length;
  
  // Обновляем общее количество заданий
  if (totalEl) totalEl.textContent = totalTasks;
  
  // Создаём точки-индикаторы
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalTasks; i++) {
      const dot = document.createElement('span');
      dot.className = `carousel-dot${i === 0 ? ' active' : ''}`;
      dot.dataset.index = i;
      dot.addEventListener('click', () => goToTask(i));
      dotsContainer.appendChild(dot);
    }
  }
  
  function updateCarousel() {
    // Показываем только активное задание
    taskCards.forEach((card, idx) => {
      card.classList.toggle('active', idx === currentIndex);
    });
    
    // Обновляем счётчик
    if (currentEl) currentEl.textContent = currentIndex + 1;
    
    // Обновляем прогресс-бар
    if (progressFill) {
      progressFill.style.width = `${((currentIndex + 1) / totalTasks) * 100}%`;
    }
    
    // Обновляем точки
    if (dotsContainer) {
      dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    }
    
    // Блокировка кнопок
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === totalTasks - 1;
    
    // Плавная прокрутка к началу секции на мобильных
    if (window.innerWidth < 768) {
      document.querySelector('.tasks-carousel-wrapper')?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  }
  
  function goToTask(index) {
    if (index < 0 || index >= totalTasks) return;
    currentIndex = index;
    updateCarousel();
  }
  
  // Обработчики кнопок
  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });
  
  nextBtn.addEventListener('click', () => {
    if (currentIndex < totalTasks - 1) {
      currentIndex++;
      updateCarousel();
    }
  });
  
  // Поддержка клавиатуры (стрелки)
  document.addEventListener('keydown', (e) => {
    if (!document.querySelector('.tasks-carousel-wrapper:hover')) return;
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
    if (e.key === 'ArrowRight' && currentIndex < totalTasks - 1) {
      currentIndex++;
      updateCarousel();
    }
  });
  
  // Инициализация
  updateCarousel();
}

// Запуск после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  initTasksCarousel();
  // ... остальная инициализация (квиз, скачивание и т.д.)
});

// === 8. УНИВЕРСАЛЬНЫЙ ТОГГЛ ПОДСКАЗОК (для заданий и квизов) ===
function toggleHint(btn) {
  const hint = btn.nextElementSibling;
  if (!hint) return;
  
  const isHidden = hint.style.display === 'none' || !hint.classList.contains('visible');
  
  // Поддержка двух режимов: через style.display И через класс .visible
  if (hint.style.display === 'none' || hint.style.display === '') {
    hint.style.display = 'block';
    hint.classList.add('visible');
    btn.classList.add('active');
    btn.innerHTML = btn.innerHTML.replace('Показать', 'Скрыть');
  } else {
    hint.style.display = 'none';
    hint.classList.remove('visible');
    btn.classList.remove('active');
    btn.innerHTML = btn.innerHTML.replace('Скрыть', 'Показать');
  }
}

// Делаем функцию глобально доступной для inline-onclick
window.toggleHint = toggleHint;