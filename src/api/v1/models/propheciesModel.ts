export interface Prophecy {
    id: string;
    message: string;
    type: "positive" | "negative" | "neutral" | "fortune-cookie";
    luckyNumbers?: number[];
}