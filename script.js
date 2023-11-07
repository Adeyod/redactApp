document.addEventListener('DOMContentLoaded', function () {
  const originalText = document.getElementById('originalText');
  const redactWords = document.getElementById('redactWords');
  const redactButton = document.getElementById('redactButton');
  const redactedText = document.getElementById('redactedText');
  const redactReplace = document.getElementById('redactReplace');
  const wordsCount = document.getElementById('wordsCount');
  const wordsMatchCount = document.getElementById('wordsMatchCount');
  const timeExecution = document.getElementById('timeExecution');

  redactButton.addEventListener('click', function () {
    if (!originalText.value || !redactWords.value || !redactReplace.value) {
      alert('All fields are required');
      return;
    }
    /*
    how many characters were scrambled in total
    how long it took(in seconds) to complete the scrambling task
    */
    const startTime = performance.now();
    console.log(startTime);

    const text = originalText.value;

    const wordsToRedact = redactWords.value.split(' ');

    const regExPattern = new RegExp(
      wordsToRedact.map((word) => `\\b${word}\\b`).join('|'),
      'gi'
    );

    let mog = text.replace(regExPattern, wordsToRedact);

    const redacted = text.replace(regExPattern, redactReplace.value);

    redactedText.textContent = redacted;

    // how many matched the words to be scrambled
    const splitted = redactedText.textContent.split(' ');

    console.log(redactReplace.value);
    // const splitted = redacted.split(' ');
    let occur = 0;
    splitted.forEach((word) => {
      if (word === redactReplace.value) {
        occur++;
      }
    });
    wordsMatchCount.textContent = occur;
    // console.log(occur);

    // how many words were scanned
    const textCount = (redacted.match(/\b\w+\b/g) || []).length;
    wordsCount.textContent = textCount;

    const endTime = performance.now();
    console.log(endTime);

    const timeInMilliseconds = endTime - startTime;
    timeExecution.textContent = `${timeInMilliseconds.toFixed(2)} MS`;
    console.log(timeInMilliseconds.toFixed(2));
  });
});
