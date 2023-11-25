import { Box, styled } from "@mui/material";

export default function HomeTitle({ featured }) {
    return (
      <HomeTitleWrapper>
        <Title>{featured?.title}</Title>
        <Content>
          <ViewAll>View All</ViewAll>
          <Image loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/49cabddc-d124-4af6-8d00-44a0757bd526?apiKey=a16585d2108947c5b17ddc9b1a13aff2&" />
        </Content>
      </HomeTitleWrapper>
    );
  }




  const HomeTitleWrapper = styled(Box)`
  justify-content: space-between;
  display: flex;
  gap: 20px;

  @media (max-width: 991px) {
    flex-wrap: wrap;
  }
`;

const Title = styled(Box)`
  color: var(--gray-scale-gray-900, #1a1a1a);
  flex-grow: 1;
  flex-basis: auto;
  text-transform: capitalize;
  font: 600 32px/38px Poppins, sans-serif;
`;

const Content = styled(Box)`
  justify-content: center;
  border-radius: 43px;
  align-self: center;
  display: flex;
  gap: 12px;
  margin: auto 0;
  padding: 0 20px;
`;



const ViewAll = styled(Box)(({theme})=>({
  // color: "var(--branding-success, #00b207)",
  color : theme.palette.success.main,
  font: "500 16px/24px Poppins, sans-serif",
  cursor: "pointer"
}))

const Image = styled("img")`
  aspect-ratio: 1.25;
  object-fit: contain;
  object-position: center;
  width: 15px;
  overflow: hidden;
  align-self: center;
  max-width: 100%;
  margin: auto 0;
`;