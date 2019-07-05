import React, { Component } from 'react';
import axios from './../../axios/index';
import './SinsMap.css';
//import { getTwoToneColor } from 'antd/lib/icon/twoTonePrimaryColor';
import { Modal, Spin } from 'antd';


export default class SinsMap extends Component {

    map = {};

    constructor(props) {
        super(props);
        this.state = {
            mainData: [],
            minAndMax: {},
            selecredAttr: 'crimeRate',
            variable: 0,
            percent: 0,
            loading: true,
        };
    }

    getCrimeData = () => {
        axios.ajax({
            url: '/crimeRate',
            data: {
                crimeparams: this.params
            },
            head: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((res) => {
            if (res) {
                let crimeData = res;
                let main = this.state.mainData;
                for (var key in crimeData) {
                    let lga = crimeData[key].LGA,
                        crimeRate = crimeData[key].IncidentsRate,
                        incidents = crimeData[key].Incidents
                    if (main[lga]) {
                        main[lga]['crimeRate'] = parseFloat(crimeRate);
                        main[lga]['incidents'] = parseFloat(incidents);
                    }
                }
                window.main = main;
                window.minAndMax = this.minMax(main);
                this.renderMap(main, this.state.minAndMax);
            }
        })
    }

    minMax(main) {
        var maxObj = {
            'crimeRate': {
                'min': 9999999,
                'max': 0
            },
            'incidents': {
                'min': 9999999,
                'max': 0
            },
            "lust": {
                'min': 9999999,
                'max': 0
            },
            "gluttony": {
                'min': 9999999,
                'max': 0
            },
            "greed": {
                'min': 9999999,
                'max': 0
            },
            "sloth": {
                'min': 9999999,
                'max': 0
            },
            "wrath": {
                'min': 9999999,
                'max': 0
            },
            "envy": {
                'min': 9999999,
                'max': 0
            },
            "pride": {
                'min': 9999999,
                'max': 0
            },
        }
        const attrs = ["crimeRate", "incidents", "lust", "gluttony", "greed", "sloth", "wrath", "envy", "pride"];
        for (var item in main) {
            for (var i = 0; i < attrs.length; i++) {
                this.singleMinMax(maxObj, main[item], attrs[i]);
            }
        }
        return maxObj;
    }

    singleMinMax(maxObj, item, attr) {
        maxObj[attr].min = maxObj[attr].min > item[attr] ? item[attr] : maxObj[attr].min;
        maxObj[attr].max = maxObj[attr].max < item[attr] ? item[attr] : maxObj[attr].max;

    }

    requestList = () => {
        axios.ajax({
            url: '/sin_tracker',
            data: {
                params: this.params
            }
        }).then((res) => {
            // console.log(res)
            if (res) {
                this.setState({
                    mainData: res
                })
                this.getCrimeData();
            }
        })
    }

    changeMapStyle(selecredAttr) {
        const styleFeature = {};
        console.log(this.state.minAndMax[selecredAttr].min)
        console.log(this.state.minAndMax[selecredAttr].max)
    }


    styleFeature(item) {
        const selection = window.selection;
        if (!window.minAndMax[selection]) {
            return;
        }
        let censusMin = window.minAndMax[selection].min == 0 ? 0 : Math.log(window.minAndMax[selection].min)
        let censusMax = window.minAndMax[selection].max == 0 ? 0 : Math.log(window.minAndMax[selection].max)
        const itemKey = item.getProperty('vic_lga__3');
        let featureData = window.main[itemKey][selection] == 0 ? 0 : Math.log(window.main[itemKey][selection])
        let delta = (featureData - censusMin) / (censusMax - censusMin);

        var color = [];
        var low = [21, 97, 30];  // color of smallest datum
        var high = [122, 61, 47];   // color of largest datum FFBE0B
        for (var i = 0; i < 3; i++) { //Math.log(x)
            color[0] = (low[0] - high[0]) * delta + high[0];
            color[1] = (high[1] - low[1]) * delta + low[1];
            color[2] = (high[2] - low[2]) * delta + low[2];
        }

        return {
            strokeWeight: 1,
            strokeColor: '#fff',
            zIndex: 2,
            fillColor: 'hsl(' + color[0] + ',' + color[1] + '%,' + color[2] + '%)',
            fillOpacity: 0.75,
        };
    }

    renderMap = (main) => {
        window.selection = "crimeRate";
        let list = main;
        let map = new window.google.maps.Map(document.getElementById('sinsmap'), {
            zoom: 7,
            center: { lat: -37.815, lng: 144.946 }
        });

        let infowindow = new window.google.maps.InfoWindow({
            content: ''
        });

        map.data.loadGeoJson(
            'https://data.gov.au/geoserver/vic-local-government-areas-psma-administrative-boundaries/wfs?request=GetFeature&typeName=ckan_bdf92691_c6fe_42b9_a0e2_a4cd716fa811&outputFormat=json'
        );


        map.data.setStyle(this.styleFeature);

        map.data.addListener('addfeature', function (event) {
            this.setState((prevState) => {
                return {loading: false}
            })
        }.bind(this));

        map.data.addListener('mouseover', function (event) {

            map.data.overrideStyle(event.feature, { strokeWeight: 4 });
            let lgaName = event.feature.getProperty('vic_lga__3')
            let variable = list[lgaName]["crimeRate"]
            this.setState((prevState) => {
                return { variable: list[lgaName]["crimeRate"] }
            })


            var contentString = '<div style="line-height:1.3;overflow:visible;white-space:nowrap;">'
                + lgaName + '<HR style="border:3; double #987cb9";color=#909090;SIZE=3> <b>Crime Rate: </b>' + (list[lgaName]["crimeRate"] * 100).toFixed(2) + '%'
                + '<br> <b>Incidents: </b>' + list[lgaName]["incidents"]
                + '<hr style="border:1 ;dashed; height:1";color=#909090>';

            // console.log(typeof list[lgaName]);

            var orderedFeatures = Object.entries(list[lgaName]);

            orderedFeatures.sort((x, y) => y[1] - x[1])
            for (var i = 0; i < orderedFeatures.length; i++) {
                let envyName = orderedFeatures[i][0].charAt(0).toUpperCase() + orderedFeatures[i][0].slice(1);
                if (orderedFeatures[i][0] != "crimeRate" && orderedFeatures[i][0] != "incidents") {
                    contentString += `<b>${envyName}:${orderedFeatures[i][1]} </b><br>`
                }
            }



            infowindow.setContent(contentString);
            let anchor = new window.google.maps.MVCObject();
            anchor.set("position", event.latLng);
            infowindow.open(map, anchor);

        }.bind(this));

        map.data.addListener('mouseout', function (event) {
            map.data.revertStyle();
            infowindow.close();
        });


        window.map = map;

    }
    componentDidMount() {
        this.requestList();

    }

    componentWillReceiveProps(nextProps) {
        window.selection = nextProps.selection;
        window.map.data.setStyle(this.styleFeature);
    }


    render() {
        // console.log(melbgeo)
        return (
            <div>
                <Modal
                    title="Loading Map Geo Data"
                    visible={this.state.loading}
                    footer={null}
                >
                    <Spin className="center" size="large" />
                </Modal>
                <div id="sinsmap" style={{ height: '65vh' }}></div>

            </div>

        );
    }
}