// progress.js
// Управление прогрессом - 7 УРОВНЕЙ + ФИНАЛ

function updateProgressBar(currentLevel) {
    const progressFill = document.querySelector('.progress-fill');
    const levelNumber = document.querySelector('.level-number');
    
    if (progressFill && levelNumber) {
        // Для финала (уровень 8) показываем 100%
        const displayLevel = currentLevel > 8 ? 8 : currentLevel;
        const progress = (displayLevel / 8) * 100;
        progressFill.style.width = `${progress}%`;
        levelNumber.textContent = currentLevel > 8 ? 'Завершено!' : `Уровень ${currentLevel}/8`;
    }
}

function getProgress() {
    return JSON.parse(localStorage.getItem('codeQuestProgress') || '{}');
}

function resetProgress() {
    if (confirm('Точно сбросить весь прогресс? Это действие нельзя отменить.')) {
        localStorage.removeItem('codeQuestProgress');
        loadLevel(1);
        showMessage('Прогресс сброшен', 'Начинаем заново!', 'info');
    }
}

// Показ статистики
function showProgressStats() {
    const progress = getProgress();
    const completedLevels = Object.keys(progress).filter(key => key.startsWith('level') && progress[key].completedAt);
    const totalLevels = 7; // Теперь 7 основных уровней
    
    let statsHTML = '<h2>📊 Ваша статистика</h2>';
    
    if (completedLevels.length === 0) {
        statsHTML += '<p>Вы еще не завершили ни одного уровня</p>';
    } else {
        const completionPercentage = Math.round((completedLevels.length / totalLevels) * 100);
        
        statsHTML += `
            <div style="text-align: center; margin: 20px 0;">
                <div style="font-size: 48px; margin: 10px 0;">${completionPercentage}%</div>
                <p>Завершено уровней: <strong>${completedLevels.length}/${totalLevels}</strong></p>
            </div>
        `;
        
        // Показываем иконки уровней
        statsHTML += '<div style="display: flex; gap: 15px; margin: 30px 0; justify-content: center; flex-wrap: wrap;">';
        
        for (let i = 1; i <= totalLevels; i++) {
            const levelData = progress[`level${i}`];
            let bgColor = 'var(--dark)';
            let emoji = '🔵';
            let tooltip = 'Не начат';
            let levelTitle = '';
            let levelEmoji = '';
            
            // Заголовки и эмодзи уровней
            switch(i) {
                case 1: 
                    levelTitle = 'Переменные';
                    levelEmoji = '📦';
                    break;
                case 2: 
                    levelTitle = 'Вычисления';
                    levelEmoji = '🧮';
                    break;
                case 3: 
                    levelTitle = 'Условия';
                    levelEmoji = '🔐';
                    break;
                case 4: 
                    levelTitle = 'Логика';
                    levelEmoji = '🎯';
                    break;
                case 5: 
                    levelTitle = 'Циклы';
                    levelEmoji = '🔄';
                    break;
                case 6: 
                    levelTitle = 'Циклы с условиями';
                    levelEmoji = '🔍';
                    break;
                case 7: 
                    levelTitle = 'Случайные числа';
                    levelEmoji = '🎲';
                    break;
            }
            
            if (levelData) {
                if (levelData.completionType === 'half') {
                    bgColor = 'var(--warning)';
                    emoji = '🟡';
                    tooltip = 'Пройден с подсказкой';
                } else {
                    bgColor = 'var(--success)';
                    emoji = '✅';
                    tooltip = 'Полностью пройден';
                }
            }
            
            statsHTML += `
                <div style="
                    width: 100px; 
                    height: 120px; 
                    border-radius: 15px; 
                    background: ${bgColor}; 
                    display: flex; 
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    border: 2px solid var(--primary);
                    position: relative;
                    cursor: help;
                    text-align: center;
                    padding: 10px;
                " 
                title="${tooltip} - ${levelTitle}">
                    <div style="font-size: 32px; margin-bottom: 10px;">
                        ${levelEmoji}
                    </div>
                    <div style="font-size: 12px; margin-bottom: 5px;">${levelTitle}</div>
                    <div style="font-size: 18px; font-weight: bold;">${i}</div>
                    <div style="position: absolute; top: -8px; right: -8px; font-size: 20px;">
                        ${emoji}
                    </div>
                </div>
            `;
        }
        
        statsHTML += '</div>';
        
        // Информация о финале
        if (progress.level8) {
            statsHTML += `
                <div style="background: rgba(56, 176, 0, 0.1); padding: 15px; border-radius: 10px; margin: 20px 0; text-align: center;">
                    <div style="font-size: 24px; margin: 10px 0;">🏆</div>
                    <p><strong>Миссия выполнена!</strong></p>
                    <p>Дата завершения: ${new Date(progress.level8.completedAt).toLocaleDateString('ru-RU')}</p>
                </div>
            `;
        }
    }
    
    // Кнопки управления
    statsHTML += `
        <div style="margin-top: 25px; display: flex; gap: 15px; justify-content: center;">
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

// Экспорт функций
window.resetProgress = resetProgress;
window.showProgressStats = showProgressStats;
window.updateProgressBar = updateProgressBar;
window.getProgress = getProgress;
window.saveProgress = saveProgress;

console.log('✅ Функции progress.js загружены');
