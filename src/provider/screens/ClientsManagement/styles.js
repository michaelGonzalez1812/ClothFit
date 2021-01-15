import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  fab: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 25,
    right: 0,
    bottom: 0,
    width: 60,
    height: 60
    //TODO: Look for a way to increase icon size
  },

  container: {
    flex: 1
  },

  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },

  title: {
    fontSize: 32,
  },
  
  clientCard: {
    marginBottom: 2
  },

  righCardActions: {
    flex: 1, 
    alignItems: 'flex-end'
  }
})