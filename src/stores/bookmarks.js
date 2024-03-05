import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useBookmarkStore = defineStore('bookmark', () => {
  const bookmarks = ref([])
  if (localStorage.getItem('bookmarksArr')) {
    bookmarks.value = JSON.parse(localStorage.getItem('bookmarksArr'))
  }

  function setLocalStorage() {
    localStorage.setItem('bookmarksArr', JSON.stringify(bookmarks.value))
  }

  function compareTwoArrs(array1, array2) {
    let namesArray1 = array1.map((obj) => obj.name)

    for (let obj of array2) {
      if (namesArray1.includes(obj.name)) {
        //array1.isSaved = true
        console.log(`Ime ${obj.name} postoji u oba niza.`)
      } else {
        // array1.isSaved = false
        console.log(`Ime ${obj.name} NE postoji u oba niza.`)
      }
    }
  }

  function modifyArray(array1, array2) {
    array1.forEach((obj1) => {
      // Provera da li se ime objekta nalazi u array2
      let foundInArray2 = array2.some((obj2) => obj2.name === obj1.name)

      if (foundInArray2) {
        // Dodavanje ili ažuriranje ključa isSaved u zavisnosti od uslova
        obj1.isSaved = true
        //console.log('sadrzi')
      } else {
        obj1.isSaved = false
        //console.log('Ne sadrzi')
      }
    })
  }

  function modifyObj(obj, array2) {
    let foundInArray2 = array2.some((obj2) => obj2.name === obj.name)

    if (foundInArray2) {
      obj.isSaved = true
    } else {
      obj.isSaved = false
    }
  }

  return { bookmarks, setLocalStorage, compareTwoArrs, modifyArray, modifyObj }
})
