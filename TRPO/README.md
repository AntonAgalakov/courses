# Учебный комплект CUnit

Откройте `index.html` для навигации по инструкциям.

- `windows.html` — установка Git, GCC, Make и CUnit в Windows через MSYS2 UCRT64.
- `linux.html` — установка Git, GCC, Make и CUnit в Debian/Ubuntu.
- `project.html` — разбор простого проекта.
- `example/` — готовые исходники и Makefile.

Git включён в список устанавливаемых инструментов на обеих платформах. После установки инструментов откройте терминал в `example/` и выполните:

```sh
make
./main
make test
make clean
```

Для Windows команды выполняются в терминале MSYS2 UCRT64.
