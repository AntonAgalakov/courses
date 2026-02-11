// Основной JavaScript для сайта-урока по спискам

console.log('✅ main.js загружен');

// Минимальные функции для работы
function playSound(soundName) {
    const sound = document.getElementById(`sound-${soundName}`);
    if (sound) {
        try {
            sound.currentTime = 0;
            sound.play();
        } catch (e) {
            // Игнорируем ошибки звука
            console.log('Звуки не настроены:', e);
        }
    }
}

// Функции для модального окна
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
                Закрыть
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

// Инициализация модального окна
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM загружен');
    
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close-modal');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Проверяем, что все нужные функции загружены
    setTimeout(() => {
        if (typeof loadContent === 'function') {
            console.log('Все функции загружены успешно');
        } else {
            console.error('Функция loadContent не найдена!');
        }
    }, 1000);
});

// Экспорт только необходимых функций
window.playSound = playSound;
window.showMessage = showMessage;
window.closeModal = closeModal;

console.log('✅ Все функции main.js экспортированы');