/**
 * Created by timxiong on 2017/9/6.
 */
// SyntaxError: Unexpected token < in JSON at position 0
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    StatusBar,
    FlatList,
    RefreshControl,
    Animated,
    ScrollView,
    Platform,
    Alert
} from 'react-native';
import cfn from '../tools/commonFun';
import Loading from '../component/loading'
import config from '../config/config'
const urls = require('../config/urls');
import dateBase from '../tools/dateBase';
import CountDown from '../component/countDown';
import Race from '../component/Race';
import fetchp from '../tools/fetch-polyfill';
import NavBar from '../component/NavBar'
import Global from '../global/global'
export default class HomePage extends Component {
    constructor(props) {
        super(props);

        this.loading = '正在加载...';
        this.error = '加载错误，点击重试';
        this.noData = '暂无数据';

        this.state = {
            data: null,
            isLoading: true,
            loadState: this.loading,
            isError: false,
            isRefreshing: true,
            isAuto: true,  // true 为首次加载或自动加载 false 为下拉刷新
            raceState:'yiJing',
            raceNum:[5, 6, 4, 9, 10, 3, 8, 7, 1, 2],
            period: '*',// 当前期号,
            result: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*',], // 开奖号码
            items: null,
            newsItem:null,
        };
    }

    static defaultProps = {};


    componentDidMount() {
        // true 为首次加载或自动加载
        // false 为下拉刷新
        this.getData();
        this.getNews();
        //this.getHistoryData(0);
    }

    componentWillUnmount() {
        this.clearDaojishi();
    }

    getData() {
        let url = urls.getAwardData();

        fetchp(url, {timeout: 5 * 1000})
            .then((res)=>res.json())
            .then((data)=>this.setData(data))
            .catch((error)=>this.setError(error))

    }

    formatTime(timeStamps) {
        var hour = "", minute = "", second = "", formatEndTime = "";
        var endTime = timeStamps;

        /*格式化时间*/
        // if (endTime > 3600) {
        //     hour = parseInt(endTime / 3600);
        //     minute = parseInt((endTime % 3600) / 60);
        //     formatEndTime = dateBase.formatDay(hour) + ":" + dateBase.formatDay(minute);
        // }
        // else {
        minute = parseInt(endTime / 60);
        second = parseInt(endTime % 60);
        formatEndTime = dateBase.formatDay(minute) + ":" + dateBase.formatDay(second);
        // }

        //console.log(formatEndTime);
        return formatEndTime;
    }

    setData(data) {
        //console.log(new Date().getTime() - this.timer);
        //console.log(data);

        if (data.items) {
            let items = data.items;
            let endTime = parseInt(items.next.interval / 1000);
            this.daojishi(endTime);
            if(this.state.period == items.current.period && this.state.isAuto) {
                setTimeout(()=>{
                   this.getData();
                },3*1000)
            }else {
                this.getHistoryData(0);
                this.current = items.current;
                this.setState({
                    period: items.current.period,
                    result: this.current.result.split(','),
                    isRefreshing:false,
                    isAuto: true,
                });
            }
        }
    }

    getNews() {
        fetchp(urls.getNews(0),{timeout:5*1000})
            .then((res)=>res.text())
            .then((data)=>this.setNews(data))
    }
    setNews(data) {
        data = data.substring(7,data.length-1);
        data = JSON.parse(data);
        data = data.data.dataConfig.data;
        let views = [];
        let length = data.length < 5 ? data.length : 5;
        for(let i = 0; i < length; i++) {
            let item = data[i];
            views.push(
                <TouchableOpacity
                    activeOpacity={0.8}
                    key={i}
                    onPress={()=>this.goToDetail('ArticleDetail', {
                            id: item.id,
                            //name: item.title,
                            name: '彩市喜讯',
                            rowData: item,
                        }
                    )}
                    style={styles.item_container}>
                    <View style={styles.item_text_container}>
                        <Text
                            style={styles.item_title}>{item.title}</Text>
                        <Text style={styles.item_source}>{config.appName}</Text>
                        <Text style={styles.item_time}>{new Date(item.publishTime).toLocaleString().split(' ')[0]}</Text>
                    </View>
                    <Image
                        style={styles.item_img}
                        source={{uri: item.imageList[0]}}/>
                </TouchableOpacity>
            )
        }
        this.setState({newsItem: views})
    }

