#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Python Space Mission — финальная версия с улучшенной теорией
"""

import sys
from io import StringIO
import tkinter as tk
from tkinter import messagebox, font as tkfont, scrolledtext

# ==================== ДАННЫЕ УРОВНЕЙ (1–22) ====================
LEVELS = [
    # ===== ЦИКЛЫ FOR =====
    {"level": 1, "title": "ЦИКЛ FOR (0-4)",
     "theory": "Цикл for с range(3) перебирает числа 0, 1, 2 (не включая 3).\n\nПример:\nfor i in range(3):\n    print(i)  # выведет 0, 1, 2",
     "task": "🏋️ Тренер велит отжаться 5 раз. Выведи номера отжиманий от 0 до 4 включительно (каждый с новой строки).",
     "hint": "for i in range(5): print(i)", "unlock_code": ""},

    {"level": 2, "title": "ЦИКЛ FOR (1-5)",
     "theory": "range(2, 5) даёт числа 2, 3, 4.\n\nПример:\nfor i in range(2, 5):\n    print(i)  # выведет 2, 3, 4",
     "task": "🍦 В очереди за мороженым стоят 5 человек. Выведи номера от 1 до 5 включительно.",
     "hint": "", "unlock_code": ""},

    {"level": 3, "title": "ЦИКЛ FOR (ЧЁТНЫЕ)",
     "theory": "range(1, 8, 2) даёт нечётные числа: 1,3,5,7.\n\nПример:\nfor i in range(1, 8, 2):\n    print(i)  # выведет 1, 3, 5, 7",
     "task": "🏠 На улице дома только с чётными номерами от 0 до 10 включительно. Выведи их все.",
     "hint": "", "unlock_code": ""},

    {"level": 4, "title": "ЦИКЛ FOR (ОБРАТНЫЙ СЧЁТ)",
     "theory": "range(4, 0, -1) выводит 4,3,2,1.\n\nПример:\nfor i in range(4, 0, -1):\n    print(i)  # выведет 4, 3, 2, 1",
     "task": "⏳ Забег начинается! Обратный отсчёт от 5 до 1 включительно. Выведи числа.",
     "hint": "for i in range(5, 0, -1): print(i)", "unlock_code": ""},

    {"level": 5, "title": "СУММА ЧИСЕЛ 1..N",
     "theory": "Можно накапливать сумму в переменной.\n\nПример:\nk = 3\nsumma = 0\nfor i in range(1, k+1):\n    summa += i\nprint(summa)  # 1+2+3=6",
     "task": "🍬 У тебя есть n = 5 коробок. В первой коробке 1 конфета, во второй — 2, и так до n. Сколько всего конфет? Выведи сумму.",
     "hint": "total = 0; \nfor i in range(1, n+1):\n\ttotal += i;\nprint(total)", "unlock_code": ""},

    # ===== СТРОКИ =====
    {"level": 6, "title": "СКЛАДЫВАНИЕ СТРОК",
     "theory": "Строки складываются оператором +.\n\nПример:\nfirst = 'Hello'\nsecond = 'World'\nprint(first + ' ' + second)  # Hello World",
     "task": "👤 Имя и фамилия: a = 'Python', b = 'Rock'. Выведи их через пробел, как полное имя.",
     "hint": "print(a + ' ' + b)", "unlock_code": ""},

    {"level": 7, "title": "УМНОЖЕНИЕ СТРОКИ",
     "theory": "Умножение строки на число повторяет её.\n\nПример:\ns = 'Ha'\nprint(s * 3)  # HaHaHa",
     "task": "😂 Шутка такая смешная, что смех 'Ho' повторяется 4 раза. Выведи 'HoHoHoHo'.",
     "hint": "print(laugh * 4)", "unlock_code": ""},

    {"level": 8, "title": "ДЛИНА СТРОКИ",
     "theory": "len() возвращает длину строки.\n\nПример:\ntext = 'Hello'\nprint(len(text))  # 5",
     "task": "📏 Слово 'Python' состоит из скольких букв? Выведи его длину.",
     "hint": "print(len(word))", "unlock_code": ""},

    {"level": 9, "title": "ПЕРВЫЙ СИМВОЛ",
     "theory": "К символам обращаются по индексу (с 0).\n\nПример:\ncity = 'Moscow'\nprint(city[0])  # M",
     "task": "🌆 Город 'Jupiter' (да, есть такой в США). Какая у него вторая буква (индекс 1)? Выведи её.",
     "hint": "нумерация начинается с 0!!!", "unlock_code": ""},

    {"level": 10, "title": "СРЕЗ СТРОКИ",
     "theory": "Срез [начало:конец] берёт часть строки.\n\nПример:\nword = 'программирование'\nprint(word[:5])  # прогр",
     "task": "📖 Книга называется 'астрономия'. Выведи первые 5 символов названия.",
     "hint": "", "unlock_code": ""},

    {"level": 11, "title": "НИЖНИЙ РЕГИСТР",
     "theory": "Метод .lower() переводит строку в нижний регистр.\n\nПример:\nmsg = 'Hello'\nprint(msg.lower())  # hello",
     "task": "🔊 Громкая команда 'SOS' должна быть тихой. Преобразуй в нижний регистр и выведи.",
     "hint": "print(command.lower())", "unlock_code": ""},

    # ===== МАТЕМАТИКА =====
    {"level": 12, "title": "СУММА ТРЁХ ЧИСЕЛ",
     "theory": "Оператор + складывает числа.\n\nПример:\nx = 4\ny = 5\nz = 6\nprint(x + y + z)  # 15",
     "task": "🍎 Яблоки весят a = 5, b = 7, c = 3 граммов. Найди общий вес трёх яблок (сумму).",
     "hint": "", "unlock_code": ""},

    {"level": 13, "title": "ПРОИЗВЕДЕНИЕ ТРЁХ ЧИСЕЛ",
     "theory": "Оператор * умножает числа.\n\nПример:\nx = 1\ny = 2\nz = 3\nprint(x * y * z)  # 6",
     "task": "📦 Коробка имеет размеры a = 2, b = 3, c = 4. Найди её объём (произведение).",
     "hint": "", "unlock_code": ""},

    {"level": 14, "title": "СРЕДНЕЕ АРИФМЕТИЧЕСКОЕ",
     "theory": "Среднее = сумма / количество.\n\nПример:\nx = 4\ny = 5\nz = 6\nsred = (x + y + z) / 3\nprint(sred)  # 5.0",
     "task": "📚 Оценки за три теста: a = 10, b = 20, c = 30. Вычисли средний балл и выведи.",
     "hint": "", "unlock_code": ""},

    {"level": 15, "title": "ВОЗВЕДЕНИЕ В СТЕПЕНЬ",
     "theory": "Оператор ** возводит число в степень.\n\nПример:\nbase = 2\nexp = 10\nprint(base ** exp)  # 1024",
     "task": "🧪 В лаборатории размножают бактерии: 3⁴ = ? Выведи результат.",
     "hint": "print(base ** exp)", "unlock_code": ""},

    {"level": 16, "title": "ПЛОЩАДЬ КРУГА",
     "theory": "Площадь круга = π * r².",
     "task": "🍕 Пицца радиусом r = 5. Какая у неё площадь? (π = 3.14) Выведи результат.",
     "hint": "", "unlock_code": ""},

    {"level": 17, "title": "ГИПОТЕНУЗА",
     "theory": "Гипотенуза = √(a² + b²). В Python корень можно вычислить как **0.5.\n\nПример:\na = 6\nb = 8\nc = (a**2 + b**2)**0.5\nprint(c)  # 10.0",
     "task": "🪜 Лестница опирается на стену: a = 3 м (расстояние от стены), b = 4 м (высота). Найди длину лестницы (гипотенузу).",
     "hint": "", "unlock_code": ""},

    {"level": 18, "title": "ОСТАТОК ОТ ДЕЛЕНИЯ",
     "theory": "Оператор % возвращает остаток.",
     "task": "🧺 Есть 20 яблок и 6 корзин. Если раскладывать поровну, сколько яблок останется? Выведи остаток.",
     "hint": "print(x % y)", "unlock_code": ""},

    {"level": 19, "title": "ЦЕЛОЧИСЛЕННОЕ ДЕЛЕНИЕ",
     "theory": "Оператор // возвращает целую часть деления.",
     "task": "📦 20 книг нужно разложить в 6 коробок поровну. Сколько книг будет в каждой полностью заполненной коробке? Выведи целую часть.",
     "hint": "", "unlock_code": ""},

    {"level": 20, "title": "КВАДРАТНЫЙ КОРЕНЬ",
     "theory": "Корень можно вычислить как число ** 0.5.",
     "task": "🟩 Площадь квадрата равна 36. Найди длину его стороны (квадратный корень).",
     "hint": "", "unlock_code": ""},

    {"level": 21, "title": "ВЫРАЖЕНИЕ",
     "theory": "Можно комбинировать операции.",
     "task": "🔐 Код от сейфа: (a + b) * 2, где a = 7, b = 3. Вычисли и выведи результат.",
     "hint": "", "unlock_code": ""},

    {"level": 22, "title": "ДОПОЛНИТЕЛЬНОЕ",
     "theory": "Повторение пройденного.",
     "task": "🐍 Напиши код, который выведет 'Python' 3 раза подряд, чтобы получилось 'PythonPythonPython'.",
     "hint": "print('Python' * 3)", "unlock_code": ""},
]

# ==================== ПРОВЕРКА КОДА (без изменений) ====================
def mock_input(prompt=""):
    return "TestPilot"

def validate_code(user_code, level_num):
    try:
        old_stdout = sys.stdout
        sys.stdout = StringIO()

        local_vars = {
            'input': mock_input,
        }

        # Добавляем переменные для каждого уровня
        if level_num == 1:
            pass
        elif level_num == 2:
            pass
        elif level_num == 3:
            pass
        elif level_num == 4:
            pass
        elif level_num == 5:
            local_vars['n'] = 5
        elif level_num == 6:
            local_vars['a'] = 'Python'
            local_vars['b'] = 'Rock'
        elif level_num == 7:
            local_vars['laugh'] = 'Ho'
        elif level_num == 8:
            local_vars['word'] = 'Python'
        elif level_num == 9:
            local_vars['planet'] = 'Jupiter'
        elif level_num == 10:
            local_vars['text'] = 'астрономия'
        elif level_num == 11:
            local_vars['command'] = 'SOS'
        elif level_num == 12:
            local_vars['a'] = 5
            local_vars['b'] = 7
            local_vars['c'] = 3
        elif level_num == 13:
            local_vars['a'] = 2
            local_vars['b'] = 3
            local_vars['c'] = 4
        elif level_num == 14:
            local_vars['a'] = 10
            local_vars['b'] = 20
            local_vars['c'] = 30
        elif level_num == 15:
            local_vars['base'] = 3
            local_vars['exp'] = 4
        elif level_num == 16:
            local_vars['r'] = 5
        elif level_num == 17:
            local_vars['a'] = 3
            local_vars['b'] = 4
        elif level_num == 18:
            local_vars['x'] = 20
            local_vars['y'] = 6
        elif level_num == 19:
            local_vars['a'] = 20
            local_vars['b'] = 6
        elif level_num == 20:
            local_vars['num'] = 36
        elif level_num == 21:
            local_vars['a'] = 7
            local_vars['b'] = 3
        elif level_num == 22:
            pass

        exec(user_code, {}, local_vars)
        output = sys.stdout.getvalue()
        sys.stdout = old_stdout

        # Функция для сравнения вывода с ожидаемыми числами (для циклов)
        def check_numbers(output, expected_numbers):
            parts = output.strip().split()
            try:
                nums = [int(p) for p in parts if p.isdigit()]
            except:
                return False
            return nums == expected_numbers

        output_clean = output.strip()

        # Проверки для каждого уровня
        if level_num == 1:
            return check_numbers(output, [0,1,2,3,4])
        elif level_num == 2:
            return check_numbers(output, [1,2,3,4,5])
        elif level_num == 3:
            return check_numbers(output, [0,2,4,6,8,10])
        elif level_num == 4:
            return check_numbers(output, [5,4,3,2,1])
        elif level_num == 5:
            return output_clean == "15"
        elif level_num == 6:
            return output_clean == "Python Rock"
        elif level_num == 7:
            return output_clean == "HoHoHoHo"
        elif level_num == 8:
            return output_clean == "6"
        elif level_num == 9:
            # второй символ Jupiter (индекс 1) — 'u'
            return output_clean == "u"
        elif level_num == 10:
            return output_clean == "астро"
        elif level_num == 11:
            return output_clean == "sos"
        elif level_num == 12:
            return output_clean == "15"  # 5+7+3
        elif level_num == 13:
            return output_clean == "24"  # 2*3*4
        elif level_num == 14:
            try:
                val = float(output_clean)
                return abs(val - 20.0) < 0.001
            except:
                return False
        elif level_num == 15:
            return output_clean == "81"
        elif level_num == 16:
            try:
                val = float(output_clean)
                return abs(val - 78.5) < 0.01
            except:
                return False
        elif level_num == 17:
            try:
                val = float(output_clean)
                return abs(val - 5.0) < 0.001
            except:
                return False
        elif level_num == 18:
            return output_clean == "2"
        elif level_num == 19:
            return output_clean == "3"
        elif level_num == 20:
            try:
                val = float(output_clean)
                return abs(val - 6.0) < 0.001
            except:
                return False
        elif level_num == 21:
            return output_clean == "20"
        elif level_num == 22:
            return output_clean == "PythonPythonPython" or output_clean == "Python"*3

        return False

    except Exception as e:
        sys.stdout = old_stdout
        return False

# ==================== ГРАФИЧЕСКИЙ ИНТЕРФЕЙС (полностью идентичен предыдущей версии) ====================
class SpaceMissionGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("Python Space Mission")
        self.root.geometry("1100x750")
        self.root.configure(bg='#f0f0f0')

        self.levels = LEVELS
        self.total_levels = len(self.levels)
        self.current_level = 0
        self.completed = 0
        self.skipped = 0
        self.skipped_levels = []

        self.base_font = tkfont.Font(family='Arial', size=17)
        self.code_font = tkfont.Font(family='Courier', size=17)
        self.button_font = tkfont.Font(family='Arial', size=14)

        self.setup_ui()
        self.update_level_display()

    def setup_ui(self):
        header_frame = tk.Frame(self.root, bg='#d0d0d0', bd=2, relief=tk.GROOVE)
        header_frame.pack(pady=(10, 5), padx=10, fill=tk.X)

        self.title_label = tk.Label(header_frame, text="УРОВЕНЬ",
                                    fg='black', bg='#d0d0d0',
                                    font=('Arial', 20, 'bold'))
        self.title_label.pack(pady=5)

        progress_frame = tk.Frame(self.root, bg='#f0f0f0')
        progress_frame.pack(pady=5, padx=10, fill=tk.X)

        tk.Label(progress_frame, text="Прогресс:", bg='#f0f0f0',
                 font=self.base_font).pack(side=tk.LEFT, padx=(0,5))
        self.progress_canvas = tk.Canvas(progress_frame, width=400, height=20,
                                         bg='#cccccc', highlightthickness=1)
        self.progress_canvas.pack(side=tk.LEFT, padx=5)
        self.progress_label = tk.Label(progress_frame, text="0%", bg='#f0f0f0',
                                       font=self.base_font)
        self.progress_label.pack(side=tk.LEFT)

        font_frame = tk.Frame(self.root, bg='#f0f0f0')
        font_frame.pack(pady=5)

        tk.Label(font_frame, text="Размер шрифта:", bg='#f0f0f0',
                 font=self.base_font).pack(side=tk.LEFT, padx=5)
        self.font_size_var = tk.IntVar(value=17)
        self.font_spin = tk.Spinbox(font_frame, from_=8, to=30,
                                     textvariable=self.font_size_var,
                                     width=3, command=self.change_font_size,
                                     font=self.base_font)
        self.font_spin.pack(side=tk.LEFT)

        main_frame = tk.Frame(self.root, bg='#f0f0f0')
        main_frame.pack(pady=10, padx=10, fill=tk.BOTH, expand=True)

        theory_frame = tk.LabelFrame(main_frame, text="Теория", bg='#f0f0f0',
                                      font=self.base_font, fg='black')
        theory_frame.pack(fill=tk.BOTH, expand=True, pady=(0,5))

        self.theory_text = scrolledtext.ScrolledText(theory_frame, wrap=tk.WORD,
                                                      font=self.base_font,
                                                      bg='#ffffff', fg='black',
                                                      height=6)
        self.theory_text.pack(fill=tk.BOTH, expand=True, padx=5, pady=5)
        self.theory_text.config(state=tk.DISABLED)

        task_frame = tk.LabelFrame(main_frame, text="Задание", bg='#f0f0f0',
                                    font=self.base_font, fg='black')
        task_frame.pack(fill=tk.BOTH, expand=True, pady=(0,5))

        self.task_text = scrolledtext.ScrolledText(task_frame, wrap=tk.WORD,
                                                    font=self.base_font,
                                                    bg='#ffffff', fg='black',
                                                    height=4)
        self.task_text.pack(fill=tk.BOTH, expand=True, padx=5, pady=5)
        self.task_text.config(state=tk.DISABLED)

        code_frame = tk.LabelFrame(main_frame, text="Код", bg='#f0f0f0',
                                    font=self.base_font, fg='black')
        code_frame.pack(fill=tk.BOTH, expand=True)

        self.code_text = scrolledtext.ScrolledText(code_frame, wrap=tk.WORD,
                                                    font=self.code_font,
                                                    bg='#ffffff', fg='black',
                                                    insertbackground='black',
                                                    height=8)
        self.code_text.pack(fill=tk.BOTH, expand=True, padx=5, pady=5)

        info_frame = tk.Frame(self.root, bg='#f0f0f0')
        info_frame.pack(fill=tk.X, padx=10, pady=5)

        self.hint_label = tk.Label(info_frame, text="", fg='green',
                                   bg='#f0f0f0', font=self.base_font)
        self.hint_label.pack(anchor='w')

        self.message_label = tk.Label(info_frame, text="", fg='blue',
                                      bg='#f0f0f0', font=self.base_font)
        self.message_label.pack(anchor='w')

        btn_frame = tk.Frame(self.root, bg='#f0f0f0')
        btn_frame.pack(pady=10)

        buttons = [
            ("Проверить", self.check_code),
            ("Пропустить", self.skip_level),
            ("Статистика", self.show_stats),
            ("Выход", self.quit_game),
        ]

        for text, cmd in buttons:
            btn = tk.Button(btn_frame, text=text, command=cmd,
                            font=self.button_font, padx=10, pady=3)
            btn.pack(side=tk.LEFT, padx=5)

    def change_font_size(self):
        new_size = self.font_size_var.get()
        self.base_font.configure(size=new_size)
        self.code_font.configure(size=new_size)
        self.button_font.configure(size=new_size-3)

        for widget in (self.theory_text, self.task_text):
            widget.config(state=tk.NORMAL)
            widget.config(font=self.base_font)
            widget.config(state=tk.DISABLED)
        self.code_text.config(font=self.code_font)
        self.progress_label.config(font=self.base_font)

        for child in self.root.winfo_children():
            if isinstance(child, tk.LabelFrame):
                child.config(font=self.base_font)
            if isinstance(child, tk.Frame):
                for btn in child.winfo_children():
                    if isinstance(btn, tk.Button):
                        btn.config(font=self.button_font)

    def get_vars_comment(self, level_num):
        """Возвращает строку-комментарий с перечнем доступных переменных для данного уровня."""
        if level_num == 1:
            return "# Напиши цикл for для вывода чисел от 0 до 4."
        elif level_num == 2:
            return "# Напиши цикл for для вывода чисел от 1 до 5."
        elif level_num == 3:
            return "# Напиши цикл for для вывода чётных чисел от 0 до 10."
        elif level_num == 4:
            return "# Напиши цикл for для обратного отсчёта от 5 до 1."
        elif level_num == 5:
            return "# Доступна переменная: n = 5"
        elif level_num == 6:
            return "# Доступны переменные: a = 'Python', b = 'Rock'"
        elif level_num == 7:
            return "# Доступна переменная: laugh = 'Ho'"
        elif level_num == 8:
            return "# Доступна переменная: word = 'Python'"
        elif level_num == 9:
            return "# Доступна переменная: planet = 'Jupiter'"
        elif level_num == 10:
            return "# Доступна переменная: text = 'астрономия'"
        elif level_num == 11:
            return "# Доступна переменная: command = 'SOS'"
        elif level_num == 12:
            return "# Доступны переменные: a = 5, b = 7, c = 3"
        elif level_num == 13:
            return "# Доступны переменные: a = 2, b = 3, c = 4"
        elif level_num == 14:
            return "# Доступны переменные: a = 10, b = 20, c = 30"
        elif level_num == 15:
            return "# Доступны переменные: base = 3, exp = 4"
        elif level_num == 16:
            return "# Доступна переменная: r = 5"
        elif level_num == 17:
            return "# Доступны переменные: a = 3, b = 4"
        elif level_num == 18:
            return "# Доступны переменные: x = 20, y = 6"
        elif level_num == 19:
            return "# Доступны переменные: a = 20, b = 6"
        elif level_num == 20:
            return "# Доступна переменная: num = 36"
        elif level_num == 21:
            return "# Доступны переменные: a = 7, b = 3"
        elif level_num == 22:
            return "# Напиши код, который выведет 'Python' 3 раза подряд."
        else:
            return "# Напиши код:"

    def update_level_display(self):
        if self.current_level >= self.total_levels:
            self.show_final()
            return

        level = self.levels[self.current_level]
        self.title_label.config(text=f"УРОВЕНЬ {level['level']} — {level['title']}")

        self.theory_text.config(state=tk.NORMAL)
        self.theory_text.delete(1.0, tk.END)
        self.theory_text.insert(1.0, level['theory'])
        self.theory_text.config(state=tk.DISABLED)

        self.task_text.config(state=tk.NORMAL)
        self.task_text.delete(1.0, tk.END)
        self.task_text.insert(1.0, level['task'])
        self.task_text.config(state=tk.DISABLED)

        # Вставляем комментарий с переменными в поле для кода
        self.code_text.delete(1.0, tk.END)
        comment = self.get_vars_comment(level['level'])
        self.code_text.insert(1.0, comment + "\n\n")

        self.hint_label.config(text="")
        self.message_label.config(text="")

        self.update_progress()

    def update_progress(self):
        percent = (self.current_level / self.total_levels) * 100
        width = 400
        filled = int(width * percent / 100)

        self.progress_canvas.delete("all")
        self.progress_canvas.create_rectangle(0, 0, width, 20, fill='#cccccc', outline='')
        self.progress_canvas.create_rectangle(0, 0, filled, 20, fill='#4CAF50', outline='')
        self.progress_label.config(text=f"{percent:.1f}%")

    def check_code(self):
        if self.current_level >= self.total_levels:
            return

        code = self.code_text.get(1.0, tk.END).strip()
        if not code:
            self.message_label.config(text="Введите код!", fg='red')
            return

        level = self.levels[self.current_level]
        level_num = level['level']

        if validate_code(code, level_num):
            self.message_label.config(text="УСПЕХ! Код верен.", fg='green')
            self.completed += 1
            self.current_level += 1
            self.root.after(1500, self.update_level_display)
        else:
            self.message_label.config(text="Ошибка! Код не подходит.", fg='red')
            self.hint_label.config(text=f"Подсказка: {level['hint']}")
            if self.skipped > 0 and self.skipped % 5 == 0:
                self.show_skip_warning()

    def skip_level(self):
        if self.current_level >= self.total_levels:
            return
        level = self.levels[self.current_level]
        self.skipped += 1
        self.skipped_levels.append(level['level'])
        self.message_label.config(text=f"Пропущен уровень {level['level']}", fg='orange')
        self.current_level += 1
        self.root.after(1500, self.update_level_display)

    def show_stats(self):
        stats_win = tk.Toplevel(self.root)
        stats_win.title("Статистика миссии")
        stats_win.geometry("500x400")
        stats_win.configure(bg='#f0f0f0')

        percent = (self.completed / self.total_levels) * 100

        text = f"Пройдено: {self.completed}\n"
        text += f"Пропущено: {self.skipped}\n"
        text += f"Реальный прогресс: {percent:.1f}%\n\n"
        if self.skipped_levels:
            text += "Пропущенные уровни:\n"
            for lvl in self.skipped_levels:
                info = next((l for l in self.levels if l['level'] == lvl), None)
                if info:
                    text += f"  • Уровень {lvl}: {info['title']}\n"

        label = tk.Label(stats_win, text=text, fg='black', bg='#f0f0f0',
                         font=self.base_font, justify=tk.LEFT)
        label.pack(padx=20, pady=20)

        tk.Button(stats_win, text="Закрыть", command=stats_win.destroy,
                  font=self.button_font, padx=15, pady=5).pack(pady=10)

    def show_skip_warning(self):
        warn_win = tk.Toplevel(self.root)
        warn_win.title("Внимание")
        warn_win.geometry("400x150")
        warn_win.configure(bg='#f0f0f0')

        percent = (self.skipped / self.total_levels) * 100
        msg = f"Пропущено {self.skipped} уровней ({percent:.0f}%)!\n"
        if percent >= 50:
            msg += "Вы не сможете получить сертификат пилота!"
        else:
            msg += "Попробуйте проходить уровни самостоятельно!"

        tk.Label(warn_win, text=msg, fg='orange', bg='#f0f0f0',
                 font=self.base_font, wraplength=350).pack(pady=30)
        tk.Button(warn_win, text="OK", command=warn_win.destroy,
                  font=self.button_font).pack()

    def quit_game(self):
        if messagebox.askyesno("Выход", "Завершить миссию?"):
            self.root.quit()
            self.root.destroy()

    def show_final(self):
        self.theory_text.config(state=tk.NORMAL)
        self.theory_text.delete(1.0, tk.END)
        self.theory_text.insert(1.0, "МИССИЯ ЗАВЕРШЕНА!")
        self.theory_text.config(state=tk.DISABLED)

        self.task_text.config(state=tk.NORMAL)
        self.task_text.delete(1.0, tk.END)
        self.task_text.config(state=tk.DISABLED)

        self.code_text.delete(1.0, tk.END)
        self.hint_label.config(text="")
        self.message_label.config(text="")

        percent = (self.completed / self.total_levels) * 100
        result = ""
        if self.skipped == 0:
            result = "ОТЛИЧНО! Ты настоящий Python-пилот!"
        elif percent >= 80:
            result = "ХОРОШО! Большинство уровней пройдено."
        elif percent >= 50:
            result = "НЕПЛОХО! Пройдена половина пути."
        else:
            result = "НУЖНО ПОПРОБОВАТЬ ЕЩЁ! Слишком много пропусков."

        final_text = f"Пройдено: {self.completed} из {self.total_levels}\n"
        final_text += f"Пропущено: {self.skipped}\n"
        final_text += f"Итоговый результат: {percent:.1f}%\n\n{result}"

        self.message_label.config(text=final_text, fg='purple',
                                  font=('Arial', 18, 'bold'))

# ==================== ЗАПУСК ====================
if __name__ == "__main__":
    root = tk.Tk()
    app = SpaceMissionGUI(root)
    root.mainloop()
    
# #!/usr/bin/env python3
# # -*- coding: utf-8 -*-
# """
# 🚀 PYTHON SPACE MISSION
# Красивая консольная игра для изучения Python
# Версия с честным отслеживанием пропусков!
# """

