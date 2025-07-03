import { TouchableOpacity,Image,Text,StyleSheet } from "react-native";
interface MovieProps {
  id?:number;
  title: string;
  image: string;
}

const MovieCard: React.FC<MovieProps> = ({ title, image,id }:MovieProps) => (
  <TouchableOpacity style={styles.movieCard}>
    <Image source={{ uri: image }} style={styles.movieImage} />
    <Text style={styles.movieTitle}>{title}</Text>
  </TouchableOpacity>
);

export default MovieCard;

const styles = StyleSheet.create({
  movieCard: {
    marginRight: 12,
    width: 120,
    backgroundColor: '#FFFFFF',
  },
  movieImage: {
    width: 120,
    height: 180,
    borderRadius: 8,
    marginBottom: 8,
  },
  movieTitle: {
    fontSize: 12,
    color: '#000000',
    textAlign: 'center',
    lineHeight: 16,
  },
});