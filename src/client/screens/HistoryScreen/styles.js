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

  title: {
    alignItems: 'center', //horizontal
    justifyContent: 'center', //veritical
    marginBottom: 30,
    marginTop: 30,
  },
  container: {
    flex: 1
  },
  card: {
    marginTop: 5,
    marginBottom: 5
  },
  surface: {
    //alignItems: 'center', //horizontal
    //justifyContent: 'center', //veritical
    elevation: 4,
    flex: 1
  },
  general: {
    ...StyleSheet.absoluteFill,
    
    justifyContent: 'center'
  },
  input: {
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16
  },
  button: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'center',
  },

  radionButton: {
    marginLeft: 30,
    marginRight: 30,
    height: 48,
    borderRadius: 5,
  },

  rightContent: {
    marginRight: 10
  },

  righCardActions: {
    flex: 1, 
    alignItems: 'flex-end'
  }

})