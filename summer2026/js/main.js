// Main JavaScript for the platform

// Save progress to localStorage
function saveProgress(lessonNumber, completed) {
    let progress = JSON.parse(localStorage.getItem('pythonCourseProgress')) || {};
    progress[lessonNumber] = completed;
    localStorage.setItem('pythonCourseProgress', JSON.stringify(progress));
    updateProgressBar();
}

// Load progress
function loadProgress(lessonNumber) {
    let progress = JSON.parse(localStorage.getItem('pythonCourseProgress')) || {};
    return progress[lessonNumber] || false;
}

// Update progress bar on main page
function updateProgressBar() {
    let progress = JSON.parse(localStorage.getItem('pythonCourseProgress')) || {};
    let completed = Object.values(progress).filter(v => v).length;
    let percentage = (completed / 5) * 100;
    
    const progressFill = document.getElementById('totalProgress');
    const progressText = document.getElementById('progressText');
    
    if (progressFill) {
        progressFill.style.width = percentage + '%';
        progressFill.textContent = Math.round(percentage) + '%';
    }
    
    if (progressText) {
        progressText.textContent = `Пройдено ${completed} из 5 уроков`;
    }
    
    // Mark completed lessons on main page
    document.querySelectorAll('.lesson-card').forEach((card, index) => {
        if (progress[index + 1]) {
            card.classList.add('completed');
        }
    });
}

// Quiz functionality
class Quiz {
    constructor(questions) {
        this.questions = questions;
        this.currentQuestion = 0;
        this.score = 0;
    }
    
    displayQuestion() {
        const question = this.questions[this.currentQuestion];
        const quizContainer = document.getElementById(`quiz-${this.currentQuestion}`);
        
        if (!quizContainer) return;
        
        let html = `
            <div class="quiz-question" data-correct="${question.correct}">
                <h3>${question.question}</h3>
                <div class="quiz-options">
        `;
        
        question.options.forEach((option, index) => {
            html += `<div class="quiz-option" data-index="${index}">${option}</div>`;
        });
        
        html += `
                </div>
                <button class="btn btn-primary check-answer-btn" onclick="quiz.checkAnswer(${this.currentQuestion})">
                    Проверить ответ
                </button>
                <div class="feedback" style="margin-top: 10px; font-weight: bold;"></div>
            </div>
        `;
        
        quizContainer.innerHTML = html;
        
        // Add click handlers
        quizContainer.querySelectorAll('.quiz-option').forEach(option => {
            option.addEventListener('click', function() {
                quizContainer.querySelectorAll('.quiz-option').forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
    }
    
    checkAnswer(questionIndex) {
        const quizContainer = document.getElementById(`quiz-${questionIndex}`);
        const questionDiv = quizContainer.querySelector('.quiz-question');
        const selectedOption = quizContainer.querySelector('.quiz-option.selected');
        const feedback = quizContainer.querySelector('.feedback');
        const correctIndex = parseInt(questionDiv.dataset.correct);
        
        if (!selectedOption) {
            feedback.textContent = 'Пожалуйста, выберите ответ!';
            feedback.style.color = '#f44336';
            return;
        }
        
        const selectedIndex = parseInt(selectedOption.dataset.index);
        
        if (selectedIndex === correctIndex) {
            selectedOption.classList.add('correct');
            feedback.textContent = '✅ Правильно! Молодец!';
            feedback.style.color = '#4CAF50';
            this.score++;
        } else {
            selectedOption.classList.add('incorrect');
            quizContainer.querySelectorAll('.quiz-option')[correctIndex].classList.add('correct');
            feedback.textContent = '❌ Не совсем. Правильный ответ выделен зеленым.';
            feedback.style.color = '#f44336';
        }
        
        // Save progress if all questions answered
        this.checkCompletion();
    }
    
    checkCompletion() {
        // Check if all questions in current lesson are answered
        const totalQuestions = document.querySelectorAll('.quiz-question').length;
        const answeredQuestions = document.querySelectorAll('.quiz-option.correct, .quiz-option.incorrect').length;
        
        if (answeredQuestions >= totalQuestions) {
            const lessonNum = window.location.pathname.match(/lesson(\d+)\.html/)[1];
            saveProgress(parseInt(lessonNum), true);
        }
    }
}

// Code runner simulation
function runCode() {
    const codeEditor = document.getElementById('codeEditor');
    const outputConsole = document.getElementById('outputConsole');
    
    if (!codeEditor || !outputConsole) return;
    
    const code = codeEditor.value;
    let output = '';
    
    // Simple Python code simulation
    try {
        // Simulate print statements
        const printMatches = code.match(/print\((.*?)\)/g);
        if (printMatches) {
            printMatches.forEach(match => {
                let value = match.replace(/print\(|\)/g, '').trim();
                // Remove quotes if string
                if ((value.startsWith('"') && value.endsWith('"')) || 
                    (value.startsWith("'") && value.endsWith("'"))) {
                    value = value.slice(1, -1);
                }
                output += value + '\n';
            });
        }
        
        // Simulate simple calculations
        if (code.includes('+') || code.includes('-') || code.includes('*') || code.includes('/')) {
            const calcMatch = code.match(/(\d+)\s*[\+\-\*\/]\s*(\d+)/);
            if (calcMatch && !code.includes('print')) {
                output += 'Результат: ' + eval(calcMatch[0]) + '\n';
            }
        }
        
        if (output === '') {
            output = 'Код выполнен успешно (нет вывода)';
        }
        
    } catch (error) {
        output = 'Ошибка: ' + error.message;
    }
    
    outputConsole.textContent = output;
}

// Download file function
function downloadFile(filename, content) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateProgressBar();
    
    // Mark current lesson as visited
    const lessonMatch = window.location.pathname.match(/lesson(\d+)\.html/);
    if (lessonMatch) {
        const lessonNum = parseInt(lessonMatch[1]);
        if (!loadProgress(lessonNum)) {
            saveProgress(lessonNum, false); // Mark as started
        }
    }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});