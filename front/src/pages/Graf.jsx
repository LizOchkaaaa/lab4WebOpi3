import React, {Component} from 'react';
import {connect} from "react-redux";
import {sendPoint, setR, setX, setY} from "../actions/coordinatesAction";
import "../screen/graf.css";

let circles = [];

class graf extends Component {

    constructor(props) {
        super(props);
        this.handleClickFrame = this.handleClickFrame.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.clearGraphic();
        this.drawPoints(this.props.app.table);
    }

    clearGraphic() {


        let svg = document.getElementById("svg");
        for (let i = 0; i < circles.length; i++) {
            if (svg.contains(circles[i])) svg.removeChild(circles[i]);
        }

        circles = [];
    }


    drawPoints(table) {
        for (const point of table) {
            this.drawPoint(point.x, point.y, point.r, point.resultArea)
        }
    }

    drawPoint(x, y, r, result) {
        const xmlns = "http://www.w3.org/2000/svg";

        let circle = document.createElementNS(xmlns, "circle");

        if (this.props.app.r != null) {
            circle.setAttribute('cx', 150 + ((x * 100) / Number(this.props.app.r)));
            circle.setAttribute('cy', 150 - ((y * 100) / Number(this.props.app.r)));
        } else {
            circle.setAttribute('cx', 150 + ((x * 100) / (r)));
            circle.setAttribute('cy', 150 - ((y * 100) / (r)));
        }

        circle.setAttribute('r', 5);


        if (result) circle.style.fill = 'green';
        else circle.style.fill = 'red';

        let svg = document.getElementById("svg");

        circles.push(circle);
        svg.appendChild(circle)
    }


    render() {
        return(
            <div className="frame2">
                <svg width="500" height="400" className="svg-graph" id="svg">

                    <line className="axis" x1="0" x2="300" y1="150" y2="150" stroke="black"></line>
                    <line className="axis" x1="150" x2="150" y1="0" y2="300" stroke="black"></line>

                    <polygon points="150,0 144,15 156,15" stroke="black"></polygon>
                    <polygon points="300,150 285,156 285,144" stroke="black"></polygon>

                    <line className="coor-line" x1="200" x2="200" y1="155" y2="145" stroke="black"></line>
                    <line className="coor-line" x1="250" x2="250" y1="155" y2="145" stroke="black"></line>

                    <line className="coor-line" x1="50" x2="50" y1="155" y2="145" stroke="black"></line>
                    <line className="coor-line" x1="100" x2="100" y1="155" y2="145" stroke="black"></line>

                    <line className="coor-line" x1="145" x2="155" y1="100" y2="100" stroke="black"></line>
                    <line className="coor-line" x1="145" x2="155" y1="50" y2="50" stroke="black"></line>

                    <line className="coor-line" x1="145" x2="155" y1="200" y2="200" stroke="black"></line>
                    <line className="coor-line" x1="145" x2="155" y1="250" y2="250" stroke="black"></line>

                    <text className="coor-text" x="195" y="140">R/2</text>
                    <text className="coor-text" x="248" y="140">R</text>

                    <text className="coor-text" x="40" y="140">-R</text>
                    <text className="coor-text" x="90" y="140">-R/2</text>

                    <text className="coor-text" x="160" y="105">R/2</text>
                    <text className="coor-text" x="160" y="55">R</text>

                    <text className="coor-text" x="160" y="205">-R/2</text>
                    <text className="coor-text" x="160" y="255">-R</text>

                    <text className="axis-text" x="290" y="170">x</text>
                    <text className="axis-text" x="160" y="13">y</text>


                    <rect x="150" y="50" width="100" height="100" fill="#cdc684" stroke="#cdc684" fillOpacity="0.3" />


                    <polygon points="150,150 150,200 200,150" fill="#cdc684" stroke="#cdc684" fillOpacity="0.3"></polygon>
                    <path d="M 150 200 A 50 50, 180, 0, 1, 100 150 L 150 150 Z" fill="#cdc684" stroke="#cdc684" fillOpacity="0.3"></path>
                    <circle r="0" cx="150" cy="150" id="target-dot"></circle>
                    <polygon ref='frame' onClick={this.handleClickFrame} id="frame" className="frame"
                             points="0,0 0,300 300,300 300,0" opacity = "0"/>
                </svg>
                <div className="svgErrorText">
                    <label ref='labelChR' className="svgErrors"/>
                </div>
            </div>
        )
    }
    handleClickFrame = (event) => {

         const frame = this.refs.frame;
         const label = this.refs.labelChR;


        if (this.props.app.r == null) {
            label.innerHTML = "Выберите R";
        } else {
            label.innerHTML = "";
            let svg = document.getElementById("svg");
            let x0 = svg.getBoundingClientRect().x;
            let y0 = svg.getBoundingClientRect().y;
            let centerX = x0 + 150;
            let centerY = y0 + 150;

            let currentX = (event.pageX - centerX) / 100 * this.props.app.r;
            let currentY = (centerY - event.pageY) / 100 * this.props.app.r;


            this.props.setX(currentX.toFixed(3));
            this.props.setY(currentY.toFixed(3));

            let params = {
                x: currentX.toFixed(3),
                y: currentY.toFixed(3),
                r: this.props.app.r
            };

            console.log(params);
            this.props.sendPoint(params);
        }
    };

}

const stateToProps = store => {
    return {
        app: store.app,
    }
};

const dispatchToProps = dispatch => {
        return {
            setX: x => dispatch(setX(x)),
            setR: r => dispatch(setR(r)),
            setY: y => dispatch(setY(y)),
            sendPoint: point => dispatch(sendPoint(point))
        }
    }
;

export default (connect(stateToProps, dispatchToProps)(graf));