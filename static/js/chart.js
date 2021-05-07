const el = document.getElementById('chart')

d3.json("/keyword_search").then(function(data){
  console.log(data)
});

const options = {
    chart: { title: 'Average Total CO2 Emmissions by Income Level', width: 1000, height: 500 },
    xAxis: { pointOnColumn: false, title: { text: 'Emmissions(metric tons)' } },
    yAxis: { title: 'Income Level' },
  };
const data = {
  categories: ['High Income', 'Upper Middle', 'Middle Income', 'Lower Middle', 'Low Income'],
  series: [
    {
      name: '2016',
      data: [13232.132477
        , 15207.364816
        , 3498.719037
        , 190.337642
        , 18706.101092
    ]
    },
    {
      name: '2011',
      data: [13148.467698
        , 16231.521877
        , 3499.128408
        , 190.135623
        , 19730.644720
    ]
    },
    {
      name: '2006',
      data: [13800.439232
        , 12267.101955
        , 2738.801626
        , 201.797577
        , 15005.890965
        
    ]

    }
  ]
};
// const options = {
//     series: {
//       clockwise: false
//     }
//   };
const chart = toastui.Chart.radialBarChart({el, data, options});