document.getElementById('fileInput').addEventListener('change', handleFileSelect);
document.getElementById('resizeButton').addEventListener('click', resizeImage);

let originalCroppedImage = null;

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                cropImage(img);
            }
            img.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
}

function cropImage(img) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    // Crop width and height
    const cropWidth = 500;
    const cropHeight = 500;
    
    canvas.width = cropWidth;
    canvas.height = cropHeight;
    
    /// Crop coordinates (for left-top corner)
    const cropX = 0;
    const cropY = 20;
    
    ctx.drawImage(
        img,
        cropX, cropY, cropWidth, cropHeight,
        0, 0, cropWidth, cropHeight
    );

    originalCroppedImage = new Image();
    originalCroppedImage.src = canvas.toDataURL();

    document.getElementById('resizeButton').style.display = 'inline';
}

function resizeImage() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    const newWidth = prompt("Enter new width:", "");
    const newHeight = prompt("Enter new height:", "");
    
    if (newWidth && newHeight) {
        canvas.width = parseInt(newWidth);
        canvas.height = parseInt(newHeight);
        
        ctx.drawImage(
            originalCroppedImage,
            0, 0, originalCroppedImage.width, originalCroppedImage.height,
            0, 0, canvas.width, canvas.height
        );
    }
}