import {StackNavigator} from "react-navigation";
import onBackAndroid from './tools/onBackAndroid'
onBackAndroid.bindHardwareBackPress();

import MainPage from './views/mainPage';
import singleKJDetailPage from './views/detailPage/singleKJDetailPage';
import historyDataPage from './views/detailPage/historyDataPage'
import welcomePage from './views/welcomePage';
import launchPage from './views/launchPage'
import CPWebViewPage from './views/CPWebViewPage';
import jieshaoDetailPage from './views/detailPage/jieshaoDetailPage'
import AboutAppPage from './views/detailPage/aboutAppPage';
import RacePage from './views/detailPage/racePage';
import TuiJianPage from './views/tuijianPage';
import MoreNewsPage from './views/detailPage/moreNewsPage'
import ArticleDetailPage from './views/detailPage/articleDetailPage'
import MoreToolsPage from './views/detailPage/moreToolsPage'
import GongluePage from './views/detailPage/gongluePage'
import GonglueDetailPage from './views/detailPage/gonglueDetailPage'
const routers = StackNavigator({
    launch: {screen: launchPage},
    Main: {screen: MainPage,},

    // 显示10期的开奖号码
    SingleKaijiang: {screen: singleKJDetailPage,},
    //jieshao: {screen: jieshaoPage},
    jieshaoDetail: {screen: jieshaoDetailPage},

    HistoryData: {screen: historyDataPage},

    Race: {screen: RacePage},
    Tuijian: {screen: TuiJianPage,navigationOptions:{header:null,}},
    MoreNews: {screen: MoreNewsPage,navigationOptions:{header:null,}},
    ArticleDetail: {screen: ArticleDetailPage,navigationOptions:{header:null,}},
    MoreTools: {screen: MoreToolsPage,navigationOptions:{header:null,}},
    Gonglue: {screen: GongluePage,navigationOptions:{header:null,}},
    GonglueDetail: {screen: GonglueDetailPage,navigationOptions:{header:null,}},


    // 欢迎页 引导页
    Welcome: {screen: welcomePage},


    // 关于App
    AboutApp: {screen: AboutAppPage},

    // 彩票网站web页面
    CPWebView: {screen:CPWebViewPage},
});
module.exports = routers;