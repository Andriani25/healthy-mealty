export type RootStackParamList = {
  Home: { name?: string; components?: any; options?: any };
  AddFood: { name?: string; components?: any; options?: any };
  Feed: { sort: "latest" | "top" } | undefined;
};

export type Meal = {
  name: string;
  calories: string | number;
  portion: string;
  date?: string;
};
