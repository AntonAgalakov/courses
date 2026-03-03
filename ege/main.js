let currentCourse = null;
let currentTaskIndex = 0;
let userAnswers = [];
let timeLeft = 0;
let timerInterval;
let feedbackTimeout = null;

const PASSWORD_HASH = "aa603447b478b77d2a0201eb802ec5a5f835d6f3eefc90a58dec77350789af9b";

// Хеширование строки через SHA-256
async function hashString(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    if (typeof COURSES_DATA === 'undefined') {
        console.error("Ошибка: Данные уроков не найдены.");
        document.body.innerHTML = "<h1 style='text-align:center; margin-top:50px; color: red'>Ошибка загрузки данных уроков</h1>";
        return;
    }

    const loginModal = document.getElementById('loginModal');
    const loginBtn = document.getElementById('loginBtn');
    const passwordInput = document.getElementById('passwordInput');
    const loginError = document.getElementById('loginError');

    async function attemptLogin() {
        const entered = passwordInput.value;
        const enteredHash = await hashString(entered);
        if (enteredHash === PASSWORD_HASH) {
            loginModal.style.display = 'none';
            document.getElementById('dashboard-view').style.display = 'block';
            renderDashboard();
        } else {
            loginError.style.display = 'block';
            passwordInput.value = '';
            passwordInput.focus();
        }
    }

    loginBtn.addEventListener('click', attemptLogin);
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            attemptLogin();
        }
    });

    passwordInput.focus();
});

function renderDashboard() {
    const grid = document.getElementById('coursesGrid');
    grid.innerHTML = '';
    
    COURSES_DATA.forEach(course => {
        const card = document.createElement('div');
        card.className = 'course-card';
        card.onclick = () => startCourse(course.id);
        
        const modeBadge = course.trainingMode 
            ? '<span style="background:#FEF3C7; color:#92400E; padding:2px 8px; border-radius:4px; font-size:0.7rem; margin-left:8px">Тренировка</span>' 
            : '';

        card.innerHTML = `
            <div>
                <span class="course-tag ${course.tagClass}">${course.tag}</span>
                <h3 class="course-title">${course.title} ${modeBadge}</h3>
                <p class="course-desc">${course.description}</p>
            </div>
            <div class="course-meta">
                <span>${course.tasks.length} заданий</span>
                <span>⏱ ${course.timeMinutes} мин</span>
            </div>
        `;
        grid.appendChild(card);
    });
}

function goHome() {
    clearInterval(timerInterval);
    if (feedbackTimeout) clearTimeout(feedbackTimeout);
    document.getElementById('dashboard-view').style.display = 'block';
    document.getElementById('exam-view').style.display = 'none';
    document.getElementById('header-right').innerHTML = '';
    document.getElementById('resultModal').style.display = 'none';
}

function startCourse(courseId) {
    currentCourse = COURSES_DATA.find(c => c.id === courseId);
    if (!currentCourse) return;

    currentTaskIndex = 0;
    userAnswers = new Array(currentCourse.tasks.length).fill("");
    timeLeft = currentCourse.timeMinutes * 60;

    document.getElementById('dashboard-view').style.display = 'none';
    document.getElementById('exam-view').style.display = 'flex';
    
    renderTaskGrid();
    loadTask(0);
    startTimer();
}

function renderTaskGrid() {
    const grid = document.getElementById('taskGrid');
    grid.innerHTML = '';
    currentCourse.tasks.forEach((task, index) => {
        const btn = document.createElement('button');
        btn.className = 'task-btn';
        btn.textContent = task.id;
        btn.id = `btn-${index}`;
        btn.onclick = () => switchTask(index);
        grid.appendChild(btn);
    });
}

