import { useSelector } from 'react-redux';
import { View, Text, FlatList } from 'react-native';
import React from 'react';
import ReviewCard from './ReviewCard';

const ProfileReviews = () => {
	const reviews = useSelector((state) => state.generalReducer.user.reviews);

	const renderItem = ({ item }) => (
		<ReviewCard
			id={item.id}
			name={item.name}
			comment={item.comment}
			review={item.rating}
		/>
	);

	return (
		<View style={{ height: '100%' }}>
			<FlatList data={reviews} renderItem={renderItem} />
			{/* <FlatList
        data={reviews}
        style={{ flex: 1 }}
        renderItem={({ item }) =>
          ReviewCard({
            name: item.name,
            comment: item.comment,
            review: item.rating,
            id: item.id,
          })
        }
      /> */}
		</View>
	);
};

export default ProfileReviews;
