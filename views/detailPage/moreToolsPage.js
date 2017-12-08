/**
 * 更多快3工具
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Platform,
    DeviceEventEmitter,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import urls from '../../config/urls';
import config from '../../config/config'
import cfn from '../../tools/commonFun'
import NavBar from '../../component/NavBar';

import Global from '../../global/global';

export default class moreToolsPage extends Component {

    static defaultProps = {

    };

    constructor(props){
        super(props);


        this.state={

        };

        let params = props.navigation.state.params;
        this.current = params.current;
        this.isFromHistoryPage = params.isFromHistoryPage;
    }


    componentDidMount() {

    }


    goBack() {
        this.props.navigation.goBack();
    }


    goToPage(route, params) {
        // DrawerOpen
        // DrawerClose
        this.props.navigation.navigate(route, params)
    }

    render() {
        const{menuData} = this.props.navigation.state.params;
        let menuViews = [];
        for(let i = 0; i < menuData.length; i++) {
            menuViews.push(
                <TouchableOpacity
                    key={i}
                    activeOpacity={0.8}
                    onPress={()=>this.goToPage(menuData[i].route,{current:this.current,isFromHistoryPage:false})}
                    style={[styles.menuItem,{backgroundColor:menuData[i].bgColor}]}>
                    <Image source={menuData[i].icon} style={styles.menuIcon}/>
                    <View>
                        <Text style={styles.menuTitle}>{menuData[i].title}</Text>
                        <Text style={styles.menuSubTitle}>{menuData[i].subTitle}</Text>
                    </View>
                    <Text style={{color:'#ddd',fontSize:12,position:'absolute',right:20}}>点击查看>></Text>
                </TouchableOpacity>
            )
        }


        return (
            <View style={styles.container}>
                <NavBar
                    middleText={"PK10工具"}
                    leftFn={this.goBack.bind(this)}
                />
                <ScrollView>
                    {menuViews}


                    <View style={{height:cfn.picHeight(20)}}/>
                </ScrollView>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        height:cfn.deviceHeight(),
        alignItems:'center',
        backgroundColor:'#fff'
    },
    menuItem: {
        width:cfn.deviceWidth()-cfn.picWidth(40),
        height:cfn.picHeight(200),
        alignSelf:'center',
        marginTop:cfn.picHeight(20),
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#f89'
    },
    menuTitle: {
        color:'#fff',
        backgroundColor:'transparent',
        fontSize: 18
    },
    menuIcon: {
        width:cfn.picWidth(80),
        height:cfn.picWidth(80),
        margin:cfn.picWidth(30)
    },
    menuSubTitle: {
        color:'#fff',
        fontSize:10,
        marginTop:cfn.picHeight(10)
    },
    look: {
        color:'#fff',fontSize:12,
        position:'absolute',
        right:cfn.picWidth(30)
    }

});