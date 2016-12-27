import React from 'react';

import NavMenu from './navMenu';
import Footer from './Footer';

const Main = React.createClass({
    render() {
        return (
            <div>
                <NavMenu />
                <div>
                    {React.cloneElement({...this.props}.children, {...this.props})}
                </div>
                <Footer />
            </div>
        );
    }
});

export default Main;