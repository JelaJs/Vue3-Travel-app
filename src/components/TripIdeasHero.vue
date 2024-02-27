<template>
  <div class="getInspired-hero-sec">
    <div class="container">
      <div class="hero-flex">
        <div class="hero-left">
          <h1>Trip Ideas</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt turpis mi, in
            mattis eros tempus et. Quisque ut velit id neque consequat suscipit. Praesent finibus
            sed risus eu porttitor. Proin ac porttitor leo, ac sollicitudin sapien. Aenean mattis
            diam vel scelerisque auctor. Nulla pulvinar feugiat nibh
          </p>
          <button>Build Your Perfect Trip</button>
        </div>
        <ul class="hero-right">
          <li>
            <span
              ><img src="../assets/tripHeroImgs/tripshero1.jpg" alt="Trip hero grid images"
            /></span>
          </li>
          <li>
            <span
              ><img src="../assets/tripHeroImgs/tripshero2.jpg" alt="Trip hero grid images"
            /></span>
          </li>
          <li>
            <span
              ><img src="../assets/tripHeroImgs/tripshero3.jpg" alt="Trip hero grid images"
            /></span>
          </li>
          <li>
            <span
              ><img src="../assets/tripHeroImgs/tripshero3.jpg" alt="Trip hero grid images"
            /></span>
          </li>
          <li>
            <span
              ><img src="../assets/tripHeroImgs/tripshero4.jpg" alt="Trip hero grid images"
            /></span>
          </li>
          <li>
            <span
              ><img src="../assets/tripHeroImgs/tripshero5.jpg" alt="Trip hero grid images"
            /></span>
          </li>
          <li class="last-item">
            <span
              ><img src="../assets/tripHeroImgs/tripshero6.jpg" alt="Trip hero grid images"
            /></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.getInspired-hero-sec {
  padding-top: 8rem;
  overflow: hidden;
  max-height: 900px;
  background-color: #f2eee9;

  .hero-flex {
    display: flex;
    align-items: center;
    gap: 8rem;
  }

  .hero-left {
    h1 {
      font-size: 6.4rem;
      font-weight: 600;
    }

    p {
      margin-top: 2rem;
      font-size: 1.8rem;
      line-height: 1.6;
    }

    button {
      margin-top: 4rem;
      padding: 1.5rem 3rem;
      font-weight: 600;
      color: #fff;
      font-size: 1.6rem;
      border: none;
      border-radius: 100px;
      background-color: #3b9aa4;
      cursor: pointer;
      transition: all 0.3s;
    }

    button:hover {
      background-color: #39868f;
    }
  }

  .hero-right {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    list-style: none;
    transform: translateY(200px);

    li {
      position: relative;
    }

    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }

    .last-item {
      grid-column: -3 / -2;
      transform: translateY(-120px);
    }
  }

  .hero-right > li:nth-child(3n + 2) {
    transform: translateY(-120px);
  }

  .hero-right > li:nth-child(3n + 3) {
    transform: translateY(50px);
  }
}
</style>
