export default function TotalMeal(array) { 
    
    const totals = array.reduce(
        (acc, curr) => ({
          morning: acc.morning + Number(curr.morning || 0),
          noon: acc.noon + Number(curr.noon || 0),
          night: acc.night + Number(curr.night || 0)
        }),
        { morning: 0, noon: 0, night: 0 }
      );
      
    return totals;
    }
    