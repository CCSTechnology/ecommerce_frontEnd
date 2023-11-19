import { Box, styled } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { ImagePath } from '../../../utils/helpers'


function CategoryThumb({ category }) {
    return (
        <VegetableComponentWrapper>
            <Image
                loading="lazy"
                srcSet={ImagePath + category.category_image}
                // srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/841af5a1-177e-4b7c-8d09-6924a8a9755b?apiKey=a16585d2108947c5b17ddc9b1a13aff2&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/841af5a1-177e-4b7c-8d09-6924a8a9755b?apiKey=a16585d2108947c5b17ddc9b1a13aff2&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/841af5a1-177e-4b7c-8d09-6924a8a9755b?apiKey=a16585d2108947c5b17ddc9b1a13aff2&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/841af5a1-177e-4b7c-8d09-6924a8a9755b?apiKey=a16585d2108947c5b17ddc9b1a13aff2&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/841af5a1-177e-4b7c-8d09-6924a8a9755b?apiKey=a16585d2108947c5b17ddc9b1a13aff2&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/841af5a1-177e-4b7c-8d09-6924a8a9755b?apiKey=a16585d2108947c5b17ddc9b1a13aff2&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/841af5a1-177e-4b7c-8d09-6924a8a9755b?apiKey=a16585d2108947c5b17ddc9b1a13aff2&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/841af5a1-177e-4b7c-8d09-6924a8a9755b?apiKey=a16585d2108947c5b17ddc9b1a13aff2&"
            />
            <Title>{category.label}</Title>
        </VegetableComponentWrapper>
    );
}




const HomeCategory = () => {
    const { data: HomeCategoryData } = useSelector((state) => state.home.homeDataService)
    const category = HomeCategoryData?.category || null
    const categories = category?.category_list || []
    return (
        <HomeCategoryWrapper>
            <CategoryTitle>{category?.title}</CategoryTitle>
            <CategoryList>
                {categories?.map((cat) => {
                    return <CategoryThumb category={cat} key={cat.id} />
                })}
            </CategoryList>
        </HomeCategoryWrapper>
    )
}

export default HomeCategory

const HomeCategoryWrapper = styled('div')`
    padding: 60px 0;
    padding-inline: 20px;

`

const CategoryTitle = styled('p')`
    color: rgba(26, 26, 26, 1);

    /* Heading 05/Heading 05 — 600 */
    font-family: Poppins;
    font-size: 32px;
    margin-bottom: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%; /* 38.4px */
`

const CategoryList = styled('div')`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 16px; 
`








const VegetableComponentWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "var(--gray-scale-white, #fff)",
    border: `1px solid var(--branding-success-dark, ${theme.palette.grey[100]})`,
    height: "273px",
    width: "300px",
    cursor : "pointer",
    borderRadius :"5px",
    
    ":hover": {
        border: `1px solid var(--branding-success-dark, ${theme.palette.primary.main})`,
        boxShadow: `${theme.shadows[0]}`,
        "& p": {
            color: `var(--branding-success-dark, ${theme.palette.primary.main})`,
        }
    },


}))

const Image = styled('img')`
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
  overflow: hidden;
 
`;

const Title = styled('p')`
  color: var(--branding-success-dark, black);
  text-align: center;
  width: 100%;
  margin: 16px 0 24px;
  font: 500 18px/27px Poppins, sans-serif;
`;