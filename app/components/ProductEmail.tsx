import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

const ProductEmail = ({ link }: { link: string }) => {
  return (
    <Html>
      <Head />
      <Preview>Your product is here...</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container style={container}>
            <Text className="text-2xl font-semibold">Hi Friend,</Text>
            <Text className="text-lg text-gray-600">
              Thank you for buying your product at NZKKS Digital Marketplace
            </Text>
            <Section className="mt-7 flex w-full justify-center">
              <Button
                href={link}
                className="rounded-lg bg-blue-500 px-10 py-4 text-white"
              >
                Your Download Link
              </Button>
            </Section>
            <Text className="text-lg">
              Best, <br /> NZKKS Digital Marketplace Team
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
};

export default ProductEmail;
