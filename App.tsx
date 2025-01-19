import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import {InstantSearch, connectSearchBox} from 'react-instantsearch-native';

const App = () => {

  const searchClient = instantMeiliSearch(
    '172.233.129.212',
    '9674910d2440954f136b0e1537007301972088cd71ca00c44008f4a9a024'
  );


    return(
        <SafeAreaView>

          <InstantSearch
          indexName ="steam-video-games" searchClient = {searchClient}
          >

          </InstantSearch>
            <Text>App</Text>
        </SafeAreaView>
    );
};

export default App;

const styles = StyleSheet.create({});
