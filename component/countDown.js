
import React, {PureComponent} from 'react';
import {
    AppRegistry,
    StyleSheet,
    TextInput
} from 'react-native';
import cfn from '../tools/commonFun'
export default class countDown extends PureComponent {
    static navigationOptions = {header: null};

    static defaultProps={
        textStyle: {}
    };

    constructor(props) {
        super(props);
        this._startCountDown = this.startCountDown.bind(this);
    }

    startCountDown(time) {
        this.countDownRef.setNativeProps({
            text: time.toString()
        });
    }

    render() {
        return (
            <TextInput
                ref={(ref)=>this.countDownRef = ref}
                value={''}
                editable={false}
                underlineColorAndroid={'transparent'}
                style={[styles.text,{...this.props.textStyle}]}
            />)
    }
}
const styles = StyleSheet.create({
    text:{padding:0,height:20,width:100,color:'#333'}
});