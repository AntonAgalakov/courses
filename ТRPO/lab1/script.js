// Общий пул всех возможных заданий (15 заданий для групп до 3 человек)
const allTasks = [
  {
    id: 1,
    title: "Посмотреть последние 5 строк лога app.log",
    description: "Выведите в терминал только последние 5 строк файла app.log, находящегося в директории project_a/log/.",
    category: "легкое" 
  },
  {
    id: 2,
    title: "Найти все предупреждения о медленных операциях", 
    description: "Найдите все строки, содержащие одновременно слова WARN и slow, во всех файлах с расширением .log в директории project_a/log/.",
    category: "среднее"
  },
  {
    id: 3,
    title: "Проверить наличие студента S075 в grades.txt",
    description: "Найдите в файле grades.txt любые упоминания идентификатора S075 (например, Студент S075 или S075: 85).",
    category: "легкое"
  },
  {
    id: 4,
    title: "Посчитать, сколько раз встречается оценка 100",
    description: "Подсчитайте, сколько раз в файле встречается число 100 как отдельная оценка (а не часть другого числа, например 1005).",
    category: "среднее"
  },
  {
    id: 5,
    title: "Много действий",
    description: `
      <strong>Выполните все действия последовательно:</strong><br><br>
      1. Перейдите в корневую директорию клонированного репозитория (где находятся папки project_a, .git и т.д.).<br>
      2. Создайте новую папку с именем <code>backup</code>.<br>
      3. Скопируйте все файлы одной командой из <code>project_a/log/</code> в папку <code>backup</code>, сохранив их имена. (Убедитесь, что копируются именно файлы, а не сама папка log)<br>
      4. Выведите подробный список файлов в <code>backup/</code> с отображением прав доступа (владелец, группа, разрешения). Ожидаемый результат: Таблица вида <code>-rw-r--r-- 1 user group ... app.log</code>.
    `,
    category: "практическое"
  },
  {
    id: 6,
    title: "Найти все ошибки (ERROR) во всех логах",
    description: "Выполните поиск всех строк, содержащих слово ERROR, во всех файлах с расширением .log в директории project_a/log/.",
    category: "легкое" 
  },
  {
    id: 7,
    title: "Вывести только предупреждения (WARN) из app.log",
    description: "Выведите в терминал все строки из app.log, находящегося в директории project_a/log/, содержащие уровень логирования WARN.",
    category: "легкое"
  },
  {
    id: 8,
    title: "Посмотреть последние 20 строк лога",
    description: "Выведите последние 20 строк из файла app.log, находящегося в директории project_a/log/.",
    category: "легкое" 
  },
  {
    id: 9,
    title: "Найти все события за 2025-05-06 10:30",
    description: "Найдите все строки в app.log, находящегося в директории project_a/log/, содержащие точную временную метку 2025-05-06 10:30 (учитывайте формат: 2025-05-06 10:30:XX).",
    category: "среднее" 
  },
  {
    id: 10,
    title: "Посчитать количество запусков программы «Program started» в app.log",
    description: "Подсчитайте, сколько раз в файле app.log, находящегося в директории project_a/log/, встречается точная фраза Program started.",
    category: "среднее" 
  },
  {
    id: 11,
    title: "Задание 11",
    description: "Найти все строки, содержащие слово 'failed' в файле app.log.",
    category: "легкое" 
  },
  {
    id: 12,
    title: "Посчитать, сколько раз встречается слово «Студент» в файле grades.txt",
    description: "Подсчитайте все вхождения слова «Студент» в файле grades.txt с учётом регистра («Студент», а не «студент»).",
    category: "среднее" 
  },
  {
    id: 13,
    title: "Найти все строки с оценками выше 90 в grades.txt",
    description: "Найдите все строки в файле grades.txt, где оценка больше 90.",
    category: "сложное" 
  }
];

// Настройки приложения
let currentStep = 0;
let totalSteps = 1;
let groupSize = 0;
let participantPosition = 0;
let participantName = '';
let myTasks = [];
let introductionText = '';
let conclusionText = '';
let currentTaskIndex = -1;
let reportGenerated = false; // Флаг для отслеживания формирования отчёта

// DOM элементы
const stepContent = document.getElementById('stepContent');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const downloadReportBtn = document.getElementById('downloadReportBtn');
const progressBar = document.getElementById('progressBar');

// Инициализация
renderStep();

prevBtn.addEventListener('click', () => {
  if (currentStep > 0) {
    saveCurrentStep();
    currentStep--;
    renderStep();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentStep < totalSteps - 1) {
    if (!saveCurrentStep()) return;
    currentStep++;
    renderStep();
  }
});

submitBtn.addEventListener('click', () => {
  if (saveCurrentStep()) {
    generateReport();
  }
});

// Обработчик кнопки скачивания отчёта
downloadReportBtn.addEventListener('click', () => {
  generateReport();
});

