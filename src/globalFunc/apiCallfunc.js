export async function fetchData(apiUrl, responseData, errorData) {
  try {
    const response = await fetch(apiUrl)

    if (!response.ok) throw new Error(response.status)

    responseData.value = await response.json()
    console.log(responseData.value)
  } catch (error) {
    console.error('Error fetching data:', error)
    errorData.value = error.status
  }
}
