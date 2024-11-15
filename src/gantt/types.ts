export type RawDate = string | Date;
export type Dates = [RawDate, RawDate];
export type ChartDates = [Date, Date];

export interface GanttTask {
  name: string;
  dates: ChartDates;
  fill: string;
  color: string;
}
export interface GanttRow {
  name: string;
  items: GanttTask[];
}

interface GanttRawTask {
  name: string;
  dates: Dates;
  fill: string;
  color: string;
}
interface GanttRawRow {
  name: string;
  items: GanttRawTask[];
}

export type GanttData = GanttRow[];
export type GanttRawData = GanttRawRow[];
