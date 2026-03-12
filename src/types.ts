export interface UserData {
  ecoCoins: number;
  streak: number;
  unlockedSDGs: number[];
}

export interface HabitData {
  waterIntake: number;
  mealLogged: boolean;
  moodLogged: boolean;
  cardsRead: number;
}

export interface AnalysisResult {
  calories: number;
  healthScore: number;
  tip: string;
}
