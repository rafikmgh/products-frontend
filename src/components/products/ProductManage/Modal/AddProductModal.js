import React, { useEffect, useState } from 'react'
// MODAL FROM MATERIAL UI
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import {
  createProduct,
  updateProduct,
} from '../../../../redux/actions/products'

//Add a product modal
const AddProductModal = ({
  open, //open popup
  handleClose, // handling closing popup
  products: { currentProduct, products }, //products
  modify, //Edit product (the popup)
  createProduct, //create new product
  updateProduct, //update existing product
}) => {
  //using react forms
  const {
    register, //register
    handleSubmit, //handle the submit button
    formState: { errors },
    setValue,
  } = useForm()
  //some styling for the popup
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

  //available state
  const [available, setAvailable] = useState(false)

  //setting product availability to the input value
  const handleAvailable = (e) => {
    setAvailable(e.target.value)
  }
  //handling validating a form (the two cases create or update a product)
  const handleValidate = (data) => {
    data.available = available
    //if modify action
    if (modify) {
      //we update
      updateProduct(data, currentProduct._id)
      //we close
      handleClose()
    } else {
      //else we create
      createProduct(data)
      //we close
      handleClose()
    }
  }
  //this use effect for displaying the product data into the inputs in case of an update / else we setvalues to empty
  useEffect(() => {
    if (currentProduct != null) {
      Object.entries(currentProduct).map((obj) => {
        setValue(obj[0], obj[1])
      })
    } else {
      setValue('name', '')
      setValue('type', '')
      setValue('price', 0)
      setValue('rating', 0)
      setValue('warranty_years', 0)
      setAvailable(true)
    }
  }, [open, modify])

  //displaying the popup and visibility if open
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
              {modify ? 'Modifier' : 'Ajouter'} un produit
            </h2>
            <div onClick={handleClose} className='close-modal'>
              X
            </div>
          </div>
          <form
            onSubmit={handleSubmit(handleValidate)}
            className='stack -gap-16'
          >
            <div className='field'>
              <label className='field_required' htmlFor='user_email'>
                Name
              </label>
              <input
                {...register('name', { required: true })}
                className='input'
                autoComplete='name'
                type='name'
                id='user_name'
              />
              {errors.name && (
                <div className='form-error'>
                  {errors.name.type === 'required' && (
                    <p id='name-error' className='field_error'>
                      Le nom est requis.
                    </p>
                  )}
                </div>
              )}
            </div>
            <div className='field'>
              <label className='field_required' htmlFor='user_password'>
                Type
              </label>
              <input
                {...register('type', { required: true })}
                className='input'
                autoComplete='new-type'
                aria-describedby='pw-req'
                type='text'
                id='user_type'
                aria-autocomplete='list'
              />
              {errors.type && (
                <div className='form-error'>
                  {errors.type.type === 'required' && (
                    <p id='type-error' className='field_error'>
                      Le type est requis
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className='field'>
              <label className='field_required' htmlFor='user_password'>
                Price
              </label>
              <input
                {...register('price', { required: true })}
                className='input'
                autoComplete='new-price'
                aria-describedby='pw-req'
                type='number'
                id='user_price'
                aria-autocomplete='list'
                step='0.01'
              />
              {errors.type && (
                <div classtype='form-error'>
                  {errors.price.type === 'required' && (
                    <p id='price-error' className='field_error'>
                      Le prix est requis
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className='field'>
              <label className='field_required' htmlFor='user_password'>
                Note
              </label>
              <input
                {...register('rating', { required: true })}
                className='input'
                autoComplete='new-rating'
                aria-describedby='pw-req'
                type='number'
                step='0.01'
                id='user_rating'
                aria-autocomplete='list'
              />
              {errors.rating && (
                <div className='form-error'>
                  {errors.rating.type === 'required' && (
                    <p id='type-error' className='field_error'>
                      La note est requise
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className='field'>
              <label className='field_required' htmlFor='user_password'>
                Warranty
              </label>
              <input
                {...register('warranty_years', { required: true })}
                className='input'
                autoComplete='new-type'
                aria-describedby='pw-req'
                type='number'
                id='user_type'
                aria-autocomplete='list'
              />
              {errors.type && (
                <div classtype='form-error'>
                  {errors.warranty_years.type === 'required' && (
                    <p id='type-error' className='field_error'>
                      La garantie est requise
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className='field'>
              <label className='field_required' htmlFor='user_password'>
                Available
              </label>
              <select
                value={available}
                name='available'
                onChange={(e) => handleAvailable(e)}
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>

            {products.error !== null && (
              <div className='mt-40'>
                <p id='email-error' className='field_error'>
                  {products.error == 'email_exist'
                    ? 'Your email address already exists, please use a new one'
                    : products.error}
                </p>
              </div>
            )}

            {!products.loading ? (
              <input
                type='submit'
                name='commit'
                value={`${modify ? 'Modifier' : 'Creer'}`}
                className='button -full'
              />
            ) : (
              <p>Loading...</p>
            )}
          </form>
        </Box>
      </Modal>
    </div>
  )
}

const mapStateToProps = (state) => ({
  products: state.products,
})

//exporting

export default connect(mapStateToProps, { createProduct, updateProduct })(
  AddProductModal
)
