import React from 'react'
import {View, StyleSheet, Text, ActivityIndicator, ScrollView, Image} from 'react-native'
import { getFilmDetailFromApi, getImageFromApi} from "../API/TMDBApi.js"
import numeral from  "numeral"
import moment from "moment"

class FilmDetail extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            film: undefined,
            isLoading: true
        }
    }

    componentDidMount() {
        getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
        this.setState({
            film: data,
            isLoading: false
            })
        })
    }


    _displayFilm() {
        const film = this.state.film
        if (film != undefined) {
            return (
                <ScrollView style={styles.scroll_view_container}>
                    <Image
                        style={styles.image}
                        source ={{uri:getImageFromApi(film.backdrop_path)}}
                    />
                    <Text style={styles.title_text}>{film.title}</Text>
                    <Text style={styles.overview_text}>{film.overview}</Text>
                    <Text style={styles.normal_text}>Sorti le {moment(new Date(film.release_date)).format("DD/MM/YYYY")}</Text>
                    <Text style={styles.normal_text}>Note: {film.vote_average}</Text>
                    <Text style={styles.normal_text}>Budget: {numeral(film.budget).format("0,0[.]00$")}</Text>
                    <Text style={styles.normal_text}>Nombre de votes : {film.vote_count}</Text>
                    <Text style={styles.normal_text} numberOfLines={1}>Genre(s) : {film.genres.map((genre) => genre.name).join(" / ")}</Text>
                    <Text style={styles.normal_text} numberOfLines={1}>Compagnie(s) : {film.production_companies.map((companies) => companies.name).join(" / ")}</Text>
                </ScrollView>
            )
        }
    }
    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style ={styles.loading_container}>
                    <ActivityIndicator size='large' color="black"/>
                </View>
            )
        }
    }

    render() {
        const idFilm = this.props.navigation.state.params.idFilm
        return (
            <View style={styles.main_container}>
                {this._displayFilm()}
                {this._displayLoading()}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: 230,
        margin : 5,
        backgroundColor : 'gray'
    },
    title_text: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: 'center',
        flexWrap: "wrap",
        marginTop: 5
    },
    overview_text: {
        fontSize: 13,
        color: "#666666",
        fontStyle: "italic",
        marginTop: 20,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 10
    },
    normal_text: {
        fontSize: 16,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 10
    }
})

export default FilmDetail