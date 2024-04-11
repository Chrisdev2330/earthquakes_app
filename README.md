# earthquakes_app
Aplicación en Ruby on rails  framework api que obtiene  y entrega información relacionada con datos sismológicos en el mundo. A grandes rasgos se contempla una Task para obtener y persistir datos y dos endpoints que serán consultados en una aplicación angular y vanilla js.La data Puede  ser filtrada por:
mag_type Valores posibles: md, ml, ms, mw, me, mi, mb, mlg.
Page: Pagina en la cual se encuentra los registos.
per_page: Registros por pagina.

## Prerequisites 
1. Node v20.12.1 - NPM v10.5.0

2. Angular CLI v17.3.3

3. Ruby v3.1.1
   
4. Rails v7.1.3.2 

5. Posgresql v 14.11
   
## Getting Started backend
git clone https://github.com/Chrisdev2330/earthquakes_app
cd api/my_earthquakes_api
bundle install
run rails db:create
run rails db:migrate
run rake earthquake:fetch

## Running the Application api 
rails s

## Getting Started frontend
git clone https://github.com/Chrisdev2330/earthquakes_app
cd Frontend_Angular/my_earthquakes_app
npm i
para javascript cd Frontend_Vainillajs 

## Running the Application frontend
ng serve
abrir index.html






