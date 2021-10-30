import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native'
import { getImageFromApi } from "../API/TMDBApi.js"

class FilmItem extends React.Component {
    render() {
        const film = this.props.film
        const displayDetailForFilm = this.props.displayDetailForFilm
        return (
            <TouchableOpacity
                onPress={() =>  displayDetailForFilm(film.id)}
                style = {styles.main_container}>
                    <Image
                        style={styles.image}
                        source ={{uri:getImageFromApi(film.poster_path)}}
                    />
                <View style = {styles.text_container}>
                    <View style = {styles.name_vote_container}>
                        <Text style={styles.title_text}>{film.title}</Text>
                        <Text style={styles.vote_text}>{film.vote_average}</Text>
                    </View>
                    <View style = {styles.description_container}>
                        <Text style={styles.description_text} numberOfLines={5}>{film.overview}</Text>
                    </View>
                    <View style = {styles.date_container}>
                        <Text style = {styles.date_text}>Sorti le {film.release_date}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        height : 190,
        flexDirection : 'row',
        backgroundColor: 'white'
    },
    image: {
        width :120,
        height: 180,
        margin : 5,
        backgroundColor : 'gray'
    },
    text_container: {
        flex : 1,
        margin : 4,
        paddingBottom : 2
    },
    name_vote_container: {
        flex : 4,
        flexDirection : 'row',
    },
    description_container: {
        flex : 7
    },
    date_container: {
        flex : 1
    },
    title_text: {
        fontWeight :'bold',
        fontSize : 20,
        flex : 1,
        flexWrap : 'wrap',
        paddingRight : 5
    },
    vote_text: {
        fontWeight : 'bold',
        fontSize : 26,
        color : '#666666'
    },
    description_text: {
        fontStyle : 'italic',
        fontSize : 14
    },
    date_text: {
        fontSize : 12,
        textAlign : 'right'
    }
})

export default FilmItem