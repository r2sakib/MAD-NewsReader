// app/(tabs)/(home)/index.tsx

import { router } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ArticleCard from "../../../components/article-card";
import { Article, ARTICLES } from "../../../data/articles";

export default function ArticleList() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [...new Set(ARTICLES.map((a) => a.category))];
  let filtered = ARTICLES;
  if (selectedCategory) {
    filtered = ARTICLES.filter((a) => a.category === selectedCategory);
  }

  let allBtnStyle = {};
  let allTextStyle = {};
  if (selectedCategory === null) {
    allBtnStyle = styles.filterBtnActive;
    allTextStyle = styles.activeText;
  }

  const handlePress = (article: Article) => {
    router.push({
      pathname: "/(tabs)/(home)/[id]",
      params: { id: article.id },
    });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.filterContainer}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <Pressable
            style={[styles.filterBtn, allBtnStyle]}
            onPress={() => setSelectedCategory(null)}
          >
            <Text style={allTextStyle}>All</Text>
          </Pressable>

          {categories.map((category) => {
            let btnStyle = {};
            let textStyle = {};
            if (selectedCategory === category) {
              btnStyle = styles.filterBtnActive;
              textStyle = styles.activeText;
            }

            return (
              <Pressable
                key={category}
                style={[styles.filterBtn, btnStyle]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={textStyle}>{category}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ArticleCard article={item} onPress={handlePress} />
        )}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>{filtered.length} stories</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F0F4F8" },
  list: { paddingTop: 12, paddingBottom: 32 },
  listHeader: { paddingHorizontal: 16, paddingBottom: 8 },
  listHeaderText: {
    fontSize: 12,
    color: "#94A3B8",
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  scrollContainer: {
    paddingHorizontal: 10,
  },
  filterContainer: {
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
  },
  filterBtn: {
    paddingHorizontal: 16,
    height: 35,
    backgroundColor: "#e2e8f0",
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  filterBtnActive: {
    backgroundColor: "#0d1f4e",
  },
  activeText: {
    color: "#FFFFFF",
  },
});
