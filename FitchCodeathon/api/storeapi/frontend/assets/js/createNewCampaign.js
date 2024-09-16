
import { writeFileSync } from 'fs';

async function loadAndUpdateCauses() {
  try {
    const response = await fetch('/Users/sreemitra/sree-new-fe-suttufy/www/assets/data/campains.js');
    const data = await response.json();

    // Access the causes array
    const causes = data.causes;

    // Create a new cause object
    const newCause = {
      image: 'assets/img/causes/causesThumb1_2.jpg',
      title: 'Support Children\'s Education',
      description: 'Help provide educational resources and opportunities for underprivileged children.',
      progress: 65,
      goal: 15000,
      raised: 12000
    };

    // Add the new cause to the array
    causes.push(newCause);

    // Update the file
    writeFileSync('assets/data/campains.js', JSON.stringify({ causes }));

    console.log('Updated causes:', causes);
  } catch (error) {
    console.error('Error loading or updating causes:', error);
  }
}

loadAndUpdateCauses();