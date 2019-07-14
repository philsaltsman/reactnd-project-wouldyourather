import React, { Component, Fragment} from 'react';

class Loading extends Component {
    render() {
      return (
          <Fragment>
            <div align='center'>
              <div className='loaderContainer'>
                <img src='https://i.redd.it/ounq1mw5kdxy.gif' alt='LOADING...' className='loaderGif' />
              </div>
            </div>
          </Fragment>
        
     )
    }
}

export default Loading;