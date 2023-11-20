import * as React from "react";
import styled from "styled-components";
import StyledContainer from "../../components/ecommerce/StyledContainer";
import { logo } from "../../helpers/images";

export default function PublicFooter(props) {
  return (
    <StyledContainer>
      <Div>
        <Div2>
          <Div3>
            <Div4>
              <Div5>
                <Img
                  loading="lazy"
                  src={logo}                />
              </Div5>
              <Div7>
                Morbi cursus porttitor enim lobortis molestie. Duis gravida turpis
                dui, eget bibendum magna congue nec.
              </Div7>
              <Div8>
                <Div9>(219) 555-0114</Div9>
                <Div10>or</Div10>
                <Div11>Proxy@gmail.com</Div11>
              </Div8>
            </Div4>
            <Div12>
              <Div13>My Account</Div13>
              <Div14>My Account</Div14>
              <Div15>Order History</Div15>
              <Div16>Shoping Cart</Div16>
              <Div17>Wishlist</Div17>
            </Div12>
            <Div18>
              <Div19>Helps</Div19>
              <Div20>Contact</Div20>
              <Div21>Faqs</Div21>
              <Div22>Terms & Condition</Div22>
              <Div23>Privacy Policy</Div23>
            </Div18>
            <Div24>
              <Div25>Proxy</Div25>
              <Div26>About</Div26>
              <Div27>Shop</Div27>
              <Div28>Product</Div28>
              <Div29>Track Order</Div29>
            </Div24>
            <Div30>
              <Div31>Categories</Div31>
              <Div32>Fruit & Vegetables</Div32>
              <Div33>Meat & Fish</Div33>
              <Div34>Bread & Bakery</Div34>
              <Div35>Beauty & Health</Div35>
            </Div30>
          </Div3>
          <Div36>
            <Div37>Ecobazar eCommerce © 2021. All Rights Reserved</Div37>
            <Div38>
              <Img2
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/09319586-a7bc-4586-81e2-355f1c7519a9?apiKey=a16585d2108947c5b17ddc9b1a13aff2&"
              />
              <Img3
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/9484403b-f67b-455c-b7b7-5e9db6736a23?apiKey=a16585d2108947c5b17ddc9b1a13aff2&"
              />
              <Img4
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d469d86a-fcf2-4c2b-a37a-eeb1291c94de?apiKey=a16585d2108947c5b17ddc9b1a13aff2&"
              />
              <Img5
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/6bd9aefd-4044-472d-9d9d-26e4d4221105?apiKey=a16585d2108947c5b17ddc9b1a13aff2&"
              />
              <Div39>
                <Div40>
                  <Img6
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/252c6e90-f27f-422b-8880-157d008b9350?apiKey=a16585d2108947c5b17ddc9b1a13aff2&"
                  />
                  <Div41>Secure</Div41>
                </Div40>
                <Div42>Payment</Div42>
              </Div39>
            </Div38>
          </Div36>
        </Div2>
      </Div>
    </StyledContainer>

  );
}

const Div = styled.div`
  justify-content: center;
  align-items: center;
  background-color: var(--gray-scale-gray-900, #1a1a1a);
  display: flex;
  flex-direction: column;
  padding: 0 20px;
`;

const Div2 = styled.div`
  display: flex;
  margin-top: 60px;
  width: 100%;
  max-width: 1320px;
  flex-direction: column;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const Div3 = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  @media (max-width: 991px) {
    max-width: 100%;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const Div4 = styled.div`
  align-self: stretch;
  display: flex;
  flex-grow: 1;
  flex-basis: 0%;
  flex-direction: column;
`;

const Div5 = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

const Img = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 32px;
  overflow: hidden;
  max-width: 100%;
  margin: auto 0;
`;

