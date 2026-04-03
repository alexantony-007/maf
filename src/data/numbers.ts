export interface NumberItem {
  value: number;
  word: string;
}

const generateNumbers = (): NumberItem[] => {
  const nums: NumberItem[] = [];

  // 1 to 100
  for (let i = 1; i <= 100; i++) {
    nums.push({ value: i, word: numberToWord(i) });
  }

  // 200 to 1000 (steps of 100)
  for (let i = 200; i <= 1000; i += 100) {
    nums.push({ value: i, word: numberToWord(i) });
  }

  // 2000 to 10000 (steps of 1000)
  for (let i = 2000; i <= 10000; i += 1000) {
    nums.push({ value: i, word: numberToWord(i) });
  }

  return nums;
};

// Simple helper for number to word conversion for the specific requested range
function numberToWord(n: number): string {
  const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  
  if (n < 20) return units[n];
  if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + units[n % 10] : '');
  if (n === 100) return 'One Hundred';
  if (n < 1000) return units[Math.floor(n / 100)] + ' Hundred';
  if (n === 1000) return 'One Thousand';
  if (n < 10000) return units[Math.floor(n / 1000)] + ' Thousand';
  if (n === 10000) return 'Ten Thousand';
  
  return n.toString();
}

export const numbersData = generateNumbers();