# import sys
# import time
# import os
# from io import StringIO

# # ============================================================================
# # ЦВЕТА И СТИЛИ
# # ============================================================================
# class Colors:
#     RESET = '\033[0m'
#     BOLD = '\033[1m'
#     DIM = '\033[2m'
#     RED = '\033[31m'
#     GREEN = '\033[32m'
#     YELLOW = '\033[33m'
#     BLUE = '\033[34m'
#     MAGENTA = '\033[35m'
#     CYAN = '\033[36m'
#     WHITE = '\033[37m'
#     BRIGHT_RED = '\033[91m'
#     BRIGHT_GREEN = '\033[92m'
#     BRIGHT_YELLOW = '\033[93m'
#     BRIGHT_BLUE = '\033[94m'
#     BRIGHT_CYAN = '\033[96m'
#     BRIGHT_MAGENTA = '\033[95m'
#     BG_GREEN = '\033[42m'
#     BG_RED = '\033[41m'

# # ============================================================================
# # УРОВНИ МИССИИ
# # ============================================================================
# LEVELS = [
#     {"level": 1, "title": "Первый сигнал", "description": "Выведи на экран текст: Hello Earth", "hint": "print('Hello Earth')", "unlock_code": "KEY-L1-EARTH2024"},
#     {"level": 2, "title": "Переменная топлива", "description": "Создай переменную fuel со значением 100", "hint": "fuel = 100", "unlock_code": "KEY-L2-FUEL100"},
#     {"level": 3, "title": "Имя корабля", "description": "Создай переменную ship_name со значением 'Apollo'", "hint": "ship_name = 'Apollo'", "unlock_code": "KEY-L3-APOLLO"},
#     {"level": 4, "title": "Скорость корабля", "description": "Создай переменную speed со значением 500", "hint": "speed = 500", "unlock_code": "KEY-L4-SPEED500"},
#     {"level": 5, "title": "Простая математика", "description": "Выведи на экран результат: 250 + 250", "hint": "print(250 + 250)", "unlock_code": "KEY-L5-MATH500"},
#     {"level": 6, "title": "Ввод имени", "description": "Спроси имя у пользователя и сохрани в переменную pilot", "hint": "pilot = input()", "unlock_code": "KEY-L6-PILOT"},
#     {"level": 7, "title": "Приветствие пилота", "description": "Выведи на экран 'Привет' используя переменную pilot (она уже создана)", "hint": "print(f'Привет, {pilot}')", "unlock_code": "KEY-L7-HELLO"},
#     {"level": 8, "title": "Проверка условия", "description": "Если fuel > 50, выведи 'Полёт нормальный'", "hint": "if fuel > 50: print('Полёт нормальный')", "unlock_code": "KEY-L8-CHECK"},
#     {"level": 9, "title": "Список планет", "description": "Создай список planets с тремя планетами: Earth, Mars, Venus", "hint": "planets = ['Earth', 'Mars', 'Venus']", "unlock_code": "KEY-L9-PLANETS"},
#     {"level": 10, "title": "Первый цикл", "description": "Выведи числа 0, 1, 2 используя цикл for", "hint": "for i in range(3): print(i)", "unlock_code": "KEY-L10-FINAL"},
#     {"level": 11, "title": "Если-Иначе", "description": "Если fuel < 50 выведи 'Тревога', иначе выведи 'Норма'", "hint": "if fuel < 50: print('Тревога') else: print('Норма')", "unlock_code": "KEY-L11-ALERT"},
#     {"level": 12, "title": "Три условия", "description": "Если fuel < 30 → 'Критично', elif < 70 → 'Норма', else → 'Отлично'", "hint": "if / elif / else", "unlock_code": "KEY-L12-THREE"},
#     {"level": 17, "title": "Цикл while", "description": "Пока fuel > 0, уменьшай fuel на 10 и выводи его значение", "hint": "while fuel > 0: print(fuel); fuel -= 10", "unlock_code": "KEY-L17-WHILE"},
#     {"level": 24, "title": "Чётные числа", "description": "Выведи чётные числа: 0, 2, 4, 6, 8, 10", "hint": "for i in range(0, 11, 2): print(i)", "unlock_code": "KEY-L24-EVEN"},
#     {"level": 41, "title": "Проверка скорости", "description": "Если speed > 1000 выведи 'Быстро', иначе 'Медленно'", "hint": "if speed > 1000: print('Быстро') else: print('Медленно')", "unlock_code": "KEY-L41-SPEED"},
#     {"level": 42, "title": "Три скорости", "description": "speed < 500 → 'Стоп', < 1000 → 'Норма', иначе → 'Гипер'", "hint": "if / elif / else", "unlock_code": "KEY-L42-SPEED3"},
#     {"level": 43, "title": "Кто пилот?", "description": "Если pilot == 'Alex' выведи 'Капитан', иначе 'Пилот'", "hint": "if pilot == 'Alex': print('Капитан') else: print('Пилот')", "unlock_code": "KEY-L43-PILOT"},
#     {"level": 44, "title": "Планета", "description": "Если planet == 'Earth' → 'Дом', elif 'Mars' → 'Колония', else → 'Чужая'", "hint": "if / elif / else", "unlock_code": "KEY-L44-PLANET"},
#     {"level": 45, "title": "Проверка И", "description": "Если fuel > 50 И speed > 200, выведи 'Готов', иначе 'Ждём'", "hint": "if fuel > 50 and speed > 200: print('Готов')", "unlock_code": "KEY-L45-AND"},
#     {"level": 46, "title": "Проверка ИЛИ", "description": "Если fuel < 10 ИЛИ speed == 0, выведи 'SOS', иначе 'OK'", "hint": "if fuel < 10 or speed == 0: print('SOS')", "unlock_code": "KEY-L46-OR"},
#     {"level": 47, "title": "Разгон", "description": "Пока speed < 1000, увеличивай speed на 100 и выводи", "hint": "while speed < 1000: print(speed); speed += 100", "unlock_code": "KEY-L47-SPEEDUP"},
#     {"level": 48, "title": "Счётчик", "description": "Выведи числа 1, 2, 3, 4, 5 используя while", "hint": "i = 1; while i <= 5: print(i); i += 1", "unlock_code": "KEY-L48-COUNT5"},
#     {"level": 49, "title": "Ожидание", "description": "Пока command != 'stop', выводи 'Жду'", "hint": "while command != 'stop': print('Жду')", "unlock_code": "KEY-L49-WAIT"},
#     {"level": 50, "title": "Выход из цикла", "description": "while True: если fuel <= 0 сделай break", "hint": "while True: if fuel <= 0: break", "unlock_code": "KEY-L50-BREAK"},
#     {"level": 51, "title": "Предупреждение", "description": "while fuel > 0: уменьшай на 20, если < 30 выводи 'Внимание'", "hint": "while + if внутри", "unlock_code": "KEY-L51-WARN"},
#     {"level": 52, "title": "Два цикла", "description": "Сделай 2 цикла while чтобы вывести таблицу 3x3", "hint": "вложенный while", "unlock_code": "KEY-L52-TABLE"},
#     {"level": 53, "title": "Шаг 3", "description": "Выведи числа: 0, 3, 6, 9, 12", "hint": "for i in range(0, 13, 3): print(i)", "unlock_code": "KEY-L53-STEP3"},
#     {"level": 54, "title": "Обратный счёт", "description": "Выведи числа: 10, 8, 6, 4, 2", "hint": "for i in range(10, 0, -2): print(i)", "unlock_code": "KEY-L54-BACK"},
#     {"level": 55, "title": "Пятёрки", "description": "Выведи числа: 5, 10, 15, 20, 25, 30, 35, 40, 45, 50", "hint": "for i in range(5, 51, 5): print(i)", "unlock_code": "KEY-L55-FIVE"},
#     {"level": 56, "title": "Нечётные", "description": "Выведи числа: 1, 3, 5, 7, 9", "hint": "for i in range(1, 10, 2): print(i)", "unlock_code": "KEY-L56-ODD"},
#     {"level": 57, "title": "Сумма", "description": "Посчитай сумму 2+4+6+8+10 (должно получиться 30)", "hint": "total = 0; for i in range(2, 11, 2): total += i; print(total)", "unlock_code": "KEY-L57-SUM"},
#     {"level": 58, "title": "Список", "description": "Создай список [10, 20, 30, 40, 50] используя range и append", "hint": "nums = []; for i in range(10, 51, 10): nums.append(i)", "unlock_code": "KEY-L58-LIST"},
# ]

