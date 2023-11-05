import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { categoryListService } from '../../../redux/api/public/categoryService'
import { Box, Container, Grid, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { ImagePath } from '../../../utils/helpers'
import "./category.css"

import { productListService } from '../../../redux/api/public/productService'

const CardDesign1 = ({ categoryProduct }) => {
  return <Box sx={{
    height: "421px",
    display: "flex",
    flexDirection: "column",

  }} >

    <div className="el-wrapper">
      <div className="box-up">
        <Box sx={{
          width: "100%",
          height: "300px",
          "& img": {
            width: "100%",
            height: "100%",
            objectFit: "contain"
          }
        }}>
          <img className="img" src={ImagePath + categoryProduct.file_name} alt="" />
        </Box>
        <div className="img-info">
          <div className="info-inner">
            <span className="p-name">{categoryProduct.description}</span>
            <span className="p-company">{categoryProduct.product_name}</span>
          </div>
          {/* <div className="a-size">Available sizes : <span className="size">S , M , L , XL</span></div> */}
        </div>
      </div>

      <div className="box-down">
        <div className="h-bg">
          <div className="h-bg-inner"></div>
        </div>

        <a className="cart" href="#">
          <span className="price" sx={{

          }}>Rs: {categoryProduct.cost} {categoryProduct.product_name}</span>

          <span className="add-to-cart">
            <span className="txt">Add in cart</span>
          </span>
        </a>
      </div>
    </div>
  </Box>
}

const CardDesign = ({ categoryProduct }) => {
  return <div className="wrapper">
    <div className="container">
      <Box sx={{
        background : `url("${ImagePath + categoryProduct.file_name}") no-repeat center center`
      }} className="top"></Box>
      <div className="bottom">
      <div className="left">
        <div className="details">
          <h1>Chair</h1>
          <p>£250</p>
        </div>
        <div className="buy"><i className="material-icons">add_shopping_cart</i></div>
      </div>
      <div className="right">
        <div className="done"><i className="material-icons">done</i></div>
        <div className="details">
          <h1>Chair</h1>
          <p>Added to your cart</p>
        </div>
        <div className="remove"><i className="material-icons">clear</i></div>
      </div>
    </div>
    </div>
    {/* <div className="inside">
    <div className="icon"><i className="material-icons">info_outline</i></div>
    <div className="contents">
      <table>
        <tr>
          <th>Width</th>
          <th>Height</th>
        </tr>
        <tr>
          <td>3000mm</td>
          <td>4000mm</td>
        </tr>
        <tr>
          <th>Something</th>
          <th>Something</th>
        </tr>
        <tr>
          <td>200mm</td>
          <td>200mm</td>
        </tr>
        <tr>
          <th>Something</th>
          <th>Something</th>
        </tr>
        <tr>
          <td>200mm</td>
          <td>200mm</td>
        </tr>
        <tr>
          <th>Something</th>
          <th>Something</th>
        </tr>
        <tr>
          <td>200mm</td>
          <td>200mm</td>
        </tr>
      </table>
    </div>
  </div> */}
  </div>
}

const Category = () => {
  const dispatch = useDispatch()
  const [categoryProductList, setCategoryProductList] = useState(null)
  const { categorySlug } = useParams()

  const getCategoryProductList = useCallback(
    async () => {
      try {
        const response = await dispatch(productListService()).unwrap()
        setCategoryProductList(response.data)
      } catch (error) {
        setCategoryProductList(null)
      }
    }, [dispatch])



  useEffect(() => {
    getCategoryProductList()
  }, [])
  return (
    <Box>
      <Box sx={{
        background: `url(${"https://truevinefoods.com/wp-content/themes/truevine-foods/assets/images/banner/prod.jpg"})`,
        height: "200px",
      }}>
        <Box item sx={{
          display: "flex",
          height: "100%",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <Box>Category</Box>
          <Box>--</Box>
          <Box sx={{
            textTransform: "capitalize"
          }}>{String(categorySlug).split("-").join(" ")}</Box>
        </Box>
      </Box>
      <Box >
        <Box justifyContent={"center"} display={'flex'} alignItems={"center"} flexWrap={'wrap'} gap={2}>
          {
            categoryProductList && categoryProductList.map((categoryProduct, index) => {
              // return <CardDesign categoryProduct={categoryProduct} key={index} />
              return <CardDesign1 categoryProduct={categoryProduct} key={index} />
            }
            )}
        </Box>
      </Box>
    </Box>
  )
}

export default Category