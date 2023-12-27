import { Box, styled } from "@mui/material";
import React from "react";

export default function HomeDelivery(props) {
  return (
      <FeatureContainer>
        <Column>
          <FeatureItem>
            <FeatureImage
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/7ad327fe-5528-4d9c-a10c-985ac61a8243?apiKey=a16585d2108947c5b17ddc9b1a13aff2&"
            />
            <FeatureText>
              <FeatureTitle>Free Shipping</FeatureTitle>
              <FeatureDescription>
                Free shipping on all your orders
              </FeatureDescription>
            </FeatureText>
          </FeatureItem>
        </Column>
        <Column>
          <FeatureItem>
            <FeatureImage
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/edce3f55-b1b2-48b2-938b-b679bcc45494?apiKey=a16585d2108947c5b17ddc9b1a13aff2&"
            />
            <FeatureText>
              <FeatureTitle>Customer Support 24/7</FeatureTitle>
              <FeatureDescription>
                Instant access to support
              </FeatureDescription>
            </FeatureText>
          </FeatureItem>
        </Column>
        <Column>
          <FeatureItem>
            <FeatureImage
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ed01af55-08ff-4f52-8f24-667b2a23b2b0?apiKey=a16585d2108947c5b17ddc9b1a13aff2&"
            />
            <FeatureText>
              <FeatureTitle>100% Secure Payment</FeatureTitle>
              <FeatureDescription>
                We ensure your money is safe
              </FeatureDescription>
            </FeatureText>
          </FeatureItem>
        </Column>
        <Column>
          <FeatureItem>
            <FeatureImage
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/3d9b2960-4763-4908-9eb3-3e892b8934a8?apiKey=a16585d2108947c5b17ddc9b1a13aff2&"
            />
            <FeatureText>
              <FeatureTitle>Money-Back Guarantee</FeatureTitle>
              <FeatureDescription>
                30 Days Money-Back Guarantee
              </FeatureDescription>
            </FeatureText>
          </FeatureItem>
        </Column>
      </FeatureContainer>
  );
}


const FeatureContainer = styled(Box)`
  gap: 20px;
  display: flex;
  margin: 16px 0;
  padding: 20px;

  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0px;
  }
`;

const Column = styled(Box)`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 25%;
  margin-left: 0px;

  @media (max-width: 991px) {
    width: 100%;
  }
`;

const FeatureItem = styled(Box)`
  justify-content: space-between;
  align-items: center;
  display: flex;
  margin-top: 40px;
  gap: 16px;
`;

const FeatureImage = styled("img")`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 40px;
  overflow: hidden;
  max-width: 100%;
  margin: auto 0;
`;

const FeatureText = styled(Box)`
  justify-content: center;
  align-self: stretch;
  display: flex;
  flex-grow: 1;
  flex-basis: 0%;
  flex-direction: column;
`;

const FeatureTitle = styled(Box)`
  color: var(--gray-scale-gray-900, #1a1a1a);
  font: 600 16px/19px Poppins, sans-serif;
`;

const FeatureDescription = styled(Box)`
  color: var(--gray-scale-gray-400, #999);
  margin-top: 8px;
  font: 400 14px/21px Poppins, sans-serif;
`;
