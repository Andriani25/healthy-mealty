import AsyncStorage from "@react-native-async-storage/async-storage";
import { Meal } from "../types";
import { isToday, parse } from "date-fns";
import { useUserStore } from "../store/user";

const MY_FOOD_KEY = "@MyFood:Key";
const DAILY_FOOD_KEY = "@DailyFood:Key";
const USER_IMAGE_KEY = "@UserImage:Key";
const USER_NAME_KEY = "@UserName:Key";

const useFoodStorage = function () {
  const handleSaveFood = async ({ calories, name, portion }: Meal) => {
    try {
      const currentSaveFood = await AsyncStorage.getItem(MY_FOOD_KEY);

      if (currentSaveFood !== null) {
        const currentSaveFoodParsed = JSON.parse(currentSaveFood);
        currentSaveFoodParsed.push({
          name,
          calories,
          portion,
        });
        await AsyncStorage.setItem(
          MY_FOOD_KEY,
          JSON.stringify(currentSaveFoodParsed)
        );

        return Promise.resolve();
      }

      await AsyncStorage.setItem(
        MY_FOOD_KEY,
        JSON.stringify([{ name, calories, portion }])
      );
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleGetFoods = async () => {
    try {
      const Foods = await AsyncStorage.getItem(MY_FOOD_KEY);

      if (Foods !== null) {
        const parsedFoods = JSON.parse(Foods);

        return Promise.resolve(parsedFoods);
      }
    } catch (error) {
      Promise.reject(error);
    }
  };
  const handleRemoveFood = async (value: string) => {
    try {
      const Foods = await AsyncStorage.getItem(MY_FOOD_KEY);

      if (Foods !== null) {
        const parsedFoods = JSON.parse(Foods);

        const newFoods = parsedFoods.filter(
          (food: Meal) => food.name.toLowerCase() !== value.toLowerCase()
        );

        await AsyncStorage.removeItem(MY_FOOD_KEY);

        await AsyncStorage.setItem(MY_FOOD_KEY, JSON.stringify(newFoods));

        return Promise.resolve(console.log("Storage Updated!"));
      }

      return Promise.resolve(console.log("Storage Empty!"));
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddDailyFood = async function ({
    calories,
    name,
    portion,
  }: Meal) {
    try {
      const dailyFoods = await AsyncStorage.getItem(DAILY_FOOD_KEY);

      if (dailyFoods !== null) {
        const parsedFoods = JSON.parse(dailyFoods);

        parsedFoods.push({
          calories,
          name,
          portion,
          date: new Date().toISOString(),
        });

        await AsyncStorage.setItem(DAILY_FOOD_KEY, JSON.stringify(parsedFoods));

        return Promise.resolve();
      }

      await AsyncStorage.setItem(
        DAILY_FOOD_KEY,
        JSON.stringify([
          { calories, name, portion, date: new Date().toISOString() },
        ])
      );

      return Promise.resolve(console.log("Nuevas comidas del día creadas"));
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleGetDailyFoods = async () => {
    try {
      const Foods = await AsyncStorage.getItem(DAILY_FOOD_KEY);

      if (Foods !== null) {
        const parsedFoods = JSON.parse(Foods) as Meal[];

        if (parsedFoods) {
          const result = parsedFoods.filter(
            (item) => item.date && isToday(new Date(item.date))
          );

          return Promise.resolve(result);
        }
      }
    } catch (error) {
      Promise.reject(error);
    }
  };

  const handleRemoveDailyFoods = async (value: string) => {
    try {
      const Foods = await AsyncStorage.getItem(DAILY_FOOD_KEY);

      if (Foods !== null) {
        const parsedFoods = JSON.parse(Foods);

        const newFoods = parsedFoods.filter(
          (food: Meal) => food.date?.toLowerCase() !== value.toLowerCase()
        );

        await AsyncStorage.removeItem(DAILY_FOOD_KEY);

        await AsyncStorage.setItem(DAILY_FOOD_KEY, JSON.stringify(newFoods));

        return Promise.resolve(console.log("Storage Updated!"));
      }

      return Promise.resolve(console.log("Storage Empty!"));
    } catch (error) {
      console.error(error);
    }
  };

  return {
    onSaveFood: handleSaveFood,
    onGetFoods: handleGetFoods,
    onRemoveFoods: handleRemoveFood,
    onAddDailyFood: handleAddDailyFood,
    onGetDailyFoods: handleGetDailyFoods,
    onRemoveDailyFoods: handleRemoveDailyFoods,
  };
};

export default useFoodStorage;
