#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
🚀 PYTHON SPACE MISSION
Красивая консольная игра для изучения Python
Версия с честным отслеживанием пропусков!
"""

import sys
import time
import os
from io import StringIO

# ============================================================================
# ЦВЕТА И СТИЛИ
# ============================================================================
class Colors:
    RESET = '\033[0m'
    BOLD = '\033[1m'
    DIM = '\033[2m'
    RED = '\033[31m'
    GREEN = '\033[32m'
    YELLOW = '\033[33m'
    BLUE = '\033[34m'
    MAGENTA = '\033[35m'
    CYAN = '\033[36m'
    WHITE = '\033[37m'
    BRIGHT_RED = '\033[91m'
    BRIGHT_GREEN = '\033[92m'
    BRIGHT_YELLOW = '\033[93m'
    BRIGHT_BLUE = '\033[94m'
    BRIGHT_CYAN = '\033[96m'
    BRIGHT_MAGENTA = '\033[95m'
    BG_GREEN = '\033[42m'
    BG_RED = '\033[41m'

# ============================================================================
# УРОВНИ МИССИИ
# ============================================================================
LEVELS = [
    {"level": 1, "title": "Первый сигнал", "description": "Выведи на экран текст: Hello Earth", "hint": "print('Hello Earth')", "unlock_code": "KEY-L1-EARTH2024"},
    {"level": 2, "title": "Переменная топлива", "description": "Создай переменную fuel со значением 100", "hint": "fuel = 100", "unlock_code": "KEY-L2-FUEL100"},
    {"level": 3, "title": "Имя корабля", "description": "Создай переменную ship_name со значением 'Apollo'", "hint": "ship_name = 'Apollo'", "unlock_code": "KEY-L3-APOLLO"},
    {"level": 4, "title": "Скорость корабля", "description": "Создай переменную speed со значением 500", "hint": "speed = 500", "unlock_code": "KEY-L4-SPEED500"},
    {"level": 5, "title": "Простая математика", "description": "Выведи на экран результат: 250 + 250", "hint": "print(250 + 250)", "unlock_code": "KEY-L5-MATH500"},
    {"level": 6, "title": "Ввод имени", "description": "Спроси имя у пользователя и сохрани в переменную pilot", "hint": "pilot = input()", "unlock_code": "KEY-L6-PILOT"},
    {"level": 7, "title": "Приветствие пилота", "description": "Выведи на экран 'Привет' используя переменную pilot (она уже создана)", "hint": "print(f'Привет, {pilot}')", "unlock_code": "KEY-L7-HELLO"},
    {"level": 8, "title": "Проверка условия", "description": "Если fuel > 50, выведи 'Полёт нормальный'", "hint": "if fuel > 50: print('Полёт нормальный')", "unlock_code": "KEY-L8-CHECK"},
    {"level": 9, "title": "Список планет", "description": "Создай список planets с тремя планетами: Earth, Mars, Venus", "hint": "planets = ['Earth', 'Mars', 'Venus']", "unlock_code": "KEY-L9-PLANETS"},
    {"level": 10, "title": "Первый цикл", "description": "Выведи числа 0, 1, 2 используя цикл for", "hint": "for i in range(3): print(i)", "unlock_code": "KEY-L10-FINAL"},
    {"level": 11, "title": "Если-Иначе", "description": "Если fuel < 50 выведи 'Тревога', иначе выведи 'Норма'", "hint": "if fuel < 50: print('Тревога') else: print('Норма')", "unlock_code": "KEY-L11-ALERT"},
    {"level": 12, "title": "Три условия", "description": "Если fuel < 30 → 'Критично', elif < 70 → 'Норма', else → 'Отлично'", "hint": "if / elif / else", "unlock_code": "KEY-L12-THREE"},
    {"level": 17, "title": "Цикл while", "description": "Пока fuel > 0, уменьшай fuel на 10 и выводи его значение", "hint": "while fuel > 0: print(fuel); fuel -= 10", "unlock_code": "KEY-L17-WHILE"},
    {"level": 24, "title": "Чётные числа", "description": "Выведи чётные числа: 0, 2, 4, 6, 8, 10", "hint": "for i in range(0, 11, 2): print(i)", "unlock_code": "KEY-L24-EVEN"},
    {"level": 41, "title": "Проверка скорости", "description": "Если speed > 1000 выведи 'Быстро', иначе 'Медленно'", "hint": "if speed > 1000: print('Быстро') else: print('Медленно')", "unlock_code": "KEY-L41-SPEED"},
    {"level": 42, "title": "Три скорости", "description": "speed < 500 → 'Стоп', < 1000 → 'Норма', иначе → 'Гипер'", "hint": "if / elif / else", "unlock_code": "KEY-L42-SPEED3"},
    {"level": 43, "title": "Кто пилот?", "description": "Если pilot == 'Alex' выведи 'Капитан', иначе 'Пилот'", "hint": "if pilot == 'Alex': print('Капитан') else: print('Пилот')", "unlock_code": "KEY-L43-PILOT"},
    {"level": 44, "title": "Планета", "description": "Если planet == 'Earth' → 'Дом', elif 'Mars' → 'Колония', else → 'Чужая'", "hint": "if / elif / else", "unlock_code": "KEY-L44-PLANET"},
    {"level": 45, "title": "Проверка И", "description": "Если fuel > 50 И speed > 200, выведи 'Готов', иначе 'Ждём'", "hint": "if fuel > 50 and speed > 200: print('Готов')", "unlock_code": "KEY-L45-AND"},
    {"level": 46, "title": "Проверка ИЛИ", "description": "Если fuel < 10 ИЛИ speed == 0, выведи 'SOS', иначе 'OK'", "hint": "if fuel < 10 or speed == 0: print('SOS')", "unlock_code": "KEY-L46-OR"},
    {"level": 47, "title": "Разгон", "description": "Пока speed < 1000, увеличивай speed на 100 и выводи", "hint": "while speed < 1000: print(speed); speed += 100", "unlock_code": "KEY-L47-SPEEDUP"},
    {"level": 48, "title": "Счётчик", "description": "Выведи числа 1, 2, 3, 4, 5 используя while", "hint": "i = 1; while i <= 5: print(i); i += 1", "unlock_code": "KEY-L48-COUNT5"},
    {"level": 49, "title": "Ожидание", "description": "Пока command != 'stop', выводи 'Жду'", "hint": "while command != 'stop': print('Жду')", "unlock_code": "KEY-L49-WAIT"},
    {"level": 50, "title": "Выход из цикла", "description": "while True: если fuel <= 0 сделай break", "hint": "while True: if fuel <= 0: break", "unlock_code": "KEY-L50-BREAK"},
    {"level": 51, "title": "Предупреждение", "description": "while fuel > 0: уменьшай на 20, если < 30 выводи 'Внимание'", "hint": "while + if внутри", "unlock_code": "KEY-L51-WARN"},
    {"level": 52, "title": "Два цикла", "description": "Сделай 2 цикла while чтобы вывести таблицу 3x3", "hint": "вложенный while", "unlock_code": "KEY-L52-TABLE"},
    {"level": 53, "title": "Шаг 3", "description": "Выведи числа: 0, 3, 6, 9, 12", "hint": "for i in range(0, 13, 3): print(i)", "unlock_code": "KEY-L53-STEP3"},
    {"level": 54, "title": "Обратный счёт", "description": "Выведи числа: 10, 8, 6, 4, 2", "hint": "for i in range(10, 0, -2): print(i)", "unlock_code": "KEY-L54-BACK"},
    {"level": 55, "title": "Пятёрки", "description": "Выведи числа: 5, 10, 15, 20, 25, 30, 35, 40, 45, 50", "hint": "for i in range(5, 51, 5): print(i)", "unlock_code": "KEY-L55-FIVE"},
    {"level": 56, "title": "Нечётные", "description": "Выведи числа: 1, 3, 5, 7, 9", "hint": "for i in range(1, 10, 2): print(i)", "unlock_code": "KEY-L56-ODD"},
    {"level": 57, "title": "Сумма", "description": "Посчитай сумму 2+4+6+8+10 (должно получиться 30)", "hint": "total = 0; for i in range(2, 11, 2): total += i; print(total)", "unlock_code": "KEY-L57-SUM"},
    {"level": 58, "title": "Список", "description": "Создай список [10, 20, 30, 40, 50] используя range и append", "hint": "nums = []; for i in range(10, 51, 10): nums.append(i)", "unlock_code": "KEY-L58-LIST"},
]

# ============================================================================
# ФУНКЦИИ ОФОРМЛЕНИЯ
# ============================================================================

def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

def print_header():
    print()
    print(f"{Colors.BRIGHT_CYAN}{Colors.BOLD}╔{'═'*58}╗{Colors.RESET}")
    print(f"{Colors.BRIGHT_CYAN}{Colors.BOLD}║{' '*15}🚀 PYTHON SPACE MISSION 🚀{' '*15}║{Colors.RESET}")
    print(f"{Colors.BRIGHT_CYAN}{Colors.BOLD}╚{'═'*58}╝{Colors.RESET}")
    print()

def print_level_card(level, current, total):
    print(f"{Colors.BRIGHT_BLUE}┌{'─'*58}┐{Colors.RESET}")
    print(f"{Colors.BRIGHT_BLUE}│{Colors.RESET}  {Colors.BOLD}{Colors.YELLOW}УРОВЕНЬ {level['level']}/{total}{Colors.RESET}  {Colors.DIM}{'●' * min(current, 10)}{'○' * (total - current)}{Colors.RESET}  {Colors.BRIGHT_BLUE}│{Colors.RESET}")
    print(f"{Colors.BRIGHT_BLUE}├{'─'*58}┤{Colors.RESET}")
    print(f"{Colors.BRIGHT_BLUE}│{Colors.RESET}  {Colors.BOLD}{Colors.CYAN}{level['title']}{Colors.RESET}")
    print(f"{Colors.BRIGHT_BLUE}│{Colors.RESET}")
    print(f"{Colors.BRIGHT_BLUE}│{Colors.RESET}  {Colors.WHITE}📋 Задание:{Colors.RESET}")
    print(f"{Colors.BRIGHT_BLUE}│{Colors.RESET}  {Colors.DIM}{level['description']}{Colors.RESET}")
    print(f"{Colors.BRIGHT_BLUE}│{Colors.RESET}")
    # print(f"{Colors.BRIGHT_BLUE}│{Colors.RESET}  {Colors.GREEN}💡 Подсказка:{Colors.RESET}")
    # print(f"{Colors.BRIGHT_BLUE}│{Colors.RESET}  {Colors.DIM}{level['hint']}{Colors.RESET}")
    print(f"{Colors.BRIGHT_BLUE}└{'─'*58}┘{Colors.RESET}")
    print()

def print_progress_bar(current, total, width=50):
    percent = (current / total) * 100
    filled = int(width * current / total)
    bar = '█' * filled + '░' * (width - filled)
    print(f"{Colors.DIM}  Прогресс: [{Colors.BRIGHT_GREEN}{bar}{Colors.DIM}] {percent:.1f}% ({current}/{total}){Colors.RESET}")
    print()

def print_success_message(message):
    print()
    print(f"{Colors.BG_GREEN}{Colors.BOLD}  ✅  {message}{' '*(50-len(message))}  {Colors.RESET}")
    print()

def print_unlock_code(code):
    print(f"{Colors.BRIGHT_YELLOW}  ╔{'═'*20}╗{Colors.RESET}")
    print(f"{Colors.BRIGHT_YELLOW}  ║    {Colors.BOLD}{code}{Colors.RESET}{Colors.BRIGHT_YELLOW}  ║{Colors.RESET}")
    print(f"{Colors.BRIGHT_YELLOW}  ╚{'═'*20}╝{Colors.RESET}")
    print()

def print_loading(text="Загрузка", duration=1, dots=3):
    print(f"{Colors.DIM}  {text}", end="", flush=True)
    for i in range(dots):
        time.sleep(duration / dots)
        print(f"{Colors.BRIGHT_CYAN}.{Colors.RESET}", end="", flush=True)
    print()

def print_rocket_animation():
    rockets = ["🚀  ", " 🚀 ", "  🚀", "   🚀", "    🚀"]
    for rocket in rockets:
        print(f"\r{Colors.BRIGHT_CYAN}  {rocket}  Полёт нормальный!{Colors.RESET}", end="", flush=True)
        time.sleep(0.15)
    print()

def print_skip_warning(skipped, total):
    """Предупреждение при большом количестве пропусков"""
    percent = (skipped / total) * 100
    
    if percent >= 50:
        print()
        print(f"{Colors.BG_RED}{Colors.BOLD}  ⚠️  ВНИМАНИЕ: Пропущено {percent:.0f}% уровней!  {Colors.RESET}")
        print(f"{Colors.BRIGHT_RED}  Вы не сможете получить сертификат пилота!{Colors.RESET}")
        print()
        time.sleep(2)
    elif percent >= 30:
        print()
        print(f"{Colors.BRIGHT_YELLOW}  ⚠️  Предупреждение: Пропущено {percent:.0f}% уровней{Colors.RESET}")
        print(f"{Colors.DIM}  Попробуйте пройти больше уровней самостоятельно!{Colors.RESET}")
        print()
        time.sleep(2)

def print_stats(completed, total, skipped, skipped_levels):
    """Подробная статистика с списком пропущенных уровней"""
    print()
    print(f"{Colors.BRIGHT_MAGENTA}┌{'─'*58}┐{Colors.RESET}")
    print(f"{Colors.BRIGHT_MAGENTA}│{Colors.RESET}  {Colors.BOLD}📊 СТАТИСТИКА МИССИИ{Colors.RESET}")
    print(f"{Colors.BRIGHT_MAGENTA}├{'─'*58}┤{Colors.RESET}")
    print(f"{Colors.BRIGHT_MAGENTA}│{Colors.RESET}  ✅ Пройдено уровней:     {Colors.BRIGHT_GREEN}{completed}{Colors.RESET}")
    print(f"{Colors.BRIGHT_MAGENTA}│{Colors.RESET}  ⏭️  Пропущено уровней:    {Colors.BRIGHT_YELLOW}{skipped}{Colors.RESET}")
    print(f"{Colors.BRIGHT_MAGENTA}│{Colors.RESET}  📈 Реальный прогресс:    {Colors.BRIGHT_CYAN}{(completed/total)*100:.1f}%{Colors.RESET}")
    print(f"{Colors.BRIGHT_MAGENTA}└{'─'*58}┘{Colors.RESET}")
    print()
    
    # Показываем список пропущенных уровней
    if skipped > 0:
        print(f"{Colors.BRIGHT_YELLOW}  📋 Пропущенные уровни:{Colors.RESET}")
        for level_num in skipped_levels:
            level_info = next((l for l in LEVELS if l['level'] == level_num), None)
            if level_info:
                print(f"{Colors.DIM}     • Уровень {level_num}: {level_info['title']}{Colors.RESET}")
        print()

def print_final_result(completed, total, skipped):
    """Финальный результат с оценкой"""
    percent = (completed / total) * 100
    
    print()
    print(f"{Colors.BRIGHT_MAGENTA}┌{'─'*58}┐{Colors.RESET}")
    print(f"{Colors.BRIGHT_MAGENTA}│{Colors.RESET}  {Colors.BOLD}🏆 ИТОГОВЫЙ РЕЗУЛЬТАТ{Colors.RESET}")
    print(f"{Colors.BRIGHT_MAGENTA}├{'─'*58}┤{Colors.RESET}")
    
    if percent >= 80 and skipped == 0:
        print(f"{Colors.BRIGHT_MAGENTA}│{Colors.RESET}  {Colors.BRIGHT_GREEN}{Colors.BOLD} ОТЛИЧНО!{Colors.RESET}")
        print(f"{Colors.BRIGHT_MAGENTA}│{Colors.RESET}  {Colors.DIM}Ты настоящий Python-пилот!{Colors.RESET}")
        print(f"{Colors.BRIGHT_MAGENTA}│{Colors.RESET}  {Colors.DIM}Все уровни пройдены самостоятельно!{Colors.RESET}")
    elif percent >= 80:
        print(f"{Colors.BRIGHT_MAGENTA}│{Colors.RESET}  {Colors.BRIGHT_GREEN}{Colors.BOLD}🥈 ХОРОШО!{Colors.RESET}")
        print(f"{Colors.BRIGHT_MAGENTA}│{Colors.RESET}  {Colors.DIM}Ты прошёл большинство уровней!{Colors.RESET}")
        print(f"{Colors.BRIGHT_MAGENTA}│{Colors.RESET}  {Colors.DIM}Но некоторые пришлось пропустить...{Colors.RESET}")
    elif percent >= 50:
        print(f"{Colors.BRIGHT_MAGENTA}│{Colors.RESET}  {Colors.BRIGHT_YELLOW}{Colors.BOLD}🥉 НЕПЛОХО!{Colors.RESET}")
        print(f"{Colors.BRIGHT_MAGENTA}│{Colors.RESET}  {Colors.DIM}Ты прошёл половину пути!{Colors.RESET}")
        print(f"{Colors.BRIGHT_MAGENTA}│{Colors.RESET}  {Colors.DIM}Попробуй пройти остальные уровни!{Colors.RESET}")
    else:
        print(f"{Colors.BRIGHT_MAGENTA}│{Colors.RESET}  {Colors.BRIGHT_RED}{Colors.BOLD}⚠️  НУЖНО ПОПРОБОВАТЬ ЕЩЁ!{Colors.RESET}")
        print(f"{Colors.BRIGHT_MAGENTA}│{Colors.RESET}  {Colors.DIM}Ты пропустил слишком много уровней!{Colors.RESET}")
        print(f"{Colors.BRIGHT_MAGENTA}│{Colors.RESET}  {Colors.DIM}Вернись и попробуй пройти их сам!{Colors.RESET}")
    
    print(f"{Colors.BRIGHT_MAGENTA}└{'─'*58}┘{Colors.RESET}")
    print()

# ============================================================================
# ПРОВЕРКА КОДА
# ============================================================================

def mock_input(prompt=""):
    return "TestPilot"

def validate_code(user_code, level_num):
    try:
        old_stdout = sys.stdout
        sys.stdout = StringIO()
        
        local_vars = {
            'input': mock_input,
            'fuel': 100,
            'speed': 500,
            'pilot': 'Alex',
            'planet': 'Earth',
            'command': 'go',
        }
        
        exec(user_code, {}, local_vars)
        output = sys.stdout.getvalue()
        sys.stdout = old_stdout
        
        if level_num == 1: return 'hello earth' in output.lower()
        if level_num == 2: return local_vars.get('fuel') == 100
        if level_num == 3: return local_vars.get('ship_name') == 'Apollo'
        if level_num == 4: return local_vars.get('speed') == 500
        if level_num == 5: return '500' in output
        if level_num == 6: return 'pilot' in local_vars
        if level_num == 7: return 'pilot' in local_vars and len(output.strip()) > 0
        if level_num == 8: return all(x in user_code for x in ['if', 'fuel', '>', 'print'])
        if level_num == 9: return isinstance(local_vars.get('planets', []), list) and len(local_vars.get('planets', [])) >= 3
        if level_num == 10: return all(x in user_code for x in ['for', 'range', 'print'])
        if level_num == 11: return all(x in user_code for x in ['if', 'else', 'fuel', '<', 'print'])
        if level_num == 12: return all(x in user_code for x in ['if', 'elif', 'else', 'fuel'])
        if level_num == 17: return all(x in user_code for x in ['while', 'fuel', '>', '-='])
        if level_num == 24: return all(x in user_code for x in ['for', 'range', 'print', '2'])
        if level_num == 41: return all(x in user_code for x in ['if', 'else', 'speed', '>', 'print'])
        if level_num == 42: return all(x in user_code for x in ['if', 'elif', 'else', 'speed'])
        if level_num == 43: return all(x in user_code for x in ['if', 'else', 'pilot', '==', 'print'])
        if level_num == 44: return all(x in user_code for x in ['if', 'elif', 'else', 'planet'])
        if level_num == 45: return all(x in user_code for x in ['if', 'and', 'fuel', 'speed', 'print'])
        if level_num == 46: return all(x in user_code for x in ['if', 'or', 'fuel', 'speed', 'print'])
        if level_num == 47: return all(x in user_code for x in ['while', 'speed', '<', '+='])
        if level_num == 48: return all(x in user_code for x in ['while', 'print', '1', '5'])
        if level_num == 49: return all(x in user_code for x in ['while', 'command', 'stop', 'print'])
        if level_num == 50: return all(x in user_code for x in ['while', 'True', 'break', 'fuel'])
        if level_num == 51: return all(x in user_code for x in ['while', 'if', 'fuel', '-='])
        if level_num == 52: return user_code.count('while') >= 2 and 'print' in user_code
        if level_num == 53: return all(x in user_code for x in ['for', 'range', 'print', '3'])
        if level_num == 54: return all(x in user_code for x in ['for', 'range', 'print', '-'])
        if level_num == 55: return all(x in user_code for x in ['for', 'range', 'print', '5', '50'])
        if level_num == 56: return all(x in user_code for x in ['for', 'range', 'print', '1', '2'])
        if level_num == 57: return all(x in user_code for x in ['for', 'range', '+=', 'print']) and '30' in output
        if level_num == 58: return all(x in user_code for x in ['for', 'range', '.append', '[', ']'])
        
        return False
        
    except Exception as e:
        sys.stdout = old_stdout
        return False

# ============================================================================
# ОСНОВНАЯ ИГРА
# ============================================================================

def main():
    clear_screen()
    print_header()
    print_loading("Инициализация систем", 0.5, 3)
    time.sleep(0.5)
    
    current_level = 0
    total_levels = len(LEVELS)
    completed = 0
    skipped = 0
    skipped_levels = []
    
    try:
        while current_level < total_levels:
            level = LEVELS[current_level]
            
            clear_screen()
            print_header()
            print_progress_bar(current_level, total_levels)
            print_level_card(level, current_level, total_levels)
            
            # Показываем предупреждение если много пропусков
            if skipped > 0 and skipped % 5 == 0:
                print_skip_warning(skipped, total_levels)
            
            print(f"{Colors.BRIGHT_CYAN}  ── Ввод кода ──{Colors.RESET}")
            print(f"{Colors.DIM}  (Нажми Enter дважды после ввода кода){Colors.RESET}")
            print(f"{Colors.DIM}  (Введи 'skip' чтобы пропустить уровень){Colors.RESET}")
            print(f"{Colors.DIM}  (Введи 'stats' чтобы посмотреть статистику){Colors.RESET}")  # 🔒 НОВОЕ!
            print(f"{Colors.DIM}  (Введи 'quit' чтобы выйти из игры){Colors.RESET}")  # 🔒 НОВОЕ!
            print()
            
            user_lines = []
            while True:
                try:
                    line = input(f"{Colors.GREEN}  >>> {Colors.RESET}")
                    if line == '':
                        break
                    
                    # 🔒 НОВОЕ: Проверка команд
                    if line.lower() == 'skip':
                        print()
                        print(f"{Colors.BRIGHT_YELLOW}  ⏭️  Пропускаем уровень {level['level']}{Colors.RESET}")
                        print_unlock_code(level['unlock_code'])
                        
                        skipped += 1
                        skipped_levels.append(level['level'])
                        
                        current_level += 1
                        time.sleep(2)
                        break
                    
                    # 🔒 НОВОЕ: Показать статистику
                    if line.lower() == 'stats':
                        clear_screen()
                        print_header()
                        print_stats(completed, total_levels, skipped, skipped_levels)
                        input(f"{Colors.DIM}  Нажми Enter чтобы продолжить...{Colors.RESET}")
                        break
                    
                    # 🔒 НОВОЕ: Выйти из игры
                    if line.lower() == 'quit':
                        print()
                        print(f"{Colors.BRIGHT_YELLOW}  👋 До встречи в космосе!{Colors.RESET}")
                        print_stats(completed, total_levels, skipped, skipped_levels)
                        return
                    
                    user_lines.append(line)
                except EOFError:
                    break
            
            if not user_lines:
                continue
            
            user_code = '\n'.join(user_lines)
            
            print()
            print_loading("Проверка кода", 1, 3)
            
            if validate_code(user_code, level['level']):
                print_rocket_animation()
                print_success_message(level['description'])
                print_unlock_code(level['unlock_code'])
                print(f"{Colors.DIM}  Сохрани этот код для продолжения!{Colors.RESET}")
                completed += 1
                current_level += 1
                time.sleep(3)
            else:
                print(f"{Colors.RED}  ❌  Код не прошёл проверку! Попробуй ещё раз.{Colors.RESET}")
                print(f"{Colors.DIM}  💡 Подсказка: {level['hint']}{Colors.RESET}")
                print()
                input(f"{Colors.DIM}  Нажми Enter чтобы продолжить...{Colors.RESET}")
        
        # ФИНАЛ ИГРЫ
        clear_screen()
        print_header()
        
        print()
        print(f"{Colors.BRIGHT_CYAN}  ════════════════════════════════════════════════════{Colors.RESET}")
        print(f"{Colors.BRIGHT_CYAN}  🎉  МИССИЯ ЗАВЕРШЕНА!  🎉{Colors.RESET}")
        print(f"{Colors.BRIGHT_CYAN}  ════════════════════════════════════════════════════{Colors.RESET}")
        print()
        
        print_stats(completed, total_levels, skipped, skipped_levels)
        print_final_result(completed, total_levels, skipped)
        
        if skipped == 0:
            print(f"{Colors.BRIGHT_MAGENTA}  🏆 ДОСТИЖЕНИЕ: Перфекционист!{Colors.RESET}")
            print(f"{Colors.DIM}  (Пройдено без пропусков){Colors.RESET}")
            print()
        
        if completed == total_levels:
            print(f"{Colors.BRIGHT_GREEN}  🚀 ДОСТИЖЕНИЕ: Python-пилот!{Colors.RESET}")
            print(f"{Colors.DIM}  (Все уровни пройдены){Colors.RESET}")
            print()
        
        print(f"{Colors.DIM}  Спасибо за игру! До новых миссий! 👋{Colors.RESET}")
        print()
        
    except KeyboardInterrupt:
        print()
        print()
        print(f"{Colors.BRIGHT_YELLOW}  👋 До встречи в космосе!{Colors.RESET}")
        print()
        print_stats(completed, total_levels, skipped, skipped_levels)
        print()

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"{Colors.BRIGHT_RED}  ❌ Ошибка: {e}{Colors.RESET}")
        print(f"{Colors.DIM}  Попробуй запустить игру снова{Colors.RESET}")
        print()