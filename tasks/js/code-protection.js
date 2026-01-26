// code-protection.js
// Защита примеров кода от копирования (без иконок)

function protectCodeExamples() {
    console.log('🔒 Защита примеров кода...');
    
    // Находим только примеры кода в ЛЕВОЙ панели (story-panel)
    const storyPanel = document.querySelector('.panel.story-panel');
    
    if (!storyPanel) {
        console.log('Левая панель не найдена, повтор через 300мс');
        setTimeout(protectCodeExamples, 300);
        return;
    }
    
    // Ищем все примеры кода внутри левой панели
    const selectors = [
        '.example-block',
        'div[style*="background: #1a1a1a"]',
        'div[style*="font-family: Courier"]',
        'div[style*="font-family: monospace"]',
        'pre',
        'code'
    ];
    
    const codeExamples = storyPanel.querySelectorAll(selectors.join(', '));
    
    console.log(`Найдено ${codeExamples.length} примеров кода`);
    
    if (codeExamples.length === 0) {
        console.log('Примеры кода не найдены');
        return;
    }
    
    codeExamples.forEach((codeBlock, index) => {
        // ТОЛЬКО CSS-защита, без обработчиков событий
        codeBlock.style.userSelect = 'none';
        codeBlock.style.webkitUserSelect = 'none';
        codeBlock.style.MozUserSelect = 'none';
        codeBlock.style.msUserSelect = 'none';
        codeBlock.style.cursor = 'default';
        
        // Для всех дочерних элементов тоже
        const allChildren = codeBlock.querySelectorAll('*');
        allChildren.forEach(child => {
            child.style.userSelect = 'none';
            child.style.webkitUserSelect = 'none';
        });
        
        // Обработчик контекстного меню (правый клик)
        codeBlock.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            showSimpleMessage();
            return false;
        });
        
        // Обработчик попытки выделения (редко срабатывает в современных браузерах)
        codeBlock.addEventListener('selectstart', function(e) {
            e.preventDefault();
            return false;
        });
    });
    
    // Глобальный обработчик Ctrl+C для всей левой панели
    storyPanel.addEventListener('keydown', function(e) {
        if (e.ctrlKey && (e.key === 'c' || e.key === 'a' || e.key === 'x')) {
            // Проверяем, находится ли фокус в защищенном элементе
            const focused = document.activeElement;
            if (focused && isElementProtected(focused)) {
                e.preventDefault();
                showSimpleMessage();
                return false;
            }
        }
    });
}

// Проверка, защищен ли элемент
function isElementProtected(element) {
    const storyPanel = document.querySelector('.panel.story-panel');
    if (!storyPanel || !storyPanel.contains(element)) return false;
    
    // Проверяем, является ли элемент или его родитель примером кода
    return element.closest('.example-block, pre, code, div[style*="background: #1a1a1a"]');
}

// Простое сообщение без иконок
function showSimpleMessage() {
    if (window.showMessage) {
        window.showMessage(
            'Примеры кода защищены',
            'Копирование примеров отключено для лучшего обучения.<br>' +
            'Напиши код самостоятельно в правой панели!',
            'info'
        );
    }
}

// Автоматический запуск
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(protectCodeExamples, 500);
});

// Экспорт функций
window.protectCodeExamples = protectCodeExamples;