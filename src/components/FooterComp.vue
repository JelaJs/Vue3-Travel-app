<template>
  <div class="footer">
    <div class="container">
      <ul>
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink to="/tripideas">Trip Ideas</RouterLink></li>
        <li><RouterLink to="/accomodations">Where To Stay</RouterLink></li>
        <li><RouterLink to="/explore">Find Hotel</RouterLink></li>
        <li><RouterLink to="/yourtrip">Your Trip</RouterLink></li>
      </ul>
      <p>Ⓒ Tourism 2024</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.footer {
  padding: 4rem 0;
  background-color: #f2eee9;

  ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 2rem;

    a {
      cursor: pointer;
      color: #000;
    }
  }

  p {
    margin-top: 2rem;
    font-size: 1.4rem;
  }
}
</style>
