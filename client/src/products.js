import camera from './stockimages/camera.jpg'
import laptop from './stockimages/laptop.jpg'
import laptopTwo from './stockimages/laptop2.jpg'
import microphoneTwo from './stockimages/microphone2.jpg'
import videoCamera from './stockimages/video-camera.jpg'
import videoCameraTwo from './stockimages/video-camera2.jpg'
import turntable from './stockimages/turntable.jpg'
import drone from './stockimages/drone.jpg'

export const data = [
	{
		id: 1,
		title: 'Cannon x500',
		price: 25.99,
		image:
			`${camera}`,
		descripton: "Please add description to data object"
	},
	{
		id: 2,
		title: 'Sony 3000',
		price: 35.99,
		image: `${laptopTwo}`,
		descripton: "Please add description to data object"
	},
	{
		id: 3,
		title: 'Macbook Pro',
		price: 60.99,
		image: `${laptop}`,
		descripton: "Please add description to data object"
	},
	{
		id: 4,
		title: 'Production Microphone',
		price: 40.00,
		image: `${microphoneTwo}`,
		descripton: "Please add description to data object"
	},
	{
		id: 5,
		title: 'Ikon PHT',
		price: 99.00,
		image: `${videoCamera}`,
		descripton: "Please add description to data object"
	},
	{
		id: 6,
		title: 'Commercial Video Camera',
		price: 150.00,
		image: `${videoCameraTwo}`,
		descripton: "Please add description to data object"
	},
	{
		id: 7,
		title: 'DJ Turntable',
		price: 300.00,
		image: `${turntable}`,
		descripton: "Please add description to data object"
	},
	{
		id: 8,
		title: 'Drone Spy',
		price: 215.00,
		image: `${drone}`,
		descripton: "Please add description to data object"
	}
];
