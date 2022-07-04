import React from 'react'
import './SwipeButtons.css';
import CloseIcon from '@material-ui/icons/Close';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';

function SwipeButtons() {
  return (
    <div className = 'swipeButtons'>
    <IconButton className = 'swipeButtons_left'>
        <CloseIcon fontSize = 'large' />
    </IconButton>
    <IconButton className = 'swipeButtons_right'>
        <FavoriteIcon fontSize = 'large' />
    </IconButton>

    </div>
  )
}

export default SwipeButtons