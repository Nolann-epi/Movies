import { createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import Search from "../Components/Seach.js"
import FilmDetail from "../Components/FilmDetail.js"

const SearchStackNavigator = createStackNavigator({
    Search: {
        screen: Search,
        navigationOptions: {
            title: "Rechercher"
            //,headerShown: false
        }
    },
    FilmDetail: {
        screen: FilmDetail
    }
})

export default createAppContainer(SearchStackNavigator)