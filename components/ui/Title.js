import React from 'react';
import {Text, StyleSheet,} from 'react-native';
import Colors from '../../constants/colors';

const Title = ({children}) => {
   return <Text style={styles.titleStyle}>{children}</Text> 
};

const styles = StyleSheet.create ({ 
    titleStyle: {
        fontFamily:'OpenSans-Bold',
        fontSize: 24,
        //fontWeight: 'bold',
        color: Colors.white,
        textAlign:'center',
        borderWidth: 2,
        borderColor: Colors.white,
        padding: 12,
        maxWidth: '80%',
        width: 300,
        

    }
});

export default Title;