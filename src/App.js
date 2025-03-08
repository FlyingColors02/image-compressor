import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import './app.css';

function App() {
	const [imageSrc, setImageSrc] = useState(false);
	const [compressedImage, setCompressedImage] = useState(null);
	const [originalImage, setOriginalImage] = useState(null);
	const [compressedImageFile, setCompressedImageFile] = useState(null);

	const upload=(e)=>{
		const fileUploadInput = e.target.files[0];
		console.log('fileUploadInput', fileUploadInput);
		
		if(fileUploadInput?.type?.startsWith("image/")){
			const reader = new FileReader();
			setOriginalImage(fileUploadInput);
			reader.onload =(e)=> setImageSrc(e.target.result);
			reader.readAsDataURL(fileUploadInput);
		}else{
			alert("Please select a image file!")
		}
	}

	const compress =async()=>{
		const image = (originalImage) //img in kbs

		if (image && image instanceof File) {
		const options ={
			maxSizeMB: 0.4,
			maxWidthOrHeight: '20rem',
			useWebWorker: true

		}
		const compressedImage = await imageCompression(image, options);
		setCompressedImageFile(compressedImage);
		const reader = new FileReader();
		reader.onload=(e)=> setCompressedImage(e.target.result);
		reader.readAsDataURL(compressedImage);
	}else{
		alert("Please select a valid image file!");
	}
	}

  return (
    <div className="App">
     <div className="text-center flex-column">

			{imageSrc && <img className='image-frame' src={imageSrc}/>}
		 {!imageSrc && <input className='button' type='file' accept='image/*' onChange={upload}/>}
		 {imageSrc && !compressedImage && <button className='button' onClick={compress} >Compress</button>}
			{imageSrc && compressedImage && <p>Original Size: {originalImage.size/1024}  compressed Size : {compressedImageFile.size/1024}</p>}
		 </div>
    </div>
  );
}

export default App;
