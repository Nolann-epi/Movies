import React from 'react'
import {StyleSheet, FlatList, View, Button, TextInput, Text, ActivityIndicator } from 'react-native'
import films from '../Helpers/filmsData.js'
import FilmItem from './FilmItem.js'
import {getFilmsFromApiWithSearchedText} from '../API/TMDBApi.js'

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            films: [],
            isLoading: false,
            noResult: false
        }
        this.searchedText = ""
        this.page = 0
        this.totalPages = 0
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
    _displayNoResult(text) {
        if (this.state.noResult) {
            return (
                <View style={styles.no_result_container}>
                    <Text style={styles.no_result_text}>No result found for {text}</Text>
                </View>
            )
        }
    }

    _displayDetailForFilm = (idFilm) => {
        this.props.navigation.navigate("FilmDetail", {idFilm: idFilm})
    }

    _loadFilms() {
        if (this.searchedText.length > 0) {
            this.setState({isLoading: true})
            getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
                this.page = data.page
                this.totalPages = data.total_pages
                this.setState({
                    films: [...this.state.films, ...data.results],
                    isLoading: false
                }, () => {
                    if (this.state.films.length == 0)
                        this.setState({noResult: true})
                    else
                        this.setState({noResult: false})
                })
            })
        }


    }
    _searchTextInputChanged(text) {
        this.searchedText = text
    }

    _searchFilms() {
        this.page = 0
        this.totalPages = 0
        this.setState({
            films: []
        }, () => {
            console.log("Page :" + this.page + " / TotalPages:" + this.totalPages + "/ Nombrs de films:" + this.state.films.length)
            this._loadFilms()
        })
    }
    render() {
        return (
            <View style ={styles.main_style}>
                <TextInput
                    onChangeText={(text) => this._searchTextInputChanged(text)}
                    style={styles.textinput}
                    onSubmitEditing={() => this._searchFilms()}
                    placeholder="Titre du film"
                />
                <Button
                    style={{height: 50}}
                    title="Rechercher"
                    onPress={() => this._searchFilms()}
                />
                <FlatList
                    data={this.state.films}
                    keyExtractor={(item) => item.id.toString()}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        console.log("EndReached")
                        if (this.page < this.totalPages) {
                            this._loadFilms()
                        }
                    }}
                    renderItem={({item}) => <FilmItem film={item} displayDetailForFilm={this._displayDetailForFilm}/>}
                />
                {this._displayLoading()}
                {this._displayNoResult(this.searchedText)}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_style: {
        flex : 1
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    no_result_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    no_result_text: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold"
    }
})

export default Search