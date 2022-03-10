import React from 'react'
import { connect } from 'react-redux'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

const Product = ({ products: { currentProduct } }) => {
  return (
    <div className='product'>
      <Card sx={{ minWidth: 275, minHeight: 300, marginTop: 20 }}>
        <CardContent>
          <h1>{currentProduct.name}</h1>
          <div className='product-prop'>
            Type
            <h3>{currentProduct.type}</h3>
          </div>
          <div className='product-prop'>
            Rating
            <h3>{currentProduct.rating}</h3>
          </div>
          <div className='product-prop'>
            Price
            <h3>{currentProduct.price}</h3>
          </div>
          <div className='product-prop'>
            Available
            <h3>{currentProduct.available ? 'Yes' : 'No'}</h3>
          </div>
          <div className='product-prop'>
            Warranty Years
            <h3>{currentProduct.warranty_years}</h3>
          </div>
        </CardContent>
        <CardActions>
          <Button size='small'>Buy</Button>
        </CardActions>
      </Card>
    </div>
  )
}

const mapStateToProps = (state) => ({
  products: state.products,
})

export default connect(mapStateToProps, {})(Product)
