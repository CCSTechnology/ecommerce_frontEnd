import { Box, styled } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { ImagePath } from '../../../utils/helpers'
import HomeTitle from '../../../components/ecommerce/HomeTitle';
import { useNavigate } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';


function CategoryThumb({ category }) {
    const navigate = useNavigate()
    return (
        <VegetableComponentWrapper onClick={(e) => {
            navigate("/category/" + category.unique_label)
        }}>
            <Image
                loading="lazy"
                srcSet={ImagePath + category.category_image}
                alt={category.unique_label}
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
            <HomeTitle featured={category} />
            <CategoryList
                spaceBetween={30}
                slidesPerView={3}
                autoplay={{
                    waitForTransition : 2000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter : true
                }}
                loop
                modules={[Autoplay]}
            >
                {categories?.slice(0, 3).map((cat, index) => {
                    return <SwiperSlide key={cat.id}>
                        <CategoryThumb category={cat}  />
                    </SwiperSlide>
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

const CategoryList = styled(Swiper)`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 16px; 
    padding: 30px 20px;
`








const VegetableComponentWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "var(--gray-scale-white, #fff)",
    border: `1px solid var(--branding-success-dark, ${theme.palette.grey[100]})`,
    height: "273px",
    width: "300px",
    cursor: "pointer",
    borderRadius: "5px",

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