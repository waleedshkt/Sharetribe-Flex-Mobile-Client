import { StyleSheet } from 'react-native';
import { colors, fontSizes } from '../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  image: {
    height: 325,
  },
  carouselBackgroundImage: {
    height: 325,
    width: '100%',
  },

  paginationContainerStyle: {
    right: 0,
    left: 0,
    top: 270,
    position: 'absolute',
  },

  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginHorizontal: 0,
    backgroundColor: colors.switch.activeIcon,
  },

  headerContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginLeft: 16,
  },

  availabilityContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 16,
  },

  titleTextContainer: {
    paddingLeft: 16,
  },

  rating: {
    margin: 16,
  },
});
