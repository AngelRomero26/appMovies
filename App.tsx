// import { StyleSheet, Text, View, SafeAreaView } from "react-native";
// import React from "react";
// import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
// import {InstantSearch, connectSearchBox} from 'react-instantsearch-native';

// const App = () => {

//   const searchClient = instantMeiliSearch(
//     '172.233.129.212',
//     '9674910d2440954f136b0e1537007301972088cd71ca00c44008f4a9a024'
//   );


//     return(
//         <SafeAreaView>

//           <InstantSearch
//           indexName ="steam-video-games" searchClient = {searchClient}
//           >

//           </InstantSearch>
//             <Text>App</Text>
//         </SafeAreaView>
//     );
// };

// export default App;

// const styles = StyleSheet.create({});

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  FlatList,
  Image,
  StatusBar,
} from "react-native";
import { MeiliSearch } from "meilisearch";

const client = new MeiliSearch({
  host: "http://172.233.129.212", 
  apiKey: "2a5fb1e956eccf0fd9e1555842e4b6bd96fe244fabfe83b9e15a1487816d", 
});

const App = () => {
  const [query, setQuery] = useState(""); 
  const [results, setResults] = useState([]); 


  const handleSearch = async (text: string) => {
    setQuery(text);

    if (text.trim() === "") {
      setResults([]); 
      return;
    }

    try {
      const searchResults = await client.index("movies").search(text, {
        limit: 10, 
      });

      setResults(searchResults.hits); 
    } catch (error) {
      console.error("Error realizando la búsqueda:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#00BCD4" translucent={true} />
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Escribe aquí..."
          value={query}
          onChangeText={handleSearch}
        />
      </View>

      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Image
              source={{ uri: item.image }}
              style={styles.resultImage}
              resizeMode="contain"
            />
            <View style={styles.resultTextContainer}>
              <Text style={styles.resultTitle}>{item.name}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          query !== "" && <Text style={styles.emptyText}>No se encontraron resultados.</Text>
        }
      />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#300B58",
    padding: 16,
  },
  searchBarContainer: {
    marginBottom: 16,
  },
  searchBar: {
    backgroundColor: "#fff",
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  resultImage: {
    width: 80,
    height: 80,
    marginRight: 16,
  },
  resultTextContainer: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  emptyText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    marginTop: 16,
  },
});