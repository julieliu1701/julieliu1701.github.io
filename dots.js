/* =========================================================
   YUYA — continuous dotted under-layer engine
   ---------------------------------------------------------
   ONE black + white-dot design lives under the whole page:
     • hidden behind a white veil in the white sections
       (hero, work) and REVEALED by a soft/sharp cursor hole
     • fully visible in the dark contact section, where the
       dots become live particles that scatter & spring back
   The white↔black boundary is a gradient, and the cursor
   morphs smoothly:  blurred spotlight (hero)  →  small sharp
   circle (work)  →  small blurred disperser (contact).
   ========================================================= */
(function () {
  'use strict';

  /* ---------------------------------------------------------
     1. MOTIFS — Braille dot-art (each cell = 2x4 dot grid)
     --------------------------------------------------------- */
  const MOTIFS = {
butterfly: `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣾⣿⣶⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣿⣟⠻⡿⢷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣸⣻⠿⢮⡿⣾⡖⠚⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢰⣿⣿⣄⠒⢦⠸⣿⣄⠙⣧⠀⠰⣦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢀⣾⣿⣿⣛⣷⣞⠳⣄⠘⡆⠙⢇⠀⠀⠰⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣸⣯⡝⠻⣿⣏⠉⠻⣮⣷⣝⣶⣼⡀⠀⠀⢱⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢀⣇⠈⠙⢤⠈⢳⡀⠀⠹⣌⢻⠀⠙⣧⠀⠀⠈⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣼⠋⠳⢤⣄⡑⠀⠹⡄⠀⣌⠀⢳⡀⠸⡆⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⠀⣠⣤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢹⣄⠀⠂⢻⡉⠑⣦⠹⡄⠸⡄⠀⢷⡄⡇⠀⠀⡇⠀⠀⠀⠀⣀⠤⠒⠋⠁⠀⠀⠈⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠙⠿⣶⣤⣝⠀⠀⠀⢿⡶⢧⠀⠸⡇⡗⠀⢀⠃⠀⢀⡴⠊⠁⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣠⣤⣤⣤⣀⣀⡀⠀⠀
⠀⠀⠀⠀⢀⣀⣀⣀⡀⠙⢻⣷⣦⡀⠈⠋⠈⢧⠀⠀⡇⠀⠈⠀⠔⠋⠀⠀⢀⣀⣤⣤⣤⡶⢶⣿⠿⠭⢥⢽⣁⣤⠀⠒⠿⠿⣿⣷⣆
⠀⢀⡠⠚⠉⠉⠀⠀⠀⠀⠀⠙⢿⣿⣶⣤⣤⡘⣆⣼⣃⣴⣦⠀⠀⣀⡴⠞⣛⡉⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠘⣿⣛⣖⠲⠦⣄⣸⡿
⢠⠾⠒⠶⠀⠀⠀⠀⠀⡀⠀⡙⢺⣏⠛⢿⣿⣿⣿⣿⣿⣿⣿⣶⠞⡩⠖⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠓⠒⠤⣍⣙⣓⠶⣴⣶⠟⠁
⡾⠀⠂⠀⠀⠀⠀⠀⠈⠑⠉⢡⣿⣿⠛⠲⣤⣯⣿⣿⣿⣿⣿⣥⡞⠒⠒⠚⠛⠓⠠⣀⠀⠀⠀⠠⠄⠀⠠⣤⣷⣌⢙⣿⣦⡾⠋⠀⠀
⡗⠺⠤⠛⠉⠉⠁⠐⠉⠉⣹⣿⢿⢃⣠⣾⢋⣾⣿⣿⣿⣟⠻⠏⡿⣗⣦⡀⠀⠀⠀⠈⠙⠲⣄⡀⠀⠀⠀⠈⠙⠿⣿⣿⠟⠀⠀⠀⠀
⣇⣠⠤⠀⠀⠀⠀⢀⣴⡾⢛⡽⢋⣽⣟⣵⢫⣿⣿⣯⡏⢣⠀⠄⠀⠈⠉⢙⣻⠖⢦⣄⡀⠀⠤⢙⠶⣤⡀⠈⢳⣰⡟⠁⠀⠀⠀⠀⠀
⢿⠀⠀⠀⢀⡴⢪⠟⢩⠖⠋⢠⡾⢻⡟⢁⣿⣿⣿⡟⡀⠘⠀⣴⠀⣤⡐⠂⠈⠉⢗⣟⠿⣶⣤⡀⠲⣤⣹⣿⠞⠉⠀⠀⠀⠀⠀⠀⠀
⠘⣧⠀⠀⠈⠀⠀⠀⠀⡀⣠⠏⣴⠏⠀⢸⣿⠟⠻⢀⠆⠀⢀⠈⢳⡸⡗⢤⡀⠉⠪⠙⢧⡀⠉⠙⠓⠛⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠘⢧⡀⠀⠀⢀⡴⢂⣜⡥⠚⠁⠀⠀⠀⠁⢠⡆⢸⣰⠀⠈⣧⠀⠑⢿⠀⠙⢦⠀⠀⡀⠻⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠈⠳⣤⣖⣋⡴⠟⠉⠀⠀⠀⠀⠀⠀⠀⢸⡇⢸⢹⠆⠀⢸⡄⠀⠈⢷⡀⠀⠑⢦⡜⢦⣹⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠃⣼⣾⠀⠈⢀⢳⡀⢠⡈⢻⣦⡀⠀⠙⢮⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣇⡿⡼⠀⠄⠈⠈⣇⠀⠹⣌⠹⣿⣄⠳⢰⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⡁⢻⠀⠀⠀⠀⠙⠂⠀⠹⡁⡈⡻⣦⠾⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢧⣸⡄⠀⠀⠀⠀⠀⢰⣄⣃⡴⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠓⠒⠒⠒⠒⠒⠋⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`,

flower: `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡤⡞⡟⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡏⣼⢁⡷⣄⠀⠀⠀⠀⠀⠀⠀⠀⢀⡤⠖⣒⠖⣒⡭⣿⣷⣶⣄⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⡾⡇⠀⢟⠀⠈⠙⢦⡀⡀⠀⠀⢀⡴⠉⣠⠞⢥⡾⣫⣿⠿⠋⠉⢻⡄⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢸⣇⢷⠀⠘⡄⠀⠀⠀⠙⢿⡀⠀⣾⠂⡰⢁⡾⡷⢁⢿⡃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣟⡄⢣⡀⠹⡄⠀⠀⠀⠀⠙⣴⡇⢰⠃⣾⠳⠁⡸⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⡄⠀⠱⡄⠘⡄⢰⣦⡀⠀⠘⡇⢸⢰⡏⠃⢠⠃⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣄⢰⣾⣦⠈⢆⢻⣡⢸⣆⢹⢸⢸⡇⠀⡌⠀⣰⠁⢀⣠⠤⠤⠠⢤⣄⠀⠀⠀⠀
⠀⠀⠀⢀⡤⠖⠒⠒⠋⠉⠑⠚⠷⣍⠻⣷⣶⡧⣧⠉⣏⠈⡏⢺⣧⣠⡃⢠⣣⡶⡫⢖⣨⣤⣤⣤⣼⣷⡤⡀⠀
⠀⢀⡴⣋⠤⠀⠀⠀⠀⠂⠤⠜⣿⠷⢽⣮⣿⣽⣝⢧⡸⡄⢳⢸⣿⣸⢁⣿⣿⣿⠾⢋⠭⣲⣶⣶⣟⣽⣿⣿⡆
⠀⣾⣾⣷⠾⠿⠶⠶⠶⠆⣴⣤⢰⣿⣤⣌⡛⠿⣿⣿⣷⣳⣾⣆⡿⡏⣼⣿⡿⢡⡞⣡⠞⠁⠀⠀⠀⠀⠈⣿⡇
⢀⣿⠋⠀⠀⠀⠀⠀⠀⠐⠂⠤⠭⢅⣛⡙⡛⢷⣺⣿⣾⣿⣽⣿⣹⣿⡋⠈⠙⢷⠚⠁⠀⠀⠀⠀⠀⢠⣴⠿⠁
⢸⡾⠋⠙⠲⢦⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠠⠠⣿⣿⣿⣿⣿⣿⢗⡢⣍⠂⡈⢇⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠉⠙⠒⠲⢤⣤⣤⢤⣤⣴⡶⣾⣿⣿⠿⢻⠟⣿⡄⠀⠙⢮⢣⡘⡜⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⡤⠖⠚⣩⠟⣩⣔⠟⣋⢝⡲⠝⠛⢩⣿⡀⠈⢆⠑⠙⣦⡀⠀⠳⣳⢰⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⡼⢋⢾⢟⡥⡪⠖⠁⣀⣀⣬⡴⣟⡙⠒⠂⠥⢤⣈⣑⡠⡈⢿⣾⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣧⡳⢡⣮⠎⢠⠖⠋⠉⠉⠁⠀⠀⠈⠓⢤⠀⠀⠙⣿⣯⡿⣯⣷⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⡟⡇⢷⢃⢆⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠹⣇⠘⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢻⣧⣽⢸⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣼⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠙⠿⣏⢿⣄⣀⣀⣀⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠓⠿⠿⠟⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`,

music: `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⢿⡀⠀⠀⠀⠀⣤⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⣤⣤⣀⣸⠏⠘⣧⠀⠀⠀⠀⠁⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⢦⡀⠈⠀⠀⠙⢛⣿⡿⠂⠀⠀⠠⠄⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠦⠀⠀⠀⣰⡏⠀⣀⠀⢸⡏⠁⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⡶⠟⠙⢷⣄⣇⠀⠀⠰⣶⣿⣀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠁⠀⠀⠀⠀⠈⠛⠀⠀⠚⠛⠿⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣤⣤⣄⣀⣀⠀⠀⠀⠀⠀⡀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠰⠀⠀⠀⠀⢀⣿⠛⠛⠻⠿⣿⣿⣷⡄⠀⠀⠁
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⡀⢸⡏⠀⠀⠀⠀⠀⣼⡿⠁⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⠁⠀⢀⣀⠀⢠⣿⠃⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣽⠿⠿⠿⣿⣶⣶⡆⠀⠘⠿⠿⠋⠀⠀⢻⣿⣿⣿⡏⠀⠀⠀⠘⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢰⡟⠀⠀⠀⠀⠀⣸⡇⠀⠀⠀⠀⠀⠀⠀⠈⠛⠛⠋⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣾⠁⠀⠀⠀⠀⠀⣿⠇⠀⠀⠀⠀⠀⠀⢀⡄⠀⠀⠀⠀⠀⢀⡄⠀⠀
⠀⠀⠀⠀⠀⣴⣶⣾⡏⠀⠀⠀⣀⡀⢠⡿⠀⠀⠀⠀⠀⢿⡲⠋⣇⣀⡀⠀⠸⡗⠋⣇⡀⠀
⠀⠀⠀⠀⠀⠻⣿⡿⠃⠀⠀⢺⣿⣿⣿⠃⠀⠀⡄⠀⢀⣜⣥⣄⡖⠋⠁⠀⠛⠒⣾⠉⠉⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠋⠁⠀⠀⢰⣿⡄⠀⠀⠀⠈⠛⠀⠀⡀⠀⠀⠈⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡏⢿⡄⠀⠀⠀⠀⠐⣶⣷⠤⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠘⠀⢀⣀⣠⣤⡤⠿⠀⠈⠿⠛⢛⣿⠟⠀⠁⠉⠀⠀⠀⠀⠀⠀
⠀⠈⠁⠀⠀⢦⣤⣿⣀⡀⠀⠀⠀⠉⠳⢦⣤⡀⠀⠀⠀⢰⡟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⡀⡀⠀⠀⠀⣰⠿⢿⡏⠁⠀⢀⡀⠀⠀⠀⣸⠃⢀⣤⣄⡈⣷⡀⠀⠐⠓⠀⠀⠀⠀⠀⠀⠀
⠚⠏⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠁⠀⠀⠀⣿⡴⠛⠁⠉⠛⠾⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`,

hearts: `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⠶⢄
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⢀⠎
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠄⠂⠁⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⢀⡤⠞⠲⣄⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠰⠂⠎⠀⠀⣶⠟⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡀⠀⣠⣤⣤⡀⠀⠰⠟⢸⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⠋⠉⠳⠁⠀⣸⠇⠀⢾⡷⠘⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠣⠄⠀⢀⠔⣁⣤⣤⣤⣀⠀⠂⠀⠀⠀⢀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠂⡸⠋⠉⠉⠙⢿⣷⠀⠀⠀⢀⡏⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢣⣠⣶⡆⠀⢸⣿⠁⠀⠀⡊⠀⠀⠀⠀
⠀⠀⠀⣀⠀⠀⠀⠀⣠⣤⣤⣄⠀⠀⠀⠀⠀⠀⠀⠀⠈⠁⠀⢠⡾⠃⡀⠀⡐⠀⠀⠀⠀⠀
⢀⣴⡿⠿⠿⢷⣤⡾⠛⠛⠛⢿⣷⡄⠀⠀⠀⠀⠀⠀⠀⢀⡴⠛⡡⠎⠀⠀⠀⠀⠀⠀⠀⠀
⢾⣿⠀⠀⠀⠀⠙⠀⠀⠀⠀⠀⣿⠇⠀⠀⠀⠀⣀⡴⠚⣡⡴⠋⠀⠀⠀⠀⡁⠀⠀⠀⠀⠀
⠘⢿⣄⠀⠀⠀⠀⠀⠀⠀⢀⡼⠋⠀⢀⣠⠔⠛⠁⣴⠞⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠙⠳⣄⡀⠀⠀⠀⡴⠋⢀⣠⠞⠉⠀⠀⠀⣸⡇⣴⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠹⠀⢀⡌⠀⣠⡿⠁⠀⠀⠀⠀⠀⠹⣄⠈⣠⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠎⢀⣾⠏⠀⠀⢀⣤⣤⣤⣄⠀⠉⠛⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢸⠀⣾⡇⠀⠀⢐⣋⣤⡀⠀⠙⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠸⣿⡀⠀⠀⠈⠻⠿⠋⠀⠀⣿⠆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢿⣷⡀⠀⠀⠀⠀⠀⠀⣴⡿⠁⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢁⠈⠻⣿⣶⣤⣄⣤⣴⣾⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠆⠀⠀⠉⠙⠛⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠐⢠⠀⠿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⢰⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⣠⠒⣶⣦⠀⢸⠀⡇⠠⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⣿⣄⠈⢁⣴⠟⢀⠇⠠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠈⠙⠛⠛⠁⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⣀⣀⠀⠀⣼⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⢾⣅⣉⣠⡼⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠉⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`,

lotus: `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⡀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⠤⣤⠋⢀⢉⡆⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠖⠉⠉⠒⢦⠈⠉⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠃⣀⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣏⠀⢠⠀⠀⠈⣧⣼⡤⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠞⠣⣀⢰⠀⣴⢦⠀⡠⠾⠓⡄⠀⠀⠀⠀⠀⠀⠈⠓⠊⠀⠀⠀⣾⣏⠒⠢⡀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠔⠒⠠⠭⣑⢣⢀⠞⠈⠀⠀⠈⠢⡀⣀⣤⡀⠀⠀⠀⠀⠀⢀⣴⠟⠉⠶⠴⠃⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣆⠀⠀⠀⢈⢿⡿⢄⡀⠀⠀⠀⡠⠊⠀⠘⡱⡀⢀⡠⠤⠶⠭⠥⢤⡀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡀⠤⠤⠤⢴⢁⠀⠀⢰⠁⡎⠀⠀⢙⡦⢄⠴⣁⠀⠀⠀⡇⠟⠁⠀⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠰⢷⢄⠀⠀⠀⢸⢸⠀⠀⢸⡤⣇⢠⡾⠓⢦⢄⡽⠾⣆⠀⠀⠀⢸⠀⠀⠀⠀⠀⠀⡸⠁⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢣⠑⠄⠀⠀⢫⢆⢠⠃⠀⠀⢿⠀⠀⠀⡫⢇⠀⠈⡆⠀⠀⠀⠀⠀⠀⠀⠀⢠⠃⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⠖⠉⠁⠀⢣⡀⠑⠄⠀⠉⢁⠀⠀⠀⠀⠀⢀⡴⠛⠙⠢⡂⡏⠀⢀⠄⠀⠀⠀⢀⡔⠃⠀⠐⠢⢄⡀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠓⠶⡆⠤⠀⠀⠙⠦⣀⠉⠢⣘⢆⠀⢠⠀⡀⡞⠀⠀⠀⠀⢛⣠⠶⠊⠀⠀⣀⠔⠋⠀⠀⠀⠀⠀⠀⠑⣄
⠀⠀⠀⠀⠀⣤⠀⠀⠀⠀⠀⠀⠈⠑⠄⡀⠒⠤⡀⠉⠀⠊⠉⠲⠤⣱⣜⣼⣄⠀⠀⢀⣊⣁⡀⠤⠔⠊⠁⠀⠀⢀⡠⠔⢒⡠⠝⠛⠉
⠀⢀⡠⠿⠄⠯⢅⠀⠀⠀⠀⠀⠀⠀⠀⠈⠐⠤⢈⡑⠢⠤⠀⣀⣤⠎⠈⡆⠀⠉⠈⠀⠙⣌⠢⣀⠀⠀⢀⣠⣒⠡⠴⢎⡁⠀⠀⠀⠀
⢰⠋⠀⠀⠀⠀⠈⠇⢠⡞⠹⠆⣀⠠⠤⠤⢄⡰⠋⡏⠈⠉⠉⠁⠀⠀⠀⣷⡀⠀⠀⠀⠀⢸⡆⠀⠀⠈⠀⠀⠀⠀⠀⠀⠈⢆⠀⠀⠀
⠀⠀⠀⠀⡄⠀⣠⠇⠀⢳⠖⠉⠀⠀⢀⡤⠒⡇⠀⡇⠀⠀⠀⠀⠀⢀⡼⢧⠙⠢⠤⢀⡀⡸⣷⣄⣀⡀⠀⡀⠤⢐⡢⠖⠒⠾⠀⠀⠀
⢀⠀⠀⠀⠈⠉⠀⢀⣴⠇⠀⠀⠀⢀⡏⠀⠀⣇⣈⣉⠉⠁⠒⠒⣈⢵⣥⢣⠑⠢⣀⣀⣈⡱⠀⠈⠐⠒⠒⠒⠈⠁⠀⠀⠀⠀⠀⠀⠀
⠘⢦⡀⠀⠀⠀⣀⡡⣹⠀⠀⡀⠀⠘⡄⠀⠀⠉⠀⠀⠈⠉⠉⠉⠚⠉⠁⠸⠳⢖⣂⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠉⠒⠒⠀⠒⠊⠉⠓⠤⠃⠀⠀⠳⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠙⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠢⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠓⠚⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠑⢄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡋⠀⠀⢀⡌⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠑⠒⠒⠊⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`,

moon: `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠢⠀⠀⠀⠀⠀⣀⡔⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⡼⢣⠀⠀⠀⠀⠀⠀⠀⠄⠀⠀⡠⢺⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠱⠌⠀⠀⠀⠀⠀⠀⠀⠂⣠⡊⠐⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⣤⣤⣤⢀⡀⠀⠀⠀⢠⣜⢡⡀⡞⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢀⣴⠿⡿⠿⢽⠿⣿⣿⣿⣷⣦⣀⠎⠀⠊⡰⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣠⣿⠃⡸⠀⠀⡀⠤⠘⠻⣿⣿⣿⣿⣠⢃⠜⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠰⠃⠀⠓⠀⠀⠈⠉⢐⠀⠀⢸⢿⣿⣿⣿⣦⡀⠀⠀⡀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠆⠀⠀⢁⠀⡀⠀⠒⠒⢕⠒⡁⠸⣿⣿⣿⡇⢻⡔⠒⠊⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠐⠊⠀⠀⠀⠜⠉⠉⢱⣿⣿⣿⣿⡘⢸⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⡔⡐⢤⡀⢀⣼⣿⣿⡿⠈⠷⡇⢌⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢄⡀⠀⠀⠀⠑⠃⢸⣠⣾⣿⣿⠛⠀⠀⠘⡙⢌⠘⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠉⠳⠶⣶⣶⣾⣿⣿⣿⠛⠁⠀⠀⠀⠀⠐⠀⠑⢵⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢄⠀⠠⠣⣠⠁⠂⠂⠀⠀⠀⠀⠀⠀⢀⠀⠀⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣶⠷⠿⠺⠤⢄⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⠘⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠠⠀⠀⠀⠀⢀⣾⡟⠁⠀⠀⠀⠀⠀⠐⡀⠀⠀⠀⠀⠀⠀⡇⠀⠀⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠠⠤⣾⠤⠄⠀⠀⢸⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠇⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠙⠀⠀⠀⠀⠸⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡼⠀⠀⠀⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠹⣧⣀⠀⠀⠀⠀⠀⠔⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⢟⠒⠒⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠰⠁⠈⢱⠀⡀⣀⣧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠀⢸⠁⠀⠀⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠜⠁⠀⠀⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡜⢁⡀⠀⠀⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠢⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣶⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⣀⡜⠙⢧⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢶⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`,

swirl: `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡃⡀⢀⣀⡀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠛⠏⠇⠉⠉⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢲⡆⠀⡀⡄⡥⣤⠄⣀⠀⠀
⠀⠀⠀⠀⠀⠀⢀⡿⠀⠀⠀⠀⠀⠀⠀⣔⠎⠻⡯⣮⡽⠏⡇⠛⠛⢷⡗⡆
⠀⠀⠀⠀⠀⢀⡪⠅⠀⠀⠀⠀⠀⠀⠀⠀⢀⢏⡟⠁⠀⠀⠇⠀⠀⠀⣓⡇
⠀⠐⠒⣖⠷⣲⠻⠒⠒⠒⠀⠀⠀⠀⠀⡀⣾⡍⡇⠀⠀⠀⠀⣦⣤⣊⡱⠁
⠀⠀⠀⠀⠠⡥⡃⠀⠀⠀⠀⣀⡀⠀⠀⣃⡏⠈⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠨⣙⠀⠀⠀⠀⡾⠛⠛⣷⡄⠇⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⣀⣼⣧⣄⣀⡀⠁⠀⠀⠀⣿⡃⠇⠀⠀⡄⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⣾⠋⠁⠀⠀⠈⠻⣷⡀⠀⠀⣽⣟⠀⠀⠠⡇⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⣯⠀⠀⢰⠀⠀⠀⢳⡇⠀⢀⣭⣧⡧⠍⠧⡿⣇⡄⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠛⣦⣤⣼⠀⠀⠀⢀⡇⣠⣯⠟⠁⠀⠀⠀⡇⠀⠙⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⡯⣿⠾⠇⠀⠀⠀⠀⠀⠇⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢀⣀⡶⣓⣿⠛⢓⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣛⡓⡒⣒⠿⠳⠟⠅⠃⠁⡁⣑⠢⠄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠒⠛⠫⢿⠋⠛⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢛⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`
  };

  /* small filler shapes (explicit dot coords) — stars, hearts, mini swirls */
  const FILLERS = [
    { // sparkle / star
      w: 7, h: 7, dots: [
        [3,0],[3,1],[3,2],[3,4],[3,5],[3,6],
        [0,3],[1,3],[2,3],[4,3],[5,3],[6,3],
        [2,2],[4,2],[2,4],[4,4]
      ]
    },
    { // little heart
      w: 7, h: 6, dots: [
        [1,0],[2,0],[4,0],[5,0],
        [0,1],[3,1],[6,1],
        [0,2],[6,2],
        [1,3],[5,3],
        [2,4],[4,4],
        [3,5]
      ]
    },
    { // mini swirl
      w: 6, h: 6, dots: [
        [2,0],[3,0],[4,1],[4,2],[3,3],[2,3],[1,2],[1,1],[2,1],[3,2],[2,5],[3,5]
      ]
    }
  ];

  /* ---------------------------------------------------------
     2. PARSE Braille -> dot coordinates (2x4 cell)
     --------------------------------------------------------- */
  const DOTMAP = [
    [0,0,0x01],[0,1,0x02],[0,2,0x04],[0,3,0x40],
    [1,0,0x08],[1,1,0x10],[1,2,0x20],[1,3,0x80]
  ];
  function parseMotif(art) {
    const lines = art.replace(/^\n/, '').split('\n');
    const dots = []; let maxX = 0, maxY = 0;
    lines.forEach((line, cy) => {
      for (let cx = 0; cx < line.length; cx++) {
        const code = line.charCodeAt(cx);
        if (code >= 0x2800 && code <= 0x28FF) {
          const bits = code - 0x2800;
          for (let i = 0; i < 8; i++) {
            if (bits & DOTMAP[i][2]) {
              const X = cx * 2 + DOTMAP[i][0], Y = cy * 4 + DOTMAP[i][1];
              dots.push([X, Y]);
              if (X > maxX) maxX = X; if (Y > maxY) maxY = Y;
            }
          }
        }
      }
    });
    return { dots: dots, w: maxX + 1, h: maxY + 1 };
  }
  const PRIMARY = Object.keys(MOTIFS).map((k) => parseMotif(MOTIFS[k]))
    .filter((m) => m.dots.length > 20);

  const MOTIF_BY_NAME = {};
  Object.keys(MOTIFS).forEach(function (k) {
    MOTIF_BY_NAME[k] = parseMotif(MOTIFS[k]);
  });

  // Exact Braille motifs only — no densify / subsample / inventing dots
  const BURST_NAMES = Object.keys(MOTIF_BY_NAME).filter(function (k) {
    return MOTIF_BY_NAME[k].dots.length > 20;
  });

  const DPR_FX = Math.min(window.devicePixelRatio || 1, 2);

  /* =========================================================
     FOOTER — click empty space to bloom an exact motif
     (includes butterfly; same bloom as the others)
     ========================================================= */
  (function runFooterMotifs() {
    const footer = document.getElementById('footerCta');
    if (!footer || !BURST_NAMES.length) return;

    const canvas = document.createElement('canvas');
    canvas.className = 'footer-motif-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    footer.insertBefore(canvas, footer.firstChild);
    const ctx = canvas.getContext('2d');

    let W = 0, H = 0;
    const bursts = [];
    const IN_MS = 480;   // generate time = each dot's base lifespan
    const SOFT = 55;     // softer edges so the bloom reads organic, not a hard ring
    let raf = null;
    let lastMotif = null;

    function layout() {
      const r = footer.getBoundingClientRect();
      W = r.width;
      H = r.height;
      canvas.width = Math.round(W * DPR_FX);
      canvas.height = Math.round(H * DPR_FX);
    }

    function prepMotif(name, cx, cy) {
      const m = MOTIF_BY_NAME[name];
      const targetH = Math.min(H * 0.55, W * 0.42, 260);
      const s = targetH / m.h;
      const mcx = m.w / 2, mcy = m.h / 2;
      const dots = [];
      let maxR = 0;
      // every Braille dot, exact positions — uniform scale only, no tilt
      for (let i = 0; i < m.dots.length; i++) {
        const x = (m.dots[i][0] - mcx) * s;
        const y = (m.dots[i][1] - mcy) * s;
        const dist = Math.hypot(x, y);
        if (dist > maxR) maxR = dist;
        dots.push({ x: x, y: y, dist: dist, ang: Math.atan2(y, x) });
      }
      maxR = Math.max(maxR, 40);

      // organic bloom: distance-based timing + angular wobble + per-dot jitter
      // (not a perfect circle)
      let maxAppear = 0;
      let maxLife = 0;
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const norm = d.dist / maxR;
        // slight elliptical / petal bias so the front isn't a clean ring
        const lobe = 0.12 * Math.sin(d.ang * 3 + Math.random() * 0.8);
        const jitter = (Math.random() - 0.5) * 0.28;
        const order = Math.max(0, Math.min(1.15, norm + lobe + jitter));
        d.appearAt = order * IN_MS;
        // lifespan ≈ generate time, with a little scatter (never much longer)
        d.life = IN_MS * (0.82 + Math.random() * 0.18);
        if (d.appearAt > maxAppear) maxAppear = d.appearAt;
        if (d.life > maxLife) maxLife = d.life;
      }
      return {
        dots: dots,
        cx: cx,
        cy: cy,
        maxR: maxR,
        t0: performance.now(),
        endAt: maxAppear + maxLife + SOFT,
        r: Math.max(1.0, Math.min(1.7, s * 0.85))
      };
    }

    function drawBurst(b, now) {
      const elapsed = now - b.t0;
      if (elapsed >= b.endAt) return false;

      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < b.dots.length; i++) {
        const d = b.dots[i];
        const age = elapsed - d.appearAt;
        if (age < 0 || age > d.life) continue;

        const fadeIn = Math.max(0, Math.min(1, age / SOFT));
        const fadeOut = Math.max(0, Math.min(1, (d.life - age) / SOFT));
        const alpha = fadeIn * fadeOut;
        if (alpha <= 0.02) continue;

        const grow = 0.55 + 0.45 * fadeIn;
        const rr = b.r * grow;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(b.cx + d.x, b.cy + d.y, rr, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      return true;
    }

    function tick(now) {
      ctx.setTransform(DPR_FX, 0, 0, DPR_FX, 0, 0);
      ctx.clearRect(0, 0, W, H);
      let alive = false;
      for (let i = bursts.length - 1; i >= 0; i--) {
        if (!drawBurst(bursts[i], now)) bursts.splice(i, 1);
        else alive = true;
      }
      if (alive) raf = requestAnimationFrame(tick);
      else raf = null;
    }

    function kick() {
      if (raf == null) raf = requestAnimationFrame(tick);
    }

    footer.addEventListener('click', function (e) {
      if (e.target.closest('a, button, .clink')) return;
      layout();
      const rect = footer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // keep bloom in the empty black — skip if deep in the top gradient fade
      if (y < 48) return;
      let name = BURST_NAMES[(Math.random() * BURST_NAMES.length) | 0];
      if (BURST_NAMES.length > 1) {
        let guard = 0;
        while (name === lastMotif && guard++ < 12) {
          name = BURST_NAMES[(Math.random() * BURST_NAMES.length) | 0];
        }
      }
      lastMotif = name;
      bursts.push(prepMotif(name, x, y));
      // cap concurrent blooms
      if (bursts.length > 4) bursts.shift();
      kick();
    });

    let rt = null;
    window.addEventListener('resize', function () {
      clearTimeout(rt);
      rt = setTimeout(layout, 150);
    });
    layout();
  })();

  /* =========================================================
     MAIN ENGINE — pointer-driven reveal (home page + fine pointer)
     ========================================================= */
  const fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  if (!fine || !document.getElementById('top')) return;

  function sample(dots, cap) {
    if (dots.length <= cap) return dots;
    const out = [], step = dots.length / cap;
    for (let k = 0; k < cap; k++) out.push(dots[(k * step) | 0]);
    return out;
  }

  const DPR = Math.min(window.devicePixelRatio || 1, 2);

  /* ---------------------------------------------------------
     3. BUILD the continuous dot field (page coordinates)
        Grid-tiled so shapes don't overlap; gaps get fillers.
        Cell size is fixed (desktop-tuned) so it scales by
        count on other screens.
     --------------------------------------------------------- */
  // place one motif at (cx,cy) with scale s and rotation ang; push its (fine) dots
  function placeMotif(dots, m, cx, cy, s, ang, dr, cap, W, pageH) {
    const cos = Math.cos(ang), sin = Math.sin(ang);
    const mcx = m.w / 2, mcy = m.h / 2;
    const md = sample(m.dots, cap);
    for (let i = 0; i < md.length; i++) {
      const dx = (md[i][0] - mcx) * s, dy = (md[i][1] - mcy) * s;
      const x = cx + dx * cos - dy * sin;
      const y = cy + dx * sin + dy * cos;
      if (x < -30 || x > W + 30 || y < -30 || y > pageH + 30) continue;
      dots.push(mkDot(x, y, dr));
    }
  }

  function buildField(W, pageH) {
    const dots = [];
    // 1) many SMALL motif clusters, scattered at fully random positions + rotations
    const cell = 60;                                        // smaller cell = more clusters
    const cols = Math.max(1, Math.ceil(W / cell));
    const rows = Math.max(1, Math.ceil(pageH / cell));
    let bag = [], bi = 0;
    const nextMotif = () => {
      if (bi >= bag.length) { bag = PRIMARY.slice().sort(() => Math.random() - 0.5); bi = 0; }
      return bag[bi++];
    };
    for (let r = -1; r < rows; r++) {
      for (let c = -1; c < cols; c++) {
        const m = nextMotif();
        const targetH = 30 + Math.random() * 66;            // smaller clusters
        const s = targetH / m.h;
        const ang = (Math.random() - 0.5) * Math.PI;        // random rotation
        const cx = (c + 0.5) * cell + (Math.random() - 0.5) * cell * 1.1;  // heavy scatter
        const cy = (r + 0.5) * cell + (Math.random() - 0.5) * cell * 1.1;
        const dr = Math.max(0.8, Math.min(1.3, s * 0.85));  // slightly smaller / finer dots
        placeMotif(dots, m, cx, cy, s, ang, dr, 260, W, pageH);
      }
    }
    // 2) scattered fine fillers (stars / hearts / mini-swirls) — fill the gaps densely
    const fillN = Math.round((W * pageH) / 1000);
    for (let i = 0; i < fillN; i++) {
      const fm = FILLERS[(Math.random() * FILLERS.length) | 0];
      const s = (6 + Math.random() * 12) / Math.max(fm.w, fm.h);
      const ang = Math.random() * Math.PI;
      const fr = Math.max(0.8, Math.min(1.4, s * 1.3));
      placeMotif(dots, fm, Math.random() * W, Math.random() * pageH, s, ang, fr, 40, W, pageH);
    }
    return dots;
  }
  function mkDot(x, y, r) { return { hx: x, hy: y, x: x, y: y, vx: 0, vy: 0, r: r }; }

  /* =========================================================
     4. ENGINE — invert layer (mix-blend:difference over the page content)
        + dots layer painted ON TOP of the inverted area (never inverted)
     ========================================================= */
  document.body.classList.add('fx');

  const invertCv = document.createElement('canvas'); invertCv.id = 'dots-invert';
  const layerCv = document.createElement('canvas');  layerCv.id = 'dots-layer';
  
  document.body.appendChild(invertCv);
  document.body.appendChild(layerCv);
  const ictx = invertCv.getContext('2d');
  const lctx = layerCv.getContext('2d');
  const maskCv = document.createElement('canvas');   // tracker/trail shape (white on transp)
  const mctx = maskCv.getContext('2d');
  const dotsBuf = document.createElement('canvas');  // hero dot design, viewport space
  const dctx = dotsBuf.getContext('2d');

  // load the dot-design artwork; convert its black bg -> transparent so only the
  // white dots remain (lets the inverted text show through between the dots)
  const bgImg = new Image();
  let dotsSrc = null;
  bgImg.onload = () => {
    dotsSrc = document.createElement('canvas');
    dotsSrc.width = bgImg.width; dotsSrc.height = bgImg.height;
    const pc = dotsSrc.getContext('2d');
    pc.drawImage(bgImg, 0, 0);
    const im = pc.getImageData(0, 0, dotsSrc.width, dotsSrc.height);
    const d = im.data;
    for (let i = 0; i < d.length; i += 4) {
      const lum = (d[i] + d[i + 1] + d[i + 2]) / 3;   // brightness → alpha
      d[i] = 255; d[i + 1] = 255; d[i + 2] = 255;      // paint pure white
      d[i + 3] = lum;                                  // dots opaque, black transparent
    }
    pc.putImageData(im, 0, 0);
    dotsDirty = true;
  };
  bgImg.src = encodeURI('new dot design.png');

  let VW = 0, VH = 0;
  let pageH = 0, workTop = 0, footerTop = 0;
  let dots = [];                     // dot design (hero region only)
  let scrollY = window.scrollY || window.pageYOffset || 0;

  let mx = -9999, my = -9999, inView = false, lastStroke = null;
  let mode = 'hero';                 // hero | work | contact
  let curHard = 0, tgtHard = 0;      // 0 = soft (hero), 1 = sharp (work/contact)
  let speed = 0;                     // smoothed pointer speed → tracker size
  let curD = 26, curReveal = 13;
  const pts = [];                    // trail points {x,y,t,r}

  const LIFE = 850;                  // trail lifetime (ms)
  const HERO_BASE = 72;              // hero base diameter (scaled by speed)
  const OTHER_D = 18;                // work / contact diameter
  const SPEED_MAX = 24;              // px/frame that maps to the max size
  const SPEED_GROW = 2.1;            // how much faster movement grows the reveal

  function measure() {
    pageH = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    const workEl = document.querySelector('.section.work');
    const footEl = document.querySelector('.footer');
    workTop = workEl ? workEl.getBoundingClientRect().top + scrollY : pageH;
    footerTop = footEl ? footEl.getBoundingClientRect().top + scrollY : pageH;
  }

  function resize() {
    VW = window.innerWidth; VH = window.innerHeight;
    [invertCv, layerCv, maskCv, dotsBuf].forEach((cv) => {
      cv.width = Math.round(VW * DPR); cv.height = Math.round(VH * DPR);
    });
    measure();
    dotsDirty = true;
  }

  /* ---- render the dot-design artwork into a viewport-space buffer (on scroll/resize) ---- */
  function renderDotsBuf() {
    dctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    dctx.clearRect(0, 0, VW, VH);
    if (!dotsSrc) return;
    const scale = VW / dotsSrc.width;        // fit artwork to viewport width
    const tileH = dotsSrc.height * scale;
    const heroBottom = workTop - scrollY;    // where the hero design ends (screen y)
    if (heroBottom <= 0) return;
    const clipH = Math.min(heroBottom, VH);
    dctx.save();
    dctx.beginPath(); dctx.rect(0, 0, VW, clipH); dctx.clip();
    for (let k = Math.floor(scrollY / tileH) - 1; ; k++) {
      const y = k * tileH - scrollY;
      if (y > clipH) break;
      dctx.drawImage(dotsSrc, 0, y, VW, tileH);
    }
    dctx.restore();
  }

  /* soft/sharp brush stamped into the tracker mask */
  function stamp(x, y, r, hard, alpha) {
    if (r < 0.5 || alpha <= 0.01) return;
    const g = mctx.createRadialGradient(x, y, 0, x, y, r);
    const plateau = 0.5 + hard * 0.4;     // large full-alpha core → full (not faded) inversion
    g.addColorStop(0, 'rgba(255,255,255,' + alpha + ')');
    g.addColorStop(plateau, 'rgba(255,255,255,' + alpha + ')');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    mctx.fillStyle = g;
    mctx.beginPath();
    mctx.arc(x, y, r, 0, Math.PI * 2);
    mctx.fill();
  }

  /* ---- build the tracker/trail mask ---- */
  function drawMask() {
    mctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    mctx.globalCompositeOperation = 'source-over';
    mctx.clearRect(0, 0, VW, VH);
    // always render (and expire) the reveal trail so it keeps fading naturally
    // even after the cursor has left the hero / the window
    const now = performance.now();
    while (pts.length && now - pts[0].t > LIFE) pts.shift();
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      const age = (now - p.t) / LIFE;
      const r = p.r * (0.2 + 0.8 * (1 - age));         // shrink as it ages
      stamp(p.x, p.y, r, 0, (1 - age) * (1 - age));    // trail is always soft
    }
    // live cursor head — only while the pointer is on the page
    if (inView) stamp(mx, my, curReveal, curHard, 1);
  }

  /* ---- composite the two effect layers ---- */
  function drawLayers() {
    // invert layer: the mask, drawn white → inverts the page content beneath (difference)
    ictx.setTransform(1, 0, 0, 1, 0, 0);
    ictx.globalCompositeOperation = 'source-over';
    ictx.filter = 'none';
    ictx.clearRect(0, 0, invertCv.width, invertCv.height);
    if (inView || pts.length > 0) {
      ictx.filter = 'blur(' + ((1 - curHard) * 2).toFixed(1) + 'px)';
      ictx.drawImage(maskCv, 0, 0);
      ictx.filter = 'none';
    }
    // dots layer: hero only — dots painted on top of the inverted (black) area,
    // clipped to the tracker mask so they never appear outside it and are never inverted
    lctx.setTransform(1, 0, 0, 1, 0, 0);
    lctx.globalCompositeOperation = 'source-over';
    lctx.clearRect(0, 0, layerCv.width, layerCv.height);
    // dots follow the mask wherever hero dots exist (dotsBuf is empty outside the
    // hero region, so the work/contact circle never reveals dots); this also keeps
    // the dots visible on the trail as it fades out after the cursor leaves.
    if (inView || pts.length > 0) {
      // draw the dot design a little softer than full white, so the (solid, full-white)
      // inverted top-layer text reads clearly as a bright shape against the dotted field
      lctx.globalAlpha = 1;
      lctx.drawImage(dotsBuf, 0, 0);
      lctx.globalCompositeOperation = 'destination-in';
      lctx.drawImage(maskCv, 0, 0);
      lctx.globalCompositeOperation = 'source-over';
    }
  }

  /* ---- main loop ---- */
  let raf = null, lastScrollY = -1, dotsDirty = true;
  function loop() {
    if (window.innerWidth !== VW || window.innerHeight !== VH) resize();
    curHard += (tgtHard - curHard) * 0.15;
    speed *= 0.9;                                          // decays at rest
    const sf = 0.75 + Math.min(speed / SPEED_MAX, 1) * SPEED_GROW;   // faster → bigger
    const targetD = mode === 'hero' ? HERO_BASE * sf : OTHER_D;
    curD += (targetD - curD) * 0.2;
    curReveal = curD / 2;

    const scrolled = scrollY !== lastScrollY; lastScrollY = scrollY;
    if (dotsDirty || scrolled) { renderDotsBuf(); dotsDirty = false; }
    drawMask();
    drawLayers();
    raf = requestAnimationFrame(loop);
  }

  /* ---- input ---- */
  function setModeFor(pageY) {
    if (pageY >= footerTop) mode = 'contact';
    else if (pageY >= workTop) mode = 'work';
    else mode = 'hero';
    tgtHard = mode === 'hero' ? 0 : 1;
  }

  window.addEventListener('mousemove', (e) => {
    const nx = e.clientX, ny = e.clientY;
    if (mx > -9998) speed = speed * 0.5 + Math.hypot(nx - mx, ny - my) * 0.5;
    mx = nx; my = ny; inView = true;
    setModeFor(my + scrollY);
    if (mode === 'hero') {
      const now = performance.now();
      if (lastStroke) {
        const dx = mx - lastStroke.x, dy = my - lastStroke.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const step = Math.max(3, curReveal * 0.35);
        const n = Math.min(Math.ceil(dist / step), 40);
        for (let i = 1; i <= n; i++) {
          pts.push({ x: lastStroke.x + dx * (i / n), y: lastStroke.y + dy * (i / n), t: now, r: curReveal });
        }
        if (pts.length > 260) pts.splice(0, pts.length - 260);
      } else {
        pts.push({ x: mx, y: my, t: now, r: curReveal });
      }
      lastStroke = { x: mx, y: my };
    } else {
      lastStroke = null;
    }
  }, { passive: true });

  document.addEventListener('mouseleave', () => { inView = false; lastStroke = null; });

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY || window.pageYOffset || 0;
    if (inView) setModeFor(my + scrollY);
    lastStroke = null;
  }, { passive: true });

  let rt = null;
  window.addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(resize, 200);
  });

  /* ---- go ---- */
  function start() { resize(); loop(); setTimeout(resize, 350); }
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start);
})();
