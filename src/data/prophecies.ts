export interface Prophecy {
    id: string;
    message: string;
    type: "positive" | "negative" | "neutral" | "fortune-cookie";
    luckyNumbers?: number[];
}

export const prophecies: Prophecy[] = [
    {
        id: "prophecy1",
        message: "When the sacred prints without jamming for 40 days and 40 nights, salvation is nigh.",
        type: "neutral"
    },

     {
        id: "prophecy2",
        message: "The Destroyer shall be marked by the ability to to correctly guess how many cups of uncooked rice to make.",
        type: "neutral"
    },

    {
        id: "prophecy3",
        message: "In the final hour, all breadsticks shall become infinite, as foretold at Olive Garden.",
        type: "neutral"
    },
    
     {
        id: "prophecy4",
        message: "Beware the eclipse when the moon judges us all for our browser history.",
        type: "neutral"
    },

     {
        id: "prophecy5",
        message: "The Chosen One shall be born with the ability to peel a boiled egg cleanly every single time",
        type: "neutral"
    },
      
     {
        id: "prophecy6",
        message: "Help! I'm trapped in this crystal ball!",
        type: "neutral"
    },

      
     {
        id: "prophecy7",
        message: "Your patience will be rewarded with unexpected joy.",
        type: "fortune-cookie"
        // fortune cookie numbers
    },

      
     {
        id: "prophecy8",
        message: "The Dark Lord shall return when someone finally figures out what Victoria's Secret is.",
        type: "neutral"
    },

      
     {
        id: "prophecy9",
        message: "Beware the eclipse when the moon judges us all for our browser history.",
        type: "neutral"
    },

      
     {
        id: "prophecy10",
        message: "One morning, your reflection will be exhausted. It has been somewhere all night.",
        type: "negative"
        // dark
    },

      
     {
        id: "prophecy11",
        message: "You will have the chance to return to the past you long for, but alas, no one else is there.",
        type: "negative"
        // dark
    },

      
     {
        id: "prophecy12",
        message: "First you'll forget their name. Then their face. Then you'll forget you're forgetting.",
        type: "negative"
        // dark
    },

      
     {
        id: "prophecy13",
        message: "Beware the prophecy: 'In the end times, someone will actually want to hear about your dream from last night.",
        type: "neutral"
    },

      
     {
        id: "prophecy14",
        message: "The stars align to grant you one morning where you wake up feeling actually rested.",
        type: "neutral"
    },

      
     {
        id: "prophecy15",
        message: "the universe conspires to give you three consecutive green lights when you're running late.",
        type: "positive"
    },

    {
        id: "prophecy16",
        message: "Please help! They won't let me out!",
        type: "neutral"
    },



]