// Управление прогрессом для урока по спискам

// Функции уже определены в lists.js, но для совместимости экспортируем их
window.updateProgressBar = function() {
    const progressFill = document.querySelector('.progress-fill');
    const levelNumber = document.querySelector('.level-number');
    
    if (progressFill && levelNumber) {
        // Эта функция вызывается из lists.js
    }
};

window.resetProgress = function() {
    // Уже определена в lists.js
};

window.showProgressStats = function() {
    // Уже определена в lists.js как showStats()
    if (window.showStats) {
        window.showStats();
    }
};

console.log('✅ Функции прогресса загружены');