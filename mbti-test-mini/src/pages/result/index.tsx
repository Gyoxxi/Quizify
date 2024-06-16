import {View, Image} from "@tarojs/components";
import {AtButton} from "taro-ui";
import Taro from "@tarojs/taro";
import headerBg from "../../assets/headerBg.jpg";
import GlobalFooter from "../../components/GlobalFooter";
import {getBestQuestionResult} from "../../utils/bizUtils";
import questions from "../../data/questions.json";
import questionResults from "../../data/question_results.json";
import "./index.scss";

/**
 * Homepage
 * @author Gyoxxi</a>
 */
export default () => {
  const answerList = Taro.getStorageSync("answerList");
  if (!answerList || answerList.length < 1) {
    Taro.showToast({
      title: "Empty Answer",
      icon: "error",
      duration: 3000,
    });
  }
  // fetch test result
  const result = getBestQuestionResult(answerList, questions, questionResults);

  return (
    <View className="resultPage">
      <View className="at-article__h1 title">{result.resultName}</View>
      <View className="at-article__h3 subTitle">{result.resultDesc}</View>
      <AtButton
        type="primary"
        circle
        className="enterBtn"
        onClick={() => {
          Taro.reLaunch({
            url: "/pages/index/index",
          });
        }}
      >
        Back to Home
      </AtButton>
      <Image className="headerBg" src={headerBg} />
      <GlobalFooter />
    </View>
  );
};
