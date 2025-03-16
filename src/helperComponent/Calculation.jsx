export default function Calculation(array) { 
let sum = 0;
for (const item of array) {
    sum += parseInt(item.morning) + parseInt(item.noon) + parseInt(item.night);
  }
return sum;
}
