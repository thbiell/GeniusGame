import React, { useEffect, useState } from "react";
import { Text, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Table, Row } from 'react-native-table-component';
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";

const RankingsScreen = () => {
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    const loadRankings = async () => {
      try {
        const db = getFirestore();
        const rankingsRef = collection(db, "users");
        const q = query(
          rankingsRef,
          orderBy("topscore", "desc"),
          limit(10)
        );
        const querySnapshot = await getDocs(q);
        const rankingsData = querySnapshot.docs.map((doc, index) => {
          const data = doc.data();
          const name = data.nome ? data.nome.substring() : "";
          const topscoreHard = data.topscoreHard || "";
          const topscoreHardDisplay = topscoreHard ? topscoreHard : "Sem registros";
          return [
            index + 1,
            name,
            data.topscore,
            topscoreHardDisplay,
          ];
        });
        setRankings(rankingsData);
      } catch (error) {
        console.error("Erro ao carregar os rankings:", error);
      }
    };

    loadRankings();
  }, []);

  const tableHead = ["Posição", "Nome", "Topscore", "TopScore Hard"];

  return (
    <LinearGradient
      colors={['#eeaeca', '#94bbe9']}
      style={styles.container}
    >
      <Text style={styles.title}>Rankings de Topscore</Text>
      <Table borderStyle={styles.tableBorder}>
        <Row data={tableHead} style={styles.head} textStyle={styles.headText} />
        {rankings.map((rowData, index) => (
          <Row
            key={index}
            data={rowData}
            style={styles.row}
            textStyle={styles.rowText}
          />
        ))}
      </Table>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 60,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  tableBorder: {
    borderWidth: 1,
    borderColor: "#7D2E5F",
  },
  head: {
    height: 40,
    width: 330,
    backgroundColor: "#E7ECF1",
  },
  headText: {
    textAlign: "center",
    fontWeight: "bold",
  },
  row: {
    height: 40,
    width: 330,
    textAlign: "center",
  },
  rowText: {
    textAlign: "center",
  },
});

export default RankingsScreen;
