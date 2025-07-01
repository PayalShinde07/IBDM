import React, { useState } from 'react';
import {View,Text,StyleSheet,TouchableOpacity,ScrollView,SafeAreaView,StatusBar,} from 'react-native';
import { MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
interface FilterScreenProps {
  navigation?: any;
}

interface SortOption {
  id: string;
  label: string;
}

interface YearRange {
  id: string;
  label: string;
  selected: boolean;
}

const Filter: React.FC<FilterScreenProps> = ({ navigation }) => {
  const router = useRouter();
  const [selectedSort, setSelectedSort] = useState<string>('');
  const [yearRanges, setYearRanges] = useState<YearRange[]>([
    { id: '2022', label: '2022', selected: false },
    { id: '2010-2020', label: '2010 - 2020', selected: false },
    { id: '2000-2009', label: '2000 - 2009', selected: false },
    { id: '1990-2000', label: '1990 - 2000', selected: false },
    { id: '2023', label: '2023', selected: false },
  ]);

  const sortOptions: SortOption[] = [
    { id: 'popularity', label: 'Popularity' },
    { id: 'rating', label: 'Rating' },
    { id: 'release_date', label: 'Release Date' },
  ];

  const handleSortSelection = (optionId: string) => {
    setSelectedSort(optionId);
  };

  const handleYearToggle = (yearId: string) => {
    setYearRanges(prev =>
      prev.map(year =>
        year.id === yearId ? { ...year, selected: !year.selected } : year
      )
    );
  };

  const handleApply = () => {
    console.log('Applying filters...');
    if (navigation) {
      navigation.goBack();
    }
  };


  return (
<View style={styles.outerContainer}>
              <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
              <SafeAreaView style={styles.safeArea}>
          
                <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.push('/(tabs)/Notification')}>
              <MaterialCommunityIcons name="chevron-left" size={34} color="#000" />
            </TouchableOpacity>
            <Text style={styles.imdbLogo}>Filter</Text>
          </View>


      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sort by</Text>
          {sortOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.radioOption}
              onPress={() => handleSortSelection(option.id)}
            >
              <View style={styles.radioButton}>
                <View
                  style={[
                    styles.radioCircle,
                    selectedSort === option.id && styles.radioCircleSelected,
                  ]}
                />
              </View>
              <Text style={styles.radioLabel}>Label</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.dropdownSection}>
          <View>
            <Text style={styles.sectionTitle}>Genre</Text>
            <Text style={styles.dropdownValue}>All</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.dropdownSection}>
          <View>
            <Text style={styles.sectionTitle}>Country</Text>
            <Text style={styles.dropdownValue}>All</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.dropdownSection}>
          <View>
            <Text style={styles.sectionTitle}>Rating</Text>
            <Text style={styles.dropdownValue}>All</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Year</Text>
          <View style={styles.chipContainer}>
            {yearRanges.map((year) => (
              <TouchableOpacity
                key={year.id}
                style={[
                  styles.chip,
                  year.selected && styles.chipSelected,
                ]}
                onPress={() => handleYearToggle(year.id)}
              >
                <Text
                  style={[
                    styles.chipText,
                    year.selected && styles.chipTextSelected,
                  ]}
                >
                  {year.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
   outerContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 30,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imdbLogo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginTop:20,
  },

  backButton: {
    marginRight: 12,
    marginTop:20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 15,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  radioButton: {
    marginRight: 15,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  radioCircleSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#007AFF',
  },
  radioLabel: {
    fontSize: 16,
    color: '#666',
  },
  dropdownSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  dropdownValue: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  chipSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  chipText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  chipTextSelected: {
    color: '#fff',
  },
  bottomContainer: {
    padding: 20,
    paddingBottom: 35,
  },
  applyButton: {
    backgroundColor: '#000',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Filter;