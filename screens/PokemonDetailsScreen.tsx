// screens/PokemonDetailsScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { PokedexStackParamList } from "../navigation/PokedexStack";
import { getPokemonByName, getPokemonSpecies } from "../api/pokeapi";
import { TypeBadge } from "../components/TypeBadge";
import { TYPE_COLORS, hexToRGBA } from "../utils/Colors";
import { getLongestNameLength } from "../utils/textHelpers";

type ScreenRouteProp = RouteProp<PokedexStackParamList, "PokemonDetails">;

export default function PokemonDetailsScreen(): JSX.Element {
  const route = useRoute<ScreenRouteProp>();
  const { name } = route.params;

  const [pokemon, setPokemon] = useState<any>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [backgroundColor, setBackgroundColor] = useState<string>("#fff");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getPokemonByName(name);
        const mainType = data.types[0].type.name;
        setBackgroundColor(TYPE_COLORS[mainType] || "#fff");
        setPokemon(data);

        const species = await getPokemonSpecies(name);
        const entry = species.flavor_text_entries.find(
          (entry: any) => entry.language.name === "en"
        );
        if (entry) setDescription(entry.flavor_text.replace(/\f/g, " "));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [name]);

  const TYPE_BADGE_WIDTH = pokemon
    ? getLongestNameLength(pokemon.types, ["type", "name"]) * 8 + 24
    : 0;

  const BADGE_WIDTH = pokemon
    ? getLongestNameLength(pokemon.stats, ["stat", "name"]) * 8 + 24
    : 0;

  if (loading || !pokemon) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={[styles.imageContainer, { backgroundColor }]}>
        <Image
          source={{
            uri: pokemon.sprites.other["official-artwork"].front_default
          }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.name}>{pokemon.name.toUpperCase()}</Text>

      <Text style={styles.title}>Types:</Text>
      <View style={styles.row}>
        {pokemon.types.map((typeObj: any) => (
          <TypeBadge
            key={typeObj.type.name}
            name={typeObj.type.name}
            width={TYPE_BADGE_WIDTH}
          />
        ))}
      </View>

      <Text style={styles.title}>Stats:</Text>
      <View
        style={[
          styles.statsContainer,
          { backgroundColor: hexToRGBA(backgroundColor, 0.5) }
        ]}
      >
        {pokemon.stats.map((statObj: any) => (
          <View key={statObj.stat.name} style={styles.statRow}>
            <View style={[styles.badge, { width: BADGE_WIDTH }]}>
              <Text
                style={styles.badgeText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {statObj.stat.name}
              </Text>
            </View>

            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${(statObj.base_stat / 255) * 100}%`,
                    backgroundColor: backgroundColor // 👈 dynamic!
                  }
                ]}
              />
            </View>

            <Text style={styles.statValue}>{statObj.base_stat}</Text>
          </View>
        ))}
      </View>

      {description && (
        <>
          <Text style={styles.title}>Description:</Text>
          <Text style={styles.description}>{description}</Text>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    flexGrow: 1,
    borderRadius: 16
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  imageContainer: {
    width: 220,
    height: 220,
    borderRadius: 110,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4
  },
  image: {
    width: 160,
    height: 160
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10
  },
  typeBadge: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    marginBottom: 8
  },
  typeBadgeText: {
    textTransform: "capitalize",
    fontWeight: "bold",
    fontSize: 14,
    color: "#333"
  },
  title: {
    fontSize: 20,
    marginTop: 16,
    marginBottom: 8,
    fontWeight: "700"
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginVertical: 16
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
    fontStyle: "italic",
    color: "#555"
  },
  statsContainer: {
    borderRadius: 12,
    width: "100%",
    padding: 12,
    paddingBottom: 20,
    alignItems: "center"
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
    width: "100%"
  },
  badge: {
    backgroundColor: "#fff",
    paddingVertical: 6,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 2
  },
  badgeText: {
    fontWeight: "bold",
    color: "#333",
    textTransform: "capitalize",
    fontSize: 12,
    textAlign: "center"
  },
  progressBar: {
    flex: 1,
    height: 10,
    backgroundColor: "#eee",
    borderRadius: 5,
    overflow: "hidden",
    marginRight: 10
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4caf50"
  },
  statValue: {
    width: 30,
    textAlign: "right",
    fontWeight: "bold",
    fontSize: 14,
    color: "#333"
  }
});