# # ============================================================================
# # ФУНКЦИИ ОФОРМЛЕНИЯ
# # ============================================================================

# def clear_screen():
#     os.system('cls' if os.name == 'nt' else 'clear')

# def print_header():
#     print()
#     print(f"{Colors.BRIGHT_CYAN}{Colors.BOLD}╔{'═'*58}╗{Colors.RESET}")
#     print(f"{Colors.BRIGHT_CYAN}{Colors.BOLD}║{' '*15}🚀 PYTHON SPACE MISSION 🚀{' '*15}║{Colors.RESET}")
#     print(f"{Colors.BRIGHT_CYAN}{Colors.BOLD}╚{'═'*58}╝{Colors.RESET}")
#     print()

# def print_level_card(level, current, total):
#     print(f"{Colors.BRIGHT_BLUE}┌{'─'*58}┐{Colors.RESET}")
#     print(f"{Colors.BRIGHT_BLUE}│{Colors.RESET}  {Colors.BOLD}{Colors.YELLOW}УРОВЕНЬ {level['level']}/{total}{Colors.RESET}  {Colors.DIM}{'●' * min(current, 10)}{'○' * (total - current)}{Colors.RESET}  {Colors.BRIGHT_BLUE}│{Colors.RESET}")
#     print(f"{Colors.BRIGHT_BLUE}├{'─'*58}┤{Colors.RESET}")
#     print(f"{Colors.BRIGHT_BLUE}│{Colors.RESET}  {Colors.BOLD}{Colors.CYAN}{level['title']}{Colors.RESET}")
#     print(f"{Colors.BRIGHT_BLUE}│{Colors.RESET}")
#     print(f"{Colors.BRIGHT_BLUE}│{Colors.RESET}  {Colors.WHITE}📋 Задание:{Colors.RESET}")
#     print(f"{Colors.BRIGHT_BLUE}│{Colors.RESET}  {Colors.DIM}{level['description']}{Colors.RESET}")
#     print(f"{Colors.BRIGHT_BLUE}│{Colors.RESET}")
#     # print(f"{Colors.BRIGHT_BLUE}│{Colors.RESET}  {Colors.GREEN}💡 Подсказка:{Colors.RESET}")
#     # print(f"{Colors.BRIGHT_BLUE}│{Colors.RESET}  {Colors.DIM}{level['hint']}{Colors.RESET}")
#     print(f"{Colors.BRIGHT_BLUE}└{'─'*58}┘{Colors.RESET}")
#     print()

