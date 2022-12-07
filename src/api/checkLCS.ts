function max(a: number, b: number) {
  if (a > b) return a;
  else return b;
}

// This algorithm works and could be improved in future with memorication algorithm
// to increase performance from O(2^n) to O(mn)
function checkLCS(str1: string, str2: string) {
  let len1 = str1.length;
  let len2 = str2.length;
  let lcs = new Array(len1 + 1);
  for (let i = 0; i <= len1; i++) {
    lcs[i] = new Array(len2 + 1);
  }
  for (let i = 0; i <= len1; i++) {
    for (let j = 0; j <= len2; j++) {
      if (i == 0 || j == 0) {
        lcs[i][j] = 0;
      } else {
        if (str1[i - 1] == str2[j - 1]) {
          lcs[i][j] = 1 + lcs[i - 1][j - 1];
        } else {
          lcs[i][j] = max(lcs[i][j - 1], lcs[i - 1][j]);
        }
      }
    }
  }

  let n = lcs[len1][len2];
  let str = "";
  let i = len1;
  let j = len2;
  while (i > 0 && j > 0) {
    if (str1[i - 1] == str2[j - 1]) {
      str += str1[i - 1];
      i--;
      j--;
    } else {
      if (lcs[i][j - 1] > lcs[i - 1][j]) {
        j--;
      } else {
        i--;
      }
    }
  }
  return {
    numberOverlapping: n,
    charactersOverlapping: str.split('').reverse().join(''),
  }
}

export default checkLCS