    clearDaojishi() {
        if(this.timer) {
            clearInterval(this.timer);
        }
    }

    daojishi(time) {
        this.clearDaojishi();
        if(time <=0 ) {
            this.countDownRef._startCountDown('正在开奖');
            return;
        }

        let formatEndTime = this.formatTime(time);
        //alert(formatEndTime);
        this.countDownRef._startCountDown(formatEndTime);

        this.timer = setInterval(()=> {
            time --;
            let formatEndTime = this.formatTime(time);
            this.countDownRef._startCountDown(formatEndTime);
            if (time == 0) {
                this.clearDaojishi();
                this.countDownRef._startCountDown('正在开奖');
                setTimeout(()=>{
                    this.getData();
                },40*1000)
            }
        }, 1000);
    }

    setError(error) {
        this.setState({
            isRefreshing:false
        });
        Alert.alert('提示：','加载错误，请下拉刷新重试',
            [
                {text: '确定', onPress: ()=> {}},
            ]);
        //console.log(error);
    }


    goToDetail(route, params) {
        this.props.navigation.navigate(route, params);
    }


    _onRefresh() {
        this.setState({
            isRefreshing: true,
            isAuto: false,
        });
        this.getData();
        //this.getHistoryData(0);
    }

    getHistoryData(timestamp) {
        fetchp(urls.getHistoryData(timestamp),{timeout:5*1000})
            .then((res)=>res.json())
            .then((data)=>this.setHistoryData(data))
            .catch((error)=>this.setError_1(error))
    }

    setError_1(error) {
        this.setState({
            loadState: this.error,
            items:null,
        })
    }

    reLoad() {
        this.setState({
            loadState: this.loading,
        });
        this.getHistoryData(0);
    }

    setHistoryData(data) {
        //console.log(data)
        if(data.items.length == 0) {
            this.setState({
                loadState:this.noData,
            });
            return;
        }
        let items = [
            <View
                key={'head'}
                style={styles.itemContainer}>
                <Text style={[styles.qishu,{color:'#071244'}]}>期数</Text>
                <Text style={[styles.shijian,{color:'#071244'}]}>时间</Text>
                <View style={styles.codesContainer_1}>
                    <Text style={[styles.kaijiangjieguo,{color:'#071244'}]}>开奖结果</Text>
                </View>
            </View>
        ];
        for(let i = 0; i < 10; i++) {
            items.push(this.renderItem(data.items[i]))
        }
        this.setState({
            historyData:data,
            items:items,
        })
    }
    renderItem(rowData) {
        return (
            <View
                key={rowData.period}
                style={styles.itemContainer}>
                <Text style={styles.qishu}>{rowData.period}</Text>
                <Text style={styles.shijian}>{rowData.time}</Text>
                <View style={styles.codesContainer_1}>
                    {this.renderCode(rowData.result.split(','))}
                </View>
            </View>
        )
    }
    renderCode(codes) {
        let bgColor = '#000';
        let codeView = [];
        for(let i = 0; i < codes.length; i++) {
            bgColor = cfn.getPK10Color(codes[i]);
            codeView.push(
                <View key={'c'+i} style={[styles.codeContainer_1,{backgroundColor:bgColor}]}>
                    <Text style={styles.codeStyle_1}>{codes[i]}</Text>
                </View>
            )
        }
        return codeView;
    }

    renderMenu() {
        let menuViews = [];
        for(let i = 0; i < 4; i++) {
            menuViews.push(
                <TouchableOpacity
                    key={i}
                    activeOpacity={0.8}
                    onPress={()=>this.goToDetail(menuData[i].route,{current:this.current})}
                    style={[styles.menuItem,{backgroundColor:menuData[i].bgColor}]}>
                    <Image source={menuData[i].icon} style={styles.menuIcon}/>
                    <View>
                        <Text style={styles.menuTitle}>{menuData[i].title}</Text>
                        <Text style={styles.menuSubTitle}>{menuData[i].subTitle}</Text>
                    </View>

                </TouchableOpacity>
            )
        }
        return menuViews;
    }

