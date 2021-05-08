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
### Number 1: C02 Emissions as it Realtes to Total Population 
<details>
<summary>Click here to view our heatmap</summary>
    
![Alt Text](https://media.giphy.com/media/vFKqnCdLPNOKc/giphy.gif)
 
</details>

```
From the interactive visualization above, you could select different options to get a better view of which country has the most CO2 emission and total population. 
Obviously, we could see that there are dark spots around countries that have large CO2 emission per capital. 
```

### Number 2: Emissions by Income Level
<details>
<summary>Click here to view our radial map</summary>

 ![image](https://user-images.githubusercontent.com/75353991/117095612-a6daa000-ad1b-11eb-8dec-dfdef4b9176a.png)
 
</details>

```
As shown above, this map shows us the total CO2 Emissions by income level in 2006, 2011, 2016. 
We could see that throughout the years there is only a little increase of CO2 emission.
Suprisingly, the higher the income the more CO2 emission is created. 
Please note readers that these years were chosen based on beginning, middle, and end of our 10 year data.
```

### Number 3: Pytrends Keywords Search Volume from 2004 to 2016
<details>
<summary>Click here to view our multiple line graph</summary>

<img width="1077" alt="Screen Shot 2021-05-08 at 9 01 07 AM" src="https://user-images.githubusercontent.com/74644774/117545759-fd760180-afdb-11eb-8f40-531981052365.png">
 
</details>


```
Environmental-Related Keywords: Clean Energy, Sustainability, Environment, Climate Change 
Pytrend Keywords Search Volume from 2004 to 2017. 
Please note readers that we were only able to retrieve the beginning of 2017 data. For better results, one could view or remove 2017 as an outliner.
We could see for clean energy, sustainability, and climage change ther is a peak interest from 2008 - 2010. 
Interestingly, we could see that environment searchs decrease gradually every year. 
```

## :gift: Final Analysis and Limiations
Things we can conclude:
1. Sorting the CO2 emission by country shows us that smaller populated countries with massive CO2 emission are oil producing countries.
2. Higher the income, the more CO2 emission. 
3. Sustainability and Climate Change keywords are recently more popular compare to the other two. 
4. For the past 10 years, the amount of CO2 emission has been increasing despite awareness (keyword search trends).

Limitations: 
1. There is no vivid connection between Google keywords trends and CO2 emission.
2. Dataset could be larger.

## :star_struck: Next Steps
To our fellow readers, here are some things you can try:
- Change up the data! Put in data that best interest you
- Add new environmental related keywords
- Combine CO2 Emissions and Trending Keywords to see if there is any relation
- Most importantly have fun!

