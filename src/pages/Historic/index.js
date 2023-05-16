<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getFirestore, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

const RankingsScreen = () => {
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    // Função para carregar os rankings
    const loadRankings = async () => {
      try {
        // Obter uma referência para a coleção 'rankings' no Firestore
        const db = getFirestore();
        const rankingsRef = collection(db, 'rankings');

        // Criar uma consulta para obter os rankings ordenados pelo topscore em ordem decrescente
        const q = query(rankingsRef, orderBy('topscore', 'desc'), limit(10));

        // Executar a consulta
        const querySnapshot = await getDocs(q);

        // Mapear os documentos para obter os dados dos rankings
        const rankingsData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            name: data.name.slice(0, 5), // Obter os 5 primeiros dígitos do nome
            topscore: data.topscore,
          };
        });

        // Definir os rankings carregados no estado
        setRankings(rankingsData);
      } catch (error) {
        console.error('Erro ao carregar os rankings:', error);
      }
    };

    // Carregar os rankings ao montar a tela
    loadRankings();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rankings de Topscore</Text>
      {rankings.map((ranking, index) => (
        <View key={index} style={styles.rankItem}>
          <Text style={styles.rank}>{index + 1}</Text>
          <Text style={styles.name}>{ranking.name}</Text>
          <Text style={styles.topscore}>{ranking.topscore}</Text>
        </View>
      ))}
=======
import React, { useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
//import { fetchHistory } from "../store/historySlice";

const Historic = () => {
  const dispatch = useDispatch();
  const history = useSelector((state) => state.history);

  useEffect(() => {
    dispatch(fetchHistory());
  }, []);

  return (
    <View>
      <Text>Historic</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.date}</Text>}
      />
>>>>>>> 0e76042787cbb0dac24c751141d4f93c91b553d6
    </View>
  );
};

<<<<<<< HEAD
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  rankItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rank: {
    marginRight: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
  name: {
    marginRight: 8,
    fontSize: 18,
  },
  topscore: {
    fontSize: 18,
  },
});

export default RankingsScreen;
=======
export default Historic;
>>>>>>> 0e76042787cbb0dac24c751141d4f93c91b553d6
