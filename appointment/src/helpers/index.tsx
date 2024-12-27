export function generateTimeRanges(dates: string[], range: number): string[] {
    // Helper function to pad numbers with leading zeros
    const pad = (num: number): string => num.toString().padStart(2, '0');
  
    // Helper function to add minutes to a given time
    const addMinutes = (time: string, minutes: number): string => {
        const [hour, minute] = time.split(':').map(Number);
        const totalMinutes = hour * 60 + minute + minutes;
        const newHour = Math.floor(totalMinutes / 60);
        const newMinute = totalMinutes % 60;
        return `${pad(newHour)}:${pad(newMinute)}`;
    };
  
    const startTime = "08:00"; // Starting time
    const endTime = "17:00";  // Ending time
    const interval = range * 60; // Convert range to minutes
    const skippedTimes = new Set(dates); // Convert dates array to a set for faster lookup
  
    let currentTime = startTime;
    const timeRanges: string[] = [];
  
    while (currentTime < endTime) {
        const nextTime = addMinutes(currentTime, interval);
  
        // Skip adding the time range if either start or end of the range exists in the dates array
        if (!skippedTimes.has(currentTime) && !skippedTimes.has(nextTime)) {
            timeRanges.push(`${currentTime}-${nextTime}`);
        }
  
        currentTime = nextTime; // Move to the next interval
    }
  
    return timeRanges;
  }

export function formatDate(date: Date): string {
    if (!(date instanceof Date)) {
      throw new Error("Input must be a valid Date object.");
    }
  
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" }); // Full month name
    const year = date.getFullYear();
  
    // Get the appropriate ordinal suffix for the day
    const ordinalSuffix = (n: number): string => {
      if (n >= 11 && n <= 13) return "th"; // Special case for 11th, 12th, 13th
      switch (n % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };
  
    return `${month} ${day}${ordinalSuffix(day)}, ${year}`;
  }