import { showError } from '../components/common/Elements/ErrorDialog';

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    showError(error.message);
    throw error;
  }
}

export { fetchData };
