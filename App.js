import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, TextInput, FlatList, Image, StatusBar } from "react-native";
import { MeiliSearch } from "meilisearch";

const client = new MeiliSearch({
  host: "http://172.233.129.212", 
  apiKey: "2a5fb1e956eccf0fd9e1555842e4b6bd96fe244fabfe83b9e15a1487816d", 
});

const index = client.index('movies');

const documents = [
    { id: 1, title: 'Carol', genres: ['Romance', 'Drama'] },
    { id: 2, title: 'Wonder Woman', genres: ['Action', 'Adventure'] },
    { id: 3, title: 'Life of Pi', genres: ['Adventure', 'Drama'] },
    { id: 4, title: 'Mad Max: Fury Road', genres: ['Adventure', 'Science Fiction'] },
    { id: 5, title: 'Moana', genres: ['Fantasy', 'Action']},
    { id: 6, title: 'Philadelphia', genres: ['Drama'] },
];

const App = () => {
  const [query, setQuery] = useState(""); 
  const [results, setResults] = useState([]); 

  const ObtenerBusqueda = async (text) => {
    setQuery(text);

    if (text.trim() === "") {
      setResults([]); 
      return;
    }

    try {
      const searchResults = await client.index("movies").search(text, {});
      
      console.log(searchResults)

      setResults(searchResults.hits); 
    } catch (error) {
      console.error("Error realizando la búsqueda:", {...error});
      if (error.response) {
        console.log("Detalles de la respuesta:", error.response);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#00BCD4" translucent={true} />
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Realiza una Busqueda..."
          value={query}
          onChangeText={ObtenerBusqueda}
        />
      </View>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Image
              source={{ uri: item.poster }}
              style={styles.resultImage}
              resizeMode="contain"
            />
            <View style={styles.resultTextContainer}>
              <Text style={styles.resultTitle}>{item.title}</Text>
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
    paddingTop:50,
    padding:12
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
    marginBottom: 8
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