import { View, Image } from "@tarojs/components";
import { AtButton } from "taro-ui";
import Taro from "@tarojs/taro";
import headerBg from "../../assets/headerBg.jpg";
import GlobalFooter from "../../components/GlobalFooter";
import "./index.scss";

/**
 * Homepage
 * @author Gyoxxi</a>
 */
export default () => {
  return (
    <View className="indexPage">
      <View className="at-article__h1 title">MBTI Personality Test</View>
      <View className="at-article__h2 subTitle">
        Discover your personality in 2 minutes and unlock your growth potential.
      </View>
      <AtButton
        type="primary"
        circle
        className="enterBtn"
        onClick={() => {
          Taro.navigateTo({
            url: "/pages/doQuestion/index",
          });
        }}
      >
        Start
      </AtButton>
      <Image className="headerBg" src={headerBg} />
      <GlobalFooter />
    </View>
  );
};
