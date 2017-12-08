/**
 * Created by timxiong on 2017/10/26.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import NavBar from '../../component/NavBar'
import cfn from '../../tools/commonFun'
import config from '../../config/config'
export default class gongluePage extends Component{


    goToPage(route, params) {
        this.props.navigation.navigate(route, params);
    }

    goBack() {
        this.props.navigation.goBack();
    }
    renderItem() {
        let items = [];
        for(let i = 0; i < data.length; i++) {
            items.push(
                <TouchableOpacity
                    key={i}
                    activeOpacity={0.8}
                    onPress={()=>this.goToPage("GonglueDetail",{
                        title:data[i].title,
                        subTitle:data[i].subTitle,
                        content:data[i].content})}
                    style={styles.itemContainer}>
                    <Text style={styles.title}>{data[i].title}</Text>
                    {/*<View style={styles.line}/>*/}
                    <Text style={styles.subTitle}>{data[i].subTitle}</Text>
                    <Image
                        style={styles.icon}
                        source={require('../../imgs/more_r_icon.png')}/>
                </TouchableOpacity>
            )
        }

        return items;
    }
    render() {
        return(
            <View style={styles.container}>
                <NavBar
                    middleText="玩法攻略"
                    leftFn={()=>this.goBack()}
                />
                <ScrollView>
                    {this.renderItem()}
                </ScrollView>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        height:cfn.deviceHeight()
    },
    itemContainer: {
        backgroundColor:"#fff",
        height:cfn.picHeight(150),
        justifyContent:'center',
        paddingLeft:cfn.picWidth(30),
        borderBottomColor:'#ddd',
        borderBottomWidth:1,
        marginTop:cfn.picHeight(20)
    },
    title: {
      fontSize:18,
        color: config.baseColor
    },
    line: {
      height:1,
        width:cfn.deviceWidth()-cfn.picWidth(200),
        backgroundColor:'#eee',
        marginTop:cfn.picHeight(10)
    },
    icon: {
      width:cfn.picWidth(60),
        height:cfn.picWidth(60),
        resizeMode:'contain',
        position:'absolute',
        right:cfn.picWidth(20)
    },
    subTitle: {
        fontSize:14,
        marginTop:cfn.picHeight(10),
        color:"#222"
    }
});

const data = [
    {
        title:'PK10攻略1：',
        subTitle:'稳赢技巧',
        content:'连开9 10 ,下把毫不犹豫去9梭哈，跨度9，错的几率相当于幸运28买中00，27 (稳 梭哈吧)\n'+
        '连开10 9 ,下期毫不犹豫去10梭哈，跨度9，错的几率相当于幸运28买中00，27 (稳 梭哈吧)\n'+
        '连开1 9 ,下把毫不犹豫去1梭哈，跨度8，错的几率相当于幸运28买中01，26 (防点)\n'+
        '连开9 1 ,下把毫不犹豫去9梭哈，跨度8，错的几率相当于幸运28买中01，26 (防点)\n'+
        '连开0 8 ,下把毫不犹豫去0梭哈，跨度8，错的几率相当于幸运28买中01，26 (防点)\n'+
        '连开8 0 ,下把毫不犹豫去8梭哈，跨度8，错的几率相当于幸运28买中01，26 (防点)\n'
    },
    {
        title:'PK10攻略2：',
        subTitle:'稳赢技巧',
        content:'适合期数开奖(系统PK10)杀一跨度值\n'+
        '比如 本期要买307626期，上期307625 开3729584610，期数“6” 数307625期第六位 8 数够3个数字846，8-4=4 307626期杀4，平时不什么玩系统PK10，偶尔玩玩命中率感觉还可以，长期的就不知道了，各位研究吧。'
    },
    {
        title:'PK10攻略3：',
        subTitle:'去一尾',
        content:'（1）上期开奖的前三位的跨度值稳定去一尾，目前最大连错期数是三期，但是这种情况很少，长期实战效果不错。\n'+
        '（2）上期开奖的前三位的跨度值稳定去一尾，目前最大连错期数是三期，但是这种情况很少，没有长期实战，但是效果也不错。\n'+
        '解释：这里所说的跨度值是开奖号码的最大值和最小值的差。'
    },

     {
        title:'PK10攻略4：',
        subTitle:'区段杀号法',
        content:'号码区间移动频繁，并隐含着一定的阶段性移动规律，我们应提前预测下一重心区间、将出球区间，而不太可能出球的区间，无疑可大胆采用区段杀号法。为保险起见，你可细化区间的划分，以尽可能小的区间来分析，区间等划分大可一试。'
    },

    {
        title:'PK10攻略5：',
        subTitle:'特别号杀号法',
        content:'特别号妙用很多，光用于杀号的方法就有以下几种：特别号与黄金分割点0.618的乘积下期普遍绝杀;特别号与各期开奖号首球相加减之值，下期同样绝杀;前两期特别号相加减之值第三期大多绝杀。当然请注意这是一种阶段性特点极强的杀号手法。你最好针对性地阶段选用。'
    },
    {
        title:'PK10攻略6：',
        subTitle:'冷热球杀号法',
        content:'细心的彩民一定知道开奖号大多产生于次冷、次热球号当中，而那些热乎其热的好球、暂时进入冬眠期的个号无疑可坚决绝杀。而选用温球将是明智的选择。'
    },
    {
        title:'PK10攻略7：',
        subTitle:'出球极限杀号法',
        content:'由于体彩各种走势现象，普遍存在着一定的阶段性、极限性，为巧妙杀号提供了可能。我们对那些连占五期以上的个号、斜连球数超过四期的斜连接球、等隔出球模式超过四期的个球无疑可以坚决绝杀。'
    },
    {
        title:'PK10攻略8：',
        subTitle:'首尾球杀号法',
        content:'体彩各期所开出的中奖号打头球、收尾球其实隐含了很多阶段性规律，大家可以针对性研究选用一些方法。这里仅介绍杀号法，你可将各期首尾球相减，其差值下期普遍绝杀。'
    },
];