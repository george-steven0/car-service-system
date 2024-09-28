import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Tooltip } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
// import { useAppSelector } from '../../../../Components/Redux/TsHooks';
import { translationType } from '../../../../Components/Types/types';

const IncomeChart:React.FC<translationType> = ({t}) => {
    // const {lang} = useAppSelector(state=>state?.lang)
    const [range, setrange] = useState<string>('');

    const handleChange = (event: SelectChangeEvent) => {
        setrange(event.target.value);
    };

    const options :ApexOptions = {
        chart: {
        type: 'line' as const,
        height : '100%',
    //   dropShadow: {
    //     enabled: true,
    //     color: '#000',
    //     top: 18,
    //     left: 7,
    //     blur: 10,
    //     opacity: 0.2
    //   },
    // this is used for display zoom buttons
        toolbar: {
        show: true
        }
    },
        colors: ['#3399FF'],
        dataLabels: {
            enabled: false,
            // formatter: function (val, opts) {
            //     return val;
            // },
            style: {
                fontSize: '12px',
                colors: ['#000']
            }
        },
        tooltip: {
            theme: 'dark', // customize the tooltip pass in theme any class you want and style it in css
        },
        stroke: {
        width: 4,
            curve: 'smooth'
        },
        title: {
            text: '',
            // show: false, // Hide the chart title
            floating : true,
            align: 'center',
            margin: 35,
            offsetY: 20,
            style: {
                fontSize: '25px'
            }
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.4
            },
        },
        markers: {
            size: 0 // make dots appears on the line to specify where the data is
        },
        xaxis: {
            // categories: revenues?.revenues?.data?.data?.map( (item)=>item?.date ) || [],
            categories: ['Jan','Feb','Marc','April','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'] || [],
            range : 12,
            // title: {
            // text: 'Month'
            // }
            labels:{
                // trim : true
                style: {
                    fontSize: '11px',
                    colors: "#555"
                },
            },
            // axisBorder: {
            //     show: true,
            //     color: '#78909c',
            //     height: 1,
            //     width: '100%',
            //     offsetX: 0,
            //     offsetY: 0
            //   },
        },
        yaxis: {
        //   title: {
        //     text: 'Temperature'
        //   },
            // min: Math?.min(...totalValues),
            // max: Math?.max(...totalValues),
            // tickAmount : 4, // define the number of rows on the y axis
            // tickPlacment : 'between'
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left',
            floating: true,
            offsetY: -20,
            offsetX: -25,
            itemMargin: {
                horizontal: 20, // Set the horizontal margin between legend items to 10 pixels
                // vertical: 0, // Set the vertical margin between legend items to 0 pixels
            },
            markers: {
                radius: 0, // Set the radius of the legend markers to 0
                height: 10,
                width: 10,
                offsetX: 0,
                offsetY: 0,
                // shape: 'square', // Set the shape of the legend markers to "square"
            }
        }
        };

    const series= [
            {
                name: t('common.income'),
                data: [20,30,55,88,99,120,70,100,20,0,13,17] || []
            },
            // {
            //     name: "Reports",
            //     // data: revenues?.revenues?.data?.data?.map( (item)=>item?.takeinShare ) || []
            //     data: [70,0,20,8,6,44,100,12,43,65,88,15] || []
            // }
        ]

    return ( 
        <article className="income-chart-wrapper h-full flex flex-col justify-between">

            <div className='flex justify-between items-center mb-3'>
                <div className="flex justify-between items-center mb-3">
                    <Tooltip
                        title='تحليلات الدخل' 
                        className="tooltip-income"
                        // sx={{fontSize:'20px'}}
                    >
                        <h1 className="text-mainDark font-semibold text-lg">{t('home.chart.incomeAnalytics')}</h1>
                    </Tooltip>
                </div>

                <div className="text-mainDark">
                    <FormControl sx={{ minWidth: 120 }} size="small">
                        <InputLabel id="select-date-range">{t('common.range')}</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={range}
                            label={t('common.income')}
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>Weekly</MenuItem>
                            <MenuItem value={20}>Monthly</MenuItem>
                            <MenuItem value={30}>All Time</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>

            <div className='w-full h-full grow'>
                <ReactApexChart
                    options={options}
                    series={series}
                    type="line"
                    width="100%"
                    height="100%"
                    className = '[&>div]:w-full [&>div>svg]:w-full'
                />
            </div>
        </article>
    );
}

export default IncomeChart;