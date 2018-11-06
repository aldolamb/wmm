import React from 'react';

export class Header extends React.Component {

    _onMouseOver(e) {
        const item = e.target;
        // setInterval(function() {
        //     let node = document.createElement("LI");
        //     node.innerText = item.innerHTML;
            // node.style.fontSize = "2em"
            // node.onLoad = setInterval(function() {
                // node.style.fontSize = parseInt(node.style.fontSize.slice(0, -2)) + 1 + "em"
                // }, 100);
        //     item.parentNode.appendChild(node);
        // }, 100);
    }

    render() {
        let self = this;
        return (
            <header>
                <a href="/">
                    <ul className="wmmList">
                        <ul>
                            {"WEAK MINDED MASSES".split(" ").map(function(object, i){
                                return <li key={object + i} onMouseOver={self._onMouseOver.bind(self)}>{object}</li>;
                            })}
                        </ul>
                        {/*<ul>*/}
                        {/*{"Weak".split("").map(function(object, i){*/}
                            {/*return <li key={object + i} onMouseOver={self._onMouseOver.bind(self)}>{object}</li>;*/}
                        {/*})}*/}
                        {/*</ul>*/}
                        {/*<ul>*/}
                            {/*{"Minded".split("").map(function(object, i){*/}
                                {/*return <li key={object + i} onMouseOver={self._onMouseOver.bind(self)}>{object}</li>;*/}
                            {/*})}*/}
                        {/*</ul>*/}
                        {/*<ul>*/}
                            {/*{"Masses".split("").map(function(object, i){*/}
                                {/*return <li key={object + i} onMouseOver={self._onMouseOver.bind(self)}>{object}</li>;*/}
                            {/*})}*/}
                        {/*</ul>*/}
                    </ul>
                </a>
                <div className="more">
                    <a href="/zines">Zines</a>
                    {/*<a href="https://store.weakmindedmasses.com/" target="_blank">Store</a>*/}
                </div>
            </header>
        )
    }
}