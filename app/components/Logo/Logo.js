import React, {Component} from 'react';
import { View, Text, Keyboard, Animated, Platform, StyleSheet } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';

const ANIMATION_DURATION = 250;

class Logo extends Component {

    static propTypes = {
        tintColor: PropTypes.string,
    };

    constructor(props){
        super(props);

        this.state = {
            containerImageWidth: new Animated.Value(styles.$largeContainerSize),
            imageWidth: new Animated.Value(styles.$largeImageSize),
        };
    }

    componentDidMount(){
        let showListener = 'keyboardWillShow';
        let hideListener = 'keyboardWillHide';
        if(Platform.OS === 'android'){
            let showListener = 'keyboardDidShow';
            let hideListener = 'keyboardDidHide';
        }
        this.keyboardShowListener = Keyboard.addListener(showListener, this.keyboardShow);
        this.keyboardHideListener = Keyboard.addListener(hideListener, this.keyboardHide);
    }
    componentWillUnmount(){
        this.keyboardShowListener.remove();
        this.keyboardHideListener.remove();
    }

    keyboardShow = () => {
        Animated.parallel([
            Animated.timing(this.state.containerImageWidth, {
                toValue: styles.$smallContainerSize,
                duration: ANIMATION_DURATION,
            }),
            Animated.timing(this.state.imageWidth, {
                toValue: styles.$smallImageSize,
                duration: ANIMATION_DURATION,
            }),
        ]).start();
    };

    keyboardHide = () => {
        Animated.parallel([
            Animated.timing(this.state.containerImageWidth, {
                toValue: styles.$largeContainerSize,
                duration: ANIMATION_DURATION,
            }),
            Animated.timing(this.state.imageWidth, {
                toValue: styles.$largeImageSize,
                duration: ANIMATION_DURATION,
            }),
        ]).start();
    }

    render() {
        const containerImageStyles = [
            styles.containerImage,
            {width: this.state.containerImageWidth, height: this.state.containerImageWidth},
        ];

        const imageStyles = [
            styles.logo,
            {width: this.state.imageWidth},
            this.props.tintColor ? { tintColor: this.props.tintColor } : null,
        ];

        return (
            <View style={styles.container}>
                <Animated.View style={containerImageStyles}>
                    <Animated.Image
                        resizeMode="contain"
                        style={[StyleSheet.absoluteFill, containerImageStyles]}
                        source={require('./images/background.png')}
                    />
                    <Animated.Image 
                    resizeMode="contain" 
                    style={imageStyles} 
                    source={require('./images/logo.png')} 
                    />
                </Animated.View>
                <Text style={styles.text}>Currency Converter</Text>
            </View >
        
        );
    }
}

export default Logo;