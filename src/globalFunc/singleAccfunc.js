export async function fetchAccData(apiUrl, responseData, nameLink, errorData) {
  try {
    const response = await fetch(apiUrl)

    if (!response.ok) throw new Error(response.status)

    let data = await response.json()
    responseData.value = data
    nameLink.value = data.nameLink

    console.log('Single Acc Call', responseData.value)
  } catch (error) {
    console.error('Error fetching data:', error)
    errorData.value = error.status
  }
}
