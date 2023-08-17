const fileInput = document.getElementById('fileInput');
const fileInfo = document.getElementById('fileInfo');
const preview = document.getElementById('preview');
const uploadButton = document.getElementById('uploadButton');

fileInput.addEventListener('change', function(event) {
  const selectedFile = event.target.files[0];
  const validExtensions = ['image/jpeg', 'image/png', 'image/gif'];
  const maxSize = 5 * 1024 * 1024;

  if (selectedFile.size > maxSize) {
    alert('The file size should be less than 5MB.');
    fileInput.value = ''; 
    return;
  }
  
  if (!validExtensions.includes(selectedFile.type)) {
    alert('Only .jpg, .png, and .gif files are allowed.');
    fileInput.value = '';
    return;
  }

  fileInfo.innerHTML = `
    Nombre del archivo: ${selectedFile.name}<br>
    Tipo MIME: ${selectedFile.type}<br>
    Tamaño: ${selectedFile.size} bytes
  `;

  uploadButton.removeAttribute('disabled');
  if (selectedFile.type.startsWith('image/')) {
    preview.style.display = 'block';
    const reader = new FileReader();

    reader.onload = function(e) {
      preview.src = e.target.result;
    };

    reader.readAsDataURL(selectedFile);

  } else {
    preview.style.display = 'none';
  }
});

uploadButton.addEventListener('click', function() {
    const selectedFile = fileInput.files[0];
    if (selectedFile) {
        uploadFile(selectedFile);
    }
});

function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    axios.post('http://localhost:3000/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: function(progressEvent) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            document.getElementById('uploadProgress').value = percentCompleted;
        }
    })
    .then(response => {
        alert('File uploaded successfully!');
    })
    .catch(error => {
        alert('Error uploading file: ' + error);
    });
}
