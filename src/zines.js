import React from 'react';

export class Zines extends React.Component {

    componentDidMount() {
        // When the component is mounted, add your DOM listener to the "nv" elem.
        // (The "nv" elem is assigned in the render function.)
        window.removeEventListener("deviceorientation", this.handleOrientation, true);
        window.addEventListener("deviceorientation", this.handleOrientation, true);
    }

    componentWillUnmount() {
        // Make sure to remove the DOM listener when the component is unmounted.
        window.removeEventListener("deviceorientation", this.handleOrientation, true);
    }

    handleOrientation(event) {
        // const absolute = event.absolute;
        // const alpha    = event.alpha;
        let beta;
        let gamma;
        if (window.matchMedia("(orientation: portrait)").matches) {
            beta = event.beta * 2;
            gamma = event.gamma * 2;
        } else {
            beta = event.gamma * -2;
            gamma = event.beta * 2;
        }

        for (let i = 1; i < 50; i++) {
            document.getElementById("date"+i).style.transform = `translate(${(gamma-10)*i}px, ${(beta+7)*i}px)`
        }
    }

    _onMouseMove(e) {
        const xDif = (e.clientX - window.innerWidth/2)/window.innerWidth * 100;
        const yDif = (e.clientY - window.innerHeight/2)/window.innerHeight * 100;

        for (let i = 1; i < 50; i++) {
            // console.log(`translate(${xDif*i}, ${yDif*i})`);
            document.getElementById("date"+i).style.transform = `translate(${xDif*-i}px, ${yDif*-i}px)`;
            document.getElementById("date"+i).style.webkitTransform = `translate(${xDif*-i}px, ${yDif*-i}px)`;
        }
    }

    createDates = () => {
        let dates = [];

        // Outer loop to create parent
        for (let i = 1; i < 50; i++) {
            dates.push(<h1 key={"date"+i} id={"date"+i} style={{opacity: 1 - (i/50), transition: `transform ${i/10}s linear`, transform: `translate(${-10*i}px, ${7*i}px)`}}>11/09/18</h1>)
        }
        return dates;
    };

    render() {
        return (
            <div className="drop" onMouseMove={this._onMouseMove.bind(this)} >
                <div style={{display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {this.createDates()}
                </div>
            </div>
        )
    }
}