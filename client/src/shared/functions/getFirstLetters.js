export const getFirstLetters = (firstWord, secondWord) => {
  const firstLetter = firstWord.charAt(0).toUpperCase();
  const secondLetter = secondWord.charAt(0).toUpperCase();
  return firstLetter + secondLetter;
};
