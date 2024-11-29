import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  ActivityIndicator,
  Image,
} from 'react-native';

type Property = {
  id: number;
  property_name: string;
  property_price: string;
  property_location: string;
  bedroom: number;
  bathroom: number;
  restroom: number;
  property_details: string;
  property_cover_image: string;
};

export default function PropertiesScreen() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('https://rosiesluxuryhomes.com/api/houses');
        const result = await response.json(); // Fetch the entire response
        console.log('Fetched data:', result); // Log the raw result
        setProperties(result.data); // Extract the 'data' array
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProperties();
  }, []);
  

  const renderPropertyItem = ({ item }: { item: Property }) => (
    <View style={styles.propertyCard}>
      <Image
        source={{ uri: `https://rosiesluxuryhomes.com/${item.property_cover_image}` }}
        style={styles.propertyImage}
      />
      <Text style={styles.propertyTitle}>{item.property_name}</Text>
      <Text style={styles.propertyPrice}>{item.property_price}</Text>
      <Text style={styles.propertyLocation}>{item.property_location}</Text>
      <Text style={styles.propertyDetails}>{item.property_details}</Text>
      <Text style={styles.propertyFeatures}>
        🛏 {item.bedroom} Bedrooms | 🛁 {item.bathroom} Bathrooms | 🚻 {item.restroom} Restrooms
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Properties</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#808080" style={styles.loader} />
      ) : properties.length > 0 ? (
        <FlatList
          data={properties}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderPropertyItem}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          No properties available.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 16,
    backgroundColor: '#D0D0D0',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  loader: {
    marginTop: 20,
  },
  listContainer: {
    padding: 16,
  },
  propertyCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  propertyImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  propertyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  propertyPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#008000',
    marginBottom: 4,
  },
  propertyLocation: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  propertyDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  propertyFeatures: {
    fontSize: 14,
    color: '#444',
  },
});
