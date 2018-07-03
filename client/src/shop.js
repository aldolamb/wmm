import React from 'react';

const items =
    [1
    ,2
    ,3
    ,4
    ,5
    ,6
    ,7
    ,8
    ,9
    ,10
    ,11
    ,12
    ,13
    ,14
    ,15];

export class Shop extends React.Component {
    createItems = (item) => (
        <div key={item}>
            <div className="overlay">
                <div className="text">
                    <p>{item}</p>
                    <p style={{borderBottom: "1px solid #ffffff"}}/>
                    <p>$40</p>
                </div>
            </div>
        </div>
    );

    render () {
        return (
            <div className="shop">
                {items.map((val) => this.createItems(val))}
                <form target="paypal" action="https://www.paypal.com/cgi-bin/webscr" method="post">
                    <input type="hidden" name="cmd" value="_s-xclick"/>
                        <input type="hidden" name="hosted_button_id" value="T8R74WMJPN392"/>
                            <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_cart_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"/>
                                <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1"/>
                </form>
            </div>
        )
    }
}