function loadTask(index) {
    const task = currentCourse.tasks[index];
    document.getElementById('taskTitle').textContent = "Задание";
    document.getElementById('taskNumber').textContent = `№${task.id}`;
    document.getElementById('taskText').textContent = task.text;
    
    // Отображение картинки
    const taskImageContainer = document.getElementById('taskImageContainer');
    const taskImage = document.getElementById('taskImage');
    const taskImageCaption = document.getElementById('taskImageCaption');
    
    if (task.image) {
        taskImage.src = task.image;
        taskImageContainer.style.display = 'block';
        
        if (task.imageCaption) {
            taskImageCaption.textContent = task.imageCaption;
            taskImageCaption.style.display = 'block';
        } else {
            taskImageCaption.style.display = 'none';
        }
    } else {
        taskImageContainer.style.display = 'none';
        taskImage.src = '';
    }
    
    document.getElementById('userAnswer').value = userAnswers[index] || "";
    
    const oldFeedback = document.getElementById('answerFeedback');
    if (oldFeedback) oldFeedback.remove();

    if (feedbackTimeout) clearTimeout(feedbackTimeout);

    if (currentCourse.trainingMode && userAnswers[index].trim() !== "") {
        showImmediateFeedback(index, false);
    }
    
    document.querySelectorAll('.task-btn').forEach(b => b.classList.remove('active'));
    const activeBtn = document.getElementById(`btn-${index}`);
    activeBtn.classList.add('active');
    activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    currentTaskIndex = index;
    document.getElementById('userAnswer').focus();
}

function switchTask(index) {
    loadTask(index);
}

document.getElementById('userAnswer').addEventListener('input', (e) => {
    userAnswers[currentTaskIndex] = e.target.value;
    updateTaskStatus(currentTaskIndex);
    
    if (currentCourse.trainingMode) {
        if (feedbackTimeout) clearTimeout(feedbackTimeout);
        
        if (e.target.value.trim() === "") {
            const oldFeedback = document.getElementById('answerFeedback');
            if (oldFeedback) oldFeedback.remove();
            return;
        }

        feedbackTimeout = setTimeout(() => {
            showImmediateFeedback(currentTaskIndex);
        }, 800);
    }
});

function showImmediateFeedback(index, scroll = true) {
    const oldFeedback = document.getElementById('answerFeedback');
    if (oldFeedback) oldFeedback.remove();

    const task = currentCourse.tasks[index];
    const userAns = userAnswers[index].trim().toLowerCase();
    const correctAns = task.correctAnswer.trim().toLowerCase();
    const isCorrect = userAns === correctAns;

    const feedbackDiv = document.createElement('div');
    feedbackDiv.id = 'answerFeedback';
    feedbackDiv.className = `feedback-box ${isCorrect ? 'correct' : 'wrong'}`;
    
    feedbackDiv.innerHTML = `
        <div class="feedback-icon">${isCorrect ? '✓' : '✕'}</div>
        <div class="feedback-text">
            <strong>${isCorrect ? 'Верно!' : 'Неверно'}</strong>
            ${!isCorrect ? `<div class="feedback-hint">Правильный ответ: <b>${task.correctAnswer}</b></div>` : ''}
        </div>
    `;

    const answerArea = document.querySelector('.answer-area');
    answerArea.appendChild(feedbackDiv);

    if (scroll) {
        feedbackDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function updateTaskStatus(index) {
    const btn = document.getElementById(`btn-${index}`);
    if (userAnswers[index].trim() !== "") {
        btn.classList.add('solved');
    } else {
        btn.classList.remove('solved');
    }
}

function startTimer() {
    const timerEl = document.getElementById('timer');
    timerInterval = setInterval(() => {
        timeLeft--;
        const h = Math.floor(timeLeft / 3600);
        const m = Math.floor((timeLeft % 3600) / 60);
        const s = timeLeft % 60;
        timerEl.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            finishExam();
        }
    }, 1000);
}

function finishExam() {
    clearInterval(timerInterval);
    if (feedbackTimeout) clearTimeout(feedbackTimeout);
    
    if(!confirm("Завершить тест и показать результаты?")) {
        startTimer(); 
        return;
    }

    let score = 0;
    const list = document.getElementById('resultsList');
    list.innerHTML = '';

    currentCourse.tasks.forEach((task, index) => {
        const userAns = userAnswers[index].trim().toLowerCase();
        const correctAns = task.correctAnswer.trim().toLowerCase();
        const isCorrect = userAns === correctAns;
        if (isCorrect) score++;

        const div = document.createElement('div');
        div.className = 'result-item';
        div.innerHTML = `
            <span>Задание №${task.id}</span>
            <span style="color: ${isCorrect ? 'green' : 'red'}">
                ${isCorrect ? 'Верно' : `Ошибка (Правильно: ${task.correctAnswer})`}
            </span>
        `;
        list.appendChild(div);
    });

    document.getElementById('totalScore').textContent = `${score} из ${currentCourse.tasks.length}`;
    document.getElementById('resultModal').style.display = 'flex';
}