    render() {

        let codeView = [];
        let daxiaoView = [];
        let danshuangView = [];
        const {result} = this.state;
        for(let i = 0; i < result.length; i++) {
            codeView.push(
                <View key = {i} style={[styles.codeContainer,{backgroundColor:cfn.getPK10Color(result[i])}]}>
                    <Text style={styles.code}>{result[i]}</Text>
                </View>
            );
            daxiaoView.push(
                <View key = {i} style={[styles.codeContainer,{backgroundColor:result[i]<=5?"#999":"#ccc"}]}>
                    <Text style={styles.code}>{result[i]<=5 ? "小" : "大"}</Text>
                </View>
            );
            danshuangView.push(
                <View key = {i} style={[styles.codeContainer,{backgroundColor:result[i]%2==0?"#999":"#ccc"}]}>
                    <Text style={styles.code}>{result[i]%2==0 ? "双" : "单"}</Text>
                </View>
            )
        }



        return (
            <View style={styles.container}>
                <NavBar
                //bgImg={require('../imgs/banner/pk10_banner.png')}
                middleText='北京赛车'
                leftIcon={null}
                />
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            tintColor="#000"
                            title="正在加载···"
                            titleColor="#000"
                            colors={['#000']}
                            progressBackgroundColor="#fff"
                        />}
                >
                    <View style={{backgroundColor:'#fff',marginTop:cfn.picHeight(20)}}>
                        <View style={{flexDirection:'row',height:cfn.picHeight(60),
                            alignItems:'center',borderBottomColor:'#eee',borderBottomWidth:1}}>
                            <Text style={{fontSize:15,color:"#aaa",marginLeft:cfn.picWidth(20)}}>第 </Text>
                            <Text style={{color:'#222',fontSize:15}}>{this.state.period}</Text>
                            <Text style={{fontSize:15,color:"#aaa"}}> 期开奖号码：</Text>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={()=>this.goToDetail('Race',{current:this.current,isFromHistoryPage:false})}
                                style={{position:'absolute',right:cfn.picWidth(20),
                                    height:cfn.picHeight(60),justifyContent:'center'}}>
                                <Text style={{color:'#f22'}}>查看开奖视频>></Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.codesContainer}>
                            {codeView}
                        </View>
                        <View style={[styles.codesContainer,{backgroundColor:'#e5e5e5'}]}>
                            {daxiaoView}
                        </View>
                        <View style={[styles.codesContainer,{backgroundColor:'#e5e5e5'}]}>
                            {danshuangView}
                        </View>
                        <View style={{flexDirection:'row',height:cfn.picHeight(60),alignItems:'center',
                            marginBottom:cfn.picHeight(10),borderTopColor:'#ddd',borderTopWidth:1}}>
                            <Text style={{marginLeft:cfn.picWidth(20),color:'#aaa'}}>下期开奖倒计时：</Text>
                            <CountDown
                                ref={(ref)=>this.countDownRef = ref}
                            />
                        </View>
                    </View>