# def print_progress_bar(current, total, width=50):
#     percent = (current / total) * 100
#     filled = int(width * current / total)
#     bar = '█' * filled + '░' * (width - filled)
#     print(f"{Colors.DIM}  Прогресс: [{Colors.BRIGHT_GREEN}{bar}{Colors.DIM}] {percent:.1f}% ({current}/{total}){Colors.RESET}")
#     print()

# def print_success_message(message):
#     print()
#     print(f"{Colors.BG_GREEN}{Colors.BOLD}  ✅  {message}{' '*(50-len(message))}  {Colors.RESET}")
#     print()

# def print_unlock_code(code):
#     print(f"{Colors.BRIGHT_YELLOW}  ╔{'═'*20}╗{Colors.RESET}")
#     print(f"{Colors.BRIGHT_YELLOW}  ║    {Colors.BOLD}{code}{Colors.RESET}{Colors.BRIGHT_YELLOW}  ║{Colors.RESET}")
#     print(f"{Colors.BRIGHT_YELLOW}  ╚{'═'*20}╝{Colors.RESET}")
#     print()

# def print_loading(text="Загрузка", duration=1, dots=3):
#     print(f"{Colors.DIM}  {text}", end="", flush=True)
#     for i in range(dots):
#         time.sleep(duration / dots)
#         print(f"{Colors.BRIGHT_CYAN}.{Colors.RESET}", end="", flush=True)
#     print()

