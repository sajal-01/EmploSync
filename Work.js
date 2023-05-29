import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ImagePicker from 'react-native-image-picker';

export default function Work() {
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: 'post', title: 'Post' },
    { key: 'show', title: 'Show' },
  ]);

  const renderScene = SceneMap({
    post: PostTab,
    show: ShowTab,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.tabIndicator}
      style={styles.tabBar}
      labelStyle={styles.tabLabel}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Work Done</Text>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
      />
    </View>
  );
}

const ShowTab = () => {
  const items = [
    {
      id: 1,
      image: require('./images/image1.jpg'),
      description: 'screenshot of page 1',
    },
    {
      id: 2,
      image: require('./images/image2.jpg'),
      description: 'screenshot of page 2',
    },
    {
      id: 3,
      image: require('./images/image3.jpg'),
      description: 'screenshot of page 3',
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      {items.map((item) => (
        <View
          key={item.id}
          style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}
        >
          <Image
            source={item.image}
            style={{ width: 50, height: 50, marginRight: 10 }}
          />
          <Text>{item.description}</Text>
        </View>
      ))}
    </View>
  );
};

const PostTab = () => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');

  const handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        setImage(response);
      }
    });
  };

  const handleSave = () => {
    // Add code to save the image and description here
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={styles.uploadButton} onPress={handleChoosePhoto}>
        <Text style={styles.uploadButtonText}>Choose Photo</Text>
      </TouchableOpacity>
      {image && (
        <Image
          source={{ uri: image.uri }}
          style={{ width: 200, height: 200 }}
        />
      )}
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        style={styles.descriptionInput}
        multiline={true}
        numberOfLines={4}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1FFEE',
    color: '#141414',
    fontFamily: 'VarelaRound-Regular',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  tabBar: {
    backgroundColor: '#f2f2f2',
  },
  tabLabel: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tabIndicator: {
    backgroundColor: '#333',
  },
  uploadButton: {
    backgroundColor: '#333',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginVertical: 20,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    margin: 20,
  },
  saveButton: {
    backgroundColor: '#333',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
