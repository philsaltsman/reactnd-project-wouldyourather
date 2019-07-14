import React, { Component, Fragment} from 'react';
import { connect } from 'react-redux'
//import { NavLink } from 'react-router-dom';

class LeaderBoard extends Component {

    render() {

        // Probably way easier ways to do this, but my mechanical mind seems limited to this currently

        // build a simpler list of data desired
        let answered = this.props.userlist.map((id) => {
            let aq = Number(Object.keys(this.props.user[id].answers).length)
            let cq = Number((this.props.user[id].questions).length)
            let tot = Number(aq)+Number(cq)
            let url = this.props.user[id].avatarURL
            let userid = this.props.user[id].id
            let obj = {
                id: userid,
                aq: aq,
                cq: cq,
                tot: tot,
                url: url,
            }
            return (obj)
        })

        // create a separate sorted users list by object id (0-x) by their score (total question + total answer count)
        let sortedIds = Object.keys(answered).sort((a,b) => answered[b].tot - answered[a].tot)

        // build a sorted list from initial simpler list generated
        let place = 0  //used for determining trophy filter (gold, silver, bronze)
        let sortedAnswers = sortedIds.map(si => {
            let aq = Number(answered[si].aq)
            let cq = Number(answered[si].cq)
            let tot = Number(answered[si].tot)
            let url = answered[si].url
            let id = answered[si].id
            place = place + 1
            let trophy = 'trophy-none'
            if (place===1) {
                trophy='trophy-gold'
            }
            if (place===2) {
                trophy='trophy-silver'
            }
            if (place===3) {
                trophy='trophy-bronze'
            }
            let obj = {
                id: id,
                aq: aq,
                cq: cq,
                tot: tot,
                url: url,
                place: place,
                trophy: trophy,
            }
            return (obj)
        })

    

      return (
          <Fragment>
              
            <div>
                <h3>Leader Board</h3>

                <br />

            

                {sortedAnswers.map((sa) => {

                    return (

                    <Fragment key={sa.id}>
                        

                        <div className='question' align='left'>
                            <div className='leader-avatar'>
                                <img 
                                    src={sa.url}
                                    alt={`Avatar of `}
                                    className='avatar'
                                />
                            </div>
                                
                                <div className='leader-details'>
                                    <div className='leader-info'><h3>{sa.id}</h3>
                                        Answered Questions: {sa.aq}
                                        <br />
                                        Created Questions: {sa.cq}
                                        
                                    </div>
                                </div>
                                <div className='leader-score' align='right'>
                                        <h1 className='grayedout'>{sa.place} <img className={sa.trophy} alt={sa.trophy} src="https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fgallery.yopriceville.com%2Fvar%2Fthumbs%2FFree-Clipart-Pictures%2FTrophy-and-Medals-PNG%2FGold_Cup_Award_Transparent_PNG_Clip_Art.png%3Fm%3D1492570502&f=1" /></h1>
                                        <h3 align='right'>Score {sa.tot}</h3>
                                </div>
                            
                        </div>

                        <br />



                    </Fragment>
            
                )})}



                    
            </div>



              
          </Fragment>
        
     )
    }
}

function mapStateToProps({users}) {

    return {
        userlist: Object.keys(users),
        user: users,        
    }
}

export default connect(mapStateToProps)(LeaderBoard);