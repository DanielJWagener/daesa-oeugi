export type Line = {
  line: string;
  speaker: string;
};

export type Scene = {
  key: string;
  title: string;
  lines: Line[];
};
