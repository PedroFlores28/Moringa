<template>
  <svg
    class="nivel-diamond-svg"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 500 370"
    width="100%"
    height="100%"
    aria-hidden="true"
  >
    <g id="diamante">
      <polygon points="250,360 30,120 100,30 400,30 470,120" fill="#1b4d3e" />

      <polygon points="170,50 330,50 380,95 250,115 120,95" fill="#a3cfbb" stroke="#ffffff" stroke-width="1.5" />

      <polygon points="100,30 170,50 120,95" fill="#d1e7dd" stroke="#ffffff" stroke-width="1.5" />
      <polygon points="100,30 170,50 250,30" fill="#bcd0c7" stroke="#ffffff" stroke-width="1.5" />
      <polygon points="250,30 170,50 330,50" fill="#75b798" stroke="#ffffff" stroke-width="1.5" />
      <polygon points="250,30 330,50 400,30" fill="#9ec5b4" stroke="#ffffff" stroke-width="1.5" />
      <polygon points="400,30 330,50 380,95" fill="#c5e3d6" stroke="#ffffff" stroke-width="1.5" />

      <polygon points="100,30 120,95 30,120" fill="#478267" stroke="#ffffff" stroke-width="1.5" />
      <polygon points="400,30 380,95 470,120" fill="#315c48" stroke="#ffffff" stroke-width="1.5" />

      <polygon points="30,120 120,95 140,120" fill="#7fa995" stroke="#ffffff" stroke-width="1.5" />
      <polygon points="120,95 250,115 140,120" fill="#a9dfbf" stroke="#ffffff" stroke-width="1.5" />
      <polygon points="120,95 250,115 210,120" fill="#d4edda" stroke="#ffffff" stroke-width="1.5" />
      <polygon points="250,115 380,95 290,120" fill="#60a382" stroke="#ffffff" stroke-width="1.5" />
      <polygon points="250,115 380,95 360,120" fill="#a2d9ce" stroke="#ffffff" stroke-width="1.5" />
      <polygon points="380,95 470,120 360,120" fill="#41755c" stroke="#ffffff" stroke-width="1.5" />

      <polygon points="30,120 140,120 250,360" fill="#19382b" stroke="#ffffff" stroke-width="1.2" />
      <polygon points="140,120 210,120 250,360" fill="#2d5a45" stroke="#ffffff" stroke-width="1.2" />
      <polygon points="210,120 250,120 250,360" fill="#7bb296" stroke="#ffffff" stroke-width="1.2" />
      <polygon points="250,120 290,120 250,360" fill="#438464" stroke="#ffffff" stroke-width="1.2" />
      <polygon points="290,120 360,120 250,360" fill="#15402b" stroke="#ffffff" stroke-width="1.2" />
      <polygon points="360,120 470,120 250,360" fill="#0b2418" stroke="#ffffff" stroke-width="1.2" />

      <polygon points="140,120 190,200 250,360" fill="#487e65" opacity="0.7" />
      <polygon points="360,120 310,200 250,360" fill="#22523b" opacity="0.7" />
      <polygon points="210,120 230,220 250,360" fill="#a2ebd3" opacity="0.5" />
      <polygon points="290,120 270,220 250,360" fill="#52a47a" opacity="0.5" />
    </g>

    <!-- Estrellas doradas -->
    <g class="nivel-sparkle nivel-sparkle--1" transform="translate(18 10) scale(3.1)">
      <path d="M7 0 L8.4 5.6 L14 7 L8.4 8.4 L7 14 L5.6 8.4 L0 7 L5.6 5.6 Z" fill="#e8c547" />
    </g>
    <g class="nivel-sparkle nivel-sparkle--2" transform="translate(442 12) scale(2.9)">
      <path d="M7 0 L8.4 5.6 L14 7 L8.4 8.4 L7 14 L5.6 8.4 L0 7 L5.6 5.6 Z" fill="#d4af37" />
    </g>
    <g class="nivel-sparkle nivel-sparkle--3" transform="translate(2 262) scale(2.8)">
      <path d="M7 0 L8.4 5.6 L14 7 L8.4 8.4 L7 14 L5.6 8.4 L0 7 L5.6 5.6 Z" fill="#c9a227" />
    </g>
    <g class="nivel-sparkle nivel-sparkle--4" transform="translate(452 256) scale(2.8)">
      <path d="M7 0 L8.4 5.6 L14 7 L8.4 8.4 L7 14 L5.6 8.4 L0 7 L5.6 5.6 Z" fill="#e0bc4a" />
    </g>
  </svg>
</template>

<script>
export default {
  name: 'NivelDiamondSvg',
}
</script>
