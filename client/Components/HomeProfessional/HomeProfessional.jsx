import { View, Text } from 'react-native'
import React from 'react'

const Home_Professional = () => {
  return (
    <>
    <Flex inline justify='space-between'>
				<Box style={{ marginTop: 70 }} m={30}>
					<Text variant='h6'>Hola, {user.name}</Text>
					<Text>Cómo podemos ayudarte?</Text>
				</Box>
				<Box style={{ marginTop: 70 }} m={30}>
					<IconButton
						icon={(props) => <Icon name='notifications' {...props} />}
					/>
				</Box>
			</Flex>
			<Flex style={styles.wrapper} center fill>
				<Wrap style={{ justifyContent: 'space-evenly' }} m={4}>
					<Box
						ml={10}
						w={180}
						h={50}
						style={{
							backgroundColor: '#faf089',
							justifyContent: 'center',
							alignItems: 'center',
							borderRadius: 10,
							overflow: 'hidden',
						}}
					>
						<Text>Solicitudes activas: 0</Text>
					</Box>
				</Wrap>
					<View style={styles.buttonContainer}>
						<TouchableOpacity
							onPress={() => navigation.navigate('List', { data: 'active' })}
							style={styles.button}
						>
							<View>
								<Text style={styles.textButton}>Solicitudes activas</Text>
							</View>
						</TouchableOpacity>
						<View style={styles.buttonWrapper}>
							<TouchableOpacity
								onPress={() => navigation.navigate('List', { data: 'pending' })}
								style={[styles.button, { width: '45%' }]}
							>
								<View>
									<Text style={styles.textButton}>Solicitudes recibidas</Text>
								</View>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => {
									dispatch(getAllBudgets(user.googleId));
									navigation.navigate('List', { data: 'budget' });
								}}
								style={[styles.button, { width: '45%' }]}
							>
								<View>
									<Text style={styles.textButton}>Presupuestos enviados</Text>
								</View>
							</TouchableOpacity>
						</View>
					</View>
			</Flex>
    </>
  )
}

export default Home_Professional