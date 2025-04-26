// screens/HomeScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { TextInput, Keyboard } from "react-native";
import { getPokemonById, getPokemonByName } from "../api/pokeapi";
import { PokemonCard } from "../components/PokemonCard";
import { TYPE_COLORS } from "../utils/Colors";
import { TypeBadge } from "../components/TypeBadge";
import { getLongestNameLength } from "../utils/textHelpers";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { PokedexStackParamList } from "../navigation/PokedexStack";

type PokemonType = {
  name: string;
  sprites: {
    front_default: string;
  };
  types: { type: { name: string } }[];
};

export default function HomeScreen(): JSX.Element {
  const navigation =
    useNavigation<NativeStackNavigationProp<PokedexStackParamList>>();
  const [pokemon, setPokemon] = useState<PokemonType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>("");

  const handleSearch = async () => {
    if (!searchText.trim()) return;

    try {
      setLoading(true);
      Keyboard.dismiss();
      const data = await getPokemonByName(searchText.toLowerCase());
      setPokemon(data);
    } catch (err) {
      console.error(err);
      alert("Pokémon not found!");
    } finally {
      setLoading(false);
    }
  };

  const TYPE_BADGE_WIDTH = pokemon
    ? getLongestNameLength(pokemon.types, ["type", "name"]) * 8 + 24
    : 0;

  const getRandomPokemon = async () => {
    try {
      setLoading(true);
      const id = Math.floor(Math.random() * 898) + 1;
      const data = await getPokemonById(id);
      setPokemon(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRandomPokemon();
  }, []);

  if (loading || !pokemon) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#ffcb05" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <PokemonCard
        name={pokemon.name}
        image={pokemon.sprites.front_default}
        backgroundColor={TYPE_COLORS[pokemon.types[0].type.name] || "#3b4cca"}
        onPress={() =>
          navigation.navigate("PokemonDetails", { name: pokemon.name })
        }
      />

      <View style={styles.row}>
        {pokemon.types.map((typeObj: any) => (
          <TypeBadge
            key={typeObj.type.name}
            name={typeObj.type.name}
            width={TYPE_BADGE_WIDTH}
            backgroundColor={TYPE_COLORS[pokemon.types[0].type.name]}
            textColor="white"
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={getRandomPokemon}>
        <Text style={styles.buttonText}>🔄 Refresh</Text>
      </TouchableOpacity>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search Pokémon by name"
          value={searchText}
          onChangeText={setSearchText}
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>🔍 Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    textTransform: "capitalize"
  },
  image: { width: 150, height: 150, marginBottom: 10 },
  types: { flexDirection: "row", gap: 10, marginBottom: 20 },
  typeBadge: {
    backgroundColor: "#eee",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    marginHorizontal: 5
  },
  typeText: { fontSize: 14, color: "#333", textTransform: "capitalize" },
  button: {
    backgroundColor: "#ffcb05",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20
  },
  buttonText: { color: "#3b4cca", fontWeight: "bold", fontSize: 16 },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    width: "80%",
    marginBottom: 10
  },
  searchButton: {
    backgroundColor: "#3b4cca",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "bold"
  },
  searchContainer: {
    marginTop: 30,
    alignItems: "center",
    width: "100%"
  },
  suggestionItem: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: "80%",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  },
  suggestionText: {
    fontSize: 16,
    textTransform: "capitalize"
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginVertical: 16
  }
});
