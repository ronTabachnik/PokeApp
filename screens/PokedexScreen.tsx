import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { getPokemonList, getPokemonByName } from "../api/pokeapi";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { PokedexStackParamList } from "../navigation/PokedexStack";
import { TYPE_COLORS } from "../utils/Colors";
import { PokemonCard } from "../components/PokemonCard";

type PokemonPreview = {
  name: string;
  url: string;
  id: number;
  image: string;
  background: string;
};

export default function PokedexScreen(): JSX.Element {
  const [pokemonList, setPokemonList] = useState<PokemonPreview[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const limit = 20;

  const navigation =
    useNavigation<NativeStackNavigationProp<PokedexStackParamList>>();

  const fetchPokemonList = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const data = await getPokemonList(limit, offset);
      const detailed = await Promise.all(
        data.results.map(async (item: { name: string; url: string }) => {
          const poke = await getPokemonByName(item.name);
          const mainType = poke.types[0].type.name; // ✅ FIXED HERE
          return {
            name: poke.name,
            url: item.url,
            id: poke.id,
            image: poke.sprites.front_default,
            background: TYPE_COLORS[mainType] || "#fff"
          } as PokemonPreview;
        })
      );
      setPokemonList((prev) => [...prev, ...detailed]);
      setOffset((prev) => prev + limit);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemonList();
  }, []);

  const renderItem = ({ item }: { item: PokemonPreview }) => (
    <PokemonCard
      name={item.name}
      image={item.image}
      backgroundColor={item.background}
      onPress={() => navigation.navigate("PokemonDetails", { name: item.name })}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={pokemonList}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        numColumns={2}
        onEndReached={fetchPokemonList}
        onEndReachedThreshold={0.6}
        contentContainerStyle={styles.list}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" /> : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  list: {
    padding: 10
  },
  card: {
    flex: 1,
    margin: 8,
    borderRadius: 12,
    alignItems: "center",
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3 // Android shadow
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 8
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "capitalize",
    color: "#fff", // text on colorful background
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  }
});
