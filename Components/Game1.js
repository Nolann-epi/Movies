import React from 'react'
import { StyleSheet, View} from 'react-native'

class Game1 extends React.Component {
    render() {
        return (
            <View style = {styles.main_view}>
                <View style = {styles.redView}></View>
                <View style = {styles.blackView}></View>
            </View>
        )
    }
}

const styles = StyleSheet.create( {
    main_view: {
        flex : 1,
        backgroundColor: 'yellow'
    },
    redView: {
        flex: 1,
        backgroundColor: 'red'
    },
    blackView: {
        flex: 1,
        backgroundColor: 'black'
    }
})

export default Game1