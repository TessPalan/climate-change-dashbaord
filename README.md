# :earth_americas: Let us talk about the health of our Earth :earth_americas:

#### :pencil2:  Brought to you by the Perky Penguins 
Carolina Ibarra, Ellis Mok, Grace Li, Seidy Pacheco, and Tess Palan

## :books: Background
Have you seen the Google Earth's new Timelapse feature?

[Click here to see Google Earth Timelapse Climate Change](https://www.ecowatch.com/google-earth-timelapse-climate-change-2652595487.html)

Inspired by the Timeplase features and the Earth Day celebration, our team wanted to develop a dashboard that showcases changes in CO2 emissions by country relative to population changes from 2006-2016. We also thought it would be a cool idea to see if there were popular trends in environment-related keywords searches during 2006-2016. 

## :white_check_mark: Objectives
1. Visualize how CO2 emission changes are related to population changes
2. Visualize environment-related Google search trends using Pytrends

## :package: Tools and Libraries the Project Uses
1. Data Cleaning

```
- Python
- Pandas
- Pytrends
```

2. Data Visualizations

```
1. Leaflet
    - Heatmap & Geomap
    - Data Source Used: `<'country-capitals.csv' and output 'emission_population_location_copy.json'>` 
    - Data Source Used: `<'geoJSON.json' with 'emission_population_location_copy.json' and output make data2.json>` 
      - geoJSON.json: `<'https://datahub.io/core/geo-countries#resource-countries>` 
 2. Radial Barchart
    - Data Source Used: `<CO2 Emission>`
 3. D3
    - Multiple Line Graph & Mouseover 
    - Data Source Used: `<Pytrends>`
```
 
3. Data Rendering

```
  - Flask
  - MongoDB
  - SQL Lite
```

5. Front-end Development

```
  - HTML
  - CSS
```

6. Heroku


## :open_file_folder: Sources and Datasets 
[World Bank Population Totals] (https://data.worldbank.org/indicator/SP.POP.TOTL?view=chart)

[World Bank CO2 Emissions by Country] (https://data.worldbank.org/indicator/EN.ATM.CO2E.PC?view=chart)

[Pytrends Library] (https://pypi.org/project/pytrends/)

## :chart_with_upwards_trend: Sneak Peak of our Visualization
### C02 Emissions as it Realtes to Total Population 
<details>
<summary>Click here to view our heatmap</summary>
 ![image](https://user-images.githubusercontent.com/75353991/117095612-a6daa000-ad1b-11eb-8dec-dfdef4b9176a.png)
</details>

```
Some description of how to view the map, what we see, and what to infer. 
The bubble changes according to the size of the population and the circle outliner 
```
### Emissions by Income Level
<details>
<summary>Click here to view our radial map</summary>

 ![image](https://user-images.githubusercontent.com/75353991/117095612-a6daa000-ad1b-11eb-8dec-dfdef4b9176a.png)
 
</details>

### C02 Emissions as it Realtes to Total Population 
<details>
<summary>Click here to view our radial map</summary>

 ![image](https://user-images.githubusercontent.com/75353991/117392111-40ce5400-aea6-11eb-8e04-49c7830ce430.png)
 
</details>

```
Pytrend Keywords Search Volume from 2004 to 2016.
Keywords: Clean Energy, Sustainability, Environment, Climate Change 
```

## :gift: Final Analysis and Limiations
In general, 2006 -> 2016 increase a little 

## :star_struck: Next Steps
To our fellow readers, 

