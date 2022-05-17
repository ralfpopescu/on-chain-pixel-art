export type Layer = {
  canvas: number[];
  palette: string[];
  name: string;
};

export type AppState = {
  x: number;
  y: number;
  layers: Layer[];
};