// === Функция для распределения заданий ===
function assignTasks(groupSize, position) {
  // Задание 5 обязательно для всех
  const mandatoryTask = allTasks.find(task => task.id === 5);
  
  // Определяем наборы заданий для разных позиций
  const taskSets = {
    // Индивидуальная работа
    1: {
      1: [1, 4, 6, 12]  // задания: 1, 4, 6, 12
    },
    // Группа из 2 человек
    2: {
      1: [1, 2, 7, 13],  // участник 1
      2: [3, 9, 8, 10]   // участник 2
    },
    // Группа из 3 человек
    3: {
      1: [1, 2, 11, 13], // участник 1
      2: [3, 4, 6, 12],  // участник 2
      3: [7, 9, 8, 10]   // участник 3
    }
  };
  
  // Получаем ID заданий для текущей позиции
  const taskIds = [5, ...(taskSets[groupSize]?.[position] || [])];
  
  // Находим задания по ID
  const assignedTasks = taskIds.map(id => 
    allTasks.find(task => task.id === id)
  ).filter(task => task); // Фильтруем на случай если задание не найдено
  
  // Добавляем поля для хранения данных студента
  return assignedTasks.map(task => ({
    ...task,
    code: '',
    comment: '',
    screenshotFile: null,
    screenshotName: '',
    previewUrl: ''
  }));
}

