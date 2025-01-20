import { StyleSheet, Text, View, SafeAreaView, TextInput, FlatList, Image, StatusBar } from "react-native";
import React from "react";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import {connectSearchBox, connectInfiniteHits} from 'react-instantsearch-native';
import { InstantSearch } from "react-instantsearch-native"; 

const App = () => {

  const searchClient = instantMeiliSearch(
    'http://172.233.129.212',
    '2a5fb1e956eccf0fd9e1555842e4b6bd96fe244fabfe83b9e15a1487816d'
  );

  const SearchBox = ({ refine, currentRefinement}) => {
    return(
        <View style ={styles.searchBarContainer}>
            <View style ={styles.searchBar}>
                <TextInput
                    style = {styles.input}
                    onChangeText={ value => refine(value)}
                    value ={currentRefinement}
                    placeholder=" Escribe aqui"
                />
            </View>
        </View>
    )
  }

  const CustomSearchBox = connectSearchBox(SearchBox);

  const InfiniteHits = ({hits}) => {
    return(
        <FlatList
            data = {hits}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
                <View style ={styles.InfiniteHitsContainer}>
                    <View style ={styles.InfiniteHits}>
                        <Image
                            source = {{
                                uri: item.image,
                            }}
                            style = {{
                                width: 100,
                                height: 50,
                            }}
                            resizeMode = "contain"
                        />
                        <View style ={styles.TextContainer}>
                            <Text style = { styles.namedText}> {item.name} </Text>
                        </View>
                    </View>
                </View>
            )}
        />
    );
  };

  const CustomInfiniteHits = connectInfiniteHits(InfiniteHits)

    return(
        <SafeAreaView style ={styles.container}>
            <StatusBar
                barStyle="light-content"
                //hidden={false}
                backgroundColor="00BCD4"
                translucent = {true}
            />
            <InstantSearch indexName ="movies" searchClient = {searchClient}>
                <CustomSearchBox/>
                <CustomInfiniteHits/>
            </InstantSearch>
            <Text>App</Text>
        </SafeAreaView>
    );
};

export default App;

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#300B58",
    },
    searchBarContainer:{
        padding:20,
    },
    searchBar:{
        backgroundColor: "#fff",
        height:50,
        borderRadius: 10,
        justifyContent:'center',
        //align:'center'
        paddingHorizontal:10
    }, 
    InfiniteHitsContainer:{
        padding:20,
    },
    InfiniteHits:{
        backgroundColor: "#fff",
        height:80,
        borderRadius: 10,
        //justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:10,
        flexDirection:"row"
    },
    TextContainer:{
        padding:20,   
    },
    namedText:{
        fontSize:18,
        fontWeight:'bold',
        width:200,
        height:50,
    }
});
