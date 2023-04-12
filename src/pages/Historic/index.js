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
    </View>
  );
};

export default Historic;