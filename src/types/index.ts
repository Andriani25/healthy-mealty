export type RootStackParamList = {
  Home: { name?: string; components?: any; options?: any };
  AddFood: { name?: string; components?: any; options?: any };
  Feed: { sort: "latest" | "top" } | undefined;
};

export type Statistics = {
  total: number | string;
  consumido: number | string;
  faltante: number | string;
  porcentaje: number;
};

export type Meal = {
  name: string;
  calories: string | number;
  portion: string;
  date?: string;
};