# def print_rocket_animation():
#     rockets = ["🚀  ", " 🚀 ", "  🚀", "   🚀", "    🚀"]
#     for rocket in rockets:
#         print(f"\r{Colors.BRIGHT_CYAN}  {rocket}  Полёт нормальный!{Colors.RESET}", end="", flush=True)
#         time.sleep(0.15)
#     print()

# def print_skip_warning(skipped, total):
#     """Предупреждение при большом количестве пропусков"""
#     percent = (skipped / total) * 100
    
#     if percent >= 50:
#         print()
#         print(f"{Colors.BG_RED}{Colors.BOLD}  ⚠️  ВНИМАНИЕ: Пропущено {percent:.0f}% уровней!  {Colors.RESET}")
#         print(f"{Colors.BRIGHT_RED}  Вы не сможете получить сертификат пилота!{Colors.RESET}")
#         print()
#         time.sleep(2)
#     elif percent >= 30:
#         print()
#         print(f"{Colors.BRIGHT_YELLOW}  ⚠️  Предупреждение: Пропущено {percent:.0f}% уровней{Colors.RESET}")
#         print(f"{Colors.DIM}  Попробуйте пройти больше уровней самостоятельно!{Colors.RESET}")
#         print()
#         time.sleep(2)

# def print_stats(completed, total, skipped, skipped_levels):
#     """Подробная статистика с списком пропущенных уровней"""
#     print()
#     print(f"{Colors.BRIGHT_MAGENTA}┌{'─'*58}┐{Colors.RESET}")
#     print(f"{Colors.BRIGHT_MAGENTA}│{Colors.RESET}  {Colors.BOLD}📊 СТАТИСТИКА МИССИИ{Colors.RESET}")
#     print(f"{Colors.BRIGHT_MAGENTA}├{'─'*58}┤{Colors.RESET}")
#     print(f"{Colors.BRIGHT_MAGENTA}│{Colors.RESET}  ✅ Пройдено уровней:     {Colors.BRIGHT_GREEN}{completed}{Colors.RESET}")
#     print(f"{Colors.BRIGHT_MAGENTA}│{Colors.RESET}  ⏭️  Пропущено уровней:    {Colors.BRIGHT_YELLOW}{skipped}{Colors.RESET}")
#     print(f"{Colors.BRIGHT_MAGENTA}│{Colors.RESET}  📈 Реальный прогресс:    {Colors.BRIGHT_CYAN}{(completed/total)*100:.1f}%{Colors.RESET}")
#     print(f"{Colors.BRIGHT_MAGENTA}└{'─'*58}┘{Colors.RESET}")
#     print()
    
