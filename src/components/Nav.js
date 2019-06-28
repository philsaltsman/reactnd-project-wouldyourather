import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Nav () {
    return (
        <nav className='nav'>
            <ul>
                <li>
                    <NavLink to='/unanswered' exact activeClassName='active'>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/newquestion' activeClassName='active'>
                        Create New Question
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/leaderboard' activeClassName='active'>
                        LeaderBoard
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/signin' activeClassName='active'>
                        SignIn
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}