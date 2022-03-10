import React, { useEffect, useState } from 'react'
// MODAL
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

const ValidationPop = ({ open, handleClose, validateAction }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 900,

    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    display: 'flex',
    flexDirection: 'column',
  }

  return (
    <div className={`overlay ${open ? 'visible' : ''}`}>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby='child-modal-title'
        aria-describedby='child-modal-description'
      >
        <Box sx={{ ...style }}>
          <div className='title-box'>
            <h2 id='child-modal-title'>
              Voulez-vous vraiment supprimer un produit?
            </h2>
            <div onClick={handleClose} className='close-modal'>
              X
            </div>
          </div>
          <div className='box-actions'>
            <button onClick={validateAction} className='accept'>
              Supprimer
            </button>
            <button onClick={handleClose} className='cancel'>
              Annuler
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default ValidationPop
