<a id="работа-агента-в-kazankin-project"></a>

# Agent work in Kazankin project

Этот проект разрабатывает и развивает веб-сайт портфолио/лендинг для **Дмитрия Казанкина («KAZANKIN ВИДЕОМОНТАЖ»)** на основе предоставленных референсов (`Referens/`).

Управление проектом, контроль качества и ведение задач осуществляются по методологии **High Grade** (SDD — разработка от спецификаций, BDD — проверяемые поведенческие сценарии, Test-First).

Начните с [README.md](README.md) и местной инструкции [.highgrade/project/INSTRUCTIONS.md](.highgrade/project/INSTRUCTIONS.md).

<a id="владельцы-знаний"></a>

## Владельцы знаний

- **Цель и навигация:** [README.md](README.md).
- **Дизайн-система и токены:** [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) (цвета, шрифты, компоненты по макетам из `Referens/`).
- **Архитектура сайта:** [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).
- **Инженерные команды и запуск:** [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md).
- **Правила и процедуры:** [rules.md](rules.md) и каталог `.highgrade/kit/` (или `HighGrade-main/kit/`).
- **Спецификации и требования:** каталог [specs/](specs/).
- **Реестр контекста и бюджеты:** [.highgrade/project/documents.json](.highgrade/project/documents.json).

<a id="маршрут-high-grade"></a>

## Маршрут High Grade

Используйте навыки High Grade из `.agents/skills/`:
- `highgrade-task`: уточнение задачи и выбор маршрута.
- `highgrade-spec`: создание/изменение спецификаций (SDD) перед реализацией.
- `highgrade-work`: реализация задач по утверждённым требованиям (TDD/BDD).
- `highgrade-planner`: координация цепочек зависимых задач.
- `highgrade-commit`: локальная фиксация готового этапа.
- `highgrade-clear`: актуализация документации и очистка временных артефактов.

<a id="границы-и-сохранение"></a>

## Границы и сохранение

- Референсы в `Referens/` являются исходными материалами и не изменяются.
- Каталог `HighGrade-main/` содержит исходную библиотеку/дистрибутив High Grade и сохраняется без повреждений.
- Разработка ведётся в корне проекта (`index.html`, `src/`, `styles/`, `scripts/`, `docs/`, `specs/`).
- Документация пишется на русском языке. Машинные идентификаторы, теги и селекторы сохраняются без изменений.
