# ============================================================
#   ТВОЯ ЗОНА — МЕНЯЙ ЗДЕСЬ ВСЁ, ЧТО ХОЧЕШЬ!
# ============================================================
# Здесь только списки и строки. Больше ничего не нужно знать.

# Название игры в окне (строка)
NAME = "Моя крутая викторина"

# Вопросы. Формат: [текст вопроса, ответ1, ответ2, ответ3, ответ4, правильный_ответ]
questions = [
    ["Столица России?", "Москва", "Петербург", "Казань", "Сочи", "Москва"],
    ["Сколько планет в Солнечной системе?", "7", "8", "9", "10", "8"],
    ["Какой язык мы изучаем?", "Java", "Python", "C++", "HTML", "Python"],
    ["Сколько будет 7 * 8?", "54", "56", "58", "64", "56"],
    ["Кто написал 'Евгений Онегин'?", "Лермонтов", "Толстой", "Пушкин", "Гоголь", "Пушкин"],
]

# Подсказки — по одной на каждый вопрос (строк должно быть столько же, сколько вопросов!)
hints = [
    "Подсказка: город на реке Москве",
    "Подсказка: Плутон больше не планета",
    "Подсказка: назван в честь змеи",
    "Подсказка: посчитай на калькуляторе",
    "Подсказка: солнце русской поэзии",
]

# Цвета (списки из трёх чисел: красный, зелёный, синий — от 0 до 255)
color_background = [40, 40, 80]
color_buttons    = [100, 150, 255]
color_right      = [100, 220, 100]
color_wrong      = [220, 100, 100]

# Сколько секунд показывать результат ответа
ANSWER_DELAY_SECONDS = 4

# ============================================================
#   НЕ ТРОГАТЬ — ДВИЖОК ИГРЫ
# ============================================================
import pygame
import sys

pygame.init()
screen = pygame.display.set_mode((800, 600))
pygame.display.set_caption(NAME)
clock = pygame.time.Clock()
FPS = 60

WHITE  = (255, 255, 255)
YELLOW = (255, 220, 100)

font_big   = pygame.font.SysFont("arial", 36, bold=True)
font_mid   = pygame.font.SysFont("arial", 28)
font_small = pygame.font.SysFont("arial", 22)

current_question = 0
score = 0
feedback = ""
feedback_color = WHITE
feedback_timer = 0
selected_index = None
correct_index = None
show_hint = False

def draw_text(text, font, color, x, y, center=False):
    surf = font.render(text, True, color)
    rect = surf.get_rect()
    if center:
        rect.center = (x, y)
    else:
        rect.topleft = (x, y)
    screen.blit(surf, rect)

def get_button_color(i):
    if feedback_timer == 0:
        return color_buttons
    if i == correct_index:
        return color_right
    if i == selected_index and selected_index != correct_index:
        return color_wrong
    return color_buttons

def draw_question():
    screen.fill(color_background)
    q = questions[current_question]

    draw_text(f"Вопрос {current_question + 1} из {len(questions)}",
              font_small, YELLOW, 400, 30, center=True)
    draw_text(f"Счёт: {score}", font_mid, WHITE, 700, 30, center=True)
    draw_text(q[0], font_big, WHITE, 400, 110, center=True)

    for i in range(4):
        x = 100 + (i % 2) * 350
        y = 220 + (i // 2) * 110
        rect = pygame.Rect(x, y, 300, 75)
        pygame.draw.rect(screen, get_button_color(i), rect, border_radius=15)
        pygame.draw.rect(screen, WHITE, rect, 3, border_radius=15)
        draw_text(f"{i+1}. {q[i+1]}", font_mid, WHITE, x + 150, y + 37, center=True)

    if feedback_timer == 0:
        if show_hint:
            draw_text(hints[current_question], font_small, YELLOW, 400, 465, center=True)
        else:
            draw_text("[H] — подсказка", font_small, YELLOW, 400, 465, center=True)

def draw_feedback():
    if feedback_timer > 0:
        draw_text(feedback, font_mid, feedback_color, 400, 470, center=True)
        draw_text("Нажми Space / Enter или кликни для следующего вопроса",
                  font_small, YELLOW, 400, 520, center=True)

def next_question():
    global current_question, score, feedback_timer, selected_index, correct_index
    current_question += 1
    if current_question >= len(questions):
        current_question = 0
        score = 0
    feedback_timer = 0
    selected_index = None
    correct_index = None

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_h and feedback_timer == 0:
                show_hint = not show_hint
            if feedback_timer > 0 and event.key in (pygame.K_SPACE, pygame.K_RETURN):
                next_question()

        # Выбор ответа мышью
        if event.type == pygame.MOUSEBUTTONDOWN and event.button == 1 and feedback_timer == 0:
            mx, my = pygame.mouse.get_pos()
            q = questions[current_question]
            for i in range(4):
                x = 100 + (i % 2) * 350
                y = 220 + (i // 2) * 110
                rect = pygame.Rect(x, y, 300, 75)
                if rect.collidepoint(mx, my):
                    selected_index = i
                    correct_index = q[1:5].index(q[5]) if q[5] in q[1:5] else None
                    if q[i+1] == q[5]:
                        score += 10
                        feedback = "Верно! +10"
                        feedback_color = color_right
                    else:
                        feedback = f"Неверно! Правильный ответ: {q[5]}"
                        feedback_color = color_wrong
                    feedback_timer = ANSWER_DELAY_SECONDS * FPS
                    show_hint = False
                    break

        # Переход по клику мыши (чуть позже начала показа ответа, чтобы случайный дабл-клик не пролистывал)
        elif event.type == pygame.MOUSEBUTTONDOWN and event.button == 1 and feedback_timer > 0:
            if feedback_timer < (ANSWER_DELAY_SECONDS * FPS) - 15:
                next_question()

    # Автоматический переход через заданное число секунд
    if feedback_timer > 0:
        feedback_timer -= 1
        if feedback_timer == 0:
            next_question()

    draw_question()
    draw_feedback()

    pygame.display.flip()
    clock.tick(FPS)

pygame.quit()
sys.exit()