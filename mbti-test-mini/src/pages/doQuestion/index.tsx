import {View} from "@tarojs/components";
import Taro from "@tarojs/taro";
import {AtButton, AtRadio} from "taro-ui";
import {useEffect, useState} from "react";
import GlobalFooter from "../../components/GlobalFooter";
import questions from "../../data/questions.json";
import "./index.scss";

/**
 * Homepage
 * @author Gyoxxi</a>
 */
export default () => {
  const [current, setCurrent] = useState<number>(1);
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const questionOptions = currentQuestion.options.map((option) => {
    return {label: `${option.key}. ${option.value}`, value: option.key};
  });
  const [currentAnswer, setCurrentAnswer] = useState<string>();
  const [answerList] = useState<string[]>([]);

  useEffect(() => {
    setCurrentQuestion(questions[current - 1]);
    setCurrentAnswer(answerList[current - 1]);
  }, [current]);

  return (
    <View className="doQuestionPage">
      <View className="at-article__h2 title">
        {current}. {currentQuestion.title}
      </View>
      <View className="options-wrapper">
        <AtRadio
          options={questionOptions}
          value={currentAnswer}
          onClick={(value) => {
            setCurrentAnswer(value);
            answerList[current - 1] = value;
          }}
        />
      </View>
      {current < questions.length && (
        <AtButton
          type="primary"
          circle
          className="controlBtn"
          disabled={!currentAnswer}
          onClick={() => setCurrent(current + 1)}
        >
          Next
        </AtButton>
      )}
      {current == questions.length && (
        <AtButton
          type="primary"
          circle
          className="controlBtn"
          disabled={!currentAnswer}
          onClick={() => {
            Taro.setStorageSync("answerList", answerList);
            Taro.navigateTo({
              url: "/pages/result/index",
            });
          }}
        >
          See Result
        </AtButton>
      )}
      {current > 1 && (
        <AtButton
          circle
          className="controlBtn"
          onClick={() => setCurrent(current - 1)}
        >
          Previous
        </AtButton>
      )}
      <GlobalFooter />
    </View>
  );
};
