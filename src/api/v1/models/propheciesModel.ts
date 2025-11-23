export interface Prophecy {
    id: string;
    message: string;
    type: "positive" | "negative" | "neutral";
    luckyNumbers?: number[];
}