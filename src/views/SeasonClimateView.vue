<template>
  <div>
    <div class="season-climate-hero">
      <div class="container">
        <h1>Seasons & Climate</h1>
        <p class="sub-title">
          Cras pretium libero at nisi mollis, eget accumsan tortor dapibus. Nulla ligula augue,
          suscipit quis imperdiet vel, semper nec arcu. Pellentesque imperdiet eu arcu in efficitur.
          Sed in nulla finibus, condimentum nunc nec, dignissim neque. Duis condimentum dui
          malesuada arcu vulputate, at vehicula libero pulvinar.
        </p>
        <div class="content-box">
          <div class="flex-headers">
            <button class="summer active" @click="setSeason('.summer')">Summer</button>
            <button class="fall" @click="setSeason('.fall')">Fall</button>
            <button class="winter" @click="setSeason('.winter')">Winter</button>
            <button class="spring" @click="setSeason('.spring')">Spring</button>
          </div>
          <div class="season-content" v-show="seasonString === '.summer'">
            <img src="../assets/seasonImgs/summer.jpg" alt="Season summer img" />
            <h3>June - August</h3>
            <p>
              Summer in Banff often brings warm, sunny weather, although cool temperatures are not
              uncommon. The alpine comes to life this time of year, with the lakes taking on their
              vivid turquoise hues, the wildflowers in bloom, and hiking trails at higher elevations
              mostly snow free. July is the warmest month, with average highs of 22°C (72°F). Being
              at an elevation of above 1,400 metres (4,600 feet), the evenings can cool off
              significantly. If you’re planning a summer visit, be sure to still pack a few warmer
              layers!
            </p>
            <h4>Be sure to pack:</h4>
            <p>Comfortable walking shoes and a sense of adventure!</p>
            <h4>Best for:</h4>
            <ul>
              <li>Shopping</li>
              <li>Climbing & Caving</li>
              <li>Fat-biking</li>
            </ul>
          </div>

          <div class="season-content" v-show="seasonString === '.fall'">
            <img src="../assets/seasonImgs/fall.jpg" alt="Season fall img" />
            <h3>September - November</h3>
            <p>
              Autumn sees brisk mornings which warm up with the sun. In late September, the glowing
              larches take on their spectacular golden colour for a fleeting time, the ultimate fall
              treat to witness in this place. By mid-October, the leaves start to fall and there is
              often frost on the ground in the morning. The lakes begin to freeze, and the road to
              the iconic Moraine Lake closes for the winter. This time of year, snow will start to
              cover the peaks and sometimes dust the valley floor.
            </p>
            <h4>Be sure to pack:</h4>
            <p>
              Warm layers for the cold evenings and crisp mornings and don't forget your touque
              (that's Canadian for warm hat)!
            </p>
            <h4>Best for:</h4>
            <ul>
              <li>Arts & Culture</li>
              <li>Climbing & Caving</li>
              <li>Welness</li>
            </ul>
          </div>

          <div class="season-content" v-show="seasonString === '.winter'">
            <img src="../assets/seasonImgs/winter.jpg" alt="Season winter img" />
            <h3>December - March</h3>
            <p>
              The winter air in Banff and Lake Louise tends to be cold and dry, but due to the
              Chinook winds, it is warmer than similar mountainous areas in Alberta. The peaks and
              ski hills receive large amounts of snow, while the town of Banff normally gets a
              moderate amount and the hamlet of Lake Louise gets a little more. January is the
              coldest month, with average lows of -15°C (5°F), but the thermometer can drop to
              negative thirty degrees Celsius (-22°F). Bring your warmest layers and get ready for
              the endless winter experiences and shimmering snowcapped landscapes this area has to
              offer!
            </p>
            <h4>Be sure to pack:</h4>
            <p>
              All the winter essentials - an extra warm coat, wooly hat, gloves, thick socks and
              shoes with good grip (it can get icy around here).
            </p>
            <h4>Best for:</h4>
            <ul>
              <li>Ski & Snowboard</li>
              <li>Welness</li>
              <li>Snowmobiling</li>
              <li>Fat-Biking</li>
            </ul>
          </div>

          <div class="season-content" v-show="seasonString === '.spring'">
            <img src="../assets/seasonImgs/spring.jpg" alt="Season summer img" />
            <h3>April - June</h3>
            <p>
              Springtime in the Canadian Rockies brings glimpses of summertime temperatures on sunny
              days, while a good amount of snow lingers both in the valley and the mountains. The
              park begins to awaken after the winter, with bears coming out of hibernation. Around
              June is when the lakes begin their annual thaw, with Moraine Lake and Lake Louise
              melting into their iconic blue waters. The average high temperature this time of year
              is 10°C (50°F).
            </p>
            <h4>Be sure to pack:</h4>
            <p>Warm layers and a waterproof jacket for the occasional spring rain shower.</p>
            <h4>Best for:</h4>
            <ul>
              <li>Shopping</li>
              <li>Fat-biking</li>
              <li>Climbing & Caving</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Footer from '../components/FooterComp.vue'
const seasonString = ref('.summer')

const setSeason = (season) => {
  const btnBox = document.querySelector('.flex-headers')
  const btns = btnBox.querySelectorAll('button')
  let btn = btnBox.querySelector(season)
  btns.forEach((btn) => btn.classList.remove('active'))
  btn.classList.add('active')
  seasonString.value = season
}
</script>

<style scoped lang="scss">
.season-climate-hero {
  padding-top: 8rem;
  padding-bottom: 6rem;

  h1 {
    font-size: 6.4rem;
  }

  .sub-title {
    font-size: 1.8rem;
    margin-top: 2rem;
    max-width: 100rem;
    line-height: 1.4;
  }

  .content-box {
    margin-top: 8rem;
  }

  .flex-headers {
    display: flex;
    align-items: center;
    gap: 2rem;

    button {
      background-color: transparent;
      border: none;
      color: #979797;
      text-transform: capitalize;
      font-weight: 600;
      font-size: 3.2rem;
      transition: all 0.3s;
      cursor: pointer;
    }

    button:hover {
      color: #242424;
    }

    button.active {
      color: #000;
    }
  }

  .season-content {
    margin-top: 2rem;

    img {
      border-radius: 10px;
      width: 100%;
      height: 100%;
      max-height: 120rem;
      object-fit: cover;
    }

    h3 {
      font-size: 3.2rem;
      margin-top: 3rem;
    }

    p {
      margin-top: 1rem;
      font-size: 1.6rem;
      line-height: 1.4;
    }

    h4 {
      font-size: 2.6rem;
      margin-top: 2.5rem;
    }

    ul {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      list-style: none;
      margin-top: 1rem;
    }
  }
}

/**Responsive */
@media (max-width: 1200px) {
  .season-climate-hero h1 {
    font-size: 5.4rem;
  }

  .season-climate-hero .flex-headers button {
    font-size: 2.8rem;
  }

  .season-climate-hero .season-content h3 {
    font-size: 2.8rem;
  }

  .season-climate-hero .season-content h4 {
    font-size: 2.3rem;
  }
}

@media (max-width: 960px) {
  .season-climate-hero h1 {
    font-size: 4.2rem;
  }

  .season-climate-hero .sub-title {
    font-size: 1.6rem;
  }

  .season-climate-hero .content-box {
    margin-top: 4rem;
  }
}

@media (max-width: 630px) {
  .season-climate-hero h1 {
    font-size: 3.2rem;
  }

  .season-climate-hero .flex-headers button {
    font-size: 1.6rem;
  }

  .season-climate-hero .season-content h3 {
    font-size: 2.3rem;
  }

  .season-climate-hero .season-content h4 {
    font-size: 2rem;
  }
}
</style>
