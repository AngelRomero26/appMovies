import { StyleSheet, Text, View, SafeAreaView, TextInput, FlatList, Image } from "react-native";
import React from "react";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import {InstantSearch, connectCurrentRefinements, connectSearchBox} from 'react-instantsearch-native';

const App = () => {

  const searchClient = instantMeiliSearch(
    '172.233.129.212',
    '9674910d2440954f136b0e1537007301972088cd71ca00c44008f4a9a024'
  );

  const SearchBox = ({ refine, currentRefinement}) => {
    return(
        <View style ={styles.container}>
        <TextInput
            style = {styles.input}
            onChangeText={ value => refine(value)}
            value ={currentRefinement}
            placeholder=" Escribe aqui"
        />
        </View>
    )
  }

  const CustomSearchBox = connectSearchBox(SearchBox);

  const InfiniteHits = ({}) => {
    return(
        <FlatList
            data = {hits}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
                <View style ={styles.item}>
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
                    <Text> {item.name} </Text>
                </View>
            )}
        ></FlatList>
    );
  };

    return(
        <SafeAreaView>

          <InstantSearch
            indexName ="movies" 
            searchClient = {searchClient}>
            <CustomSearchBox/>
          </InstantSearch>
            <Text>App</Text>
        </SafeAreaView>
    );
};

export default App;

const styles = StyleSheet.create({});
