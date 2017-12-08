/**
 * Created by timxiong on 2017/9/6.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    WebView,
    ScrollView
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import cfn from '../../tools/commonFun'
import NavBar from '../../component/NavBar';
import Race from '../../component/Race';
import fetchp from '../../tools/fetch-polyfill'
import urls from '../../config/urls'
export default class racePage extends Component {
    static navigationOptions = {header: null};

    constructor(props) {
        super(props);
        const {params} = props.navigation.state;
        this.title = params.title;
        this.jieshao = params.jieshao;
        let current = params.current;

        this.state={

            isError:false,
            isLoading: false,
            result: current.result.split(','),
            period: current.period,
            date: current.date,
            time: current.time,
            isFromHistoryPage: params.isFromHistoryPage,
        };


    }
    static defaultProps = {

    };

    componentDidMount() {

        this.startRace(this.state.result);
    }

    setData(data) {
        let current = data.current;
        let result = current.result.split(',');
        this.startRace(result);
        this.setState({
            result: result,
            period: current.period,
            date: current.date,
            time: current.time,
        })
    }

    goBack() {
        this.props.navigation.goBack();
    }

    goToDetail(route, params) {
        let {isFromHistoryPage} = this.props.navigation.state.params;
        if(route == 'HistoryData' && isFromHistoryPage) {
            return this.goBack();
        }
        this.props.navigation.navigate(route, params);
    }

    startRace(raceNum) {
        this._raceRef._setRace('yiJing',raceNum);
        // this._raceRef._setRace('zhunBei',raceNum);
        // setTimeout(()=>{
        //     this._raceRef._setRace('zhengZai',raceNum);
        // },2*1000);
    }

    render() {



        return(
            <View style={styles.container}>
                <NavBar
                    middleText={"开奖视频"}
                    leftFn={()=>this.goBack()}
                    rightText={"更多开奖"}
                    rightFn={()=>this.goToDetail('HistoryData',{isFromRacePage:true,update:this.setData.bind(this)})}
                />

                <View>
                    <View style={{flexDirection:'row',height:cfn.picHeight(60),alignItems:'center',marginTop:cfn.picHeight(20)}}>
                        <Text style={{fontSize:15,marginLeft:cfn.picWidth(20)}}>第 </Text>
                        <Text style={{color:'#f11',fontSize:15}}>{this.state.period}</Text>
                        <Text style={{fontSize:15}}> 期开奖号码：</Text>
                        <Text style={{position:'absolute',right:cfn.picWidth(20),color:'#aaa'}}>{this.state.date+' '+this.state.time}</Text>
                    </View>

                    <View style={styles.codesContainer}>
                        <View style={styles.codeContainer}><Text style={styles.code}>{this.state.result[0]}</Text></View>
                        <View style={styles.codeContainer}><Text style={styles.code}>{this.state.result[1]}</Text></View>
                        <View style={styles.codeContainer}><Text style={styles.code}>{this.state.result[2]}</Text></View>
                        <View style={styles.codeContainer}><Text style={styles.code}>{this.state.result[3]}</Text></View>
                        <View style={styles.codeContainer}><Text style={styles.code}>{this.state.result[4]}</Text></View>
                        <View style={styles.codeContainer}><Text style={styles.code}>{this.state.result[5]}</Text></View>
                        <View style={styles.codeContainer}><Text style={styles.code}>{this.state.result[6]}</Text></View>
                        <View style={styles.codeContainer}><Text style={styles.code}>{this.state.result[7]}</Text></View>
                        <View style={styles.codeContainer}><Text style={styles.code}>{this.state.result[8]}</Text></View>
                        <View style={styles.codeContainer}><Text style={styles.code}>{this.state.result[9]}</Text></View>
                    </View>
                </View>

                <Race
                    ref={(ref)=>this._raceRef = ref}
                />

            </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent:'flex-start',
        width:cfn.deviceWidth(),
        height:cfn.deviceHeight(),
        backgroundColor:'#fff',
    },
    content: {
      padding:cfn.picHeight(20),
    },
    title: {
        color:'#000',
        fontSize:15,
        marginTop:cfn.picHeight(20),
    },
    text: {
        marginTop:cfn.picHeight(10),
        marginBottom:cfn.picHeight(10),
        color:'#666'
    },
    codesContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: cfn.deviceWidth(),
        height: cfn.picHeight(100),
        backgroundColor: '#fff'
    },
    codeContainer: {
        width: cfn.picHeight(50),
        height: cfn.picHeight(50),
        borderRadius: cfn.picHeight(30),
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft:cfn.picWidth(10),
        backgroundColor:'#f22',
    },
    code:{
        color:'#fff'
    },

});