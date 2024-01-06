import React, {useState} from 'react'

export const UnsplashImage = () => {
	const [activeImageUrl, setActiveImageUrl] = useState('')
	const [activeImageObject, setActiveImageObject] = useState({})
	const [imagesList, setImageList] = useState([])
	
	const fetchRandomImage = (list) => {
		let num = Math.floor(Math.random() * 30);
		let randomImage = list[num]
		setActiveImageObject(randomImage);
		console.log(randomImage)
		console.log("activeImageUrl:", activeImageUrl)
		
		if (randomImage != null) {
			let url = randomImage.urls.regular
			setActiveImageUrl(url)
			console.log(url)
		}
	} 

	const fetchImagesList = async () => {
		try {
			const response = await fetch(
				'https://api.unsplash.com/photos/?query=nature&client_id=pmTNZxpE0TQ6pRwUqnkTL8uWNhzcEWYQzPdzd8NtmPo&per_page=30&order_by=popular')
			const data = await response.json()

			setImageList(data)
		}
		catch {
			console.error("Error fetching images from API, Please try again!")
		}
	}

	const handlePlayClick = () => {
		fetchImagesList();
		fetchRandomImage(imagesList)
	}

	return (
		<div className='ImageSection'>
			<p>Direction: Try and guess where the picture is taken</p>
			<button onClick={handlePlayClick}>Play</button>
			<img src={activeImageUrl} alt='' className='randomImage' />
		</div>
	)
}
