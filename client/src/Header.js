import React from 'react'
import './Header.css';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@material-ui/core/IconButton';
import ForumIcon from '@material-ui/icons/Forum';
import { Icon } from '@material-ui/core';

function Header() {
  return (
    <div className= 'header'>
        <IconButton>
            <PersonIcon fontSize = "large" className = "header_icon"/>
        </IconButton>
        <IconButton>
        <ForumIcon fontSize = "large" className = "header_icon" />
        </IconButton>

    </div>
  )
}

export default Header