// === Рендер шага ===
function renderStep() {
  const progressPercent = ((currentStep + 1) / totalSteps) * 100;
  progressBar.style.width = `${progressPercent}%`;
  
  const progressText = document.getElementById('progressText');
  if (progressText) {
    progressText.textContent = `${currentStep + 1}/${totalSteps}`;
  }
  
  updateStepIndicator();

  // Управление видимостью кнопок
  prevBtn.style.display = currentStep === 0 ? 'none' : 'inline-flex';
  nextBtn.style.display = currentStep < totalSteps - 1 ? 'inline-flex' : 'none';

  // Управление видимостью кнопок на финальном шаге
  if (currentStep === totalSteps - 1) {
    if (reportGenerated) {
      // Если отчет уже сформирован, показываем кнопку скачивания
      submitBtn.style.display = 'none';
      downloadReportBtn.style.display = 'inline-flex';
    } else {
      // Если отчет еще не сформирован, показываем кнопку формирования
      submitBtn.style.display = 'inline-flex';
      downloadReportBtn.style.display = 'none';
    }
  } else {
    submitBtn.style.display = 'none';
    downloadReportBtn.style.display = 'none';
  }
  
  let html = '';

  // Шаг 0: Ввод количества человек в группе
  if (currentStep === 0) {
    html = `
      <div class="step active">
        <h2>Настройка группы</h2>
        <p>Практическую работу можно выполнять индивидуально или в группах до 3 человек.</p>
        
        <div class="group-selection">
          <div class="group-options">
            <div class="group-option ${groupSize === 1 ? 'selected' : ''}" onclick="selectGroupSize(1)">
              <div class="option-icon">👤</div>
              <div class="option-title">Индивидуально</div>
              <div class="option-desc">1 человек, 5 заданий</div>
            </div>
            
            <div class="group-option ${groupSize === 2 ? 'selected' : ''}" onclick="selectGroupSize(2)">
              <div class="option-icon">👥</div>
              <div class="option-title">Группа из 2-х</div>
              <div class="option-desc">10 заданий, по 5 на человека</div>
            </div>
            
            <div class="group-option ${groupSize === 3 ? 'selected' : ''}" onclick="selectGroupSize(3)">
              <div class="option-icon">👨‍👩‍👧</div>
              <div class="option-title">Группа из 3-х</div>
              <div class="option-desc">15 заданий, по 5 на человека</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  // Шаг 1: Выбор позиции в группе (только для группы > 1)
  else if (currentStep === 1 && groupSize > 1) {
    html = `
      <div class="step active">
        <h2>Выберите ваш номер в группе</h2>
        <p>Выберите, какой вы по счёту участник в группе из ${groupSize} человек.</p>
        
        <div class="position-selection">
          ${Array.from({ length: groupSize }, (_, i) => {
            const position = i + 1;
            return `
              <div class="position-option ${participantPosition === position ? 'selected' : ''}" 
                   onclick="selectParticipantPosition(${position})">
                <div class="position-icon">${position}</div>
                <div class="position-title">Участник ${position}</div>
                <div class="position-desc">Получит 5 уникальных заданий</div>
              </div>
            `;
          }).join('')}
        </div>
        
        <div class="group-info" style="margin-top: 24px; padding: 16px; background: var(--accent-lighter); border-radius: 12px; border-left: 4px solid var(--accent);">
          <p><strong>Важно:</strong></p>
          <p>• Выберите ваш уникальный номер в группе</p>
          <p>• Другие участники должны выбрать другие номера</p>
          <p>• Каждый номер получает разные задания, которые не пересекаются</p>
          <p>• После выбора номера вы увидите свои задания</p>
        </div>
      </div>
    `;
  }
  // Шаг 1 для индивидуальной работы или шаг 2 для групповой: Ввод фамилии
  else if ((groupSize === 1 && currentStep === 1) || (groupSize > 1 && currentStep === 2)) {
    html = `
      <div class="step active">
        <h2>Введите вашу фамилию</h2>
        ${groupSize > 1 ? `<p>Участник ${participantPosition} из ${groupSize}</p>` : ''}
        
        <input type="text" class="input-field" id="participantName" 
               placeholder="Только фамилия (например: Иванов)" 
               value="${participantName}" />
        
        <div id="nameValidation" style="margin-top: 10px; font-size: 0.9rem; color: var(--danger); display: none;">
          ⚠️ Пожалуйста, введите только фамилию на русском языке
        </div>
        
        <p class="upload-hint" style="margin-top: 16px;">
          После ввода фамилии вы перейдёте к выполнению ваших заданий.<br>
        </p>
      </div>
    `;
  }
  // Шаги для выполнения заданий
  else if (currentStep < totalSteps - 1) {
    let taskIndex;
    if (groupSize === 1) {
      taskIndex = currentStep - 2;
    } else {
      taskIndex = currentStep - 3;
    }
    
    currentTaskIndex = taskIndex;
    const task = myTasks[taskIndex];
    
    if (!task) {
      html = `<div class="step active"><p>Ошибка загрузки задания</p></div>`;
    } else {
      html = `
        <div class="step active">
          <div class="task-header-info">
            <span class="task-counter">Задание ${taskIndex + 1} из 5</span>
            ${groupSize > 1 ? `<span class="participant-badge">Участник ${participantPosition}</span>` : ''}
          </div>
          
          <h2>${task.title}</h2>
          <p>${task.description}</p>
          
          <textarea class="code-input" id="code" placeholder="Ваш код... (если не справились, можно оставить пустым)">${task.code || ''}</textarea>

          <label style="display: block; margin: 16px 0 8px; color: var(--text-light);">💬 Комментарий (необязательно)</label>
          <textarea class="code-input" id="comment" placeholder="Например: программа работает корректно... или объясните почему не удалось выполнить задание" rows="3">${task.comment || ''}</textarea>

          <div class="upload-area">
            <label>📎 Прикрепить скриншот результата (необязательно)</label>
            <p class="upload-hint">Нажмите Ctrl+V (Cmd+V), чтобы вставить скриншот из буфера</p>
            <input type="file" id="screenshot" accept="image/*" />
          </div>

          <div class="preview-container" id="previewContainer">
            ${task.previewUrl ? `
              <img src="${task.previewUrl}" alt="Превью" />
              <span class="preview-label">Файл: ${task.screenshotName}</span>
            ` : ''}
          </div>
        </div>
      `;
    }
  }
  // Финальный шаг: введение и вывод
  else {
    const completedCount = myTasks.filter(t => t.code.trim() !== '').length;
    const reportId = generateEncryptedReportId();
    
    html = `
      <div class="step active">
        <h2>Финальные данные</h2>
        
        <p>Добавьте введение и вывод для вашего отчёта.</p>
        
        <label style="display: block; margin: 24px 0 8px; color: var(--text-light); font-weight: 500;">📝 Введение (необязательно)</label>
        <textarea class="code-input" id="introduction" placeholder="Введите краткое введение к практической работе..." rows="4">${introductionText}</textarea>
        
        <label style="display: block; margin: 16px 0 8px; color: var(--text-light); font-weight: 500;">📝 Вывод (необязательно)</label>
        <textarea class="code-input" id="conclusion" placeholder="Введите выводы по результатам выполнения работы..." rows="4">${conclusionText}</textarea>
        
        <div class="completion-check" style="margin-top: 24px;">
          <p><strong>Готовность к формированию отчёта:</strong></p>
          <div style="margin: 4px 0; padding: 8px; background: ${completedCount > 0 ? 'var(--success-light)' : 'var(--border-lighter)'}; border-radius: 8px;">
            ${completedCount > 0 ? '✅' : '⚠️'} Заданий выполнено: ${completedCount}/5
          </div>
          <div style="margin-top: 12px; font-size: 0.9rem; color: var(--text-light);">
            <strong>Примечание:</strong> Вы можете сформировать отчёт даже если выполнили не все задания.
          </div>
        </div>
        
        <div class="report-instruction" style="margin-top: 32px; padding: 20px; background: var(--success-light); border-radius: 12px; border: 1px solid var(--success); text-align: center;">
          <p style="font-weight: 600; color: var(--success); margin-bottom: 12px;">Всё готово!</p>
          <p>Нажмите кнопку <strong>"Сформировать отчёт"</strong> ниже, чтобы скачать ваш отчёт в формате HTML.</p>
          <p class="upload-hint" style="margin-top: 8px;">Отчёт будет автоматически скачан на ваш компьютер</p>
        </div>
      </div>
    `;
  }

  stepContent.innerHTML = html;

  if ((groupSize === 1 && currentStep >= 2 && currentStep < totalSteps - 1) || 
      (groupSize > 1 && currentStep >= 3 && currentStep < totalSteps - 1)) {
    const fileInput = document.getElementById('screenshot');
    if (fileInput) {
      fileInput.addEventListener('change', handleFileSelect);
    }
    document.removeEventListener('paste', handlePaste);
    document.addEventListener('paste', handlePaste);
  }
  
  // Инициализация валидации после рендера шага
  initValidationAfterRender();
}

// === Сохранение текущего шага ===
function saveCurrentStep() {
  // Шаг 0: выбор группы
  if (currentStep === 0) {
    if (groupSize === 0) {
      alert('Пожалуйста, выберите размер группы.');
      return false;
    }
    return true;
  }
  
  // Шаг 1 для групповой работы: выбор позиции
  if (currentStep === 1 && groupSize > 1) {
    if (participantPosition === 0) {
      alert('Пожалуйста, выберите ваш номер в группе.');
      return false;
    }
    return true;
  }
  
  // Ввод фамилии участника
  if ((groupSize === 1 && currentStep === 1) || (groupSize > 1 && currentStep === 2)) {
    const nameEl = document.getElementById('participantName');
    const validationEl = document.getElementById('nameValidation');
    
    if (nameEl) {
      const name = nameEl.value.trim();
      
      // Проверка на пустое значение
      if (!name) {
        if (validationEl) {
          validationEl.textContent = '⚠️ Пожалуйста, введите вашу фамилию';
          validationEl.style.display = 'block';
        }
        return false;
      }
      
      // Проверка, что это одно слово на русском языке
      // Разрешаем только русские буквы, возможно с дефисом (для двойных фамилий)
      const russianNameRegex = /^[А-Яа-яЁё][А-Яа-яЁё\-]*[А-Яа-яЁё]$/;
      
      if (!russianNameRegex.test(name)) {
        if (validationEl) {
          validationEl.textContent = '⚠️ Пожалуйста, введите корректную фамилию на русском языке (одно слово, можно с дефисом)';
          validationEl.style.display = 'block';
        }
        return false;
      }
      
      // Проверка, что это одно слово (нет пробелов)
      if (name.includes(' ')) {
        if (validationEl) {
          validationEl.textContent = '⚠️ Пожалуйста, введите только фамилию без пробелов';
          validationEl.style.display = 'block';
        }
        return false;
      }
      
      // Скрываем сообщение об ошибке, если оно было
      if (validationEl) {
        validationEl.style.display = 'none';
      }
      
      // Сохраняем фамилию с заглавной первой буквой
      participantName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    }
    return true;
  }
  
  // Сохранение задания
  if (currentStep < totalSteps - 1) {
    const codeEl = document.getElementById('code');
    const commentEl = document.getElementById('comment');
    
    let taskIndex;
    if (groupSize === 1) {
      taskIndex = currentStep - 2;
    } else {
      taskIndex = currentStep - 3;
    }
    
    if (myTasks[taskIndex]) {
      if (codeEl) myTasks[taskIndex].code = codeEl.value || '';
      if (commentEl) myTasks[taskIndex].comment = commentEl.value || '';
    }
    
    return true;
  }
  
  // Финальный шаг: сохранение введения и вывода
  const introEl = document.getElementById('introduction');
  const conclEl = document.getElementById('conclusion');
  
  if (introEl) introductionText = introEl.value.trim() || '';
  if (conclEl) conclusionText = conclEl.value.trim() || '';
  
  if (!participantName) {
    alert('Пожалуйста, введите вашу фамилию.');
    return false;
  }
  
  return true;
}

// === Обновление индикаторов шагов ===
function updateStepIndicator() {
  const stepIndicator = document.getElementById('stepIndicator');
  if (!stepIndicator) return;
  
  stepIndicator.innerHTML = '';
  
  for (let i = 0; i < totalSteps; i++) {
    const dot = document.createElement('div');
    dot.className = `step-dot ${i === currentStep ? 'active' : ''}`;
    stepIndicator.appendChild(dot);
  }
}

// === Выбор размера группы ===
function selectGroupSize(size) {
  groupSize = size;
  participantPosition = 1;
  reportGenerated = false; // Сбрасываем флаг при выборе новой группы
  participantName = ''; // Очищаем фамилию при смене группы
  
  // Пересчитываем общее количество шагов
  if (groupSize === 1) {
    totalSteps = 1 + 1 + 5 + 1; // 8 шагов
  } else {
    totalSteps = 1 + 1 + 1 + 5 + 1; // 9 шагов
  }
  
  myTasks = assignTasks(groupSize, participantPosition);
  
  currentStep = 0;
  renderStep();
}

// === Выбор позиции участника ===
function selectParticipantPosition(position) {
  participantPosition = position;
  myTasks = assignTasks(groupSize, participantPosition);
  renderStep();
}

// === Обработка файла ===
function handleFileSelect(e) {
  const file = e.target.files[0];
  if (file && file.type.startsWith('image/')) {
    saveScreenshot(file);
  }
}

// === Вставка из буфера ===
function handlePaste(e) {
  if (currentTaskIndex === -1) return;
  
  const items = (e.clipboardData || window.clipboardData).items;
  if (!items) return;
  
  for (let i = 0; i < items.length; i++) {
    if (items[i].type.indexOf('image') !== -1) {
      const blob = items[i].getAsFile();
      if (blob) {
        const ext = blob.type.split('/')[1] || 'png';
        const name = `screenshot_pasted_${Date.now()}.${ext}`;
        const file = new File([blob], name, { type: blob.type });
        saveScreenshot(file);
        e.preventDefault();
        break;
      }
    }
  }
}

// === Сохранение скриншота ===
function saveScreenshot(file) {
  if (currentTaskIndex === -1) return;
  
  const reader = new FileReader();
  reader.onload = function(e) {
    if (myTasks[currentTaskIndex]) {
      myTasks[currentTaskIndex].previewUrl = e.target.result;
      myTasks[currentTaskIndex].screenshotFile = file;
      myTasks[currentTaskIndex].screenshotName = file.name;
      renderStep();
    }
  };
  reader.readAsDataURL(file);
}

// === Валидация в реальном времени для поля фамилии ===
function setupNameValidation() {
  const nameInput = document.getElementById('participantName');
  if (nameInput) {
    nameInput.addEventListener('input', function() {
      const validationEl = document.getElementById('nameValidation');
      if (validationEl) {
        validationEl.style.display = 'none';
      }
    });
  }
}

// === Инициализация валидации после рендера шага ===
function initValidationAfterRender() {
  if ((groupSize === 1 && currentStep === 1) || (groupSize > 1 && currentStep === 2)) {
    // Вызываем setupNameValidation после того, как DOM обновился
    setTimeout(setupNameValidation, 0);
  }
}

// === ПРОСТОЕ ОБРАТИМОЕ ШИФРОВАНИЕ ===
function generateEncryptedReportId() {
  const now = new Date();
  
  // Извлекаем фамилию (уже должна быть одна фамилия)
  const lastName = participantName.trim();
  
  // Создаем данные для шифрования в формате: ФАМИЛИЯ|ММДДЧЧММ
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const dateStr = `${month}${day}${hours}${minutes}`;
  
  // Простое кодирование: base64 URL-safe
  const dataToEncode = `${lastName}|${dateStr}`;
  const encoded = btoa(unescape(encodeURIComponent(dataToEncode)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
  
  // Формат: RPT-<закодированные_данные>
  return `RPT-${encoded}`;
}

// === HTML-отчёт (СОВРЕМЕННЫЙ ДИЗАЙН) ===
function generateReport() {
  if (!participantName) {
    alert('Пожалуйста, введите вашу фамилию на предыдущем шаге.');
    return;
  }
  
  const introEl = document.getElementById('introduction');
  const conclEl = document.getElementById('conclusion');
  
  if (introEl) introductionText = introEl.value.trim() || '';
  if (conclEl) conclusionText = conclEl.value.trim() || '';
  
  const reportId = generateEncryptedReportId();
  const completedCount = myTasks.filter(t => t.code.trim() !== '').length;
  
  let report = `
    <!DOCTYPE html>
    <html lang="ru">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Отчёт: Практическая работа №1</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
      <style>
        /* Ваша оригинальная цветовая палитра */
        :root {
          --primary: #2563eb;
          --primary-dark: #1d4ed8;
          --primary-light: #dbeafe;
          --secondary: #7c3aed;
          --accent: #0ea5e9;
          --success: #10b981;
          --warning: #f59e0b;
          --danger: #ef4444;
          --dark: #1e293b;
          --light: #f8fafc;
          --gray: #64748b;
          --gray-light: #e2e8f0;
          --radius: 6px;
          --shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
          color: var(--dark);
          line-height: 1.5;
          padding: 15px;
          background: var(--light);
        }
        
        .report-container {
          max-width: 1000px;
          margin: 0 auto;
          background: white;
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          overflow: hidden;
        }
        
        /* Компактная шапка с вашей палитрой */
        .report-header {
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
          color: white;
          padding: 20px 25px;
          border-bottom: 4px solid var(--accent);
        }
        
        .header-main {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 15px;
        }
        
        .header-left {
          flex: 1;
        }
        
        .subject {
          font-size: 1.6rem;
          font-weight: 700;
          margin-bottom: 5px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .subject i {
          font-size: 1.4rem;
          color: var(--primary-light);
        }
        
        .work-info {
          font-size: 0.9rem;
          opacity: 0.9;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }
        
        .header-right {
          text-align: right;
        }
        
        .student-name {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 5px;
          display: flex;
          align-items: center;
          gap: 8px;
          justify-content: flex-end;
        }
        
        .student-details {
          font-size: 0.9rem;
          opacity: 0.9;
        }
        
        /* Статистика в компактной строке */
        .header-stats {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
          margin-top: 15px;
          padding-top: 15px;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .stat-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: var(--radius);
        }
        
        .stat-icon {
          font-size: 1rem;
          color: var(--accent);
        }
        
        .stat-content {
          display: flex;
          flex-direction: column;
        }
        
        .stat-label {
          font-size: 0.75rem;
          opacity: 0.8;
        }
        
        .stat-value {
          font-size: 0.9rem;
          font-weight: 600;
        }
        
        .report-id {
          margin-top: 15px;
          padding: 10px;
          background: rgba(255, 255, 255, 0.15);
          border-radius: var(--radius);
          font-family: 'Monaco', 'Consolas', monospace;
          font-size: 0.85rem;
          word-break: break-all;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .report-id i {
          color: var(--accent);
          flex-shrink: 0;
        }
        
        /* Контент с минимальными отступами */
        .report-content {
          padding: 20px 25px;
        }
        
        .section-title {
          font-size: 1.3rem;
          color: var(--primary);
          margin: 25px 0 15px;
          padding-bottom: 8px;
          border-bottom: 2px solid var(--gray-light);
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .section-title i {
          color: var(--accent);
          font-size: 1.1rem;
        }
        
        .intro-text, .conclusion-text {
          background: var(--primary-light);
          padding: 15px;
          border-radius: var(--radius);
          margin-bottom: 20px;
          line-height: 1.6;
          border-left: 4px solid var(--primary);
        }
        
        .tasks-grid {
          display: grid;
          gap: 15px;
        }
        
        .task-card {
          background: white;
          border-radius: var(--radius);
          padding: 18px;
          border: 1px solid var(--gray-light);
          position: relative;
          overflow: hidden;
        }
        
        .task-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: var(--primary);
        }
        
        .task-header {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
          gap: 12px;
        }
        
        .task-number {
          background: var(--primary);
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1rem;
          flex-shrink: 0;
        }
        
        .task-title {
          font-size: 1.2rem;
          color: var(--dark);
          flex-grow: 1;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .task-title i {
          color: var(--gray);
          font-size: 0.9rem;
        }
        
        .task-description {
          color: var(--gray);
          margin-bottom: 15px;
          line-height: 1.5;
          font-size: 0.95rem;
        }
        
        .code-block {
          background: #1a202c;
          color: #e2e8f0;
          padding: 12px;
          border-radius: 4px;
          margin: 12px 0;
          font-family: 'Monaco', 'Consolas', monospace;
          white-space: pre-wrap;
          overflow-x: auto;
          font-size: 0.85rem;
          line-height: 1.4;
          border: 1px solid #2d3748;
        }
        
        .comment-box {
          background: #f0f9ff;
          border-left: 3px solid var(--accent);
          padding: 12px;
          margin: 12px 0;
          border-radius: 0 4px 4px 0;
        }
        
        .comment-box strong {
          color: var(--accent);
          display: block;
          margin-bottom: 5px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .screenshot-container {
          margin: 12px 0;
          text-align: center;
        }
        
        .screenshot-image {
          max-width: 100%;
          max-height: 300px;
          border-radius: 4px;
          border: 1px solid var(--gray-light);
        }
        
        .screenshot-label {
          font-size: 0.85rem;
          color: var(--gray);
          margin-top: 5px;
          display: flex;
          align-items: center;
          gap: 5px;
          justify-content: center;
        }
        
        /* Компактный футер */
        .report-footer {
          background: var(--dark);
          color: white;
          padding: 15px 25px;
          border-top: 1px solid var(--gray-light);
        }
        
        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 10px;
        }
        
        .footer-section h4 {
          color: var(--primary-light);
          margin-bottom: 10px;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .footer-section p {
          color: #cbd5e1;
          margin-bottom: 5px;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .footer-section i {
          width: 16px;
          color: var(--accent);
        }
        
        .footer-bottom {
          text-align: center;
          padding-top: 10px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          color: #94a3b8;
          font-size: 0.8rem;
        }
        
        /* Стили для печати (PDF/A4) с минимальными отступами */
        @media print {
          @page {
            size: A4;
            margin: 10mm;
          }
          
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          body {
            background: white !important;
            color: black !important;
            padding: 0 !important;
            margin: 0 !important;
            font-size: 10pt;
            line-height: 1.3;
          }
          
          .report-container {
            max-width: 100% !important;
            margin: 0 !important;
            box-shadow: none !important;
            border: none !important;
          }
          
          /* Минималистичная шапка для печати */
          .report-header {
            padding: 12px 15px !important;
            margin-bottom: 5px !important;
          }
          
          .subject {
            font-size: 14pt !important;
            margin-bottom: 3px !important;
          }
          
          .work-info {
            font-size: 9pt !important;
            margin-bottom: 5px !important;
          }
          
          .student-name {
            font-size: 11pt !important;
            margin-bottom: 3px !important;
          }
          
          .student-details {
            font-size: 9pt !important;
          }
          
          .header-stats {
            margin-top: 10px !important;
            padding-top: 10px !important;
            gap: 10px !important;
          }
          
          .stat-item {
            padding: 5px 8px !important;
          }
          
          .stat-value {
            font-size: 9pt !important;
          }
          
          .stat-label {
            font-size: 8pt !important;
          }
          
          .report-id {
            margin-top: 10px !important;
            padding: 8px !important;
            font-size: 8pt !important;
          }
          
          .report-content {
            padding: 15px !important;
          }
          
          .section-title {
            font-size: 12pt !important;
            margin: 18px 0 10px !important;
            page-break-after: avoid;
          }
          
          .intro-text, .conclusion-text {
            padding: 12px !important;
            margin-bottom: 15px !important;
            font-size: 10pt !important;
            page-break-inside: avoid;
          }
          
          .tasks-grid {
            gap: 12px !important;
          }
          
          .task-card {
            padding: 12px !important;
            page-break-inside: avoid;
            break-inside: avoid;
          }
          
          .task-number {
            width: 28px !important;
            height: 28px !important;
            font-size: 9pt !important;
          }
          
          .task-title {
            font-size: 11pt !important;
          }
          
          .task-description {
            font-size: 9pt !important;
            margin-bottom: 12px !important;
          }
          
          .code-block {
            padding: 10px !important;
            font-size: 8pt !important;
            margin: 10px 0 !important;
            page-break-inside: avoid;
          }
          
          .comment-box {
            padding: 10px !important;
            font-size: 9pt !important;
            margin: 10px 0 !important;
            page-break-inside: avoid;
          }
          
          .screenshot-image {
            max-height: 200px !important;
            page-break-inside: avoid;
          }
          
          .report-footer {
            padding: 12px !important;
            page-break-before: avoid;
          }
          
          .footer-grid {
            gap: 15px !important;
          }
          
          .footer-section h4 {
            font-size: 9pt !important;
          }
          
          .footer-section p {
            font-size: 8pt !important;
          }
          
          /* Улучшаем разрывы страниц */
          h1, h2, h3 {
            page-break-after: avoid;
          }
          
          img {
            page-break-inside: avoid;
          }
          
          /* Скрываем ненужное для печати */
          .no-print {
            display: none !important;
          }
          
          /* Минимальные отступы между элементами */
          .task-header {
            margin-bottom: 8px !important;
          }
        }
        
        /* Адаптивность */
        @media (max-width: 768px) {
          .header-main {
            flex-direction: column;
            gap: 10px;
          }
          
          .header-right {
            text-align: left;
          }
          
          .student-name {
            justify-content: flex-start;
          }
          
          .header-stats {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
        
        @media (max-width: 480px) {
          .report-header, .report-content {
            padding: 15px;
          }
          
          .header-stats {
            grid-template-columns: 1fr !important;
          }
        }
      </style>
    </head>
    <body>
      <div class="report-container">
        <header class="report-header">
          <div class="header-main">
            <div class="header-left">
              <h1 class="subject">
                <i class="fas fa-file-code"></i> Практическая работа №1
              </h1>
              <div class="work-info">
                <i class="fas fa-graduation-cap"></i> Технологии разработки ПО
              </div>
              <div class="work-info">
                <i class="fas fa-tasks"></i> Отчёт о выполнении заданий
              </div>
            </div>
            
            <div class="header-right">
              ${groupSize > 1 ? `
                <div class="student-details">
                  <i class="fas fa-users"></i> Участник ${participantPosition} из ${groupSize}
                </div>
              ` : `
                <div class="student-details">
                  <i class="fas fa-user"></i> Индивидуальная работа
                </div>
              `}
            </div>
          </div>
          
          <div class="header-stats">
            <div class="stat-item">
              <i class="fas fa-users stat-icon"></i>
              <div class="stat-content">
                <div class="stat-label">Формат</div>
                <div class="stat-value">${groupSize === 1 ? 'Индивидуально' : `Группа ${groupSize}`}</div>
              </div>
            </div>
            
            <div class="stat-item">
              <i class="fas fa-check-circle stat-icon"></i>
              <div class="stat-content">
                <div class="stat-label">Выполнено</div>
                <div class="stat-value">${completedCount}/5</div>
              </div>
            </div>
            
            <div class="stat-item">
              <i class="fas fa-calendar-alt stat-icon"></i>
              <div class="stat-content">
                <div class="stat-label">Дата</div>
                <div class="stat-value">${new Date().toLocaleDateString('ru-RU')}</div>
              </div>
            </div>
            
            <div class="stat-item">
              <i class="fas fa-clock stat-icon"></i>
              <div class="stat-content">
                <div class="stat-label">Время</div>
                <div class="stat-value">${new Date().toLocaleTimeString('ru-RU', {hour: '2-digit', minute:'2-digit'})}</div>
              </div>
            </div>
          </div>
          
          <div class="report-id">
            <i class="fas fa-shield-alt"></i>
            <div>
              <div style="font-size: 0.8rem; opacity: 0.8; margin-bottom: 2px;">ID отчёта:</div>
              <div>${reportId}</div>
            </div>
          </div>
        </header>
        
        <main class="report-content">
  `;

  // Введение
  if (introductionText) {
    report += `
      <h2 class="section-title">
        <i class="fas fa-book-open"></i> Введение
      </h2>
      <div class="intro-text">${escapeHtml(introductionText)}</div>
    `;
  }

  // Задания
  report += `
    <h2 class="section-title">
      <i class="fas fa-code"></i> Выполненные задания
    </h2>
    <div class="tasks-grid">
  `;

  myTasks.forEach((task, taskIndex) => {
    const commentHtml = task.comment ? `
      <div class="comment-box">
        <strong>
          <i class="fas fa-comment"></i> Комментарий
        </strong>
        ${escapeHtml(task.comment)}
      </div>
    ` : '';

    const screenshotHtml = task.previewUrl ? `
      <div class="screenshot-container">
        <img src="${task.previewUrl}" alt="Скриншот задания ${taskIndex + 1}" class="screenshot-image" />
        <div class="screenshot-label">
          <i class="fas fa-camera"></i> Скриншот задания ${taskIndex + 1}
        </div>
      </div>
    ` : '';

    report += `
      <div class="task-card">
        <div class="task-header">
          <div class="task-number">${taskIndex + 1}</div>
          <div class="task-title">
            ${task.title}
            <i class="fas fa-angle-right"></i>
          </div>
        </div>
        
        <div class="task-description">
          ${task.description}
        </div>
        
        <div class="code-block">${escapeHtml(task.code || '// Код не был введён')}</div>
        
        ${commentHtml}
        ${screenshotHtml}
      </div>
    `;
  });

  report += `</div>`;

  // Вывод
  if (conclusionText) {
    report += `
      <h2 class="section-title">
        <i class="fas fa-chart-line"></i> Вывод
      </h2>
      <div class="conclusion-text">${escapeHtml(conclusionText)}</div>
    `;
  }

  // Футер
  report += `
        </main>
        
        <footer class="report-footer">
          <div class="footer-grid">
            <div class="footer-section">
              <h4><i class="fas fa-info-circle"></i> Информация</h4>
              <p><i class="fas fa-hashtag"></i> ID: ${reportId}</p>
              <p><i class="fas fa-calendar"></i> Дата: ${new Date().toLocaleDateString('ru-RU')}</p>
              <p><i class="fas fa-clock"></i> Время: ${new Date().toLocaleTimeString('ru-RU', {hour: '2-digit', minute:'2-digit'})}</p>
            </div>
            
            <div class="footer-section">
              <h4><i class="fas fa-chart-bar"></i> Статистика</h4>
              <p><i class="fas fa-tasks"></i> Всего заданий: 5</p>
              <p><i class="fas fa-check-circle"></i> Выполнено: ${completedCount}</p>
              <p><i class="fas fa-users"></i> Формат: ${groupSize === 1 ? 'Индивидуально' : `Группа ${groupSize}`}</p>
              ${groupSize > 1 ? `<p><i class="fas fa-user-tag"></i> Позиция: ${participantPosition}</p>` : ''}
            </div>
          </div>
          
          <div class="footer-bottom">
            <p>Отчёт сгенерирован автоматически</p>
            <p class="no-print" style="margin-top: 5px;">
              <i class="fas fa-print"></i> Для печати в PDF: Ctrl+P → "Сохранить как PDF" → Формат A4
            </p>
          </div>
        </footer>
      </div>
    </body>
    </html>
  `;

  const blob = new Blob([report], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `TRPO_Report_${Date.now()}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  reportGenerated = true;
  
  downloadReportBtn.style.display = 'inline-flex';
  submitBtn.style.display = 'none';
  
  renderStep();
  
  alert('Отчёт успешно сформирован и скачан!');
}

// === Утилиты ===
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  // Сохраняем переносы строк
  return div.innerHTML.replace(/\n/g, '<br>');
}