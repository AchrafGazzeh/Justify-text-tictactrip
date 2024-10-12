function addSpace(sentence: string): string {
  let i = 0;
  if (sentence.length < 65) {
      return sentence;}
  else { while (sentence.length < 80) {
      if (sentence[i] === ' ') {
          sentence = sentence.slice(0, i) + ' ' + sentence.slice(i);
          i += 2;
      } else {
          i++;
      }
      if (i >= sentence.length) {
          i = 0;
      }
  }
  return sentence;}

}

function splitTextIntoParagraphs(text: string): string[] {
  const paragraphs: string[] = text.split(/\n{2,}/);
  return paragraphs;
}

function splitTextIntoSentences(text: string, maxCharacters: number): string[] {
  const words: string[] = text.replace('\n',' ').split(' ');
  let currentSentence: string = '';
  const sentences: string[] = [];

  for (const word of words) {
      if (!currentSentence) {
          currentSentence = word;
      } else {
          const potentialSentence: string = `${currentSentence} ${word}`;
          if (potentialSentence.length <= maxCharacters) {
              currentSentence = potentialSentence;
          } else {
              sentences.push(currentSentence);
              currentSentence = word;
          }
      }
  }

  if (currentSentence) {
      sentences.push(currentSentence);
  }

  return sentences;
}
const justifyText = ( text: string ): string => {
  let result: string = '';
  const maxCharactersPerSentence = 80;
  const paragraphs= splitTextIntoParagraphs(text);
  for (const paragraph of paragraphs) {
  const sentences = splitTextIntoSentences(paragraph, maxCharactersPerSentence);
  for (const sentence of sentences) {
    const justifiedSentence = addSpace(sentence);
    result += justifiedSentence + '\n';
  }};
return result;
}

export default justifyText;