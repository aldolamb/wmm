import React from "react";

export class Footer extends React.Component {
    render() {
        return (
            <footer>
                <div className="large">&copy; {(new Date()).getFullYear()} Design & build by <a href="https://aldolamberti.com/">Aldo Lamberti</a>.</div>
                <div className="small">&copy; {(new Date()).getFullYear()} <a href="https://aldolamberti.com/">Aldo Lamberti</a>.</div>
            </footer>
        )
    }
}