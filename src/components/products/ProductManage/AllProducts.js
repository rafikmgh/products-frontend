import React, { useEffect, useState } from 'react'
import ValidationPop from '../../reusable/ValidationPop'
// REDUX
import { connect } from 'react-redux'
import {
  getAllProducts,
  deleteProduct,
  selectCurrentProduct,
} from '../../../redux/actions/products'
// TABLE
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

// STYLE
import './Product.css'
import AddProductModal from './Modal/AddProductModal'
import { useNavigate } from 'react-router-dom'
// LOADERS
import CenteredPage from '../../reusable/CenteredPage'
import Spinner from '../../reusable/Spinner'

//Allproducts

const AllProducts = ({
  products: { products, loading, currentProduct },
  getAllProducts,
  deleteProduct,
  selectCurrentProduct,
}) => {
  useEffect(() => {
    getAllProducts()
  }, [])

  const [open, setOpen] = useState(false)
  const [modify, setModify] = useState(false)

  const handleOpen = () => {
    setModify(false)
    selectCurrentProduct(null)
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
    setModify(false)
    selectCurrentProduct(null)
  }

  const handleModify = (prod) => {
    selectCurrentProduct(prod)
    setModify(true)
    setOpen(true)
  }

  //  navigate into show a single product
  const navigate = useNavigate()
  //handling consulting a product
  const handleConsulter = (product) => {
    selectCurrentProduct(product)
    navigate(`/products/${product._id}`)
  }

  // Suppression Produit popup
  const [isDelete, setDelete] = useState(false)

  const handleDelete = (prod) => {
    setDelete(true)
    selectCurrentProduct(prod)
  }

  const closeDelete = (prod) => {
    setDelete(false)
  }

  const confirmDelete = () => {
    setDelete(false)
    deleteProduct(currentProduct._id)
    selectCurrentProduct(null)
  }

  return loading ? (
    <CenteredPage>
      <Spinner />
    </CenteredPage>
  ) : products.length == 0 ? (
    <CenteredPage>No products yet</CenteredPage>
  ) : (
    //all products table from material UI
    <div className='products-page'>
      <TableContainer component={Paper}>
        <button onClick={handleOpen} className='add-product'>
          Ajouter
        </button>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Warranty</TableCell>
              <TableCell>Available</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={product._id}>
                <TableCell component='th' scope='row'>
                  {index}
                </TableCell>
                <TableCell component='th' scope='row'>
                  {product.name}
                </TableCell>
                <TableCell component='th' scope='row'>
                  {product.type}
                </TableCell>
                <TableCell component='th' scope='row'>
                  {product.price}
                </TableCell>

                <TableCell component='th' scope='row'>
                  {product.rating}
                </TableCell>
                <TableCell>{product.warranty_years}</TableCell>
                <TableCell>
                  {product.available ? (
                    <p className='available'>Yes</p>
                  ) : (
                    <p className='not-available'>No</p>
                  )}
                </TableCell>
                <TableCell align='right'>
                  <button
                    onClick={() => handleConsulter(product)}
                    className='table-action'
                  >
                    Consulter
                  </button>
                  <button
                    onClick={() => handleModify(product)}
                    className='table-action'
                  >
                    Modifier
                  </button>

                  <button
                    onClick={() => handleDelete(product)}
                    className='table-action'
                  >
                    Supprimer
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddProductModal modify={modify} open={open} handleClose={handleClose} />
      <ValidationPop
        open={isDelete}
        handleClose={closeDelete}
        validateAction={confirmDelete}
      />
    </div>
  )
}

const mapStateToProps = (state) => ({
  auth: state.authentification,
  products: state.products,
})

export default connect(mapStateToProps, {
  getAllProducts,
  deleteProduct,
  selectCurrentProduct,
})(AllProducts)
