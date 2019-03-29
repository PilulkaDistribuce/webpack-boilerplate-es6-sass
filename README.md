# Webpack boilerplate 

- Webpack 4
- Kompilace SASS do CSS včetně minifikace, načítání fontů, SVG, JPG a PNG obrázků
- Kompilace ES6 modulů do ES5


## Naklonování a instalace závislostí 

1. Naklonovat repo ```git clone git@github.com:PilulkaDistribuce/webpack-boilerplate-es6-sass.git && cd webpack-boilerplate```  
2. Nainstalovat závislosti  ```npm install``` nebo   ```yarn install```


## Použití

Příkaz:

- ```npm run dev``` spouští kompilaci SASS do CSS a ES6 do ES5 do vývojového prostředí (zapisuje sourcemapy, ignoruje se minifikace)
- ```npm run build``` spouští kompilaci SASS do CSS a ES6 do ES5 do produkčního prostředí
- ```npm run js``` nebo  ```npm run css``` spouštít kompilaci SCSS nebo JS
- ```npm run css:myconponent``` nebo  ```npm run js:app``` spouštít kompilaci specifikovaných modulů specifikovaných v souboru  ```webpack.config.js```