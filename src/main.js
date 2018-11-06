import React from "react";
import gif from "./img/wmm.gif";

export class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {idleTime: 0};
    }

    componentDidMount() {
        window.removeEventListener("deviceorientation", this.handleOrientation, true);
        window.addEventListener("deviceorientation", this.handleOrientation, true);
        setInterval(this.timerIncrement.bind(this), 1000);
    }

    componentWillUnmount() {
        window.removeEventListener("deviceorientation", this.handleOrientation, true);
    }

    timerIncrement() {
        let idleTime = this.state.idleTime + 1;
        this.setState({idleTime: idleTime});
        // console.log(idleTime);
        if (idleTime > 10)
            document.getElementById("stage").className = "stage stageAnimation";
    }

    handleOrientation(event) {
        // const absolute = event.absolute;
        // const alpha    = event.alpha;
        let beta;
        let gamma;
        if (window.matchMedia("(orientation: portrait)").matches) {
            beta = event.beta / 90;
            gamma = event.gamma / 90;
        } else {
            beta = event.gamma / -90;
            gamma = event.beta / 90;
        }

        document.getElementById("iris").style.transform =
            `translate(${gamma * 160}px, ${beta * 160}px) ` +
            `rotateY(${gamma * 50}deg) rotateX(${beta * -50}deg)`;
    }

    _onMouseMove(e) {
        const xDif = (e.clientX - window.innerWidth/2)/window.innerWidth;
        const yDif = (e.clientY - window.innerHeight/2)/window.innerHeight;

        document.getElementById("iris").style.transform =
            `translate(${xDif * 160}px, ${yDif * 160}px) ` +
            `rotateY(${xDif * 50}deg) rotateX(${yDif * -50}deg)`;

        document.getElementById("stage").className = "stage";
        this.setState({idleTime: 0});
    }

    _onMouseDown() {
        document.getElementById("stage").style.height = "0";
        document.getElementById("stage").focus();

        document.getElementById("stage").className = "stage";
        this.setState({idleTime: 0});
    }

    _onMouseUp() {
        document.getElementById("stage").style.height = "300px";
        document.getElementById("stage").blur();

        document.getElementById("stage").className = "stage";
        this.setState({idleTime: 0});
    }

    render() {
        return (
            <div style={{width: "100vw", height: "100vh", position: "absolute", top: 0, left: 0, zIndex: 1}}
                 onMouseMove={this._onMouseMove.bind(this)}
                 onMouseUp={this._onMouseUp.bind(this)}
                 onTouchEnd={this._onMouseUp.bind(this)}>

                <section className="stage" id="stage"
                         onMouseDown={this._onMouseDown.bind(this)}
                         onTouchStart={this._onMouseDown.bind(this)}>
                    <img src={gif}/>
                    <figure className="ball" id="ball">
                        {/*<span className="shadow"/>*/}
                        <span className="iris" id="iris"/>
                    </figure>
                </section>
            </div>
        )
    }
}