#     # Показываем список пропущенных уровней
#     if skipped > 0:
#         print(f"{Colors.BRIGHT_YELLOW}  📋 Пропущенные уровни:{Colors.RESET}")
#         for level_num in skipped_levels:
#             level_info = next((l for l in LEVELS if l['level'] == level_num), None)
#             if level_info:
#                 print(f"{Colors.DIM}     • Уровень {level_num}: {level_info['title']}{Colors.RESET}")
#         print()

# def print_final_result(completed, total, skipped):
#     """Финальный результат с оценкой"""
#     percent = (completed / total) * 100
    
#     print()
#     print(f"{Colors.BRIGHT_MAGENTA}┌{'─'*58}┐{Colors.RESET}")
#     print(f"{Colors.BRIGHT_MAGENTA}│{Colors.RESET}  {Colors.BOLD}🏆 ИТОГОВЫЙ РЕЗУЛЬТАТ{Colors.RESET}")
#     print(f"{Colors.BRIGHT_MAGENTA}├{'─'*58}┤{Colors.RESET}")
    
#     if percent >= 80 and skipped == 0:
#         print(f"{Colors.BRIGHT_MAGENTA}│{Colors.RESET}  {Colors.BRIGHT_GREEN}{Colors.BOLD} ОТЛИЧНО!{Colors.RESET}")
#         print(f"{Colors.BRIGHT_MAGENTA}│{Colors.RESET}  {Colors.DIM}Ты настоящий Python-пилот!{Colors.RESET}")
#         print(f"{Colors.BRIGHT_MAGENTA}│{Colors.RESET}  {Colors.DIM}Все уровни пройдены самостоятельно!{Colors.RESET}")
#     elif percent >= 80:
#         print(f"{Colors.BRIGHT_MAGENTA}│{Colors.RESET}  {Colors.BRIGHT_GREEN}{Colors.BOLD}🥈 ХОРОШО!{Colors.RESET}")
#         print(f"{Colors.BRIGHT_MAGENTA}│{Colors.RESET}  {Colors.DIM}Ты прошёл большинство уровней!{Colors.RESET}")
#         print(f"{Colors.BRIGHT_MAGENTA}│{Colors.RESET}  {Colors.DIM}Но некоторые пришлось пропустить...{Colors.RESET}")
#     elif percent >= 50:
#         print(f"{Colors.BRIGHT_MAGENTA}│{Colors.RESET}  {Colors.BRIGHT_YELLOW}{Colors.BOLD}🥉 НЕПЛОХО!{Colors.RESET}")
#         print(f"{Colors.BRIGHT_MAGENTA}│{Colors.RESET}  {Colors.DIM}Ты прошёл половину пути!{Colors.RESET}")
#         print(f"{Colors.BRIGHT_MAGENTA}│{Colors.RESET}  {Colors.DIM}Попробуй пройти остальные уровни!{Colors.RESET}")
#     else:
#         print(f"{Colors.BRIGHT_MAGENTA}│{Colors.RESET}  {Colors.BRIGHT_RED}{Colors.BOLD}⚠️  НУЖНО ПОПРОБОВАТЬ ЕЩЁ!{Colors.RESET}")
#         print(f"{Colors.BRIGHT_MAGENTA}│{Colors.RESET}  {Colors.DIM}Ты пропустил слишком много уровней!{Colors.RESET}")
#         print(f"{Colors.BRIGHT_MAGENTA}│{Colors.RESET}  {Colors.DIM}Вернись и попробуй пройти их сам!{Colors.RESET}")
    
