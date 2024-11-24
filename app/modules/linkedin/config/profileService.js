import axios from 'axios';

export const getProfileData = async (accessToken) => {
  try {
    const experienceResponse = await axios({
      url: 'https://api.linkedin.com/v2/experience', // Endpoint de experiencia
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    
    const educationResponse = await axios({
      url: 'https://api.linkedin.com/v2/education', // Endpoint de educación
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return {
      experience: experienceResponse.data,
      education: educationResponse.data,
    };
  } catch (error) {
    // Registra el error en detalle para diagnóstico
    console.error('Error fetching LinkedIn data:', error.response?.data || error.message);

    // Lanza un error más claro para el controlador
    throw new Error('Unable to fetch LinkedIn profile data');
  }
};