                    {/*开奖号码*/}
                    <View style={styles.historyHead}>
                        <Text style={{fontSize:15,marginLeft:cfn.picWidth(20),color:'#071244'}}>PK10工具</Text>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={{marginRight:cfn.picWidth(20)}}
                            onPress={()=>this.goToDetail('MoreTools',
                                {menuData:menuData,current:this.current,isFromHistoryPage:false})}
                        >
                            <Text style={{fontSize:15}}>查看更多>></Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.menuContainer}>
                        {this.renderMenu()}
                    </View>
                    <View style={styles.historyHead}>
                        <Text style={{fontSize:15,marginLeft:cfn.picWidth(20),color:'#071244'}}>彩市喜讯</Text>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={{marginRight:cfn.picWidth(20)}}
                            onPress={()=>this.goToDetail('MoreNews')}
                        >
                            <Text style={{fontSize:15}}>查看更多>></Text>
                        </TouchableOpacity>
                    </View>
                    {this.state.newsItem}
                </ScrollView>
                <View style={{height:cfn.picHeight(100)}}/>
            </View>)
    }
}
const styles = StyleSheet.create({
    container: {
        height: cfn.deviceHeight(),
        width: cfn.deviceWidth(),
    },
    nav: {
        width: cfn.deviceWidth(),
        height:cfn.picHeight(200),
        alignItems:'center',
        justifyContent:'center',
        resizeMode:'cover'
    },
    codesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: cfn.deviceWidth(),
        height: cfn.picHeight(100),
        backgroundColor: '#fff',
        paddingLeft:cfn.picWidth(10),
        paddingRight:cfn.picWidth(10)
    },
    codeContainer: {
        width: (cfn.deviceWidth() - cfn.picWidth(11*15))/10,
        height: (cfn.deviceWidth() - cfn.picWidth(11*15))/10,
        borderRadius: cfn.picHeight(10),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#eee',

    },
    code:{
        color:'#fff',
        fontSize:17
    },

    // 开奖记录
    itemContainer: {
        flexDirection:'row',
        alignItems:'center',
        width:cfn.deviceWidth(),
        borderBottomColor:'#eee',
        borderBottomWidth:1,
        height:cfn.picHeight(80),
        backgroundColor:'#fff'
    },
    historyHead: {
        height:cfn.picHeight(90),
        width:cfn.deviceWidth(),
        flexDirection:'row',
        alignItems:'center',
        borderBottomColor:'#ddd',
        borderBottomWidth:1,
        justifyContent:'space-between',
        marginTop:cfn.picHeight(20),
        backgroundColor:'#fff'
    },
    historyBody: {
        alignItems:'center',
        justifyContent:'center',
        minHeight:cfn.picHeight(300)
    },
    codesContainer_1: {
        flexDirection: 'row',
        alignItems:'center',
        width:cfn.deviceWidth() - cfn.picWidth(100+150),
        justifyContent:'center'
    },
    codeContainer_1: {
        width:cfn.picHeight(40),
        height:cfn.picHeight(40),
        backgroundColor:'#f95',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5,
        marginLeft:cfn.picWidth(5),
    },
    qishu: {
        width:cfn.picWidth(150),
        textAlign:'center',
        color:'#555',
        fontSize:13
    },
    shijian: {
        width:cfn.picWidth(100),
        textAlign:'center',
        color:'#555',
        fontSize:13
    },
    kaijiangjieguo: {
        color:'#071244',
        fontSize:13
    },
    codeStyle_1: {
        color:'#fff',
        fontSize:12
    },
    menuContainer: {
      flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'center',
        backgroundColor:'#fff'
    },
    menuItem: {
        width:(cfn.deviceWidth()-cfn.picWidth(60))/2 ,
        height:cfn.picHeight(200),
        backgroundColor:'#f89',
        marginLeft:cfn.picWidth(20),
        marginTop:cfn.picHeight(20),
        flexDirection:'row',
        alignItems:'center'
    },
    menuTitle: {
        color:'#fff',
        fontSize:18
    },
    menuSubTitle: {
        color:'#fff',
        fontSize:10,
        marginTop:cfn.picHeight(10)
    },
    menuIcon: {
        width:cfn.picWidth(100),
        height:cfn.picWidth(100),
        resizeMode:'contain',
        margin:cfn.picWidth(20)
    },

    item_container: {
        width: cfn.deviceWidth(),
        height: cfn.picHeight(160),
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#fff',
    },
    item_text_container: {
        flexWrap: 'wrap',
        width: cfn.deviceWidth() - cfn.picWidth(180 + 40),
        paddingLeft: cfn.picWidth(20),
        height: cfn.picHeight(120),
    },
    item_source: {
        fontSize: 13,
        color: '#888',
        position: 'absolute',
        left: cfn.picWidth(20),
        bottom: 0
    },
    item_time: {
        fontSize: 13,
        color: '#888',
        position: 'absolute',
        right: cfn.picWidth(20),
        bottom: 0
    },
    item_title: {
        color: '#444'
    },
    item_img: {
        width: cfn.picWidth(180),
        height: cfn.picHeight(120),
        marginLeft: cfn.picWidth(20),
    }

});
const menuData = [
    {title:'开奖视频',subTitle:'任意期开奖视频播放',route:'Race',
        icon:require('../imgs/home/donghua_icon.png'),bgColor:'#1c1690'},
    {title:'历史开奖',subTitle:'可按时间查询',route:'HistoryData',
        icon:require('../imgs/home/history_icon.png'),bgColor:'#165590'},
    {title:'玩法攻略',subTitle:'知己知彼 百战百胜',route:'Gonglue',
        icon:require('../imgs/home/gonglue_icon.png'),bgColor:'#169072'},
    {title:'专家推荐',subTitle:'助你提高中奖率',route:'Tuijian',
        icon:require('../imgs/home/tuijian_icon.png'),bgColor:'#901616'},
    {title:'彩市喜讯',subTitle:'你会是下个百万得主吗？',route:'MoreNews',
        icon:require('../imgs/home/caipiao_icon.png'),bgColor:'#8b3f7e'},
];