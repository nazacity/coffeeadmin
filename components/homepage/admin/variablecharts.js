const dashboardNASDAQChart = {
  data: {
    labels: [
      'ม.ค.',
      'ก.พ.',
      'มี.ค.',
      'เม.ษ.',
      'พ.ค.',
      'มิ.ย.',
      'ก.ค.',
      'ส.ค.',
      'ก.ย.',
      'ต.ค.',
      'พ.ย.',
      'ธ.ค.',
    ],
    datasets: [
      {
        data: [
          34000,
          45000,
          38000,
          41000,
          42000,
          38000,
          31000,
          41000,
          38000,
          37000,
          40000,
          36000,
        ],
        fill: false,
        borderColor: '#fbc658',
        backgroundColor: 'transparent',
        pointBorderColor: '#fbc658',
        pointRadius: 1,
        pointHoverRadius: 2,
        pointBorderWidth: 8,
        label: 'รายได้',
      },
    ],
  },
  options: {
    legend: {
      display: false,
      position: 'top',
    },
  },
};

module.exports = {
  dashboardNASDAQChart,
};
