import React, {useState, useEffect} from 'react';

export const UnsplashImage = () => {
	const [activeImageUrl, setActiveImageUrl] = useState('')
	const [activeImageObject, setActiveImageObject] = useState({})
	const [activeImageLocation, setActiveImageLocation] = useState('')
	const [imagesList, setImageList] = useState([])
	
	const fetchRandomImage = (list) => {
		let num = Math.floor(Math.random() * list.length);
		let randomImage = list[num]
		setActiveImageObject(randomImage);
		if (randomImage != null) {
			let url = randomImage.urls.regular
			let location = randomImage.location.country
			setActiveImageUrl(url)
			setActiveImageLocation(location)
		}
	};

	const fetchImagesList = async () => {
		try {
			const response = await fetch('https://api.unsplash.com//photos/random?query=nature&count=30', {
				headers: {
					'Authorization': 'Client-ID pmTNZxpE0TQ6pRwUqnkTL8uWNhzcEWYQzPdzd8NtmPo'
				}
			});
			const data = await response.json();
			let filtered_list = []

			for (let i=0; i<data.length; i++) {
				let obj = data[i]
				if (obj.location.country != null) {
					filtered_list.push(obj)
				}
			}
			setImageList(filtered_list)
		}
		catch {
			console.error("Error fetching images from API, Please try again!")
		}
	};

	useEffect(() => {
		if (imagesList.length > 0) {
		  fetchRandomImage(imagesList);
		}
	}, [imagesList]);

	const handlePlayClick = () => {
		fetchImagesList();
	};

	return (
		<div className='ImageSection'>
			<p>Direction: Try and guess where the picture is taken</p>
			<button onClick={handlePlayClick}>Play</button>
			<img src={activeImageUrl} alt='' className='randomImage' />
		</div>
	);
}