const Div6 = styled.div`
  color: var(--gray-scale-white, #fff);
  letter-spacing: -0.96px;
  align-self: stretch;
  flex-grow: 1;
  white-space: nowrap;
  font: 500 32px/38px Poppins, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Div7 = styled.div`
  color: var(--gray-scale-gray-500, #808080);
  margin-top: 16px;
  font: 400 14px/21px Poppins, sans-serif;
`;

const Div8 = styled.div`
  align-items: center;
  display: flex;
  margin-top: 16px;
  justify-content: space-between;
  gap: 20px;
  @media (max-width: 991px) {
    justify-content: center;
  }
`;

const Div9 = styled.div`
  color: var(--gray-scale-white, #fff);
  white-space: nowrap;
  justify-content: center;
  box-shadow: 0px 1.5px 0px 0px #20b526;
  background-color: var(--gray-scale-gray-900, #1a1a1a);
  align-self: stretch;
  flex-grow: 1;
  padding: 6px 0;
  font: 500 14px/21px Poppins, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Div10 = styled.div`
  color: var(--gray-scale-gray-500, #808080);
  margin: auto 0;
  font: 400 16px/24px Poppins, sans-serif;
`;

const Div11 = styled.div`
  color: var(--gray-scale-white, #fff);
  white-space: nowrap;
  justify-content: center;
  box-shadow: 0px 1.5px 0px 0px #20b526;
  background-color: var(--gray-scale-gray-900, #1a1a1a);
  align-self: stretch;
  flex-grow: 1;
  padding: 6px 0;
  font: 500 14px/21px Poppins, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Div12 = styled.div`
  align-self: start;
  display: flex;
  flex-basis: 0%;
  flex-direction: column;
`;

const Div13 = styled.div`
  color: var(--gray-scale-white, #fff);
  white-space: nowrap;
  font: 500 16px/24px Poppins, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Div14 = styled.div`
  color: var(--gray-scale-gray-400, #999);
  margin-top: 20px;
  white-space: nowrap;
  font: 400 14px/21px Poppins, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Div15 = styled.div`
  color: var(--gray-scale-gray-400, #999);
  margin-top: 12px;
  white-space: nowrap;
  font: 400 14px/21px Poppins, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Div16 = styled.div`
  color: var(--gray-scale-white, #fff);
  margin-top: 12px;
  white-space: nowrap;
  font: 400 14px/21px Poppins, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Div17 = styled.div`
  color: var(--gray-scale-gray-400, #999);
  margin-top: 12px;
  white-space: nowrap;
  font: 400 14px/21px Poppins, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Div18 = styled.div`
  align-self: start;
  display: flex;
  flex-basis: 0%;
  flex-direction: column;
`;

const Div19 = styled.div`
  color: var(--gray-scale-white, #fff);
  white-space: nowrap;
  font: 500 16px/24px Poppins, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Div20 = styled.div`
  color: var(--gray-scale-gray-400, #999);
  margin-top: 20px;
  white-space: nowrap;
  font: 400 14px/21px Poppins, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Div21 = styled.div`
  color: var(--gray-scale-gray-400, #999);
  margin-top: 12px;
  white-space: nowrap;
  font: 400 14px/21px Poppins, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Div22 = styled.div`
  color: var(--gray-scale-gray-400, #999);
  margin-top: 12px;
  white-space: nowrap;
  font: 400 14px/21px Poppins, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Div23 = styled.div`
  color: var(--gray-scale-gray-400, #999);
  margin-top: 12px;
  white-space: nowrap;
  font: 400 14px/21px Poppins, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Div24 = styled.div`
  align-self: start;
  display: flex;
  flex-basis: 0%;
  flex-direction: column;
`;

const Div25 = styled.div`
  color: var(--gray-scale-white, #fff);
  white-space: nowrap;
  font: 500 16px/24px Poppins, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Div26 = styled.div`
  color: var(--gray-scale-gray-400, #999);
  margin-top: 20px;
  white-space: nowrap;
  font: 400 14px/21px Poppins, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Div27 = styled.div`
  color: var(--gray-scale-gray-400, #999);
  margin-top: 12px;
  white-space: nowrap;
  font: 400 14px/21px Poppins, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Div28 = styled.div`
  color: var(--gray-scale-gray-400, #999);
  margin-top: 12px;
  white-space: nowrap;
  font: 400 14px/21px Poppins, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Div29 = styled.div`
  color: var(--gray-scale-gray-400, #999);
  margin-top: 12px;
  white-space: nowrap;
  font: 400 14px/21px Poppins, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Div30 = styled.div`
  align-self: start;
  display: flex;
  flex-basis: 0%;
  flex-direction: column;
`;

const Div31 = styled.div`
  color: var(--gray-scale-white, #fff);
  white-space: nowrap;
  font: 500 16px/24px Poppins, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Div32 = styled.div`
  color: var(--gray-scale-gray-400, #999);
  margin-top: 20px;
  white-space: nowrap;
  font: 400 14px/21px Poppins, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Div33 = styled.div`
  color: var(--gray-scale-gray-400, #999);
  margin-top: 12px;
  white-space: nowrap;
  font: 400 14px/21px Poppins, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Div34 = styled.div`
  color: var(--gray-scale-gray-400, #999);
  margin-top: 12px;
  white-space: nowrap;
  font: 400 14px/21px Poppins, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Div35 = styled.div`
  color: var(--gray-scale-gray-400, #999);
  margin-top: 12px;
  white-space: nowrap;
  font: 400 14px/21px Poppins, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Div36 = styled.div`
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px -1px 0px 0px #333;
  background-color: var(--gray-scale-gray-900, #1a1a1a);
  display: flex;
  margin-top: 60px;
  width: 100%;
  gap: 20px;
  padding: 24px 0;
  @media (max-width: 991px) {
    max-width: 100%;
    flex-wrap: wrap;
    margin-top: 40px;
  }
`;

const Div37 = styled.div`
  color: var(--gray-scale-gray-500, #808080);
  flex-grow: 1;
  flex-basis: auto;
  margin: auto 0;
  font: 400 14px/21px Poppins, sans-serif;
`;

const Div38 = styled.div`
  align-self: stretch;
  display: flex;
  gap: 8px;
  @media (max-width: 991px) {
    justify-content: center;
  }
`;

const Img2 = styled.img`
  aspect-ratio: 1.41;
  object-fit: contain;
  object-position: center;
  width: 45px;
  overflow: hidden;
  max-width: 100%;
`;

const Img3 = styled.img`
  aspect-ratio: 1.41;
  object-fit: contain;
  object-position: center;
  width: 45px;
  overflow: hidden;
  max-width: 100%;
`;

const Img4 = styled.img`
  aspect-ratio: 1.41;
  object-fit: contain;
  object-position: center;
  width: 45px;
  overflow: hidden;
  max-width: 100%;
`;

const Img5 = styled.img`
  aspect-ratio: 1.41;
  object-fit: contain;
  object-position: center;
  width: 45px;
  overflow: hidden;
  max-width: 100%;
`;

const Div39 = styled.div`
  border-radius: 5.294px;
  border: 1px solid var(--gray-scale-gray-800, #333);
  background-color: var(--gray-scale-gray-900, #1a1a1a);
  display: flex;
  flex-grow: 1;
  flex-basis: 0%;
  flex-direction: column;
  padding: 4px 5px;
`;

const Div40 = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2px;
`;

const Img6 = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 11px;
  fill: var(--gray-scale-gray-900, #1a1a1a);
  overflow: hidden;
  max-width: 100%;
`;

const Div41 = styled.div`
  color: var(--gray-scale-white, #fff);
  align-self: start;
  flex-grow: 1;
  white-space: nowrap;
  font: 400 11px/11px Poppins, sans-serif;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Div42 = styled.div`
  color: var(--gray-scale-white, #fff);
  text-align: center;
  font: 600 12px/12px Poppins, sans-serif;
`;


