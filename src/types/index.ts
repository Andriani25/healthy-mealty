export type RootStackParamList = {
  Home: { name?: string; components?: any; options?: any };
  AddFood: { name?: string; components?: any; options?: any };
  Feed: { sort: "latest" | "top" } | undefined;
};

export type Statistics = {
  total: number;
  consumido: number;
  faltante: number;
  porcentaje: number;
};

export type Meal = {
  name: string;
  calories: string | number;
  portion: string;
  date?: string;
};
