/**
 * @param answerList
 * @param questions
 * @param question_results
 */

export function getBestQuestionResult(answerList, questions, question_results) {
  const optionCount = {};

  // User selects A, B, C
  // Corresponding results: I, I, J
  // optionCount[I] = 2; optionCount[J] = 1

  // Iterate over the list of questions
  for (const question of questions) {
    // Iterate over the list of answers
    for (const answer of answerList) {
      // Iterate over the options in the question
      for (const option of question.options) {
        // If the answer matches the option key
        if (option.key === answer) {
          // Get the result property of the option
          const result = option.result;

          // If the result property is not in optionCount, initialize it to 0
          if (!optionCount[result]) {
            optionCount[result] = 0;
          }

          // Increment the count in optionCount
          optionCount[result]++;
        }
      }
    }
  }

  // Initialize the highest score and the result corresponding to the highest score
  let maxScore = 0;
  let maxScoreResult = question_results[0];

  // Iterate over the list of question results
  for (const result of question_results) {
    // Calculate the score for the current question result
    const score = result.resultProp.reduce((count, prop) => {
      return count + (optionCount[prop] || 0);
    }, 0);

    // If the score is higher than the current highest score, update the highest score and the result corresponding to the highest score
    if (score > maxScore) {
      maxScore = score;
      maxScoreResult = result;
    }
  }

  // Return the highest score and the result corresponding to the highest score
  return maxScoreResult;
}

// Sample data
const answerList = ["B", "B", "B", "A"];
const questions = [
  {
    title: "You usually prefer to",
    options: [
      {
        result: "I",
        value: "Work independently",
        key: "A",
      },
      {
        result: "E",
        value: "Collaborate with others",
        key: "B",
      },
    ],
  },
  {
    options: [
      {
        result: "S",
        value: "Like structure and routine",
        key: "A",
      },
      {
        result: "N",
        value: "Like freedom and flexibility",
        key: "B",
      },
    ],
    title: "For daily schedules",
  },
  {
    options: [
      {
        result: "P",
        value: "Consider possibilities first",
        key: "A",
      },
      {
        result: "J",
        value: "Consider consequences first",
        key: "B",
      },
    ],
    title: "When encountering problems",
  },
  {
    options: [
      {
        result: "T",
        value: "Time is a valuable resource",
        key: "A",
      },
      {
        result: "F",
        value: "Time is a relatively flexible concept",
        key: "B",
      },
    ],
    title: "How do you view time",
  },
];
const question_results = [
  {
    resultProp: ["I", "S", "T", "J"],
    resultDesc: "Loyal and reliable, known for being practical and detail-oriented.",
    resultPicture: "icon_url_istj",
    resultName: "ISTJ (Logistician)",
  },
  {
    resultProp: ["I", "S", "F", "J"],
    resultDesc: "Kind and caring, characterized by empathy and responsibility.",
    resultPicture: "icon_url_isfj",
    resultName: "ISFJ (Protector)",
  },
];

console.log(getBestQuestionResult(answerList, questions, question_results));
