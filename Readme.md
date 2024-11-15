# График Ганта

График может масштабироваться колесиком мыши и листаться по горизонтали 
Ось Х динамическая и подстраивается под масштаб, шаг отображения от 1 дня до 1 года

![График Ганта](/public/gantt.png)

Для использования нужно достать из репозитория папку *gantt* и импортировать из нее Компонент *Gantt*:

Интерфейс для графика:

```
    interface GanttProps {
        data: GanttData;
        background: string;
        rowHeight: number;
        y?: Partial<{
            color: string;
            lineColor: string;
        }>;
        x?: Partial<{
            color: string;
            lineColor: string;
        }>;
        grid?: Partial<{
            fill: string;
            lineColor: string;
        }>;
        empty?: ReactNode;
        scrollSensitivity?: number;
        title?: {
            text: string;
            height: number;
        };
    }
```

Пример использования графика:

```
    import { Gantt } from './gantt';

    <Gantt
        data={data}
        background="transparent"
        rowHeight={30}
        y={{ color: '#8787875b', lineColor: '#8787875b' }}
        x={{ color: '#8787875b', lineColor: '#8787875b' }}
        grid={{ lineColor: '#8787875b', fill: 'transparent' }}
        scrollSensitivity={10}
        title={{ text: 'Диаграмма Ганта', height: 50 }}
    />
```

График состоит из нескольких компонентов:

1. YAxis
2. XAxis
3. Grid
4. Row
5. Task
6. Tooltip

Переменные:
- Scale - масштаб
- DayMs - кол-во мс в дне
- GridWidth - ширина сетки
- PeriodEnd - конец периода
- PeriodStart - начало периода
- TaskOffset - отступ задачи
- TaskWidth - ширина задачи
- TaskStart - начало задачи
- TaskEnd - конец задачи

Маштаб графика

$$
Scale = (DayMs / GridWidth) / (EndPeriod - StartPeriod)
$$

Отступ задачи от начала периода

$$
TaskOffset = ((TaskStart - PeriodStart) / DayMs) * Scale + 'px';
$$

Ширина задачи

$$
TaskWidth = ((TaskEnd - TaskStart) / DayMs) * Scale + 'px';
$$

Все значения начала и конца задачи / периода имеют тип Дата, затем из этой даты достается кол-во миллисекунд и уже с ним происходят рассчеты