


function handleSubmit(event) {
    event.preventDefault();

    // Get form data
    const formData = new FormData(document.getElementById('contact-form'));

    // Create a new cause object
    const newCause = {
      image: formData.get('image'),
      title: formData.get('title'),
      description: formData.get('description'),
      progress: formData.get('progress'),
      goal: formData.get('goal'),
      raised: formData.get('raised')
    };

    // Store the data in localStorage
    localStorage.setItem('newCause', JSON.stringify(newCause));

    // Call the loadAndUpdateCauses function to update the causes array if needed
     loadAndUpdateCauses(newCause);
     sendDataToAPI();
     
}
//for testing purpose
async function loadAndUpdateCauses(newCause) {
    try {
      // Add the new cause to the array
      causes.push(newCause);
      console.log('Updated causes:', causes);
    } catch (error) {
      console.error('Error loading or updating causes:', error);
    }}

//Push data to API endpoint
    function sendDataToAPI() {
        // Retrieve data from localStorage
        const storedData = localStorage.getItem('newCause');
    
        // Parse the data if it's a JSON string
        const data = JSON.parse(storedData);
    
        // Send data to API endpoint
        fetch('https://your-api-endpoint.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json()).then(response => {console.log('Response from API:', response);
        })
        .catch(error => {
            console.error('Error sending data:', error);
        });
    }


    