#     print(f"{Colors.BRIGHT_MAGENTA}└{'─'*58}┘{Colors.RESET}")
#     print()

# # ============================================================================
# # ПРОВЕРКА КОДА
# # ============================================================================

# def mock_input(prompt=""):
#     return "TestPilot"

# def validate_code(user_code, level_num):
#     try:
#         old_stdout = sys.stdout
#         sys.stdout = StringIO()
        
#         local_vars = {
#             'input': mock_input,
#             'fuel': 100,
#             'speed': 500,
#             'pilot': 'Alex',
#             'planet': 'Earth',
#             'command': 'go',
#         }
        
#         exec(user_code, {}, local_vars)
#         output = sys.stdout.getvalue()
#         sys.stdout = old_stdout
        
#         if level_num == 1: return 'hello earth' in output.lower()
#         if level_num == 2: return local_vars.get('fuel') == 100
#         if level_num == 3: return local_vars.get('ship_name') == 'Apollo'
#         if level_num == 4: return local_vars.get('speed') == 500
#         if level_num == 5: return '500' in output
#         if level_num == 6: return 'pilot' in local_vars
#         if level_num == 7: return 'pilot' in local_vars and len(output.strip()) > 0
#         if level_num == 8: return all(x in user_code for x in ['if', 'fuel', '>', 'print'])
#         if level_num == 9: return isinstance(local_vars.get('planets', []), list) and len(local_vars.get('planets', [])) >= 3
#         if level_num == 10: return all(x in user_code for x in ['for', 'range', 'print'])
#         if level_num == 11: return all(x in user_code for x in ['if', 'else', 'fuel', '<', 'print'])
#         if level_num == 12: return all(x in user_code for x in ['if', 'elif', 'else', 'fuel'])
#         if level_num == 17: return all(x in user_code for x in ['while', 'fuel', '>', '-='])
#         if level_num == 24: return all(x in user_code for x in ['for', 'range', 'print', '2'])
#         if level_num == 41: return all(x in user_code for x in ['if', 'else', 'speed', '>', 'print'])
#         if level_num == 42: return all(x in user_code for x in ['if', 'elif', 'else', 'speed'])
#         if level_num == 43: return all(x in user_code for x in ['if', 'else', 'pilot', '==', 'print'])
#         if level_num == 44: return all(x in user_code for x in ['if', 'elif', 'else', 'planet'])
#         if level_num == 45: return all(x in user_code for x in ['if', 'and', 'fuel', 'speed', 'print'])
#         if level_num == 46: return all(x in user_code for x in ['if', 'or', 'fuel', 'speed', 'print'])
#         if level_num == 47: return all(x in user_code for x in ['while', 'speed', '<', '+='])
#         if level_num == 48: return all(x in user_code for x in ['while', 'print', '1', '5'])
#         if level_num == 49: return all(x in user_code for x in ['while', 'command', 'stop', 'print'])
#         if level_num == 50: return all(x in user_code for x in ['while', 'True', 'break', 'fuel'])
#         if level_num == 51: return all(x in user_code for x in ['while', 'if', 'fuel', '-='])
#         if level_num == 52: return user_code.count('while') >= 2 and 'print' in user_code
#         if level_num == 53: return all(x in user_code for x in ['for', 'range', 'print', '3'])
#         if level_num == 54: return all(x in user_code for x in ['for', 'range', 'print', '-'])
#         if level_num == 55: return all(x in user_code for x in ['for', 'range', 'print', '5', '50'])
#         if level_num == 56: return all(x in user_code for x in ['for', 'range', 'print', '1', '2'])
#         if level_num == 57: return all(x in user_code for x in ['for', 'range', '+=', 'print']) and '30' in output
#         if level_num == 58: return all(x in user_code for x in ['for', 'range', '.append', '[', ']'])
        
