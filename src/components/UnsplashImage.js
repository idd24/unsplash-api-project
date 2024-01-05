import React, {useState} from 'react'

export const UnsplashImage = () => {
	const [activeImage, setActiveImage] = useState({})
	const [imagesList, setImageList] = useState([])

	const getRandomImage = (list) => {
		let num = Math.floor(Math.random() * 30);
		let randomImage = list[num]
		console.log(num)
		console.log("randomImage", randomImage)
		setActiveImage(randomImage);
		console.log("activeImage:", activeImage)
	} 

	const fetchImagesList = async () => {
		try {
			const response = await fetch(
				'https://api.unsplash.com/photos/?query=nature&client_id=pmTNZxpE0TQ6pRwUqnkTL8uWNhzcEWYQzPdzd8NtmPo&per_page=30')
			const data = await response.json()

			setImageList(data)
			getRandomImage(imagesList)
		}
		catch {
			console.error("Error fetching images from API, Please try again!")
		}
	}

	const handlePlayClick = () => {
		fetchImagesList();
	}

	return (
		<div className='ImageSection'>
			<p>Direction: Try and guess where the picture is taken</p>
			<button onClick={handlePlayClick}>Play</button>
			{/* <img src={activeImage.urls.regular} alt='' className='randomImage'/> */}
		</div>
	)
}
