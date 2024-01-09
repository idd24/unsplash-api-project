import React, {useState, useEffect} from 'react';
import CityOptionsForm from './CityOptionsForm';

export const UnsplashImage = () => {
	const [activeImageUrl, setActiveImageUrl] = useState('')
	const [activeImageObject, setActiveImageObject] = useState({})
	const [activeImageLocation, setActiveImageLocation] = useState('')
	const [imagesList, setImageList] = useState([])
	const [options, setOptions] = useState([])
	
	const fetchRandomImage = (list) => {
		let num = Math.floor(Math.random() * list.length);
		let randomImage = list[num]
		setActiveImageObject(randomImage);
		if (randomImage != null) {
			let url = randomImage.urls.regular
			let location = randomImage.location.country
			setActiveImageUrl(url);
			setActiveImageLocation(location);
			compileGameOptions(location);
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

	const compileGameOptions = (location) => {
		let country_list = [
			"Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda",
			"Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain",
			"Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia",
			"Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria",
			"Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile",
			"China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship",
			"Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador",
			"Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands",
			"Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany",
			"Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau",
			"Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland",
			"Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait",
			"Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania",
			"Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania",
			"Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia",
			"Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway",
			"Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal",
			"Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino",
			"Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia",
			"South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia",
			"Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand",
			"Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos",
			"Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam",
			"Virgin Islands (US)","Yemen","Zambia","Zimbabwe"
		];
		let options = [location]
		while (options.length < 4) {
			let random = Math.floor(Math.random() * 205);
			if (!options.includes(country_list[random])) {
				options.push(country_list[random])
			}
			console.log(country_list[random])
		}
		// Shuffle options function here before passing to next step
		console.log(options);
		setOptions(options)
	}

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
			{options.map(option => <CityOptionsForm key={option} country={option} />)}
		</div>
	);
}