#         return False
        
#     except Exception as e:
#         sys.stdout = old_stdout
#         return False

# # ============================================================================
# # ОСНОВНАЯ ИГРА
# # ============================================================================

# def main():
#     clear_screen()
#     print_header()
#     print_loading("Инициализация систем", 0.5, 3)
#     time.sleep(0.5)
    
#     current_level = 0
#     total_levels = len(LEVELS)
#     completed = 0
#     skipped = 0
#     skipped_levels = []
    
#     try:
#         while current_level < total_levels:
#             level = LEVELS[current_level]
            
#             clear_screen()
#             print_header()
#             print_progress_bar(current_level, total_levels)
#             print_level_card(level, current_level, total_levels)
            
#             # Показываем предупреждение если много пропусков
#             if skipped > 0 and skipped % 5 == 0:
#                 print_skip_warning(skipped, total_levels)
            
#             print(f"{Colors.BRIGHT_CYAN}  ── Ввод кода ──{Colors.RESET}")
#             print(f"{Colors.DIM}  (Нажми Enter дважды после ввода кода){Colors.RESET}")
#             print(f"{Colors.DIM}  (Введи 'skip' чтобы пропустить уровень){Colors.RESET}")
#             print(f"{Colors.DIM}  (Введи 'stats' чтобы посмотреть статистику){Colors.RESET}")  # 🔒 НОВОЕ!
#             print(f"{Colors.DIM}  (Введи 'quit' чтобы выйти из игры){Colors.RESET}")  # 🔒 НОВОЕ!
#             print()
            
#             user_lines = []
#             while True:
#                 try:
#                     line = input(f"{Colors.GREEN}  >>> {Colors.RESET}")
#                     if line == '':
#                         break
                    
#                     # 🔒 НОВОЕ: Проверка команд
#                     if line.lower() == 'skip':
#                         print()
#                         print(f"{Colors.BRIGHT_YELLOW}  ⏭️  Пропускаем уровень {level['level']}{Colors.RESET}")
#                         print_unlock_code(level['unlock_code'])
                        
#                         skipped += 1
#                         skipped_levels.append(level['level'])
                        
#                         current_level += 1
#                         time.sleep(2)
#                         break
                    
#                     # 🔒 НОВОЕ: Показать статистику
#                     if line.lower() == 'stats':
#                         clear_screen()
#                         print_header()
#                         print_stats(completed, total_levels, skipped, skipped_levels)
#                         input(f"{Colors.DIM}  Нажми Enter чтобы продолжить...{Colors.RESET}")
#                         break
                    
#                     # 🔒 НОВОЕ: Выйти из игры
#                     if line.lower() == 'quit':
#                         print()
#                         print(f"{Colors.BRIGHT_YELLOW}  👋 До встречи в космосе!{Colors.RESET}")
#                         print_stats(completed, total_levels, skipped, skipped_levels)
#                         return
                    
#                     user_lines.append(line)
#                 except EOFError:
#                     break
            
#             if not user_lines:
#                 continue
            
#             user_code = '\n'.join(user_lines)
            
#             print()
#             print_loading("Проверка кода", 1, 3)
            
#             if validate_code(user_code, level['level']):
#                 print_rocket_animation()
#                 print_success_message(level['description'])
#                 print_unlock_code(level['unlock_code'])
#                 print(f"{Colors.DIM}  Сохрани этот код для продолжения!{Colors.RESET}")
#                 completed += 1
#                 current_level += 1
#                 time.sleep(3)
#             else:
#                 print(f"{Colors.RED}  ❌  Код не прошёл проверку! Попробуй ещё раз.{Colors.RESET}")
#                 print(f"{Colors.DIM}  💡 Подсказка: {level['hint']}{Colors.RESET}")
#                 print()
#                 input(f"{Colors.DIM}  Нажми Enter чтобы продолжить...{Colors.RESET}")
        
#         # ФИНАЛ ИГРЫ
#         clear_screen()
#         print_header()
        
#         print()
#         print(f"{Colors.BRIGHT_CYAN}  ════════════════════════════════════════════════════{Colors.RESET}")
#         print(f"{Colors.BRIGHT_CYAN}  🎉  МИССИЯ ЗАВЕРШЕНА!  🎉{Colors.RESET}")
#         print(f"{Colors.BRIGHT_CYAN}  ════════════════════════════════════════════════════{Colors.RESET}")
#         print()
        
#         print_stats(completed, total_levels, skipped, skipped_levels)
#         print_final_result(completed, total_levels, skipped)
        
#         if skipped == 0:
#             print(f"{Colors.BRIGHT_MAGENTA}  🏆 ДОСТИЖЕНИЕ: Перфекционист!{Colors.RESET}")
#             print(f"{Colors.DIM}  (Пройдено без пропусков){Colors.RESET}")
#             print()
        
#         if completed == total_levels:
#             print(f"{Colors.BRIGHT_GREEN}  🚀 ДОСТИЖЕНИЕ: Python-пилот!{Colors.RESET}")
#             print(f"{Colors.DIM}  (Все уровни пройдены){Colors.RESET}")
#             print()
        
#         print(f"{Colors.DIM}  Спасибо за игру! До новых миссий! 👋{Colors.RESET}")
#         print()
        
#     except KeyboardInterrupt:
#         print()
#         print()
#         print(f"{Colors.BRIGHT_YELLOW}  👋 До встречи в космосе!{Colors.RESET}")
#         print()
#         print_stats(completed, total_levels, skipped, skipped_levels)
#         print()

# if __name__ == "__main__":
#     try:
#         main()
#     except Exception as e:
#         print(f"{Colors.BRIGHT_RED}  ❌ Ошибка: {e}{Colors.RESET}")
#         print(f"{Colors.DIM}  Попробуй запустить игру снова{Colors.RESET}")
#         print()
