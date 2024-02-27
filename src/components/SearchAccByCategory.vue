<template>
  <div class="searchBy-section">
    <div class="container">
      <p class="section-headers">Search for accomodation</p>
      <div class="find-grid">
        <div class="options">
          <form>
            <fieldset>
              <legend>Type</legend>
              <div class="input-flex">
                <input class="hotels" type="checkbox" value="hotel" />
                <label for="hotels">Hotels</label>
              </div>
              <div class="input-flex">
                <input class="cabins" type="checkbox" value="cabin" />
                <label for="cabins">cabins</label>
              </div>
              <div class="input-flex">
                <input class="bed&breakfasts" type="checkbox" value="bad_breakfast" />
                <label for="bed&breakfasts">Bed & Breakfasts</label>
              </div>
              <div class="input-flex">
                <input class="camping&rv" type="checkbox" value="camping_rv" />
                <label for="camping&rv">Camping & Rv</label>
              </div>
            </fieldset>
          </form>
        </div>
        <div class="accomodations">Test</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.searchBy-section {
  padding-top: 8rem;

  .find-grid {
    display: grid;
    grid-template-columns: 1fr 3fr;
    margin-top: 2rem;
  }
}
</style>
